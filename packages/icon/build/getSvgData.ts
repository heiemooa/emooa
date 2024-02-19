import fs from 'fs-extra';
import path from 'path';
import i18n from './i18n';

const svgs = Object.keys(i18n['zh-CN']);

const svgData = {};
const svgDataPure = {};
const svgDataFlat = [];
const outOfDateComponentNames = [];

function getCamelString(name) {
  return `Icon${name.replace(/-([a-zA-Z])/g, g => g[1].toUpperCase()).replace(/^./, g => g.toUpperCase())}`;
}

svgs.forEach(svg => {
  const rootPath = path.resolve(__dirname, '../_svgs', svg);
  if (fs.lstatSync(rootPath).isDirectory()) {
    const dir = fs.readdirSync(path.resolve(rootPath));
    svgData[svg] = {};
    svgDataPure[svg] = {};
    const dirData = {};
    const dirDataPure = {};
    dir.forEach(d => {
      if (fs.lstatSync(path.resolve(rootPath, d)).isDirectory()) {
        const files = fs.readdirSync(path.resolve(rootPath, d));
        function setDirData(dd, pure?: boolean) {
          dd[d] = files
            .map(file => {
              if (file === '.DS_Store') {
                return '';
              }
              const name = file.slice(0, -4);
              const data = {
                name,
                componentName: getCamelString(name),
                file: path.resolve(rootPath, d, file),
              };
              if (pure) {
                delete data.name;
                delete data.file;
              }
              if (!pure) {
                svgDataFlat.push(data);
                if (svg === 'out-of-date') {
                  outOfDateComponentNames.push(getCamelString(name));
                }
              }
              return data;
            })
            .filter(x => x);
          return dd[d];
        }

        setDirData(dirData);
        setDirData(dirDataPure, true);
        svgData[svg] = dirData;
        svgDataPure[svg] = dirDataPure;
      }
    });
  }
});

export { svgData, svgDataPure, svgDataFlat, outOfDateComponentNames };
