import { Button } from "antd";
import { ButtonProps } from "antd/es/button";
import React from "react";
import icon from './react.svg'
import cls from './index.module.css'

export type MyButtonProps = ButtonProps & { children?: React.ReactNode };

export default function MyButton(props: MyButtonProps) {
  const { children = "MyButton" } = props;

  return <Button type="primary" className={cls.color}>{children} <img src={icon}></img></Button>;
}
