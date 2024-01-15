import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    hd: { rules: [] },
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
  html2sketch: {},
  favicons: [
    'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
  ],
  autoAlias: false,
  outputPath: 'docs-dist',
  ...(process.env.NODE_ENV === 'development' ? {} : { ssr: {} }),
  analytics: {
    ga_v2: 'G-GX2S89BMXB',
  },
  sitemap: { hostname: 'https://docs.emooa.com' },
});
