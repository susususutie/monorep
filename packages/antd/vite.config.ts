import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'

// 安装 `@types/node` 后就不会报 `找不到__dirname` 的错误, 也可通过以下代码自己实现 __dirname 
// import { dirname } from 'node:path'
// import { fileURLToPath } from 'node:url'
// const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4001
  },
  build: {
    minify: false,
    cssMinify:false,
    cssCodeSplit: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SutieAntd',
      // the proper extensions will be added
      fileName: 'sutie-antd',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', 'ahooks', '@emotion/css', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          ahooks: 'ahooks',
          '@emotion/css': 'emotionCss',
          'react/jsx-runtime': 'react/jsx-runtime'
        }
      }
    },
  },
})