import { css } from "@emotion/css";
import { Button } from "antd";
import { Fragment, memo, useContext, useState } from "react";
import { GetNodeDataContext } from "./context";

export default function Group<UidType extends string | number = number>({
  align,
  items,
  renderItem,
  padding,
}: {
  align: "left" | "center";
  items: UidType[][];
  renderItem: (config: { uid: UidType; row: number; col: number; rows: number; cols: number }) => React.ReactNode;
  padding?: number[];
}) {
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
              <Fragment key={node}>
                {renderItem({ uid: node, row: items.length, col: index, rows: items.length, cols: listIndex })}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
