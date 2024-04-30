import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        counter: resolve(__dirname, "src/counter/index.ts"),
        dom: resolve(__dirname, "src/dom/index.ts"),
      },
      formats: ["es", "cjs"],
      // the proper extensions will be added
      fileName: (format, entryName) => `${entryName}.${{ es: "js", cjs: "cjs" }[format]}`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "react",
        "react-dom",
        "antd",
        "@emotion/css",
        "ahooks",
        "classnames",
        "recoil",
      ],
      output: {},
    },
  },
});
