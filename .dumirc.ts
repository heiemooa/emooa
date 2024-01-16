import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    rtl: true,
    name: 'Emooa',
    logo: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
    footer: `Open-source MIT Licensed | Copyright © 2023-present <br /> Emooa`,
    prefersColor: { default: 'auto' },
    socialLinks: {
      github: 'https://github.com/umijs/dumi',
    },
  },
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
