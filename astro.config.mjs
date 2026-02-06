import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://book.muuim.net',
  integrations: [
    starlight({
      title: 'TSBook',
      customCss: [
        './src/styles/custom.css',
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content: 'ts error, typescript error, typescript handbook, typescript error handbook, tsbook',
          },
        },
      ],
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en'
        },
      },
      sidebar: [
        {
          label: 'Getting Started',
          link: '/intro/',
        },
        {
          label: 'Async',
          autogenerate: { directory: 'errors/async' },
        },
        {
          label: 'Classes',
          autogenerate: { directory: 'errors/classes' },
        },
        {
          label: 'Declarations',
          autogenerate: { directory: 'errors/declarations' },
        },
        {
          label: 'Function Calls',
          autogenerate: { directory: 'errors/function-calls' },
        },
        {
          label: 'Generics',
          autogenerate: { directory: 'errors/generics' },
        },
        {
          label: 'Modules',
          autogenerate: { directory: 'errors/modules' },
        },
        {
          label: 'Null & Undefined',
          autogenerate: { directory: 'errors/null-undefined' },
        },
        {
          label: 'Property Access',
          autogenerate: { directory: 'errors/property-access' },
        },
        {
          label: 'Strict Mode',
          autogenerate: { directory: 'errors/strict-mode' },
        },
        {
          label: 'Type Assignment',
          autogenerate: { directory: 'errors/type-assignment' },
        },
      ],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/muuim/tsbook' }],
    }),
  ],
});
