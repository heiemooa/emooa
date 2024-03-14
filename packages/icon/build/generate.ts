import fs from 'fs-extra';
import * as babel from '@babel/core';
import { optimize } from 'svgo';
import nunjucks from 'nunjucks';
import cloneDeep from 'lodash/cloneDeep';
import { svgDataFlat } from './getSvgData';
import path from 'path';

const config = {
  plugins: [
    'removeUnknownsAndDefaults',
    'cleanupAttrs',
    'removeXMLNS',
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'removeEmptyContainers',
    // 'removeViewBox',
    'cleanupEnableBackground',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    'cleanupIDs',
    'cleanupNumericValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    // 'removeRasterImages',
    'mergePaths',
    'convertShapeToPath',
    'sortAttrs',
    'removeDimensions',
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          {
            fill: 'none',
          },
          {
            stroke: 'currentColor',
          },
          '{...props}',
        ],
      },
    },
  ],
};

nunjucks.configure({ autoescape: false });

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-spread',
  ],
};

const babelConfigCjs = cloneDeep(babelConfig);
babelConfigCjs.plugins.push('@babel/plugin-transform-modules-commonjs');

/** 生成入口 js 文件 * */
const syntaxEs = name => {
  return `export { default as ${name} } from './${name}/index';`;
};

const syntaxCjs = name => {
  return `export { default as ${name} } from './${name}/index';`;
};

const entryCode = svgDataFlat.map(com => syntaxEs(com.componentName)).join('\n');
const entryCodeCjs = svgDataFlat.map(com => syntaxCjs(com.componentName)).join('\n');

fs.outputFile('../esm/index.js', entryCode, err => {
  if (err) return;
  console.log('Generate es module entry success!'); // eslint-disable-line
});
let transform: any = babel.transform(entryCodeCjs, babelConfigCjs);
fs.outputFile('../cjs/index.js', transform.code, err => {
  if (err) return;
  console.log('Generate commonjs entry success!'); // eslint-disable-line
});
/** 生成入口 js 文件结束 * */

/** 生成 css 文件 */
const css = `
.eui-icon {
  vertical-align: -2px;
}
.eui-icon.eui-icon-loading {
  animation: icon-loading-circle 1s linear infinite;
}
@keyframes icon-loading-circle {
  100% {
    transform: rotate(1turn);
  }
}
`;
fs.outputFile('../esm/index.css', css, err => {
  if (err) return;
  console.log('Generate css file success!'); // eslint-disable-line
});

fs.outputFile('../cjs/index.css', css, err => {
  if (err) return;
  console.log('Generate commonjs css file success!'); // eslint-disable-line
});
/** 生成 css 文件结束 */

/** 生成 context 文件 */
const contextJsx = `import { createContext } from 'react';

export var IconContext = createContext({
  prefixCls: 'eui',
});
`;

fs.outputFile('../esm/context.js', contextJsx, err => {
  if (err) return;
  console.log('Generate context file success!'); // eslint-disable-line
});

transform = babel.transform(contextJsx, babelConfigCjs);
fs.outputFile('../cjs/context.js', transform.code, err => {
  if (err) return;
  console.log('Generate commonjs context file success!'); // eslint-disable-line
});

const dTs = `import * as React from 'react';
type IconContextType = {
  prefixCls?: string;
}

export declare const IconContext: React.Context<IconContextType>;
`;

fs.outputFile('../esm/context.d.ts', dTs, err => {
  if (err) return;
  console.log('Generate context ts file success!'); // eslint-disable-line
});

fs.outputFile('../cjs/context.d.ts', dTs, err => {
  if (err) return;
  console.log('Generate commonjs context ts file success!'); // eslint-disable-line
});
/** 生成 context 文件结束 */

// 生成 SVG React Component
const totalLength = svgDataFlat.length;
let _length: number = 0;
function generateIcon(cjs?: boolean) {
  for (let i = 0; i < svgDataFlat.length; i++) {
    const iconClassName = svgDataFlat[i].name;
    const iconName = svgDataFlat[i].componentName;
    const iconPath = svgDataFlat[i].file;
    const svgCode = fs.readFileSync(svgDataFlat[i].file, 'utf8');

    const svg = optimize(svgCode, { path: iconPath, ...config })
      .data.replace(/stroke-width=/g, 'strokeWidth=')
      .replace(/stroke-linecap=/g, 'strokeLinecap=')
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/clip-rule=/g, 'clipRule=')
      .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
      .replace(/class=/g, 'className=');

    const template = path.join(__dirname, './templates/icon.nunjucks');

    nunjucks.render(
      template,
      {
        svg,
        iconName,
        iconClassName,
      },
      (err, res) => {
        if (err) return;
        const transform = babel.transform(res, cjs ? babelConfigCjs : babelConfig) as any;
        fs.outputFile(`../${cjs ? 'cjs' : 'esm'}/${iconName}/index.js`, transform.code, err => {
          if (!err) {
            _length += 1;
            if (_length === totalLength) {
              console.log(`\nGenerate icon success! Total: ${totalLength}\n`); // eslint-disable-line
            }
          }
        });
      },
    );
  }
}

let typingsCode = `import * as React from 'react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  style?: React.CSSProperties;
  spin?: boolean;
}

`;

svgDataFlat
  .map(svg => svg.componentName)
  .forEach(
    componentName =>
      (typingsCode += `export declare const ${componentName}: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<unknown>>\n`),
  );

fs.outputFileSync('../esm/index.d.ts', typingsCode);
fs.outputFileSync('../cjs/index.d.ts', typingsCode);

generateIcon();
generateIcon(true);
