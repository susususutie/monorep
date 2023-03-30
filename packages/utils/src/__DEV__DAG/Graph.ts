type BaseVertice = { name: string; id: string };

class Graph<Vertice extends BaseVertice = BaseVertice> {
  // 用来存放图中的顶点
  vertices: Vertice[] = [];
  // 邻接表, 用来存放图中的边
  adjList: WeakMap<Vertice, Vertice[]> = new WeakMap();

  // 向图中添加一个新顶点
  addVertex(v: Vertice): void {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }
  // 获取图的顶点
  getVertices(): Vertice[] {
    return this.vertices;
  }

  // 向图中添加a和b两个顶点之间的边
  addEdge(a: Vertice, b: Vertice): void {
    // 如果图中没有顶点a，先添加顶点a
    if (!this.adjList.has(a)) {
      this.addVertex(a);
    }
    // 如果图中没有顶点b，先添加顶点b
    if (!this.adjList.has(b)) {
      this.addVertex(b);
    }

    this.adjList.get(a)!.push(b); // 在顶点a中添加指向顶点b的边
    this.adjList.get(b)!.push(a); // 在顶点b中添加指向顶点a的边
  }

  // 获取图中的边
  getAdjList(): WeakMap<Vertice, Vertice[]> {
    return this.adjList;
  }

  toString() {
    let s = "";
    this.vertices.forEach((v) => {
      s += `${v.name} -> `;
      this.adjList.get(v)!.forEach((n) => {
        s += `${n.name} `;
      });
      s += "\n";
    });
    return s;
  }

  static Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2,
  };

  initializeColor() {
    let color = new WeakMap();
    this.getVertices().forEach((v) => color.set(v, Graph.Colors.WHITE));
    return color;
  }

  // breadthFirstSearch 广度优先搜索
  BFS(callback: (v: Vertice) => void, startVertex?: Vertice): void {
    if (typeof startVertex === "undefined") {
      startVertex = this.getVertices()[0];
    }

    let adjList = this.getAdjList();
    let color = this.initializeColor();
    let queue: Vertice[] = [];

    queue.push(startVertex);

    while (queue.length) {
      let u = queue.shift();
      if (u) {
        adjList.get(u)!.forEach((n) => {
          if (color.get(n) === Graph.Colors.WHITE) {
            color.set(n, Graph.Colors.GREY);
            queue.push(n);
          }
        });
        color.set(u, Graph.Colors.BLACK);
        if (callback) callback(u);
      }
    }
  }
}

// -----------------
// let graph = new Graph();
// let myVertices = [
//   { name: "A", id: "A" },
//   { name: "B", id: "B" },
//   { name: "C", id: "C" },
//   { name: "D", id: "D" },
//   { name: "E", id: "E" },
//   { name: "F", id: "F" },
//   { name: "G", id: "G" },
//   { name: "H", id: "H" },
//   { name: "I", id: "I" },
// ];
// myVertices.forEach((v) => {
//   graph.addVertex(v);
// });
// graph.addEdge(myVertices[0], myVertices[1]);
// graph.addEdge(myVertices[0], myVertices[2]);
// graph.addEdge(myVertices[0], myVertices[3]);
// graph.addEdge(myVertices[2], myVertices[3]);
// graph.addEdge(myVertices[2], myVertices[6]);
// graph.addEdge(myVertices[3], myVertices[6]);
// graph.addEdge(myVertices[3], myVertices[7]);
// graph.addEdge(myVertices[1], myVertices[4]);
// graph.addEdge(myVertices[1], myVertices[5]);
// graph.addEdge(myVertices[4], myVertices[8]);

// console.log(graph.toString());

// graph.BFS((vertice) => console.log(vertice));
// ------------------

export default Graph;
