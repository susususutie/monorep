import { Typography } from "antd";
import PreviewPabel from "../../config/PreviewPabel";

export default function Demo() {
  return (
    <>
      <Typography.Title level={3}>FormItems/FormItemPorts</Typography.Title>
      <Typography.Paragraph>多端口输入表单, 使用多个`Form.Items`组合而成</Typography.Paragraph>

      <PreviewPabel
        items={[
          {
            key: 1,
            path: "FormItems/FormItemPorts/index",
            title: "默认",
            description: "不传name时, 数据默认挂载在ports, 打开控制台查看表单值",
          },
          {
            key: 1,
            path: "FormItems/FormItemPorts/setFieldValue",
            title: "表单赋值",
            description: "可正常使用setFieldValue对字段赋值",
          },
        ]}
      />
    </>
  );
}
