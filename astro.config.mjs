import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://nijaz.by',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
