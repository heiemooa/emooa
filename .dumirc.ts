import { defineConfig } from 'dumi';
import pkg from './package.json';

const name = pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1);
export default defineConfig({
  themeConfig: {
    rtl: true,
    name,
    logo: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
    footer: `Open-source MIT Licensed | Copyright © 2023-present <br /> ${name}`,
    prefersColor: { default: 'auto' },
    socialLinks: {
      github: pkg.homepage,
      twitter: 'https://twitter.com/heiemooa',
    },
    editLink: 'main',
  },
  title: `${name} - 个人开源的UI组件库和各类依赖库`,
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  favicons: [
    'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
  ],
  // autoAlias: false,
  outputPath: 'dist',
  analytics: {
    ga_v2: 'G-NCBXT4H8XM',
  },
  // sitemap: { hostname: 'https://docs.emooa.com' },
});
