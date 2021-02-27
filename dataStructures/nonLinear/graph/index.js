const Queue = require('../../linear/queue');
const Stack = require('../../linear/stack');

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

  initVisitedData() {
    this.#vertices.forEach(node => node.visited = false);
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

  DFSByStack(v, callback) {
    const stack = new Stack();
    const startNode = this.#vertices.get(v);
    startNode.visited = true;
    stack.push(startNode);

    while (!stack.isEmpty) {
      const currentNode = stack.pop();
      const adjacentList = currentNode.getAdjacent();
      adjacentList.forEach((a) => {
        const adjacentNode = this.#vertices.get(a);
        if (!adjacentNode.visited) {
          adjacentNode.visited = true;
          stack.push(adjacentNode);
        }
      });

      if (callback && typeof callback === 'function') {
        callback(currentNode);
      }
    }
  }

  getVertex(v) {
    return this.#vertices.get(v);
  }

  DFSByRecursion(node, callback) {
    if (!node) return null;

    node.visited = true;
    if (callback && typeof callback === 'function') {
      callback(node);
    }

    const adjacentList = node.getAdjacent();
    adjacentList.forEach((a) => {
      const adjacentNode = this.#vertices.get(a);
      if (!adjacentNode.visited) {
        this.DFSByRecursion(adjacentNode, callback);
      }
    });
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
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

graph.printGraphInfo();
graph.BFSByQueue('A', ({ data }) => console.log(data));

console.log('-----------');
graph.initVisitedData();
graph.DFSByStack('A', ({ data }) => console.log(data));

console.log('-----------');
graph.initVisitedData();
graph.DFSByRecursion(graph.getVertex('A'), ({ data }) => console.log(data));
