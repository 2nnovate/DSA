class Queue {
  #items = [];

  enqueue(elements) {
    this.#items.push(elements);
  }

  dequeue() {
    return this.#items.shift();
  }

  front() {
    return this.#items[0];
  }

  clear() {
    this.#items = [];
  }

  print() {
    console.log(this.#items.join(', '));
  }

  get size() {
    return this.#items.length;
  }

  get isEmpty() {
    return this.size === 0;
  }
}

module.exports = Queue;

// Examples
const queue = new Queue();
queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
queue.enqueue('D');
queue.print();

const removedItem = queue.dequeue();
console.log('removedItem', removedItem);
console.log('(after remove) size', queue.size);
console.log('(after remove) isEmpty', queue.isEmpty);

const firstItem = queue.front();
console.log('firstItem', firstItem);

queue.clear();
console.log('(after clear) size', queue.size);
console.log('(after clear) isEmpty', queue.isEmpty);
