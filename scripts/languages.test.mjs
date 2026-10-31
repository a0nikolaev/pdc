import {test} from 'node:test';
import assert from 'node:assert/strict';
import {preferredLanguage, isLanguage} from '../src/i18n/languages.ts';
test('saved supported choice takes priority over browser language',()=>{assert.equal(preferredLanguage('tg',['ru-RU']),'tg');});
test('unsupported saved choice falls back to first supported browser preference',()=>{assert.equal(preferredLanguage('de',['ja-JP','kk-KZ','en-US']),'kk');});
test('regional tags and all six supported languages',()=>{for(const lang of ['ru','en','kk','uz','ky','tg']){assert.equal(preferredLanguage(null,[`${lang.toUpperCase()}-XX`]),lang);assert(isLanguage(lang));}});
test('invalid stored values and empty browser preferences are safe',()=>{for(const value of [null,undefined,{},'','../ru','RU'])assert.equal(preferredLanguage(value,[]),'en');});
