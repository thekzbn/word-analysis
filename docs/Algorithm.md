# Word Analysis Algorithm
**Author**: Ayomide Deji-Adeyale (@thekzbn)  
**File**: `src/utils/analysis.ts`

The analysis engine transforms a raw string array into a structured linguistic dataset. It prioritizes orthographic position and phonological structure through a multi-phase pipeline.

---

## 1. Core Logic & Utility Definitions

The system utilizes a `Set` for vowel definition to ensure O(1) complexity during membership checks. This is critical for the efficiency of the primary character traversal.

### Structural Mapping
The `getPattern` function reduces strings to their structural representation by mapping each character to its category (Vowel or Consonant). This creates a structural string used for frequency grouping.

### Cluster Detection
`hasDoubleLetter` identifies contiguous identical characters. The logic specifically targets geminate consonants by filtering for non-vowel repeats. It employs a look-ahead mechanism within a single traversal to identify consonant clusters without multiple passes.

---

## 2. Analysis Pipeline Architecture

### Phase 1: Normalization and Tokenization
The pre-processor standardizes the input by forcing lowercase and splitting compound entries (hyphenated words or phrases) into individual lexical units. A regular expression `/[^a-z]/g` strips all non-alphabetic noise, ensuring the data integrity of the subsequent loops.

### Phase 2: Positional Pre-initialization
To ensure dataset inclusivity, the algorithm pre-initializes all 26 characters of the English alphabet. This step guarantees that characters with zero frequency are retained in the final Character Distribution matrix with valid 0% values, preventing data gaps or division-by-zero errors in the UI.

### Phase 3: The Primary Pass
A single iteration over the cleaned word list processes four distinct metrics:
- **Positional Weight**: Simultaneously increments counters for Onset (Start), Nucleus (Middle), and Terminus (End) positions.
- **Pattern Aggregation**: Computes the V/C pattern and updates the frequency map.
- **Geminate Extraction**: Detects consonant clusters and stores representative word specimens.
- **Vowel Density**: Calculates unique vowel counts per word, sorting outliers into specific buckets for saturation analysis.

---

## 3. Data Assembly & Sculpting

### Positional Normalization
The final breakdown is calculated by mapping over the pre-initialized 26-letter array. Percentages for each position (Start, Middle, End) are derived from the total occurrences of that specific character rather than the global corpus. This provides a focused view of a character's "behavioral bias" within word structures.

### Extreme Specimen Detection
The system identifies the longest and shortest words for each vowel group through shallow-copy sorting. This ensures the original dataset remains immutable while providing reference words for analysis components.

---

## 4. Technical Constraints
The algorithm is designed for client-side execution on datasets up to 10,000 words. Memory consumption is minimized by using hash maps for aggregation before converting to sorted arrays for component consumption. All division operations are guarded by ternary checks to ensure 0% values are explicitly handled.
