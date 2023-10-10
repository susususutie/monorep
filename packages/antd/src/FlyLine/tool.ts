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
