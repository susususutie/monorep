import React from "react";
import styles from "./index.module.less";

/**
 * 使用div实现的简易漏斗图，与echarts漏斗图的区别是，最下方的最小数据是矩形而非三角形
 * @param {*} props
 */
export default function SimpleFunnel(props) {
  const { data, style } = props;

  const maxValue = Math.max(...data.map((i) => i.value));
  const renderData =
    data?.length > 0
      ? data
          // .sort((a, b) => b.value - a.value)
          .map((item, index) => {
            if (item.value > 0) {
              const current = (item.value / maxValue) * 100;
              const next =
                index === data.length - 1 ? current : (data[index + 1].value / maxValue) * 100;
              // prettier-ignore
              const d = `M${50 - current / 2} 0 L${50 + current / 2} 0 L${50 + next / 2} 100 L${50 - next / 2} 100 Z`;
              return { value: item.value, name: item.name, d };
            }
            return { value: item.value, name: item.name };
          })
      : [];

  return (
    <div style={style} className={styles.wrap}>
      {renderData.map((item, index) => (
        <div key={index} className={styles.item}>
          {item.d && (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
              <path d={item.d} fill="currentColor" />
            </svg>
          )}
          <div className={styles.label}>
            {item.name}
            <br />
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
