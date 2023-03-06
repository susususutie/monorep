// 压缩代码(去除空格, 变量名简写等)
import terser from "@rollup/plugin-terser";

import { readFileSync, readdirSync } from "fs";
const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url))
);

const entry = readdirSync(new URL("./src", import.meta.url));

/**
 *
 * @param {string} entry
 * @returns {import('rollup').RollupOptions}
 */
function createConf(entry) {
  let filename, path;
  if (/\.js/.test(entry)) {
    filename = entry.replace(/\.js/, "");
    path = "";
  } else {
    filename = "index";
    path = entry;
  }

  const input = `./src/${path}/${filename}.js`.replace(/\/\//, "/");
  console.log(entry, input);

  return {
    // 入口文件
    input,
    output: [
      {
        format: "umd",
        // 导出多个还是导出一个, 不建议混用:
        // named:   具名导出, 多个
        // default: 默认导出, 一个
        exports: "named",
        name: "SutieUtils", // window.SutieUtils
        // "dist/main/index.umd.js",
        file: `./dist/${path || filename}/index.umd.js`.replace(/\/\//, "/"),
      },
      {
        format: "es",
        exports: "named",
        file: `./dist/${path || filename}/index.js`.replace(/\/\//, "/"),
      },
      {
        format: "cjs",
        exports: "named",
        file: `./dist/${path || filename}/index.cjs`.replace(/\/\//, "/"),
        // 插件可以写在 output 针对某一种输出生效
        plugins: [terser()],
      },
    ],

    // 插件也可以对所有输出生效
    // plugins: [terser()],
  };
}

console.log(
  JSON.stringify(
    entry.map((name) => createConf(name)),
    null,
    2
  )
);

export default entry.map((name) => createConf(name));

/**
 * output.exports
 * https://www.cnblogs.com/WindrunnerMax/p/14422971.html#3021775773
 *
 * 為什麼不建议同时使用 default exports 和 named exports?
 * https://pjchender.dev/npm/npm-rollup-js/#%E7%82%BA%E4%BB%80%E9%BA%BC%E4%B8%8D%E5%BB%BA%E8%AD%B0%E5%90%8C%E6%99%82%E4%BD%BF%E7%94%A8-default-exports-%E5%92%8C-named-exportsmixing-named-and-default-exports
 */
