/*
 * Create a new temporary Project collection under "Projects".
 *
 * Set PROJECT_NAME below, then run via Tools > Developer > Run JavaScript.
 * This only creates the collection -- add items to it normally via drag/drop
 * or right-click > Add to Collection in Zotero's UI. Items should also stay
 * in their permanent Research Topics collection; a Project is just a second,
 * temporary lens on top of items that already live somewhere permanent.
 */

var PROJECT_NAME = 'CHANGE ME'; // <-- set the project name before running

var libraryID = Zotero.Libraries.userLibraryID;
var projectsParent = Zotero.Collections.getByLibrary(libraryID, true)
  .find(function (c) { return c.name === 'Projects' && !c.parentID; });

if (!projectsParent) {
  return 'ERROR: top-level "Projects" collection not found. Run the reorg first.';
}

var existing = Zotero.Collections.getByLibrary(libraryID, true)
  .find(function (c) { return c.name === PROJECT_NAME && c.parentID === projectsParent.id; });
if (existing) {
  return 'Project "' + PROJECT_NAME + '" already exists (id ' + existing.id + ').';
}

var c = new Zotero.Collection();
c.libraryID = libraryID;
c.name = PROJECT_NAME;
c.parentID = projectsParent.id;
await c.saveTx();

return 'Created project "' + PROJECT_NAME + '" (id ' + c.id + ', key ' + c.key + ') under Projects.';
