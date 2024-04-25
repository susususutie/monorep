import { cx, css, keyframes } from "@emotion/css";
import { CSSProperties } from "react";
import { theme } from "antd";
import point from "./point.svg";
import Group from "./Group";

export type ArrowDirection = "left" | "right";
export type ArrowColor =
  | "primary"
  | "default"
  | "success"
  | "warning"
  | "error"
  | "disabled";
export type ArrowProps = {
  animation?: boolean;
  direction?: ArrowDirection;
  className?: string;
  color?: ArrowColor;
};

const animationName = keyframes`
from {
  background-position: 0px center;
}
to {
  background-position: 99px center;
}`;

function ArrowComp(props: ArrowProps) {
  const {
    direction = "right",
    animation,
    color = "default",
    className,
  } = props;

  const cls = useStyle({ color, direction });

  return (
    <span className={cx(cls.wrap, className)}>
      <span className={cls.shaft}>
        {animation ? <span className={cls.ani} /> : null}
      </span>
      <span className={cls.arrow} />
    </span>
  );
}

function useStyle({
  color,
  direction,
}: {
  color: ArrowColor;
  direction: ArrowDirection;
}) {
  const { token } = theme.useToken();
  const COLOR_MAP: Record<ArrowColor, CSSProperties["color"]> = {
    primary: token.colorPrimary,
    default: "#e6e9f0", // ?
    success: token.colorSuccess,
    warning: token.colorWarning,
    error: token.colorError,
    disabled: token.colorTextDisabled,
  };

  const wrap = css`
    position: relative;
    display: inline-flex;
    height: 8px;
    align-items: center;
    flex-direction: ${direction === "right" ? "row" : "row-reverse"};
  `;
  const shaft = css`
    position: relative;
    flex: 1;
    display: block;
    width: 80px;
    height: 1px;
    background-color: ${COLOR_MAP[color]};
  `;
  const ani = css`
    background-image: url('${point}');
    background-repeat: repeat-x;
    width: 100%;
    height: 4px;
    position: absolute;
    left: 0;
    top: -1.5px;
    background-size: auto 4px;
    background-position: 0px center;
    animation: ${animationName} 3s linear infinite;
    transform: rotateY(${direction === "right" ? 0 : 180}deg);
  `;
  const arrow = css`
flex-shrink: 0;
display: inline-block;
width: 0;
height: 0;
border-bottom: 4px solid transparent;
border-top: 4px solid transparent;
border-${direction === "right" ? "right" : "left"}-width: 0px;
border-${direction === "right" ? "left" : "right"}-width: 12px;
border-${direction === "right" ? "left" : "right"}-color: ${COLOR_MAP[color]};
border-style: solid;
`;

  return { wrap, shaft, arrow, ani };
}

const Arrow = ArrowComp as typeof ArrowComp & {
  Group: typeof Group;
  __ARROW__: boolean;
};
Arrow.__ARROW__ = true;
Arrow.Group = Group;

export default Arrow;
