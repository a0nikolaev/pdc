import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Published data stays in this repository; the product checkout is needed only to sync.
const product = resolve(process.argv[2] || '../personal-data-cleaner');
const data = {};
for (const lang of ['ru', 'en']) {
  const strings = JSON.parse(await readFile(resolve(product, `PDC.Desktop/PDC.Desktop.Core/Localization/Resources/${lang}.json`), 'utf8'));
  data[lang] = [];
  for (const [component, key, log] of [
    ['desktop', 'Changelog.DesktopHistory', 'CHANGELOG.Desktop.md'],
    ['server', 'Changelog.ServerHistory', 'CHANGELOG.md'],
  ]) {
    const source = await readFile(resolve(product, `change_log/${log}`), 'utf8');
    let release;
    for (const line of strings[key].split('\n')) {
      const header = line.match(/^(\d+\.\d+\.\d+\.\d+) · (.+)$/);
      if (header) {
        if (!source.includes(`## [${header[1]}]`)) throw new Error(`Version missing in ${log}: ${header[1]}`);
        const date = header[2].includes('.') ? header[2].split('.').reverse().join('-') : header[2];
        release = { component, version: header[1], date, highlights: [] };
        data[lang].push(release);
      } else if (line.startsWith('• ') && release) release.highlights.push(line.slice(2));
    }
  }
  data[lang].sort((a, b) => b.date.localeCompare(a.date) || b.version.localeCompare(a.version, 'en', { numeric: true }) || a.component.localeCompare(b.component));
}
await mkdir('src/data', { recursive: true });
await writeFile('src/data/releases.json', JSON.stringify(data, null, 2) + '\n');
console.log(`Synced ${data.ru.length} releases in two languages.`);
