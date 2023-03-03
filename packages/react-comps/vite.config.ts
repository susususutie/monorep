import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react-swc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/comps/index.ts"),
        MyButton: resolve(__dirname, "src/comps/MyButton/index.tsx"),
        MyTitle: resolve(__dirname, "src/comps/MyTitle/index.tsx"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "antd"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          "react-dom": "ReactDom",
          antd: "Antd",
        },
      },
    },
  },
});
