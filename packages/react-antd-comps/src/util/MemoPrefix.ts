export default class MemoPrefix {
  private static LOCAL_STORAGE_KEY = 'antd-prefix';
  private static DEFAULT_PREFIX = 'ant';

  /**
   * getPrefix
   */
  public static getPrefix() {
    let memoPrefix;
    try {
      memoPrefix = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    } catch (error) {}
    // 只能为字母数字下划线组成的非空字符串
    if (typeof memoPrefix === 'string' && /^\w+$/.test(memoPrefix)) {
      return memoPrefix;
    }
    return this.DEFAULT_PREFIX;
  }

  /**
   * setPrefix
   */
  public static setPrefix(prefix: string) {
    try {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, prefix);
    } catch (error) {}
  }
}
