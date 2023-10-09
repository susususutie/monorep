import { Card, Divider, Space, Typography } from "antd";
import FlyLine from "./index";

function createLines(options?: { start?: string; w?: number; h?: number }) {
  const { start, w = 400, h = 300 } = options ?? {};

  const parseItem = (char: string) => (char === "0" ? 0 : char === "w" ? w : char === "h" ? h : Number(char));
  const parse = (cond: string) => {
    if (cond.includes("/")) {
      const [a, b] = cond.split("/");
      return parseItem(a) / parseItem(b);
    }
    return parseItem(cond);
  };

  const list = `
  [50,50]    [w/3,50]    [w/2,50]         [w,50]
  [50,h/2]      [w/2,h/2]       [w,h/2]
  [50,h]        [w/2,h]         [w,h]`
    .split(/\s+/)
    .filter((cfg) => cfg);
  const innerStart = start ?? list[Math.floor(Math.random() * list.length)];
  let [x1, y1] = innerStart.split(",");
  x1 = x1.slice(1);
  y1 = y1.slice(0, -1);

  return list
    .filter((cfg) => cfg !== innerStart)
    .map((cfg) => {
      let [x, y] = cfg.split(",");
      x = x.slice(1);
      y = y.slice(0, -1);
      return {
        uid: cfg,
        x1: parse(x1),
        y1: parse(y1),
        x2: parse(x),
        y2: parse(y),
        label: "label",
        color: 'blue',
        data: { link_status: 0 },
      };
    });
}

export default function Demo() {
  return (
    <>
      <Typography.Title level={3}>FlyLine</Typography.Title>
      <Typography.Paragraph>飞线组件</Typography.Paragraph>

      <Divider />

      <Card>
        <div style={{ position: "relative", width: 451, height: 351, border: "1px dashed #eee" }}>
          <FlyLine lines={createLines({start: '[w/2,h/2]'})} />
        </div>
      </Card>

      <Divider />
    </>
  );
}
