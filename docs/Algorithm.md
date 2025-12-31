# Word Analysis Algorithm

**Author**: Ayomide Deji-Adeyale (@thekzbn)
**Scope**: lexical and orthographic processing

This document describes the algorithm used to analyse the 5,000 most frequent English words. The system is designed for client-side execution. The dataset size is fixed and bounded, so the algorithm prioritises clarity and inspectability over aggressive optimisation.

All transformations are deterministic.

## Definitions

```ts
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
```

A `Set` is used to allow constant-time vowel checks inside character loops.

### Structural pattern extraction

```ts
function getPattern(word: string): string {
  return word
    .split('')
    .map(char => (VOWELS.has(char) ? 'V' : 'C'))
    .join('');
}
```

Each word is reduced to a vowel–consonant pattern. Vowels are mapped to `V`, all other characters to `C`. The output preserves length and position, producing patterns such as `CVC`, `CVCC`, or `VCV`.

No phonetic inference is applied. This is a purely orthographic transformation.

### Geminate consonant detection

```ts
function hasDoubleLetter(word: string): string[] {
  const doubles: string[] = [];

  for (let i = 0; i < word.length - 1; i++) {
    if (word[i] === word[i + 1] && !VOWELS.has(word[i])) {
      doubles.push(word[i] + word[i + 1]);
    }
  }

  return doubles;
}
```

Adjacent identical consonants are detected and recorded. Vowel doubles are excluded. Each detected pair is preserved as a two-character string.

The function returns all matches within a word. No early exit is used.

## Analysis pipeline

### Pre-processing

```ts
const words: string[] = [];

rawList.forEach(item => {
  if (typeof item === 'string') {
    const splitItems = item.toLowerCase().split(/[\s-]+);

    splitItems.forEach(w => {
      const clean = w.replace(/[^a-z]/g, '');
      if (clean.length > 0) words.push(clean);
    });
  }
});
```

The source list may contain phrases, hyphenated forms, or punctuation. Each entry is normalised to lowercase, split on whitespace and hyphens, and stripped of non-alphabetic characters. Empty results are discarded.

The output of this phase is a flat list of lowercase word tokens.

### State initialisation

```ts
const total: Record<string, number> = {};
const begin: Record<string, number> = {};
const middle: Record<string, number> = {};
const end: Record<string, number> = {};
```

Counters are implemented as keyed objects. All letters are initialised explicitly to ensure completeness, including low-frequency characters.

Separate maps are maintained for total counts and positional counts.

### Primary loop

Each word is processed once.

#### Onset and terminus

```ts
const first = word[0];
const last = word[word.length - 1];

begin[first]++;
total[first]++;

end[last]++;
total[last]++;
```

Every word contributes exactly one onset and one terminus. Single-letter words increment both positions for the same character. This is intentional and preserves positional weight.

#### Nucleus

```ts
if (word.length > 2) {
  for (let i = 1; i < word.length - 1; i++) {
    const char = word[i];
    middle[char]++;
    total[char]++;
  }
}
```

Characters between the first and last positions are classified as middle characters. Words shorter than three letters have no nucleus.

This separation allows positional bias to be observed directly.

#### Feature extraction

```ts
const pattern = getPattern(word);
// stored in pattern frequency map

const doubles = hasDoubleLetter(word);
// stored in geminate map

const distinctVowels = getUniqueVowels(word);
// assigned to vowel-count groups
```

Structural pattern, geminate consonants, and vowel variety are extracted in the same pass to avoid redundant iteration. Each metric is recorded independently.

No weighting or smoothing is applied.

## Data assembly

### Sorting utility

```ts
const sorted = (obj: Record<string, number>) =>
  Object.entries(obj)
    .map(([letter, count]) => ({
      letter: letter.toUpperCase(),
      count
    }))
    .sort((a, b) => b.count - a.count);
```

All frequency maps are converted into ranked arrays for direct use in charts and tables. Sorting is performed once per dataset.

### Positional breakdown

```ts
const breakdown = 'abcdefghijklmnopqrstuvwxyz'.split('').map(l => {
  const tot = total[l];

  return {
    letter: l.toUpperCase(),
    total: tot,
    begin: begin[l],
    beginPct: tot ? Math.round((begin[l] / tot) * 100) : 0,
    // middle and end percentages omitted for brevity
  };
});
```

Percentages are calculated relative to the total occurrences of each letter, not relative to the corpus as a whole. This answers positional questions per letter rather than across letters.

### Vowel group extremes

```ts
const processVowelGroup = (list: string[], count: number) => ({
  count,
  words: list,
  longest: [...list].sort((a, b) => b.length - a.length)[0] || '',
  shortest: [...list].sort((a, b) => a.length - b.length)[0] || ''
});
```

For each vowel-count group, the longest and shortest words are identified. Arrays are copied before sorting to avoid mutation of shared state.

Empty groups return empty strings.

## Closing notes

The algorithm is intentionally literal. It does not attempt to model pronunciation, meaning, or linguistic theory. It exposes structure by counting positions and patterns, then leaves interpretation to the reader.

All results shown in the interface are traceable to these steps.