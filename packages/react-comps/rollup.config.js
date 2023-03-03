import json from "@rollup/plugin-json";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import typescript from 'rollup-plugin-typescript2';
// import { name } from "./package.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('rollup').RollupOptions} */
export default {
  input: {
    // index: resolve(__dirname, "./components/index.ts"),
    // // fileURLToPath(new URL('./components/MyButton/index.tsx', import.meta.url)),
    // MyButton: resolve(__dirname, "./components/MyButton/index.tsx"),
    // MyTitle: resolve(__dirname, "./components/MyTitle/index.tsx"),
    MyCalc: resolve(__dirname, "./components/MyCalc/index.ts"),
  },
  output: {
    format: "es",
    globals: {
      react: "React",
      "react-dom": "ReactDom",
      antd: "Antd",
    },
  },
  external: ["react", "react-dom", "antd"],
  plugins: [
    typescript(/*{ plugin options }*/),
    json({
      compact: true,
    }),
  ],
  watch: false,
};
