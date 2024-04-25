import { css } from "@emotion/css";
import { Fragment } from "react";

export default function NodeGroup<UidType extends string | number = number>({
  align,
  rowSize,
  colSize,
  items,
  renderItem,
  padding,
}: {
  align: "left" | "center";
  rowSize: number;
  colSize: number;
  items?: UidType[][];
  renderItem: (config: { uid: UidType; row: number; col: number; rowSize: number; colSize: number }) => React.ReactNode;
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
        {items?.map((list, listIndex) => (
          <div
            key={listIndex}
            className={css`
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: space-around;
              align-items: flex-start;
            `}
            style={{ paddingTop: padding?.[listIndex] || 24 }}
          >
            {list.map((node, index) => (
              <Fragment key={node}>{renderItem({ uid: node, row: listIndex, col: index, rowSize, colSize })}</Fragment>
            ))}

            {
              // [x, x, _]
              align === "left" && list.length < colSize
                ? Array(colSize - list.length)
                    .fill(null)
                    .map((_, index) => <span key={index} style={{ display: "block", width: 64 }} />)
                : null
            }
          </div>
        ))}
      </div>
    </div>
  );
}
