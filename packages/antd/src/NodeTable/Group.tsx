import { css } from "@emotion/css";
import { Button } from "antd";
import { memo, useContext, useState } from "react";
import { GetNodeDataContext } from "./context";

function sliceArray(arr: any[], size = 3) {
  const result = [];
  for (let i = 0; i < arr.length; i = i + size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function Group({
  align,
  items,
  padding,
}: {
  align: "left" | "center";
  items?: number[][];
  padding?: number[];
}) {
  if (!items?.length) return;

  return (
    <div
      className={css`
        height: 100%;
      `}
    >
      {/* <div
        className={css`
          padding: 8px;
          display: flex;
          justify-content: center;
        `}
      >
        <Button.Group>
          <Button onClick={() => setCount(Math.max(count - 1, 0))}>-</Button>
          <Button>
            类型{row + 1},中心{col + 1};节点:{count}
          </Button>
          <Button onClick={() => setCount(Math.min(count + 1, 99))}>+</Button>
        </Button.Group>
      </div> */}

      <div
        className={css`
          width: 100%;
          height: 100%;
          padding-bottom: 12px;
        `}
      >
        {items.map((list, listIndex) => (
          <div
            key={listIndex}
            className={
              list.length === 3
                ? css`
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-around;
                    align-items: flex-start;
                  `
                : css`
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    align-items: flex-start;
                    ::after {
                      content: "";
                      flex-grow: 1;
                    }
                  `
            }
            style={{ paddingTop: 24 + (padding?.[listIndex] || 0) }}
          >
            {list.map((node, index) => (
              <Item key={node} uid={node} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function InternalItem({ uid }: { uid: number }) {
  const getNodeData = useContext(GetNodeDataContext);
  if (uid === 1) {
    console.log("update node", getNodeData(uid));
  }

  return (
    <span>
      <span
        className={css`
          display: block;
          margin: 0 8px;
          width: 48px;
          height: 48px;
          background: #ffffff;
          border: 1px solid #e6e9f0;
          border-radius: 2px;
          box-shadow: 0px 2px 4px 0px rgba(56, 65, 92, 0.08);
        `}
      />
      <span
        className={css`
          display: block;
          margin-top: 8px;
          width: 64px;
          height: 40px;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #38415c;
          line-height: 20px;
          overflow: hidden;
        `}
      >
        {getNodeData(uid).name}
      </span>
    </span>
  );
}
const Item = memo(InternalItem);
