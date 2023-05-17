/** 展开类型 */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/** 递归展开类型 */
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

/** 剔除联合类型中的 undefined 与 null */
export type ExcludeNil<T> = Exclude<T, undefined | null>;

/** 判断是否为 never 类型 */
export type IsNever<T> = [T] extends [never] ? true : false;

/** 判断两个类型是否相同 */
export type IsSameType<TA, TB> = TA extends TB
  ? TB extends TA
    ? true
    : false
  : false;

/** 判断是否为 number 字面量类型 */
export type isLiteralNumber<N> = IsNever<N> extends true
  ? false
  : IsSameType<number, N> extends true
  ? false
  : true;
