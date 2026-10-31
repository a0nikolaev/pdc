import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Published data stays in this repository; the product checkout is needed only to sync.
const product = resolve(process.argv[2] || '../personal-data-cleaner');
const data = {};
const curated = JSON.parse(await readFile(new URL('../src/data/release-highlights.json', import.meta.url), 'utf8'));
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
  for (const entry of curated[lang]) {
    const logs = {server:'CHANGELOG.md', desktop:'CHANGELOG.Desktop.md', web:'CHANGELOG.Web.md'};
    if (!logs[entry.component]) throw new Error(`Unknown component: ${entry.component}`);
    const log = await readFile(resolve(product, `change_log/${logs[entry.component]}`), 'utf8');
    if (!log.includes(`## [${entry.version}] - ${entry.date}`)) throw new Error(`Unverified curated version: ${entry.version}`);
    const index = data[lang].findIndex(r => r.component === entry.component && r.version === entry.version);
    if (index < 0) data[lang].push(entry); else data[lang][index] = entry;
  }
  for (const [component, config] of [['server','PDC/WebAPI/PDC.WebAPI/appsettings.json'], ['desktop','PDC.Desktop/PDC.Desktop/appsettings.json']]) {
    const expected = JSON.parse((await readFile(resolve(product, config), 'utf8')).replace(/^\uFEFF/, '')).Application.Version.replace(/^v/, '');
    if (!data[lang].some(r => r.component === component && r.version === expected)) throw new Error(`Missing current ${component} ${expected} (${lang}); update release-highlights.json before syncing`);
  }
  const webSource = await readFile(resolve(product, 'PDC/WebAPI/PDC.WebAPI/wwwroot/web/api.js'), 'utf8');
  const webVersion = webSource.match(/export const WEB_VERSION = ['"]v?(\d+\.\d+\.\d+\.\d+)['"]/)?.[1];
  if (!webVersion || !data[lang].some(r => r.component === 'web' && r.version === webVersion)) throw new Error(`Missing current Web ${webVersion} (${lang}); update release-highlights.json before syncing`);
  data[lang].sort((a, b) => b.date.localeCompare(a.date) || b.version.localeCompare(a.version, 'en', { numeric: true }) || a.component.localeCompare(b.component));
}
await mkdir('src/data', { recursive: true });
await writeFile('src/data/releases.json', JSON.stringify(data, null, 2) + '\n');
console.log(`Synced ${data.ru.length} releases in two languages.`);
