const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: { ADVENT_SETTINGS: { year: 2026, month: 11 } } };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/date-rules.js'), 'utf8'), context);
const cases = [
  [{year:2026,month:10,day:30}, 0, '30/11/2026'],
  [{year:2026,month:11,day:1}, 1, '01/12/2026'],
  [{year:2026,month:11,day:5}, 5, '05/12/2026'],
  [{year:2026,month:11,day:8}, 8, '08/12/2026'],
  [{year:2026,month:11,day:15}, 15, '15/12/2026'],
  [{year:2026,month:11,day:24}, 24, '24/12/2026'],
  [{year:2026,month:11,day:25}, 25, '25/12/2026'],
  [{year:2026,month:11,day:26}, 25, '26/12/2026'],
  [{year:2027,month:0,day:1}, 25, '01/01/2027']
];
for (const [date, expected, label] of cases) {
  assert.equal(context.window.AdventDate.availableDay(date), expected, label);
  process.stdout.write(`✓ ${label}: ${expected} porticine\n`);
}
