import { useState } from 'react'
import { ConfigProvider, Form, Input, Row, Space } from 'antd'
import { Arrow, AsyncSelect, ComponentPanel, MyButton, BarTitle } from '@sutie/antd'
import React from 'react'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import SiderContent from './layout/SiderContent'
import MainContent from './layout/MainContent'

// function App() {
//   const [prefixCls, setPrefixCls] = useState<string>("antd");

//   return (
//     <ConfigProvider prefixCls={prefixCls}>
//       <Row gutter={[24, 24]}>
//         <ComponentPanel title="antd配置" extra="更改配置,观察自定义组件是否同步变更">
//           <Form
//             initialValues={{ prefixCls: "antd" }}
//             onFinish={(values) => setPrefixCls(values.prefixCls)}
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 12 }}
//           >
//             <Form.Item required name="prefixCls" label="prefixCls" rules={[{ required: true }, { pattern: /^\w+$/ }]}>
//               <Input />
//             </Form.Item>
//           </Form>
//         </ComponentPanel>

//         <ComponentPanel title="Arrow" extra="箭头组件,可自定义颜色及是否开启动画">
//           <Space direction="horizontal" wrap>
//             <Arrow direction="left" />
//             <Arrow direction="right" />
//             <Arrow color="default" />
//             <Arrow color="disabled" />
//             <Arrow color="error" />
//             <Arrow color="primary" />
//             <Arrow color="success" />
//             <Arrow color="warning" />
//             <Arrow animation />
//             <Arrow.Group size="default">
//               <Arrow />
//               <Arrow />
//             </Arrow.Group>
//             <Arrow.Group size="large">
//               <Arrow />
//               <Arrow />
//             </Arrow.Group>
//             <Arrow.Group size="small">
//               <Arrow />
//               <Arrow />
//             </Arrow.Group>
//             <Arrow.Group size={10}>
//               <Arrow />
//               <Arrow />
//             </Arrow.Group>
//           </Space>
//         </ComponentPanel>

//         <ComponentPanel title="AsyncSelect" extra="异步获取options的Select组件">
//           <AsyncSelect
//             style={{ width: 240 }}
//             request={async () => {
//               await new Promise((resolve) => setTimeout(resolve, 1200));
//               return [
//                 { value: 1, label: "选项一" },
//                 { value: 2, label: "选项二" },
//               ];
//             }}
//           />
//         </ComponentPanel>

//         <ComponentPanel title="Demo" extra="自定义组件示例">
//           <MyButton />
//         </ComponentPanel>

//         <ComponentPanel title="Template" extra="自定义组件示例">
//           <BarTitle />
//         </ComponentPanel>
//       </Row>
//     </ConfigProvider>
//   );
// }

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
}

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout hasSider>
        <Layout.Sider style={siderStyle} collapsible>
          <SiderContent />
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ padding: 0, background: colorBgContainer }}>Content Header</Layout.Header>
          <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <MainContent />
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Layout.Footer>
        </Layout>
      </Layout>
      <Layout.Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Layout.Footer>
    </Layout>
  )
}

export default App
