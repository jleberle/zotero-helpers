/*
 * Library health report -- read-only, changes nothing.
 *
 * Covers the three checks Zotero's Saved Search UI can't express natively:
 * items with no PDF attachment, items with zero tags, and (loosely) items
 * with obviously incomplete metadata for their type.
 *
 * Run via: Tools > Developer > Run JavaScript. Prints a summary and writes
 * a full list to backups/health-report-<timestamp>.txt in this repo.
 */

var libraryID = Zotero.Libraries.userLibraryID;
var allItems = await Zotero.Items.getAll(libraryID, false, false, false);
var items = allItems.filter(function (i) { return i.isRegularItem(); });

var noPDF = [];
var noTags = [];
var thinMetadata = [];

var PDF_EXPECTED_TYPES = ['journalArticle', 'book', 'bookSection', 'thesis'];

items.forEach(function (item) {
  var type = Zotero.ItemTypes.getName(item.itemTypeID);
  var title = item.getField('title') || '(no title)';

  if (PDF_EXPECTED_TYPES.indexOf(type) !== -1) {
    var hasPDF = item.getAttachments().some(function (aid) {
      var a = Zotero.Items.get(aid);
      return a && a.attachmentContentType === 'application/pdf';
    });
    if (!hasPDF) noPDF.push(item.key + '  [' + type + ']  ' + title);
  }

  if (item.getTags().length === 0) {
    noTags.push(item.key + '  [' + type + ']  ' + title);
  }

  if (type === 'journalArticle' && !item.getField('date')) {
    thinMetadata.push(item.key + '  missing date  ' + title);
  }
  if ((type === 'book' || type === 'bookSection') && !item.getField('publisher')) {
    thinMetadata.push(item.key + '  missing publisher  ' + title);
  }
});

var lines = [];
lines.push('=== Library health report ' + new Date().toISOString() + ' ===');
lines.push('');
lines.push('Items missing PDF (' + noPDF.length + '):');
lines = lines.concat(noPDF.map(function (s) { return '  ' + s; }));
lines.push('');
lines.push('Items with zero tags (' + noTags.length + '):');
lines = lines.concat(noTags.map(function (s) { return '  ' + s; }));
lines.push('');
lines.push('Items with thin metadata (' + thinMetadata.length + '):');
lines = lines.concat(thinMetadata.map(function (s) { return '  ' + s; }));

var BACKUP_DIR = '/Users/jaredeberle/git/zotero-helpers/backups';
await IOUtils.makeDirectory(BACKUP_DIR, { ignoreExisting: true });
var ts = new Date().toISOString().replace(/[:.]/g, '-');
var outPath = PathUtils.join(BACKUP_DIR, 'health-report-' + ts + '.txt');
await IOUtils.writeUTF8(outPath, lines.join('\n'));

return 'Missing PDF: ' + noPDF.length + ' | No tags: ' + noTags.length +
  ' | Thin metadata: ' + thinMetadata.length + ' | Full list: ' + outPath;
