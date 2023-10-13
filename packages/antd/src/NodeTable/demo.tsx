import { Card } from "antd";
import NodeTable from "./index";

export default function Demo() {
  return (
    <Card title="特定布局的节点组件">
      <NodeTable align="left" />
    </Card>
  );
}
