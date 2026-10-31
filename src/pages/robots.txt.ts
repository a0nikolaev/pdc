import type {APIRoute} from 'astro';
export const GET: APIRoute = ({site}) => {
 if (!site) throw new Error('Astro site URL is required');
 const base=import.meta.env.BASE_URL;
 return new Response(`User-agent: *\nAllow: ${base}\nSitemap: ${new URL(`${base}sitemap.xml`,site).href}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
