# zotero-helpers — session notes

README.md documents the library workflow (inbox processing, the controlled tag
vocabulary, projects, saved searches). This file is the operational part.

## These are not Node scripts

Every `*.js` here runs **inside Zotero**, via Tools → Developer → Run
JavaScript. They use Zotero's own API (`Zotero.Items`, `Zotero.Search`, …),
which does not exist outside the app. `node health-report.js` fails with
confusing reference errors — that is the wrong runtime, not a bug.

Most take a parameter by **editing a constant at the top of the file**
(`PROJECT_NAME` in `project-create.js` / `project-close.js`) rather than by
argument, because the console has no argv. Edit, paste, run.

## Safety properties worth preserving

Each script is deliberately conservative; keep these when editing.

- **`tag-annotated.js` only ever adds.** It detects annotation from Zotero's
  own PDF annotation data rather than from memory, skips items already tagged,
  and never removes the tag. So annotating on paper needs a manual tag — an
  accepted exception, not a gap to close.
- **`project-close.js` refuses to orphan items.** It will not delete a project
  collection if any member would be left with no permanent collection, and
  names the offenders. That check is the whole point of the script; a "just
  delete it" fast path would defeat it.
- **`health-report.js` is read-only** and writes a timestamped report to
  `backups/`, which is **not committed**. Keep it that way — the reports name
  every item with missing metadata.

## The tag vocabulary is closed, and it is the ontology

~74 controlled tags, capped at 100 by policy. Nothing in Zotero enforces this,
so the cap lives in README.md and in review discipline. Adding a narrower
synonym for an existing tag is the failure mode to watch for.

This matters beyond this repo: `~/git/cv`'s `make publications` selects items
by the `CV: Book` / `CV: Book Chapter` / `CV: Article` / `CV: Book Review`
tags. **A publication missing from the CV is almost always an untagged Zotero
item**, not a bug in the generator.

## Four tools read this library, from three repos

Worth knowing before adding a fifth:

| Tool | Repo | Reads via |
|---|---|---|
| `*.js` here | this repo | Zotero's live API, in-app |
| `scripts/gen-publications.py` | `~/git/cv` | `Library.json` + `Library.bib` exports |
| `bin/zotcheck.py` | `~/git/dotfiles` | exported `library.json` |
| `bin/citecheck.py` | `~/git/dotfiles` | exported `library.json` |

The export-based ones read `~/Documents/Library/`, so they see the library as
of the **last export**, not live. A tool that disagrees with Zotero's UI is
usually reading a stale export.
