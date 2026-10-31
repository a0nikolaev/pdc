import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const langs=['ru','en','kk','uz','ky','tg'];
const read=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const ui=await read('src/i18n/ui.json');
const releases=await read('src/data/releases.json');
const translations=await read('src/data/release-translations.json');
const paths=value=>typeof value==='string'?['']:Object.entries(value).flatMap(([key,child])=>paths(child).map(path=>key+(path?'.'+path:'')));
const model=await read('src/i18n/locales/kk.json');
for(const lang of langs){
 assert.deepEqual(Object.keys(ui[lang]).sort(),Object.keys(ui.en).sort(),`${lang} UI keys`);
 assert(Object.values(ui[lang]).every(value=>typeof value==='string'&&value.trim()),`${lang} empty UI text`);
 if(!['ru','en'].includes(lang)){const c=await read(`src/i18n/locales/${lang}.json`);assert.equal(c.htmlLang,lang);assert.deepEqual(paths(c),paths(model),`${lang} content shape`);}
 for(const section of ['', 'changelog/']){
  const html=await fs.readFile(`dist/${lang}/${section}index.html`,'utf8');
  assert(html.includes(`<html lang="${lang}"`));
  assert(html.includes('href="#main-content"') && html.includes('id="main-content" tabindex="-1"'));
  assert(html.includes(ui[lang]['Skip to main content']));
  assert(!html.includes('undefined')&&!html.includes('[object Object]'));
  if (!section) {
    assert(html.includes('id="pdc-web"') && html.includes('PDC.Web'));
    const exampleImages=[...html.matchAll(/<img\b[^>]*src="([^" ]*\/(?:before|after)(?:-en)?\.png)"[^>]*>/g)];
    assert.equal(exampleImages.length,2);
    for (const match of exampleImages) {
      const png=await fs.readFile('dist/'+match[1].slice('/pdc/'.length));
      assert.equal(Number(match[0].match(/\bwidth="(\d+)"/)?.[1]),png.readUInt32BE(16));
      assert.equal(Number(match[0].match(/\bheight="(\d+)"/)?.[1]),png.readUInt32BE(20));
    }
    for (const product of ['desktop','web']) assert.equal((html.match(new RegExp(`id="${product}-gallery-track"`,'g')) || []).length,1,`${lang}/${product} gallery controls`);
  }
  if (section === 'changelog/') {
    assert(html.includes('data-release-filter="web"'));
    for (const version of ['1.0.0.0','1.1.0.0','1.2.0.0','1.2.1.0']) assert(html.includes(`id="web-${version}"`));
    assert.equal((html.match(/data-release-component="web"/g)||[]).length,4);
  }
  for(const target of langs)assert(html.includes(`hreflang="${target}"`));
  for(const pdf of ['RU','EN'])assert(html.includes(`download="PDC_Startup_Deck_${pdf}_V3.pdf"`));
  for(const match of html.matchAll(/(?:src|href)="(\/pdc\/[^"#?]*)/g)){
   const relative=decodeURIComponent(match[1].slice('/pdc/'.length));
   const file='dist/'+relative+(relative.endsWith('/')?'index.html':'');
   await fs.access(file);
  }
 }
}
for(const entry of releases.en){
 const key=`${entry.component}:${entry.version}`;const t=translations[key];assert(t,`Missing ${key}`);assert.equal(t.sourceText,entry.highlights.join('\n'),`Stale ${key}`);
 for(const lang of langs.slice(2))assert(t[lang]?.length&&t[lang].every(value=>value.trim()),`Missing ${lang}/${key}`);
}
for(const lang of ['ru','en']){
 assert.equal(releases[lang].find(r=>r.component==='server').version,'1.15.12.4');
 const bytes=await fs.readFile(`public/downloads/PDC_Startup_Deck_${lang.toUpperCase()}_V3.pdf`);assert.equal(bytes.subarray(0,5).toString(),'%PDF-');
}
console.log(`PASS: 6 locales, 12 localized pages, internal assets/links, public PDF V3, ${releases.en.length} translated releases and source freshness`);

const web = await read('src/i18n/web.json');
for (const lang of langs) { assert.equal(web[lang].title,'PDC.Web'); assert(web[lang].how.includes('PDC.Web') && web[lang].how.includes('/web/')); assert.equal(web[lang].items.length,6); }
const screenshots = await read('docs/web-screenshots-provenance.json');
assert.equal(screenshots.screenshots.length,10);
for (const shot of screenshots.screenshots) {
 const bytes=await fs.readFile('public/img/'+shot.file);
 assert.equal(createHash('sha256').update(bytes).digest('hex'),shot.sha256,shot.file);
}
console.log('PASS: localized Web content, independent gallery IDs, 10 screenshot checksums');
