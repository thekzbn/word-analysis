export interface LetterStats {
  letter: string;
  total: number;
  begin: number;
  beginPct: number;
  middle: number;
  middlePct: number;
  end: number;
  endPct: number;
}

export interface PatternStats {
  pattern: string;
  count: number;
  example: string;
  words: string[];
}

export interface DoubleLetterStats {
  pair: string;
  count: number;
  examples: string[];
}

export interface VowelCountStats {
  count: number; // 3, 4, 5
  words: string[]; // List of words
  longest: string;
  shortest: string;
}

export interface AnalysisResult {
  totalWords: number;
  overall: { letter: string; count: number }[];
  startsWith: { letter: string; count: number }[];
  endsWith: { letter: string; count: number }[];
  inMiddle: { letter: string; count: number }[];
  breakdown: LetterStats[];
  patterns: PatternStats[];
  doubleLetters: DoubleLetterStats[];
  vowelCounts: VowelCountStats[];
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

function getPattern(word: string): string {
  return word.split('').map(char => VOWELS.has(char) ? 'V' : 'C').join('');
}

function hasDoubleLetter(word: string): string[] {
  const doubles: string[] = [];
  for (let i = 0; i < word.length - 1; i++) {
    if (word[i] === word[i + 1] && !VOWELS.has(word[i])) { 
      doubles.push(word[i] + word[i+1]);
    }
  }
  return doubles;
}

function getUniqueVowels(word: string): Set<string> {
  const found = new Set<string>();
  for (const char of word) {
    if (VOWELS.has(char)) {
      found.add(char);
    }
  }
  return found;
}

export function analyzeWords(rawList: string[]): AnalysisResult {
  // Pre-process: split phrases, lowercase, filter alphabetic
  const words: string[] = [];
  rawList.forEach(item => {
    if (typeof item === 'string') {
      const splitItems = item.toLowerCase().split(/[\s-]+/); // Split by space or hyphen
      splitItems.forEach(w => {
        // Remove non-alpha chars
        const clean = w.replace(/[^a-z]/g, '');
        if (clean.length > 0) words.push(clean);
      });
    }
  });

  const total: Record<string, number> = {};
  const begin: Record<string, number> = {};
  const middle: Record<string, number> = {};
  const end: Record<string, number> = {};
  const patterns: Record<string, { count: number; example: string; words: string[] }> = {};
  const doubleConsonants: Record<string, { count: number; examples: Set<string> }> = {};
  
  // Vowel buckets
  const wordsWith3Vowels: string[] = [];
  const wordsWith4Vowels: string[] = [];
  const wordsWith5Vowels: string[] = []; 

  // Initialize letter counts
  for (let i = 0; i < 26; i++) {
    const l = String.fromCharCode(97 + i);
    total[l] = 0;
    begin[l] = 0;
    middle[l] = 0;
    end[l] = 0;
  }

  words.forEach(word => {
    // 1. Position Analysis
    const first = word[0];
    const last = word[word.length - 1];
    
    if (total[first] !== undefined) {
      begin[first]++;
      total[first]++;
    }
    
    if (total[last] !== undefined) {
      end[last]++;
      total[last]++;
    }

    if (word.length > 2) {
      for (let i = 1; i < word.length - 1; i++) {
        const char = word[i];
        if (total[char] !== undefined) {
          middle[char]++;
          total[char]++;
        }
      }
    }

    // 2. Pattern Analysis (V/C)
    const pat = getPattern(word);
    if (!patterns[pat]) {
      patterns[pat] = { count: 0, example: word, words: [] };
    }
    patterns[pat].count++;
    patterns[pat].words.push(word);

    // 3. Doubled Consonants
    const doubles = hasDoubleLetter(word);
    doubles.forEach(pair => {
      if (!doubleConsonants[pair]) {
        doubleConsonants[pair] = { count: 0, examples: new Set() };
      }
      doubleConsonants[pair].count++;
      if (doubleConsonants[pair].examples.size < 5) {
        doubleConsonants[pair].examples.add(word);
      }
    });

    // 4. Unique Vowels Count
    const distinctVowels = getUniqueVowels(word);
    if (distinctVowels.size === 3) wordsWith3Vowels.push(word);
    if (distinctVowels.size === 4) wordsWith4Vowels.push(word);
    if (distinctVowels.size === 5) wordsWith5Vowels.push(word);
  });

  // Helper sort
  const sorted = (obj: Record<string, number>) => Object.entries(obj)
    .map(([letter, count]) => ({ letter: letter.toUpperCase(), count }))
    .sort((a, b) => b.count - a.count);

  // Helper breakdown
  const breakdown = 'abcdefghijklmnopqrstuvwxyz'.split('').map(l => {
    const tot = total[l];
    return {
      letter: l.toUpperCase(),
      total: tot,
      begin: begin[l],
      beginPct: tot ? Math.round(begin[l] / tot * 100) : 0,
      middle: middle[l],
      middlePct: tot ? Math.round(middle[l] / tot * 100) : 0,
      end: end[l],
      endPct: tot ? Math.round(end[l] / tot * 100) : 0
    };
  }).sort((a, b) => b.total - a.total);

  // Process Patterns
  const sortedPatterns = Object.entries(patterns)
    .map(([pat, data]) => ({ pattern: pat, count: data.count, example: data.example, words: data.words }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20); // Top 20

  // Process Doubles
  const sortedDoubles = Object.entries(doubleConsonants)
    .map(([pair, data]) => ({ pair, count: data.count, examples: Array.from(data.examples) }))
    .sort((a, b) => b.count - a.count);

  // Process Vowel Stats
  const processVowelGroup = (list: string[], count: number) => ({
    count,
    words: list,
    longest: [...list].sort((a, b) => b.length - a.length)[0] || '',
    shortest: [...list].sort((a, b) => a.length - b.length)[0] || ''
  });

  return {
    totalWords: words.length,
    overall: sorted(total),
    startsWith: sorted(begin),
    endsWith: sorted(end),
    inMiddle: sorted(middle),
    breakdown,
    patterns: sortedPatterns,
    doubleLetters: sortedDoubles,
    vowelCounts: [
      processVowelGroup(wordsWith5Vowels, 5),
      processVowelGroup(wordsWith4Vowels, 4),
      processVowelGroup(wordsWith3Vowels, 3),
    ]
  };
}