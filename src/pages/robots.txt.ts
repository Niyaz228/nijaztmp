export function GET() {
  return new Response(
    import.meta.env.PUBLIC_SITE_LIVE === 'true'
      ? 'User-agent: *\nAllow: /\n\nSitemap: https://nijaz.by/sitemap.xml\n'
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
