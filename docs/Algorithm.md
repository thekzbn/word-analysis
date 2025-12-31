# Word Analysis Algorithm
**Author**: Ayomide Deji-Adeyale (@thekzbn)  
**Scope**: Lexical and Orthographic Data Processing

This document provides a line-by-line explanation of the algorithm used to analyze the top 5,000 words in the English language. The algorithm is designed for client-side execution, prioritizing clarity and structural insight over raw computational speed, given the manageable size of the dataset.

---

## 1. Data Structures and Definitions

```typescript
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
```
**Decision**: A `Set` is used for O(1) lookup time when checking if a character is a vowel. This is a standard optimization for character-heavy loops.

### Pattern Extraction
```typescript
function getPattern(word: string): string {
  return word.split('').map(char => VOWELS.has(char) ? 'V' : 'C').join('');
}
```
**Line-by-Line**:
- `word.split('')`: Converts the string into an array of characters.
- `.map(char => ...)`: Iterates through each character.
- `VOWELS.has(char) ? 'V' : 'C'`: Replaces vowels with 'V' and everything else (consonants) with 'C'.
- `.join('')`: Reassembles the array into a structural string like "CVC".

### Cluster Detection
```typescript
function hasDoubleLetter(word: string): string[] {
  const doubles: string[] = [];
  for (let i = 0; i < word.length - 1; i++) {
    if (word[i] === word[i + 1] && !VOWELS.has(word[i])) { 
      doubles.push(word[i] + word[i+1]);
    }
  }
  return doubles;
}
```
**Line-by-Line**:
- `const doubles = []`: Initializes an array to store found pairs.
- `for (let i = 0; i < word.length - 1; i++)`: Iterates until the second-to-last character to allow for look-ahead.
- `if (word[i] === word[i + 1] && !VOWELS.has(word[i]))`: Checks if the current character matches the next one AND ensures it is not a vowel (targeting "Geminate Consonants").
- `doubles.push(...)`: Stores the pair (e.g., "ss").

---

## 2. The Main Analysis Pipeline (`analyzeWords`)

### Phase 1: Pre-processing
```typescript
const words: string[] = [];
rawList.forEach(item => {
  if (typeof item === 'string') {
    const splitItems = item.toLowerCase().split(/[\s-]+/);
    splitItems.forEach(w => {
      const clean = w.replace(/[^a-z]/g, '');
      if (clean.length > 0) words.push(clean);
    });
  }
});
```
**Decision**: Raw data often contains phrases (e.g., "according to") or hyphens.
- `item.toLowerCase()`: Standardizes casing for comparison.
- `.split(/[\s-]+/)`: Splits by whitespace or hyphens to extract individual word tokens.
- `.replace(/[^a-z]/g, '')`: Strips punctuation and non-alphabetic characters using a global regex.

### Phase 2: State Initialization
```typescript
const total: Record<string, number> = {};
const begin: Record<string, number> = {};
const middle: Record<string, number> = {};
const end: Record<string, number> = {};
// ... other trackers
```
**Decision**: Using `Record` objects (hash maps) allows for efficient counting. We initialize counters for every letter (a-z) to ensure the data structure is complete even for rare letters.

### Phase 3: The Primary Loop
For every word in the cleaned list:

#### Onset and Terminus (Start/End)
```typescript
const first = word[0];
const last = word[word.length - 1];
begin[first]++;
total[first]++;
end[last]++;
total[last]++;
```
**Logic**: Every word has a start and an end. For a 1-letter word ("a"), the same character is counted as both. This accurately reflects the positional weight of characters.

#### Nucleus (Middle)
```typescript
if (word.length > 2) {
  for (let i = 1; i < word.length - 1; i++) {
    const char = word[i];
    middle[char]++;
    total[char]++;
  }
}
```
**Logic**: If a word has 3 or more letters, the characters between the first and last are treated as "middle" characters. This distinction is crucial for understanding English orthographic habits.

#### Feature Extraction
```typescript
const pat = getPattern(word);
// ... store in patterns map
const doubles = hasDoubleLetter(word);
// ... store in doubleConsonants map
const distinctVowels = getUniqueVowels(word);
// ... sort into buckets (3, 4, or 5 vowels)
```
**Logic**: We extract three high-value metrics simultaneously to minimize the number of passes over the dataset.

---

### Phase 4: Data Assembly and Optimization

#### Sorting Utility
```typescript
const sorted = (obj: Record<string, number>) => Object.entries(obj)
  .map(([letter, count]) => ({ letter: letter.toUpperCase(), count }))
  .sort((a, b) => b.count - a.count);
```
**Decision**: Data is more useful when ranked. We transform the hash maps into sorted arrays of objects, ready for consumption by UI components and charts.

#### Positional Breakdown
```typescript
const breakdown = 'abcdefghijklmnopqrstuvwxyz'.split('').map(l => {
  const tot = total[l];
  return {
    letter: l.toUpperCase(),
    total: tot,
    begin: begin[l],
    beginPct: tot ? Math.round(begin[l] / tot * 100) : 0,
    // ... middle and end
  };
});
```
**Logic**: We calculate percentages relative to the *total occurrences of that specific letter*. This answers: "Given the letter E, how often is it at the end?" rather than "How often is E at the end compared to all other letters?".

#### Extreme Specimen Detection
```typescript
const processVowelGroup = (list: string[], count: number) => ({
  count,
  words: list,
  longest: [...list].sort((a, b) => b.length - a.length)[0] || '',
  shortest: [...list].sort((a, b) => a.length - b.length)[0] || ''
});
```
**Line-by-Line**:
- `[...list]`: Creates a shallow copy of the array to avoid mutating the original source.
- `.sort((a, b) => b.length - a.length)`: Sorts by length descending to find the longest.
- `.sort((a, b) => a.length - b.length)`: Sorts by length ascending to find the shortest.
- `[0] || ''`: Returns the first result or an empty string if the group is empty.

---

## Conclusion
The algorithm prioritizes **orthographic position** and **structural patterns**. It transforms a flat list of words into a multi-dimensional dataset that highlights the habits and "secret rules" of English speech as identified by Ayomide Deji-Adeyale (@thekzbn).
