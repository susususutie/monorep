import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

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
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib',
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