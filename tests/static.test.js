const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');

for (const page of ['index.html', 'privacy.html']) {
  test(`${page} only references existing local assets`, () => {
    const html = fs.readFileSync(path.join(projectRoot, page), 'utf8');
    const references = [...html.matchAll(/(?:href|src)="(\/?[^"?#]+)(?:[?#][^"]*)?"/g)]
      .map((match) => match[1])
      .filter((reference) => !/^[a-z][a-z0-9+.-]*:/i.test(reference))
      .filter((reference) => !reference.startsWith('//'))
      .filter((reference) => !reference.startsWith('/#'))
      .filter((reference) => !reference.startsWith('tel:'))
      .filter((reference) => !reference.startsWith('mailto:'))
      .filter((reference) => !reference.startsWith('#'));
    for (const reference of references) {
      const relative = reference.replace(/^\//, '');
      assert.ok(fs.existsSync(path.resolve(projectRoot, relative)), `Missing asset in ${page}: ${reference}`);
    }
  });
}
