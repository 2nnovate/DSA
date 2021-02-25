const Queue = require('../queue');

class Node {
  constructor(data) {
    this.data = data;
    this.adjacent = new Set();
    this.visited = false;
  }

  link(linkTargetData) {
    this.adjacent.add(linkTargetData);
  }

  getAdjacent() {
    return [...this.adjacent.keys()];
  }
}

class Graph {
  #vertices = new Map();

  addVertex(data) {
    const node = new Node(data);
    this.#vertices.set(data, node);
  }

  addEdge(v, w) {
    const firstNode = this.#vertices.get(v);
    const secondNode = this.#vertices.get(w);
    firstNode.link(secondNode.data);
    secondNode.link(firstNode.data);
  }

  printGraphInfo() {
    this.#vertices.forEach((node) => {
      const { data, adjacent } = node;
      console.log(`${data}'s adjacent list: [${[...adjacent.values()].join(', ')}]`);
    });
  }

  BFSByQueue(v, callback) {
    const queue = new Queue();
    const startNode = this.#vertices.get(v);
    queue.enqueue(startNode);

    while (!queue.isEmpty) {
      const currentNode = queue.dequeue();
      const adjacentList = currentNode.getAdjacent();
      adjacentList.forEach((a) => {
        const adjacentNode = this.#vertices.get(a);
        if (!adjacentNode.visited) {
          adjacentNode.visited = true;
          queue.enqueue(adjacentNode);
        }
      });

      currentNode.visited = true;
      if (callback && typeof callback === 'function') {
        callback(currentNode);
      }
    }
  }
}

// Examples
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');
graph.addVertex('I');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('E', 'I');

graph.printGraphInfo();
graph.BFSByQueue('A', ({ data }) => console.log(data));
