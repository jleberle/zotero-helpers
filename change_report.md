# Zotero Reorganization — Computed Change Plan

**Status: applied and complete** (2026-07-07). This document is kept as the historical record of what changed and why. The migration scripts, their input data, and their run logs have been moved to [archive/](archive/) since the migration is done and they won't run again. For the ongoing workflow (Inbox processing, tags, Projects, saved searches, health checks), see [WORKFLOW.md](WORKFLOW.md).

Generated from read-only analysis copy. Items affected: 160

## Collection structure changes

Create top-level: `Research Topics`, `Inbox`, `Projects`

Reparent under `Research Topics` (name unchanged unless noted): Environmental History (renamed from 'Environmental'), Latin America, Music, Representations, US History, Indigenous Histories, World History

Dissolve and delete these subcollections (items redistributed, names preserved as tags where applicable):

- `Activism` -> items moved into `Indigenous Histories`, tagged ['Activism']
- `Colonial` -> items moved into `Indigenous Histories`, tagged ['Colonialism']
- `Identity and Representation` -> items moved into `Indigenous Histories`, tagged ['Identity']
- `Labor` -> items moved into `Indigenous Histories`, tagged ['Labor']
- `Overviews` -> items moved into `Indigenous Histories`, tagged ['Historiography']
- `19th Century` -> items moved into `US History`, tagged ['19th Century']
- `20th Century` -> items moved into `US History`, tagged ['20th Century']
- `Modern West` -> items moved into `US History`, tagged ['West (U.S.)']
- `Oklahoma` -> items moved into `US History`, tagged ['Oklahoma']
- `Populism` -> items moved into `US History`, tagged ['Populism']
- `Activism - International` -> items moved into `Indigenous Histories`, tagged ['Activism']
- `Activism - US` -> items moved into `Indigenous Histories`, tagged ['Activism']
- `Archives` -> items moved into `Indigenous Histories`, tagged ['Archival Collection']
- `Dissertations/Theses` -> items moved into `Indigenous Histories`, tagged ['Dissertation']
- `Latin America` -> items moved into `Latin America`
- `Memoirs` -> items moved into `Indigenous Histories`, tagged ['Memoir']
- `Policies and Government` -> items moved into `Indigenous Histories`, tagged ['Government Relations', 'Politics']
- `Theory` -> items moved into `Indigenous Histories`, tagged ['Historiography']
- `Transnational` -> items moved into `Indigenous Histories`, tagged ['Migration']
- `Contemporary` -> items moved into `Inbox` (per user decision: not scholarly, needs manual review)
- `Manuscript` (empty parent after dissolve) -> deleted

Unchanged: `Archives` tree (University of New Mexico > Carol Sullivan Wounded Knee Collection > Folder 1/Folder 3) — archival provenance preserved.

Flagged, NOT auto-resolved: `missing-from-zotero` (2 items) — see separate findings.

## Tag consolidation

Raw tags before: 208. Controlled vocabulary after: 44.

New controlled tag list:

1960s-1970s (Red Power Era), 19th Century, 20th Century, Activism, Biography, California, Capitalism, Citizenship, Civil Rights Era, Cold War, Colonialism, Education, Ethnohistory, Florida, Gaming/Gambling, Government Relations, Great Basin, Identity, Kansas, Labor, Latin America, Media & Representation, Midwest, Migration, Nationalism, Needs Metadata Review, New Deal, Nicaragua, Oklahoma, Photograph, Politics, Populism, Progressive Era, Race, Radicalism, Self-Determination, Socialism, South Dakota, Southwest, Sovereignty, United States, Vietnam War Era, Violence, West (U.S.)


Dropped entirely (no retrieval value / noise / redundant / foreign-duplicate / contamination): 58 tags

0337:American history, 1865-1921, 1865-1950, 1869-1934, American history, Americans, Animals, Anura, Atmosphere Exposure Chambers, Aufsatzsammlung, Book, Carlson, Tucker, Cherokee Indians, College teachers, Drug abuse, Drug control, Drug use History, Dunbar-Ortiz, Roxanne, Fiction, Gastric Juice, Gastric Mucosa, Governors -- United States, HIST3703, History, Hydrogen-Ion Concentration, Hyperbaric Oxygenation, Impeachments, In Vitro Techniques, Indian veterans, Indian youth, Indianer, Indians, Indians of North America, Journalists, Lease, Mary Elizabeth, Membrane Potentials, Miskito Indians, National, National United States, Navajo Indians, New, Nordamerika, Oxygen Consumption, Periodicals, Prevention History, Seminole Indians, Social aspects, Social conditions, Social life and customs, Social reformers, Social sciences, Soldier blue, Treatment of, Walton, J. C., 1881-1949, Whites, etc, histories, politicians

Note: "Indians of North America" and its language variants (Indianer, Nordamerika, Indians) are dropped as blanket tags because they duplicate collection membership (every item under Indigenous Histories is already retrievable that way) and add no discriminating power — the spec favors metadata that answers "what is this item about," not "what collection is it already in."

## Flagged items — NOT auto-resolved, need your judgment

