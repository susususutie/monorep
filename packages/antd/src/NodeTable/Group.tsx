import { css } from "@emotion/css";
import { Button } from "antd";
import { useContext, useState } from "react";
import NodeTableContext from "./context";

function sliceArray(arr: any[], size = 3) {
  const result = [];
  for (let i = 0; i < arr.length; i = i + size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function Group({ items, row, col }: { items: number[]; row: number; col: number }) {
  const {getNodeData} = useContext(NodeTableContext)

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
          height: calc(100% - 48px);
          padding-bottom: 12px;
        `}
      >
        {sliceArray(items).map((list, listIndex) => (
          <div
            key={listIndex}
            className={css`
              padding: 24px 24px 0;
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: space-between;
              align-items: flex-start;
              ${list.length < 3 ? `::after{width:64px;display:block;content:"";}` : ""}
            `}
            style={{ paddingTop: 24 }}
          >
            {list.map((node, index) => (
              <span key={index}>
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
                  {getNodeData(node).name}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
