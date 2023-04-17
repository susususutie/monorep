// 压缩代码(去除空格, 变量名简写等)
import terser from "@rollup/plugin-terser";
// 支持引入json资源
import json from "@rollup/plugin-json";
// 生成 .d.ts 文件
import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import { readdirSync, readFileSync } from "fs";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url))
);
const PKG_NAME = pkg.name
  .replace("@", "")
  .split("/")
  .map((word) => word.replace(/\w/, (m) => m.toUpperCase()))
  .join("");
const CJS_DIR = pkg.main.match(/\/(\w+)\//)[1];
const ESM_DIR = pkg.module.match(/\/(\w+)\//)[1];
const UMD_DIR = pkg.exports.match(/\/(\w+)\//)[1];
const entries = readdirSync(new URL("./src", import.meta.url)).filter(
  (entry) => !entry.startsWith("__DEV__")
);

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

  const umdFile = `./${UMD_DIR}/${output}.js`.replace(/\/\//, "/");
  const esmFile = `./${ESM_DIR}/${output}.js`.replace(/\/\//, "/");
  const cjsFile = `./${CJS_DIR}/${output}.js`.replace(/\/\//, "/");
  const dtsFile = `./${ESM_DIR}/${path || filename}.d.ts`.replace(/\/\//, "/");

  return { filename, input, umdFile, esmFile, cjsFile, dtsFile };
}

/**
 *
 * @param {string} entry
 * @returns {import('rollup').RollupOptions}
 */
function createConf(entry) {
  const { input, filename, umdFile, esmFile, cjsFile } = parseEntry(entry);
  return {
    input,
    output: [
      {
        format: "umd",
        // 导出多个还是导出一个, 不建议混用:
        // named:   具名导出, 多个
        // default: 默认导出, 一个
        exports: "named",
        name: filename === "index" ? PKG_NAME : `${PKG_NAME}.${filename}`, // window.SutieUtils
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
    plugins: [resolve(), json(), commonjs(), esbuild()],
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

    plugins: [json(), dts({ respectExternal: true })],
  };
}

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