**`missing-from-zotero` collection (2 items, left untouched by the script):**
- Item `NCREVZ8T` — a bare note documenting a failed BibTeX import: a malformed `.bib` entry for Bourgois (1985), "Ethnic Minorities" chapter in *Nicaragua: The First Five Years* — missing a comma after the `editor` field broke the parser. The actual item was never created. Recommended action: manually re-enter this one bookSection (author Philippe Bourgois, editor Thomas W. Walker, pages 201-216, Praeger 1985), then delete the note.
- Item `XEA3EG3M` — "The manipulation of indigenous struggles" (Diskin, *Reagan versus the Sandinistas*, 1987) — a true duplicate of item `2WDYF2PJ`, which already exists fully tagged and filed under Latin America. `XEA3EG3M` has zero tags, zero collections, and citation key `diskin1987a` (the "a" suffix Better BibTeX appends on key collision) — a leftover from the same broken import. Recommended action: use Zotero's built-in **Duplicate Items** view to merge `XEA3EG3M` into `2WDYF2PJ`, which safely preserves any unique attachments/notes before removing the duplicate.
- After resolving both, delete the now-empty `missing-from-zotero` collection.

**Likely data contamination — 2 items, tags dropped but items left in place:**
- Two duplicate `journalArticle` entries titled "Oxygenation of frog gastric mucosa in vitro," tagged with biomedical subject headings (Gastric Mucosa, Hyperbaric Oxygenation, Anura, etc.). This is unrelated to the rest of the library's Native American/US history focus and looks like an accidental import (e.g. a mis-clicked DOI/PubMed lookup). Not in any collection. Recommended action: confirm these don't belong, then delete both via Zotero's normal item deletion (the script does not delete items).

**Ambiguous collection placements (script proceeds with a default, but review afterward):**
- The 3-item "Archives" subcollection under the old `Manuscript` bucket (AIM Papers, NIYC Records x2) — these look like finding-aid-style records *about* archival collections rather than true primary-source archival holdings. Defaulted to `Indigenous Histories` + tag `Archival Collection`. If you'd rather these live under the `Archives` provenance tree, move them there manually — repository/collection metadata would need adding.
- The 4-item "Transnational" subcollection (Peace Corps/Bolivia, trans-Indigenous studies, 1904 World's Fair, Universal Races Congress 1911) — defaulted to `Indigenous Histories` + tag `Migration` since Indigenous peoples are the throughline, but these are also plausible `World History` items.

**Duplicate titles worth a manual duplicate-merge pass (Zotero's Duplicate Items view), beyond the one already flagged above:**
"Killing for coal" (3x), "Interchange: The Practice of Community-Engaged Native American History" (3x), "Just keep in mind, America does have history..." (2x), "Ghosts of Crook County" (2x), "National Indian Youth Council Records" (2x — one is a `document` finding aid, one is a `book`, worth checking if these are the same source cataloged twice). ("PDF"/"Table of Contents PDF"/"Full Text PDF"/"Snapshot"/pageN.html duplicates are attachment filenames, not distinct sources — benign.)

## Other findings

- 112 book/article/thesis items have no PDF attachment. A saved search "Items Missing PDFs" (see below) will surface these for ongoing triage — not something to bulk-fix now.
- 158 items have zero tags. After this reorganization's automated tagging, re-run the "Items Missing Tags" saved search to see what's left for manual review.
- 7 items exist in no collection at all (excluding notes/attachments/annotations) — these will surface via a saved search too, since the plan does not force every item into a collection blindly.

## Saved searches to create (per spec, prefer these over more collections)

Inbox, Unread, Recently Added, Annotated, Items Missing PDFs, Items Missing Tags, Items Missing Metadata, Duplicate Titles, Needs Metadata Review — create these once in Zotero's UI (right-click My Library > New Saved Search); this takes under 5 minutes by hand and is the normal supported path for this feature.

## How to apply

**(Historical — this already happened.)** The migration was applied on 2026-07-07 using `archive/reorg-dryrun.js` then `archive/reorg-apply.js` (input: `archive/item_changes.json`, `archive/tag_map.json`), confirmed against `archive/dryrun-log-*.txt` and `archive/apply-log-*.txt`. Of the flagged items above, the Bourgois "Ethnic Minorities" item (`V9LRFJ7W`) was confirmed to have complete metadata and was tagged; the stale import-error note and the true duplicate (`XEA3EG3M`) were resolved via `archive/cleanup-missing-from-zotero.js`, and the `missing-from-zotero` collection is gone. The frog-physiology contamination and remaining duplicate-title merges are still open — see above.

Going forward, use [WORKFLOW.md](WORKFLOW.md) for Inbox processing, tagging, Projects, and the recurring `health-report.js` check — not this section.

## Rollback

`zotero_full_backup_<timestamp>.sqlite` in this folder is a complete snapshot of `~/Zotero/zotero.sqlite` taken before any change. To roll back: quit Zotero completely, replace `~/Zotero/zotero.sqlite` with this backup file, restart Zotero. This restores the exact original state, including anything not touched by this plan.
