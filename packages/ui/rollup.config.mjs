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
        dir: path.dirname(pkg.module),
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ outDir: "esm", declaration: true, declarationDir: "esm" }),
      postcss(),
    ],
    external: ["react", "react-dom"], // 将这些模块视为外部模块，不会打包进 bundle
  },
  {
    input: "./src/index.ts",
    output: [
      {
        format: "cjs",
        sourcemap: true,
        dir: path.dirname(pkg.main),
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ outDir: "cjs", declaration: true, declarationDir: "cjs" }),
      postcss(),
    ],
    external: ["react", "react-dom"], // 将这些模块视为外部模块，不会打包进 bundle
  },
];
