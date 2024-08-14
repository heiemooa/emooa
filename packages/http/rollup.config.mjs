import { readFileSync } from 'node:fs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import path from 'path';

const pkg = JSON.parse(readFileSync('./package.json'));

export default [
  {
    input: './src/index.ts',
    treeshake: {
      propertyReadSideEffects: false,
      moduleSideEffects: 'no-external',
    },
    output: [
      {
        format: 'esm',
        sourcemap: false,
        dir: path.dirname(pkg.module),
        exports: 'named',
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
      },
    ],
    plugins: [
      typescript({
        sourceMap: false, // 禁用源映射
        outDir: 'esm',
        declaration: true,
        declarationDir: 'esm',
      }),
      json(),
    ],
    external: ['react', 'react-dom', 'axios'], // 将这些模块视为外部模块，不会打包进 bundle
  },
  {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
        dir: path.dirname(pkg.main),
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
      },
    ],
    plugins: [
      typescript({
        sourceMap: false, // 禁用源映射
        outDir: 'cjs',
        declaration: true,
        declarationDir: 'cjs',
      }),
      json(),
    ],
    external: ['react', 'react-dom', 'axios'], // 将这些模块视为外部模块，不会打包进 bundle
  },
];
