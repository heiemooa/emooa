import fs from 'fs-extra';
import path from 'path';
import { svgDataPure } from './getSvgData';
import i18n from './i18n';

const data = {
  icons: svgDataPure,
  i18n,
};

fs.writeFile(path.resolve(__dirname, '../lib/icons.json'), JSON.stringify(data, null, 2), err => {
  if (err) return;
  console.log('generate success!');
});
