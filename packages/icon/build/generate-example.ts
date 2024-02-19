import path from 'path';
import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import newIcons from './new-icons';
import { svgData } from './getSvgData';
import i18n from './i18n';

for (const key in svgData) {
  ['outline', 'fill', 'color'].forEach(type => {
    if (svgData[key][type]) {
      svgData[key][type].forEach(svg => {
        delete svg.file;
      });
    }
  });
}

const template = path.join(__dirname, './templates/example.nunjucks');
const demoCode = nunjucks.render(template, {
  svgData: JSON.stringify(svgData),
  newIcons: JSON.stringify(newIcons),
  i18n: JSON.stringify(i18n),
});

fs.outputFileSync('../examples/IconList.tsx', demoCode);

console.log('\nGenerate Icon Demo Success!\n'); // eslint-disable-line
