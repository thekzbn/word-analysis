# English Analysis

**Author**: Ayomide Deji-Adeyale (@thekzbn)
**Project type**: Linguistic analysis suite

English Analysis is a structural examination of the 5,000 most frequently used words in the English language. The project treats vocabulary as data. Words are decomposed into graphemes, positional roles, and phonetic patterns, then measured, classified, and visualised.

The aim is not pedagogy or opinion, but exposure. This repository shows what English actually looks like when stripped of sentiment and inspected at scale.

## Scope of analysis

The system analyses letter distribution across onset, nucleus, and terminus positions, allowing positional bias to be observed rather than assumed. Words are classified by vowel and consonant structure, making recurring forms visible without reference to meaning.

Geminate consonants and other orthographic clusters are detected and counted. Vowel density is measured to surface words with higher phonetic load relative to length.

All results are derived from the corpus itself. No heuristic adjustments are applied.

## Design

The interface follows the **bored** design language.

The visual system is intentionally restrained. Data density is prioritised. Nothing moves unless motion is required to preserve clarity. Colour is applied only where it communicates structure or state. The interface exists to serve inspection, not to attract attention.

Typography, spacing, geometry, and contrast conform strictly to the Tiara system. The user is treated as an adult reader.

## Technical overview

The frontend is built with React 19 and TypeScript. Styling is implemented with Tailwind CSS. Charts are rendered using Recharts. Motion, where required, uses Framer Motion and respects reduced-motion preferences.

The system is client-side and deterministic. Given the same input, it produces the same output.

## Documentation

Detailed technical documentation is maintained in the `docs/` directory. This includes an overview of the system, a step-by-step explanation of the analysis algorithm, and implementation details.

* Documentation overview: `docs/README.md`
* Algorithm description: `docs/Algorithm.md`

## Development

Install dependencies and start the local development environment:

```bash
npm install
npm run dev
```

## Identity

Developed independently by Ayomide Deji-Adeyale (@thekzbn).<br>
GitHub: [https://github.com/thekzbn](https://github.com/thekzbn) <br>
Web: [https://thekzbn.name.ng](https://thekzbn.name.ng)