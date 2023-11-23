import { css } from "@emotion/css";
import { useHover } from "ahooks";
import { Popover } from "antd";
import { useRef } from "react";

const imgGreen =
  "data:image/png;base64,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";
const imgRed =
  "data:image/png;base64,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";

export function NodeItem({
  uid,
  data,
  row,
  col,
  rowSize,
  colSize,
  onClick,
  isActive,
}: {
  uid: string;
  data: NodeData;
  row: number;
  col: number;
  rowSize: number;
  colSize: number;
  onClick?: (uid?: string) => void;
  isActive?: boolean;
}) {
  const nodeRef = useRef(null);
  const isHover = useHover(nodeRef);

  return (
    <span>
      <Popover content={"点击查看详情"} placement="bottomLeft" arrow={false}>
        <span
          ref={nodeRef}
          data-node-nid={uid}
          onClick={() => {
            onClick?.(uid);
          }}
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 8px;
            width: 48px;
            height: 48px;
            background: #ffffff;
            border: 1px solid #e6e9f0;
            border-radius: 2px;
            box-shadow: 0px 2px 4px 0px rgba(56, 65, 92, 0.08);
          `}
          style={{ borderColor: isHover || isActive ? "#17BA4F" : "#e6e9f0" }}
        >
          <img width={30} height={30} src={[imgGreen, imgRed][data.status] || imgRed} />
        </span>
      </Popover>
      <span
        className={css`
          display: block;
          margin-top: 8px;
          padding-left: 2px;
          padding-right: 2px;
          width: 64px;
          height: 40px;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #38415c;
          line-height: 20px;
          overflow: hidden;
          word-break: break-all;
        `}
      >
        {data?.name}
        {/* {`${row}/${rowSize}X${col}/${colSize}`} */}
      </span>
    </span>
  );
}

export type NodeData = {
  id: number;
  name: string;
  type: string;
  status: 0 | 1 | 2 | 3;
  unique_key: string;
  asset_id: number;
  asset_type: "db" | "app" | "middleware" | "net" | "general" | "file" | "system_cdp_client" | "asset_third_party";
  data_center_id: number;
};
