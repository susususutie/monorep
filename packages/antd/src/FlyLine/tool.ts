import letterAspectRatio from "./letterAspectRatio";

export function debounce(
  /** 需要转成防抖动函数的函数 */
  fn: (...params: any[]) => void,
  options: {
    /** 延迟时间（毫秒数） */
    delay?: number;
    /** 是否执行第一次 */
    runFirstFn?: boolean;
    onStartDebounce?: () => void;
  }
): (...params: any[]) => void {
  let timer: number;

  const { delay = 300, onStartDebounce } = options || {};
  let { runFirstFn = true } = options || {};

  return (...rest) => {
    // 清除定时器
    clearTimeout(timer);
    if (runFirstFn) {
      fn(...rest);
      runFirstFn = false;
      return;
    }

    // 设置定时器
    onStartDebounce && onStartDebounce();
    timer = setTimeout(() => fn(...rest), delay);
  };
}

export function observerDomResize(dom: HTMLElement, callback: () => void) {
  const MutationObserver =
    window.MutationObserver || (window as any).WebKitMutationObserver || (window as any).MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true,
  });

  return observer;
}

/**
 * 计算单个字符宽度
 * @param letter 单个字符(英文)
 * @param fontSize 字体大小
 * ref: https://github.com/antvis/G6/blob/4.7.5/packages/core/src/util/graphic.ts#L355
 */
export function getLetterWidth(letter: string, fontSize: number) {
  return fontSize * (letterAspectRatio[letter as keyof typeof letterAspectRatio] || 1);
}

/**
 * 计算文本宽度
 * @param text the text
 * @param fontSize
 * ref: https://github.com/antvis/G6/blob/4.7.5/packages/core/src/util/graphic.ts#L365
 */
export function getTextSize(text: string, fontSize: number) {
  let width = 0;
  const pattern = new RegExp("[\u{4E00}-\u{9FA5}]+");
  text.split("").forEach((letter) => {
    if (pattern.test(letter)) {
      // 中文字符
      width += fontSize;
    } else {
      width += getLetterWidth(letter, fontSize);
    }
  });
  return width;
}

/**
 * ellipsis text
 * 1. 实际宽度不大于最大宽度, 正常展示, 不省略
 * 2. 实际宽度大于最大宽度, 显示省略号
 *    从最后一个字符开始削减, 直到宽度不大于允许宽度(最大宽度 - 省略号宽度)
 * ref: https://github.com/antvis/G6/issues/1744
 */
export function fittingString(str: string, maxWidth: number, fontSize: number) {
  const originWidth = getTextSize(str, fontSize);
  if (originWidth <= maxWidth) {
    return { text: str, width: originWidth, ellipsis: false };
  }

  const ellipsis = "...";
  const ellipsisWidth = getTextSize(ellipsis, fontSize);
  if (ellipsisWidth > maxWidth) {
    return { text: ellipsis, width: ellipsisWidth, ellipsis: true };
  }

  let strWidth = originWidth;
  let resultStr = str;
  const pattern = new RegExp("[\u4E00-\u9FA5]+");
  const letters = str.split("");
  for (let charIndex = letters.length - 1; strWidth > maxWidth - ellipsisWidth; charIndex--) {
    const letter = letters[charIndex];
    const letterWidth = pattern.test(letter) ? fontSize : getLetterWidth(letter, fontSize);
    strWidth = strWidth - letterWidth;
    resultStr = resultStr.slice(0, resultStr.length - 1);
  }
  return { text: resultStr + ellipsis, width: strWidth + ellipsisWidth, ellipsis: true };
}

/** 根据起止dom计算飞线的最佳起止坐标 */
export function getLineAnchor(
  /** 起始dom */
  source: { x: number; y: number; width: number; height: number },
  /** 终止dom */
  target: { x: number; y: number; width: number; height: number },
  /** 相对位置参考dom */
  reactive: { x: number; y: number }
) {
  const { x, y } = reactive;
  let x1, x2, y1, y2;
  /**
   * 1. 水平方向(误差10px以内)
   *
   * [source] → [target]
   * [target] ← [source]
   */
  if (Math.abs(source.y - target.y) <= 10) {
    y1 = source.y - y + source.height / 2;
    y2 = target.y - y + target.height / 2;
    if (source.x < target.x) {
      x1 = source.x - x + source.width;
      x2 = target.x - x;
    } else {
      x1 = source.x - x;
      x2 = target.x - x + target.width;
    }
  } else if (Math.abs(source.x - target.x) <= 10) {
    /**
     * 2. 垂直方向
     *
     * [source]     |     [target]
     *    ↓        |        ↑
     * [target]     |     [source]
     */
    x1 = source.x - x + source.width / 2;
    x2 = target.x - x + target.width / 2;
    if (source.y < target.y) {
      y1 = source.y - y + source.height;
      y2 = target.y - y;
    } else {
      y1 = source.y - y;
      y2 = target.y - y + target.height;
    }
  } else {
    /**
     * 3.
     *
     *     ↱ [target]     |     [target] ↰
     * [source]            |             [source]
     *                     |
     * [source]            |             [source]
     *     ↳ [target]     |     [target] ↲
     */
    if (target.y > source.y) {
      y1 = source.y - y + source.height;
      y2 = target.y - y + target.height / 2;
    } else {
      y1 = source.y - y;
      y2 = target.y - y + target.height / 2;
    }

    x1 = source.x - x + source.width / 2;
    if (source.x > target.x) {
      x2 = target.x - x + target.width;
    } else {
      x2 = target.x - x;
    }
  }
  return { x1, y1, x2, y2 };
}
