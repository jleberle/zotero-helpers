/*
 * Close (delete) a temporary Project collection once the work is done.
 *
 * Per the org spec, Projects must never become permanent structure, and
 * items must already live in a permanent collection independent of the
 * project. This script is deliberately cautious: it REFUSES to delete the
 * project if any of its items would be left with zero permanent-collection
 * membership (i.e. the project was the only place holding them) -- that
 * usually means an item got dropped into the project and never filed
 * properly, which this script will report so you can fix it first.
 *
 * Deleting the collection here only removes the collection itself (an
 * organizational grouping) -- the items and their permanent collection
 * membership, tags, and attachments are completely untouched.
 *
 * Set PROJECT_NAME below, then run via Tools > Developer > Run JavaScript.
 */

var PROJECT_NAME = 'CHANGE ME'; // <-- set the project name before running

if (PROJECT_NAME === 'CHANGE ME') {
  return 'ERROR: edit PROJECT_NAME at the top of this script first.';
}

var libraryID = Zotero.Libraries.userLibraryID;
var all = Zotero.Collections.getByLibrary(libraryID, true);
var projectsParent = all.find(function (c) { return c.name === 'Projects' && !c.parentID; });
if (!projectsParent) {
  return 'ERROR: top-level "Projects" collection not found.';
}
var project = all.find(function (c) { return c.name === PROJECT_NAME && c.parentID === projectsParent.id; });
if (!project) {
  return 'ERROR: project "' + PROJECT_NAME + '" not found under Projects.';
}

// Permanent = any top-level collection that isn't Inbox/Projects itself,
// plus all of its descendants at any depth (the Archives tree is several
// levels deep, so a one-level walk would falsely flag items filed there).
var permanentIDs = new Set();
var queue = all.filter(function (c) {
  return !c.parentID && c.name !== 'Inbox' && c.name !== 'Projects';
});
while (queue.length) {
  var col = queue.pop();
  permanentIDs.add(col.id);
  queue = queue.concat(all.filter(function (c) { return c.parentID === col.id; }));
}

var items = project.getChildItems();
var orphans = [];
items.forEach(function (item) {
  var inPermanent = item.getCollections().some(function (cid) { return permanentIDs.has(cid); });
  if (!inPermanent) orphans.push(item.key + ' -- ' + (item.getField('title') || '(no title)'));
});

if (orphans.length) {
  return 'NOT deleted. ' + orphans.length + ' item(s) in "' + PROJECT_NAME +
    '" have no permanent collection -- file them into a Research Topics collection first:\n' +
    orphans.join('\n');
}

var id = project.id, key = project.key;
await project.eraseTx();
return 'Closed project "' + PROJECT_NAME + '" (id ' + id + ', key ' + key +
  '). ' + items.length + ' item(s) remain in their permanent collections, untouched.';
