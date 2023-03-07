// 压缩代码(去除空格, 变量名简写等)
import terser from "@rollup/plugin-terser";
// 支持引入json资源
import json from "@rollup/plugin-json";
// 生成 .d.ts 文件
import dts from "rollup-plugin-dts";
// import typescript2 from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import resolve from "rollup-plugin-node-resolve";

import { readdirSync, readFileSync } from "fs";
const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url))
);

const entries = readdirSync(new URL("./src", import.meta.url));

function parseEntry(entry) {
  let filename, path;
  if (/\.ts/.test(entry)) {
    filename = entry.replace(/\.ts/, "");
    path = "";
  } else {
    filename = "index";
    path = entry;
  }

  const input = `./src/${path}/${filename}.ts`.replace(/\/\//, "/");
  const output = path || filename;

  const umdFile = `./umd/${output}.js`.replace(/\/\//, "/");
  const esmFile = `./es/${output}.js`.replace(/\/\//, "/");
  const cjsFile = `./cjs/${output}.cjs`.replace(/\/\//, "/");
  const dtsFile = `./es/${path || filename}.d.ts`.replace(/\/\//, "/");

  return { input, umdFile, esmFile, cjsFile, dtsFile };
}

/**
 *
 * @param {string} entry
 * @returns {import('rollup').RollupOptions}
 */
function createConf(entry) {
  const { input, umdFile, esmFile, cjsFile } = parseEntry(entry);

  // console.log(`${entry} ==> ${input}`);

  return {
    input, // 入口文件
    output: [
      {
        format: "umd",
        // 导出多个还是导出一个, 不建议混用:
        // named:   具名导出, 多个
        // default: 默认导出, 一个
        exports: "named",
        name: "SutieUtils", // window.SutieUtils
        file: umdFile,
      },
      {
        format: "es",
        exports: "named",
        file: esmFile,
      },
      {
        format: "cjs",
        exports: "named",
        file: cjsFile,
        // 插件可以写在 output 针对某一种输出生效
        plugins: [terser()],
      },
    ],

    // 插件也可以对所有输出生效
    plugins: [
      resolve(),
      json(),
      commonjs(),
      esbuild(), // 或者 typescript2(),
    ],
  };
}

function createConfDts(entry) {
  const { input, dtsFile } = parseEntry(entry);

  return {
    input,
    output: {
      format: "es",
      exports: "named",
      file: dtsFile,
    },

    plugins: [
      json(),
      dts({ respectExternal: true }),
    ],
  };
}

// console.log(
//   JSON.stringify(
//     entry.map((name) => createConf(name)),
//     null,
//     2
//   )
// );

export default [
  ...entries.map((name) => createConf(name)),
  ...entries.map((name) => createConfDts(name)),
];

/**
 * output.exports
 * https://www.cnblogs.com/WindrunnerMax/p/14422971.html#3021775773
 *
 * 為什麼不建议同时使用 default exports 和 named exports?
 * https://pjchender.dev/npm/npm-rollup-js/#%E7%82%BA%E4%BB%80%E9%BA%BC%E4%B8%8D%E5%BB%BA%E8%AD%B0%E5%90%8C%E6%99%82%E4%BD%BF%E7%94%A8-default-exports-%E5%92%8C-named-exportsmixing-named-and-default-exports
 */
