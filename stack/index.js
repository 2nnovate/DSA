class Stack {
  #items = [];

  push(elements) {
    this.#items.push(elements);
  }

  pop() {
    return this.#items.pop();
  }

  peek() {
    return this.#items[this.size - 1];
  }

  clear() {
    this.#items = [];
  }

  get size() {
    return this.#items.length;
  }

  get isEmpty() {
    return this.size === 0;
  }
}

module.exports = Stack;

// Examples
const stack = new Stack();
stack.push('A');
stack.push('B');
stack.push('C');
stack.push('D');
console.log('size', stack.size);

const removedItem = stack.pop();
console.log('removedItem', removedItem);
console.log('(after remove) size', stack.size);
console.log('(after remove) isEmpty', stack.isEmpty);

stack.clear();
console.log('(after clear) size', stack.size);
console.log('(after clear) isEmpty', stack.isEmpty);

