import { readFileSync } from "node:fs";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const pkg = JSON.parse(readFileSync("./package.json"));

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
    ],
    external: ["react", "react-dom"], // 将这些模块视为外部模块，不会打包进 bundle
  },
  // {
  //   input: "./lib/esm/index.d.ts",
  //   output: [{ file: "./lib/index.d.ts", format: "esm" }],
  //   plugins: [dts()],
  //   external: [/\.(css|less|scss)$/],
  // },
];
