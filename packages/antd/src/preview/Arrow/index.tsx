import { Typography } from "antd";
import PreviewPanel from "../../config/PreviewPanel";

export default function DemoArrow() {
  return (
    <>
      <Typography.Title level={3}>箭头组件</Typography.Title>
      <Typography.Paragraph>可自定义颜色及是否开启动画</Typography.Paragraph>

      <PreviewPanel
        items={[
          {
            key: 1,
            title: "方向",
            description: "direction参数控制箭头方向",
            component: () => import("./direction"),
            originCode: () => import("./direction?raw"),
          },
          {
            key: 2,
            title: "颜色",
            description: "color参数控制箭头颜色",
            component: () => import("./color"),
            originCode: () => import("./color?raw"),
          },
          {
            key: 3,
            title: "动画",
            description: "animation参数控制显示动画效果",
            component: () => import("./animation"),
            originCode: () => import("./animation?raw"),
          },
          {
            key: 4,
            title: "分组",
            description: "通过Group分组, 可将多个箭头堆叠",
            component: () => import("./group"),
            originCode: () => import("./group?raw"),
          },
        ]}
      />
    </>
  );
}
