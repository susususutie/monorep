import json from "@rollup/plugin-json";
import path from "path";
import { fileURLToPath } from "url";
// import typescript2 from "rollup-plugin-typescript2";
// import commonjs from "rollup-plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
// import resolve from "rollup-plugin-node-resolve";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = "./dist";
const entryDir = "./src";

const entries = fs.readdirSync(new URL(entryDir, import.meta.url));

function parseEntry(entry) {
  let filename, dirname, ext;
  // 1. file: entry.ts, entry.tsx
  if (/\.ts(x?)$/.test(entry)) {
    filename = entry.replace(/\.ts(x?)$/, "");
    dirname = "/";
    ext = entry.match(/\.ts(x?)$/)[0].slice(1);
  } else {
    //  2. dir: entry => entry/index.ts, entry/index.tsx
    const existTsx = fs.existsSync(
      path.resolve(__dirname, `${entryDir}/${entry}/index.tsx`)
    );
    // const existTs = fs.existsSync(
    //   path.resolve(__dirname, `${entryDir}/${entry}/index.ts`)
    // );
    filename = "index";
    dirname = `/${entry}/`;
    ext = existTsx ? "tsx" : "ts";
  }

  return { filename, dirname, ext };
}

/** @type {import('rollup').RollupOptions} */
export default [
  ...entries.map((entry) => {
    const { filename, dirname, ext } = parseEntry(entry);
    return {
      input: `${entryDir}${dirname}${filename}.${ext}`,
      output: {
        format: "es",
        exports: "named",
        file: `${outputDir}${dirname}${filename}.js`,
        globals: {
          react: "React",
          "react-dom": "ReactDom",
          antd: "Antd",
        },
      },
      external: ["react", "react-dom", "antd"],
      plugins: [
        // resolve(),
        json({
          compact: true,
        }),
        // commonjs(),
        esbuild(),
      ],
      watch: false,
    };
  }),
];
