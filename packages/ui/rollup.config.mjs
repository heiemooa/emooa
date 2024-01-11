import { readFileSync } from "node:fs";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import path from "path";

const pkg = JSON.parse(readFileSync("./package.json"));

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        format: "esm",
        sourcemap: true,
        dir: path.dirname(pkg.main),
        exports: "named", // 指定导出模式（自动、默认、命名、无）
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ outDir: "lib", declaration: true, declarationDir: "lib" }),
      postcss(),
    ],
    external: ["react", "react-dom"], // 将这些模块视为外部模块，不会打包进 bundle
  },
];
