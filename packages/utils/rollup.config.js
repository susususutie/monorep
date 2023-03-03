import terser from "@rollup/plugin-terser";
// 压缩代码(去除空格, 变量名简写等)

/** @type {import('rollup').RollupOptions} */
export default [
  {
    // 入口文件
    input: "./src/main.js",
    output: [
      {
        format: "umd",
        // 导出多个还是导出一个, 不建议混用:
        // named:   具名导出, 多个
        // default: 默认导出, 一个
        exports: "named",
        name: "SutieUtils", // window.SutieUtils
        file: "dist/main/index.umd.js",
      },
      {
        format: "es",
        exports: "named",
        file: "dist/main/index.js",
      },
      {
        format: "cjs",
        exports: "named",
        file: "dist/main/index.cjs.js",
        // 插件可以写在 output 针对某一种输出生效
        plugins: [terser()],
      },
    ],

    // 插件也可以对所有输出生效
    // plugins: [terser()],
  },
  {
    input: "./src/other.js",
    output: [
      {
        format: "umd",
        exports: "named",
        name: "SutieUtils",
        file: "dist/other/index.umd.js",
      },
      {
        format: "es",
        exports: "named",
        file: "dist/other/index.umd.js",
      },
      {
        format: "cjs",
        exports: "named",
        file: "dist/other/index.cjs.js",
        plugins: [terser()],
      },
    ],
  },
];

/**
 * output.exports
 * https://www.cnblogs.com/WindrunnerMax/p/14422971.html#3021775773
 *
 * 為什麼不建议同时使用 default exports 和 named exports?
 * https://pjchender.dev/npm/npm-rollup-js/#%E7%82%BA%E4%BB%80%E9%BA%BC%E4%B8%8D%E5%BB%BA%E8%AD%B0%E5%90%8C%E6%99%82%E4%BD%BF%E7%94%A8-default-exports-%E5%92%8C-named-exportsmixing-named-and-default-exports
 */
