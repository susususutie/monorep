import { Typography } from "antd";
import PreviewPabel from "../../config/PreviewPabel";

export default function DemoArrow() {
  return (
    <>
      <Typography.Title level={3}>箭头组件</Typography.Title>
      <Typography.Paragraph>可自定义颜色及是否开启动画</Typography.Paragraph>

      <PreviewPabel
        items={[
          { key: 1, path: "Arrow/direction", title: "方向", description: "direction参数控制箭头方向" },
          { key: 2, path: "Arrow/color", title: "颜色", description: "color参数控制箭头颜色" },
          { key: 3, path: "Arrow/animation", title: "动画", description: "animation参数控制显示动画效果" },
          { key: 4, path: "Arrow/group", title: "分组", description: "通过Group分组, 可将多个箭头堆叠" },
        ]}
      />
    </>
  );
}
