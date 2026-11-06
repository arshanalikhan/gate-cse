# GATE CSE 2027 Prep

A free, one-stop preparation site for GATE Computer Science & IT 2027.

**Live site:** https://arshanalikhan.github.io/gate-cse/

## What's inside

- **Official GATE 2027 syllabus** (IIT Madras) with what changed from 2026, exam pattern, marking and score calculation
- **Topic weightage** from every question of 28 GATE CSE papers (2007–2026), tagged by subject and topic
- **Predicted GATE 2027 paper** with solutions, and a **timed CBT-style mock test** with GATE negative marking
- **12 subjects**, each with an overview, concise notes, a formula sheet and its previous-year questions
- **Study tools:** retrieval-practice cards with spaced review, self-test mode on notes and formula sheets, topic checklists, search, dark mode
- **Past papers and official answer keys** (PDF)

## How it works

A static site with no build step. `index.html` renders the Markdown pages in `content/` in the browser (marked + KaTeX), with navigation from `site.json` and data from `data/*.json`. The mock test lives in `mock/`.

Preview locally:

```bash
python -m http.server 8000
```

then open http://localhost:8000.

## Sources

Syllabus, dates and exam rules come from the official [GATE 2027 website](https://gate2027.iitm.ac.in/); check dates there. Question papers and answer keys are the official IIT publications. Notes are original study material.
