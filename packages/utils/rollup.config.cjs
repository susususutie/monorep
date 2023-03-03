/** @type {import('rollup').RollupOptions} */
module.exports = {
  // 入口文件
  input: './src/main.js',
  // 输入文件
  output: {
    format: 'umd',
    name: 'SutieUtils', // window.SutieUtils
    file: 'dist/bundle.umd.js'
  },
}