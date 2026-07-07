/*
 * Auto-tags any item that has real PDF annotations (highlights/notes you
 * made inside Zotero's PDF reader) with the "Annotated" workflow tag.
 * Read-only detection, only adds a tag -- never touches attachments,
 * annotations, or anything else.
 *
 * Run via: Tools > Developer > Run JavaScript
 */

var libraryID = Zotero.Libraries.userLibraryID;
var allItems = await Zotero.Items.getAll(libraryID, false, false, false);

var annotated = new Set();
allItems.forEach(function (item) {
  if (!item.isAnnotation()) return;
  var attachment = Zotero.Items.get(item.parentItemID);
  if (!attachment) return;
  var parent = Zotero.Items.get(attachment.parentItemID);
  if (parent) annotated.add(parent.id);
});

var newlyTagged = [];
var alreadyTagged = 0;
for (var id of annotated) {
  var item = Zotero.Items.get(id);
  if (item.hasTag('Annotated')) {
    alreadyTagged++;
    continue;
  }
  item.addTag('Annotated');
  await item.saveTx();
  newlyTagged.push(item.key + '  ' + (item.getField('title') || '(no title)'));
}

var lines = [];
lines.push('Items with real PDF annotations: ' + annotated.size);
lines.push('Already tagged "Annotated": ' + alreadyTagged);
lines.push('Newly tagged: ' + newlyTagged.length);
lines = lines.concat(newlyTagged.map(function (s) { return '  ' + s; }));

var outPath = '/Users/jaredeberle/zotero-organization-backups/tag-annotated-result.txt';
await IOUtils.writeUTF8(outPath, lines.join('\n'));

lines.join('\n');
