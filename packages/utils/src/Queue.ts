export default class Queue<T = any> {
  #data: T[] = [];

  // 入队
  enqueue(item: T): number {
    return this.#data.push(item);
  }

  // 出队
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    } else {
      return this.#data.shift();
    }
  }

  size(): number {
    return this.#data.length;
  }

  // 查看队首元素
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    } else {
      return this.#data[0];
    }
  }

  // 查看队尾元素
  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    } else {
      return this.#data[this.#data.length - 1];
    }
  }

  // 显示所有元素
  toString(): string {
    return this.#data
      .map((item) => Object.prototype.toString.call(item))
      .join(",");
  }

  // 清空
  clear(): void {
    this.#data = [];
  }

  isEmpty(): boolean {
    return this.#data.length === 0;
  }
}
