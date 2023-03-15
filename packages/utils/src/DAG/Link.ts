class Node<MyNode extends { id: string }> {
  value: MyNode;
  prevs: Node<MyNode>[] = [];
  nexts: Node<MyNode>[] = [];

  constructor(node: MyNode, nexts?: MyNode[], prevs?: MyNode[]) {
    this.value = node;
    if (nexts) {
      this.nexts = nexts.map((item) => new Node(item));
    }
    if (prevs) {
      this.prevs = prevs.map((item) => new Node(item));
    }
  }

  #addPointer(type: "prevs" | "nexts", value: Node<MyNode>) {
    this[type] = this[type] || [];
    if (value && !this[type].includes(value)) {
      this[type].push(value);
    }
  }

  addPrev(prev: Node<MyNode>) {
    this.#addPointer("prevs", prev);
  }

  addNext(next: Node<MyNode>) {
    this.#addPointer("nexts", next);
  }
}

enum LinkColors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2,
}
export class Link<
  N extends { id: string },
  E extends { source: string; target: string }
> {
  nodes = new Map<string, Node<N>>();
  start?: Node<N>;
  end?: Node<N>;
  router: number = 0;

  constructor(options: { nodes: N[]; edges: E[] }) {
    if (options && options.nodes && options.edges) {
      this.parseFromX6(options.nodes, options.edges);
    }
  }

  parseFromX6(nodes: N[], edges: E[]) {
    this.nodes = new Map<string, Node<N>>();
    this.start = undefined;
    this.end = undefined;

    const inZeroNodes = new Set<Node<N>>(); // 入度为0的节点
    const outZeroNodes = new Set<Node<N>>(); // 出度为0的节点

    for (let index = 0; index < nodes.length; index++) {
      const node = new Node<N>(nodes[index]);
      this.nodes.set(node.value.id, node);

      inZeroNodes.add(node);
      outZeroNodes.add(node);
    }

    for (let index = 0; index < edges.length; index++) {
      const { source, target } = edges[index];
      const sourceNode = this.nodes.get(source);
      const targetNode = this.nodes.get(target);
      if (sourceNode && targetNode) {
        sourceNode.addNext(targetNode);
        targetNode.addPrev(sourceNode);

        inZeroNodes.delete(targetNode);
        outZeroNodes.delete(sourceNode);
      }
    }

    this.start = [...inZeroNodes][0];
    this.end = [...outZeroNodes][0];
  }

  layout() {
    // 每一个节点的最大深度, 即col
    const nodeDeepMap = this.getDeepMap();

    // 每个深度有多少个节点, 即 row
    // const deepNodeMap = new Map();
    // [...this.nodes.values()].forEach((node) => {
    //   const deep = nodeDeepMap.get(node);
    //   if (!deepNodeMap.has(deep)) {
    //     deepNodeMap.set(deep, []);
    //   }
    //   deepNodeMap.get(deep).push(node);
    // });

    this.DFS();
    console.log(this.router);
  }

  /**
   *
   */
  getDeepMap(): WeakMap<Node<N>, number> | undefined {
    if (!this.start) return;

    const deepMap = new WeakMap<Node<N>, number>();

    let index = 0;
    let currentDeepNodes = [this.start];

    while (currentDeepNodes.length) {
      const nextDeepNodes: Node<N>[] = [];
      currentDeepNodes.forEach((current) => {
        deepMap.set(current, Math.max(index, deepMap.get(current) || 0));
        if (current.nexts) {
          nextDeepNodes.push(...current.nexts);
        }
      });

      index += 1;
      currentDeepNodes = nextDeepNodes;
    }

    return deepMap;
  }

  // deepFirstSearch
  DFS(callback?: (node: Node<N>) => void, startFrom = this.start) {
    if (!startFrom) return;

    let list: Node<N>[] = [];

    if (this.nodes) {
      let stack: Node<N>[] = [];
      stack.push(startFrom);

      while (stack.length !== 0) {
        const node = stack.pop();
        if (!node) {
          continue;
        }

        list.push(node);
        typeof callback === "function" && callback(node);

        const children = node.nexts;
        if (children) {
          for (let index = children.length - 1; index >= 0; index--) {
            const nextNode = children[index];
            if (nextNode === this.end) {
              // touch end
              this.router = (this.router || 0) + 1;
            }
            if (!list.includes(nextNode)) {
              stack.push(nextNode);
            }
          }
        }
      }
    }

    return list;
  }

  static Colors = {
    WHITE: LinkColors.WHITE,
    GREY: LinkColors.GREY,
    BLACK: LinkColors.BLACK,
  };

  initializeColor() {
    const color = new WeakMap<Node<N>, LinkColors>();
    [...this.nodes.values()].forEach((v) => color.set(v, Link.Colors.WHITE));
    return color;
  }

  BFS(callback?: (node: Node<N>) => void, startVertex = this.start) {
    const stateMap = this.initializeColor();
    let queue = [];

    queue.push(startVertex);

    while (queue.length !== 0) {
      let node = queue.shift();
      if (!node) {
        continue;
      }

      node.nexts.forEach((n) => {
        if (stateMap.get(n) === Link.Colors.WHITE) {
          stateMap.set(n, Link.Colors.GREY);
          queue.push(n);
        }
      });

      stateMap.set(node, Link.Colors.BLACK);
      if (callback) callback(node);
    }
  }

  // 最长路径
  longestPath() {
    const size = this.nodes.size;
    // Start A  B  C  D  End
    // [
    //   [0, 0, 0, 0, 0, 0], // Start
    //   [0, 0, 0, 0, 0, 0], // A
    //   [0, 0, 0, 0, 0, 0], // B
    //   [0, 0, 0, 0, 0, 0], // C
    //   [0, 0, 0, 0, 0, 0], // D
    //   [0, 0, 0, 0, 0, 0], // End
    // ]

    const matrix = Array.from<undefined, number[]>({ length: size }, () =>
      new Array(size).fill(0)
    );

    for (let index = 0; index < matrix.length; index++) {
      const row = matrix[index];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
      }
    }
    console.log(matrix);
  }
}
