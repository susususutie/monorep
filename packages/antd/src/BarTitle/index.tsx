import { css } from "@emotion/css";
import { Typography, theme } from "antd";
import { BaseType } from "antd/es/typography/Base";
import { TitleProps } from "antd/es/typography/Title";

export type BarTitleProps = TitleProps & { color?: string };

export default function BarTitle(props: BarTitleProps) {
  const { color, className, ...restProps } = props;
  const { token } = theme.useToken();

  const typeColorMap: Record<BaseType, string> = {
    warning: token.colorWarning,
    danger: token.colorError,
    secondary: token.colorTextDescription,
    success: token.colorSuccess,
  };
  const iColor = restProps.type ? typeColorMap[restProps.type] : color ?? token.colorPrimary;

  return (
    <Typography.Title
      {...restProps}
      className={`${css`
        &::before {
          display: inline-block;
          position: relative;
          top: 1.5px;
          margin-right: 4px;
          content: "|";
          color: transparent;
          line-height: 90%;
          width: 4px;
          background-color: ${iColor};
          border-radius: 2px;
        }
      `}${className ? " " + className : ""}`}
    />
  );
}
