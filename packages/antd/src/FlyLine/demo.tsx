import { Card, Divider, Form, Slider, Space, Typography } from "antd";
import FlyLine, { FlyLineProps, useResize, getLineAnchor } from "./index";
import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";

function createLines(options?: { start?: string; w?: number; h?: number }) {
  const { start, w = 800, h = 800 } = options ?? {};

  const parseItem = (char: string) => (char === "0" ? 0 : char === "w" ? w : char === "h" ? h : Number(char));
  const parse = (cond: string) => {
    if (cond.includes("/")) {
      const [a, b] = cond.split("/");
      return parseItem(a) / parseItem(b);
    }
    return parseItem(cond);
  };

  const list = `
      [0,0]      [w/3,0]      [w/2,0]     [w/1.5,0]     [w,0]
      [0,h/3]    [w/3,h/3]    [w/2,h/3]   [w/1.5,h/3]   [w,h/3]
      [0,h/2]    [w/3,h/2]    [w/2,h/2]   [w/1.5,h/2]   [w,h/2]
      [0,h/1.5]  [w/3,h/1.5]  [w/2,h/1.5] [w/1.5,h/1.5] [w,h/1.5]
      [0,h]      [w/3,h]      [w/2,h]     [w/1.5,h]     [w,h]
      `
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

        color: "grey",
        label: {
          show: true,
          text: "not active active active active ",
          color: "lime",
        },
        active: {
          color: "pink",
          label: {
            show: true,
            text: "active",
          },
        },
        data: {},
      };
    });
}

const lines = createLines({ start: "[w/2,h/2]", w: 800, h: 800 });
export default function Demo() {
  const [size, setSize] = useState(80);
  const wrapper = useRef<HTMLDivElement>(null);
  const [dynamicLines, setLines] = useState<FlyLineProps["lines"]>();
  const { isReSizing: isWrapperReSizing } = useResize(wrapper);
  const getLines = () => {
    if (!wrapper.current) {
      setLines(undefined);
      return;
    }
    // resize 后重新计算飞线定位
    const { x, y } = wrapper.current.getBoundingClientRect();
    const nodeEleList = [...document.querySelectorAll<HTMLElement>("[data-node-nid]")];
    if (nodeEleList?.length) {
      if (nodeEleList[5] && nodeEleList[3]) {
        const source = nodeEleList[5].getBoundingClientRect();
        const target = nodeEleList[3].getBoundingClientRect();
        const { x1, y1, x2, y2 } = getLineAnchor(source, target, { x, y });
        setLines([
          {
            uid: "x",
            x1,
            y1,
            x2,
            y2,
            color: "grey",
            label: {
              show: true,
              text: "not active active active active ",
              color: "lime",
            },
            active: {
              color: "pink",
              label: {
                show: true,
                text: "active",
              },
            },
            data: {},
          },
        ]);
      }
    } else {
      setLines(undefined);
    }
  };
  useEffect(() => {
    if (!isWrapperReSizing) {
      getLines();
    }
  }, [isWrapperReSizing]);

  return (
    <>
      <Typography.Title level={3}>FlyLine</Typography.Title>
      <Typography.Paragraph>飞线组件</Typography.Paragraph>

      <Divider />

      <Card>
        <div
          style={{ position: "relative", width: 800, height: 800, border: "1px dashed #eee", boxSizing: "content-box" }}
        >
          <FlyLine
            config={{
              showAuxiliaryLine: true,
              arcHeight: 20,
              label: { show: true },
              active: { label: { show: true } },
            }}
            lines={lines}
            highlightLines={["[w,h/2]"]}
          />
        </div>
      </Card>

      <Divider />

      <Card title="自适应">
        <Form.Item label="width">
          <Slider value={size} min={0} max={100} onChange={(s) => setSize(s)} />
        </Form.Item>

        <div
          style={{
            position: "relative",
            width: size + "%",
            border: "1px dashed #eee",
            boxSizing: "content-box",
          }}
          ref={wrapper}
        >
          <div
            className={css`
              display: flex;
              height: 100%;
              flex-wrap: wrap;
              justify-content: space-around;
              align-items: center;
              gap: 100px;
            `}
          >
            {Array.from({ length: 9 }).map((_, index) => (
              <span
                key={index}
                data-node-nid={index}
                className={css`
                  display: block;
                  width: 100px;
                  height: 100px;
                  border: 1px darkblue dashed;
                  text-align: center;
                  line-height: 100px;
                `}
              >
                {index + 1}
              </span>
            ))}
          </div>
          {!isWrapperReSizing && dynamicLines && <FlyLine lines={dynamicLines} />}
        </div>
      </Card>

      <Divider />
    </>
  );
}
