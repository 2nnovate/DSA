class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  #root = null;

  insert(key) {
    const node = new Node(key); // key를 가지고 Node 인스턴스 생성

    if (!this.#root) { // 루트가 비어있다면(첫 번째 insert 인 경우)
      this.#root = node; // 루트에 노드 할당하고 종료
      return;
    }

    this.#insertNode(this.#root, node); // 루트값을 기준으로 하여 추가 작업 시작
  }

  #insertNode = (node, newNode) => {
    // early return validation
    if (!node || !node.key) return;
    if (!newNode || !newNode.key) return;
    if (node.key === newNode.key) return;

    if (newNode.key < node.key) { // 추가할 노드가 기준 노드보다 왼쪽에 위치해야 하는 경우 (값이 작은 경우)
      if (!node.left) { // 기준노드에 left 가 비어있는 경우 => 할당하고 종료
        node.left = newNode;
        return;
      }
      this.#insertNode(node.left, newNode); // 기준노드에 left 가 존재하는 경우 => 추가 비교 필요, 기준노드를 변경하여 재귀호출
      return;
    }

    // 추가할 노드가 기준 노드보다 오른쪽에 위치해야 하는 경우 (값이 더 큰 경우)
    if (!node.right) { // 기준노드에 right 가 비어있는 경우 => 할당하고 종료
      node.right = newNode;
      return;
    }
    this.#insertNode(node.right, newNode); // 기준노드에 right 가 존재하는 경우 => 추가 비교 필요, 기준노드를 변경하여 재귀호출
  }

  inOderTraverse() {
    const traverseKeys = [];
    const printTraverseKeys = (key) => {
      traverseKeys.push(key);
    };

    this.#inOrderTraverseNode(this.#root, printTraverseKeys);
    console.log(traverseKeys);
  }

  #inOrderTraverseNode = (node, callback) => {
    if (!node) return;

    this.#inOrderTraverseNode(node.left, callback);
    callback(node.key);
    this.#inOrderTraverseNode(node.right, callback);
  }

  preOrderTraverse() {
    const traverseKeys = [];
    const printTraverseKeys = (key) => {
      traverseKeys.push(key);
    };

    this.#preOrderTraverseNode(this.#root, printTraverseKeys);
    console.log(traverseKeys);
  }

  #preOrderTraverseNode = (node, callback) => {
    if (!node) return;
    callback(node.key);
    this.#preOrderTraverseNode(node.left, callback);
    this.#preOrderTraverseNode(node.right, callback);
  }

  postOrderTraverse() {
    const traverseKeys = [];
    const printTraverseKeys = (key) => {
      traverseKeys.push(key);
    };

    this.#postOrderTraverseNode(this.#root, printTraverseKeys);
    console.log(traverseKeys);
  }

  #postOrderTraverseNode = (node, callback) => {
    if (!node) return;
    this.#postOrderTraverseNode(node.left, callback);
    this.#postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }

  search(key) {
    return this.#searchNode(this.#root, key);
  }

  #searchNode = (node, key) => {
    if (!node) return false;
    if (key < node.key) { // 검색 대상이 왼쪽에 위치하는 경우
      return this.#searchNode(node.left, key); // 왼쪽 서브트리에서 다시 검색한다.
    }
    if (key > node.key) { // 검색 대상이 오른쪽에 위치하는 경우
      return this.#searchNode(node.right, key); // 오른쪽 서브트리에서 다시 검색한다.
    }
    if (key === node.key) return true; // 값이 존재하면 true 반환
    return false; // 존재하지 않으면 false 반환
  }

  min() {
    const minNode = this.#minNode(this.#root);
    return minNode && minNode.key;
  }

  #minNode = (node) => {
    if (!node) return;
    while (node && node.left) { // 왼쪽에 노드가 있을때(더 작은 값이 존재) 까지 반복
      node = node.left;
    }
    return node;
  }

  max() {
    const maxNode = this.#maxNode(this.#root);
    return maxNode && maxNode.key;
  }

  #maxNode = (node) => {
    if (!node) return;
    while (node && node.right) { // 오른쪽에 노드가 있을때(더 큰 값이 존재) 까지 반복
      node = node.right;
    }
    return node;
  }

  // 노드를 리턴한다는 것은 노드를 root 로 한 서브트리를 리턴한다는 것!
  remove(key) {
    this.#root = this.#removeNode(this.#root, key);
  }

  #removeNode = (node, key) => {
    if (!node) return null;

    if (key < node.key) { // 삭제할 노드가 기준 노드보다 왼쪽에 존재하는 경우 (값이 작은 경우)
      node.left = this.#removeNode(node.left, key); // node 의 왼쪽 서브트리를 기존 서브트리에서 삭제 대상노드를 삭제한 서브트리로 재할당
      return node; // node 를 리턴 (첫 실행시 node는 root)
    }

    if (key > node.key) { // 삭제할 노드가 기준 노드보다 오른쪽에 존재하는 경우 (값이 큰 경우)
      node.right = this.#removeNode(node.right, key); // node 의 오른쪽 서브트리를 기존 서브트리에서 삭제 대상노드를 삭제한 서브트리로 재할당
      return node; // node 를 리턴 (첫 실행시 node는 root)
    }

    if (key === node.key) { // 삭제할 대상 노드를 찾은 경우
      // case1 - 삭제할 노드가 마지막 말단 노드일 경우
      if (!node.left && !node.right) return null;

      // case2 - 삭제할 노드의 자식이 1개 있을 경우
      if (!node.left && node.right) return node.right;
      if (node.left && !node.right) return node.left;

      // case3 - 삭제할 노드의 자식이 2개 있을 경우
      // 우측 서브트리의 최소값을 찾는다
      const replaceNode = this.#minNode(node.right);
      // 최소값으로 대체
      node.key = replaceNode.key;
      // 우측 서브 트리에서 최소값을 제거
      node.right = this.#removeNode(node.right, replaceNode.key);
      return node;
    }

    return node; // 삭제 대상이 없는 경우 노드를 그대로 반환
  }
}

// Examples
const test = new BinarySearchTree();
test.insert(11);
test.insert(7);
test.insert(15);
test.insert(5);
test.insert(3);
test.insert(9);
test.insert(8);
test.insert(10);
test.insert(13);
test.insert(12);
test.insert(14);
test.insert(20);
test.insert(18);
test.insert(25);
test.insert(6);

test.inOderTraverse();

console.log('min', test.min());
console.log('max', test.max());

console.log('search 1', test.search(1));
console.log('search 6', test.search(6));

test.remove(15);
test.inOderTraverse();
test.remove(111);
test.inOderTraverse();
