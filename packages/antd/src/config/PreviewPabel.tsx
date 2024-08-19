import React from "react";
import CodeBox, { type CodeBoxProps } from "./CodeBox";

type PreviewPabelProps = {
  items: (CodeBoxProps & { key: React.Key })[];
};

export default function PreviewPabel(props: PreviewPabelProps) {
  const { items } = props;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <section style={{ flex: "1 1 0" }}>
        {items
          .filter((_, i) => i % 2 === 0)
          .map((item) => (
            <CodeBox {...item} key={item.key} />
          ))}
      </section>
      <section style={{ flex: "1 1 0" }}>
        {items
          .filter((_, i) => i % 2 === 1)
          .map((item) => (
            <CodeBox {...item} key={item.key} />
          ))}
      </section>
    </div>
  );
}
