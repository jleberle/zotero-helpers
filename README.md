# Ongoing Zotero workflow

[![License: MIT-0](https://img.shields.io/badge/License-MIT--0-blue.svg)](LICENSE)

## Adding new items

Everything new lands in **Inbox** first (browser connector, RIS/BibTeX import, etc. — point them at Inbox, not a Research Topic collection directly). Process each item before it leaves Inbox:

1. Verify metadata (title, date, author names spelled/ordered consistently).
2. Verify publication info (journal/publisher, place, pages).
3. Rename attachments if needed (only if the reference stays intact — never break the link).
4. Add controlled tags — see vocabulary below. Don't invent new tags; if nothing fits, that's a signal the vocabulary may need a deliberate addition, not a one-off.
5. File into exactly one Research Topics collection (or the Archives tree, if it's archival material with real provenance).
6. Remove from Inbox once filed.

If you're not ready to decide an item's home, it's fine to leave it in Inbox — that's what the "Items in Inbox" saved search is for.

## Controlled tag vocabulary (~74 tags, currently 44 in active use)

**Geography:** United States, Latin America, Nicaragua, Oklahoma, Great Basin, Southwest, South Dakota, Kansas, Florida, California, Midwest, West (U.S.)

**Time Period:** 19th Century, 20th Century, 21st Century, Progressive Era, New Deal, Cold War, Vietnam War Era, Civil Rights Era, 1960s-1970s (Red Power Era)

**Themes:** Labor, Environment, Colonialism, Settler Colonialism, Identity, Memory, Violence, Migration, Religion, Politics, Education, Gender, Race, Sovereignty, Capitalism, Activism, Self-Determination, Socialism, Nationalism, Government Relations, Media & Representation, Populism, Citizenship, Gaming/Gambling, Radicalism

**Source Type:** Journal Article, Book, Book Chapter, Dissertation, Government Document, Newspaper, Letter, Diary, Memoir, Speech, Photograph, Map, Oral History, Manuscript, Archival Collection

**Methodology:** Historiography, Quantitative, Qualitative, Comparative, Digital Humanities, Biography, Ethnohistory

**Workflow Status:** Unread, Reading, Annotated, Important, Cited, Needs Metadata Review

Adding a genuinely new tag is fine when a real recurring subject isn't covered — just keep the total under 100 and prefer reusing an existing tag over a narrower synonym.

## Projects (temporary, not permanent structure)

A Project is a second, temporary lens on top of items — never their only home. An item added to a Project must already (or soon) also live in a permanent Research Topics/Archives collection.

- **Start a project:** edit `PROJECT_NAME` in [project-create.js](project-create.js), run it via Tools > Developer > Run JavaScript. Creates an empty collection under `Projects`. Add items to it normally in Zotero's UI (they keep their existing permanent collection membership too).
- **Close a project:** edit `PROJECT_NAME` in [project-close.js](project-close.js), run it the same way. It refuses to delete the project if any item would be left with no permanent collection (and tells you which ones), so you can't accidentally lose an item's only filing. Otherwise it deletes the project collection — the items, tags, and attachments are untouched, only the temporary grouping disappears from the collections list.

## Saved searches

Right-click **My Library** → **New Saved Search** in Zotero. These four work natively (condition, "Match all"):

- **Unread** → `Tag` `is` `Unread`
- **Annotated** → `Tag` `is` `Annotated` (auto-applied — see below, don't tag this one by hand)
- **Needs Metadata Review** → `Tag` `is` `Needs Metadata Review`
- **Recently Added** → `Date Added` `is in the last` `30` `days`

**Duplicate Titles** doesn't need a saved search — Zotero's built-in **Duplicate Items** view (permanent entry in the left pane) already does fuzzy title/DOI/ISBN matching with a one-click merge, which is better than anything a custom search could do.

**Items Missing PDFs / Missing Tags / Missing Metadata** can't be expressed as native saved searches — Zotero's condition builder has no "zero attachments" or "zero tags" condition. Run [health-report.js](health-report.js) periodically instead (Tools > Developer > Run JavaScript); it's read-only against the library and writes a timestamped list to `backups/` in this repo (not committed).

## Annotated tag (automatic)

Don't tag `Annotated` by hand — [tag-annotated.js](tag-annotated.js) detects it objectively from Zotero's own PDF annotation data (highlights/notes made in Zotero's reader) rather than relying on memory. Run it periodically (Tools > Developer > Run JavaScript); it only adds the tag, never removes it, and skips items already tagged. If you annotate on paper or want to flag something without using Zotero's PDF reader, tag it manually as a one-off exception.

## Reference

Full rationale, the original 208→44 tag consolidation table, and flagged edge cases are in [change_report.md](change_report.md).
