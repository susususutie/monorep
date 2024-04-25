import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zhCN from 'antd/es/locale/zh_CN'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')!
)
