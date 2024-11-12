import { Typography } from "antd";
import PreviewPanel from "../../config/PreviewPanel";

export default function Demo() {
  return (
    <>
      <Typography.Title level={3}>FormItems/FormItemPorts</Typography.Title>
      <Typography.Paragraph>多端口输入表单, 使用多个`Form.Items`组合而成</Typography.Paragraph>

      <PreviewPanel
        items={[
          {
            key: 1,
            title: "默认",
            description: "不传name时, 数据默认挂载在ports, 打开控制台查看表单值",
            component: () => import("./FormItemPorts/index"),
            originCode: () => import("./FormItemPorts/index?raw"),
          },
          {
            key: 1,
            title: "表单赋值",
            description: "可正常使用setFieldValue对字段赋值",
            component: () => import("./FormItemPorts/setFieldValue"),
            originCode: () => import("./FormItemPorts/setFieldValue?raw"),
          },
        ]}
      />
    </>
  );
}
