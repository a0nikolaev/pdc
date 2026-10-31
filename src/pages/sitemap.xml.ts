import type {APIRoute} from 'astro';
import {languages} from '../i18n/languages';
export const GET: APIRoute = ({site}) => {
 if (!site) throw new Error('Astro site URL is required');
 const base=import.meta.env.BASE_URL;
 const absolute=(path:string)=>new URL(path,site).href;
 const root=absolute(base);
 const entry=(url:string,section:string)=>`<url><loc>${url}</loc>${languages.map(lang=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${absolute(`${base}${lang}/${section}`)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${section?absolute(`${base}en/${section}`):root}"/></url>`;
 const urls=[entry(root,''),...['','changelog/'].flatMap(section=>languages.map(lang=>entry(absolute(`${base}${lang}/${section}`),section)))];
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
