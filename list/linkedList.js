class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  #head = null;
  #length = 0;

  append(element) {
    const node = new Node(element);

    if (!this.#head) {
      this.#head = node;
      this.#length += 1;
      return;
    }

    let current = this.#head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
    this.#length += 1;
  }

  removeAt(position) {
    const isInvalidPosition = position < 0 && position >= this.#length;
    if (isInvalidPosition) {
      return null;
    }

    if (position === 0) {
      const removedItem = this.#head;
      this.#head = this.#head.next;
      return removedItem;
    }

    let current = this.#head;
    let previous = null;
    let index = 0;
    while(index < position) {
      previous = current;
      current = current.next;
      index += 1;
    }

    previous.next = current.next;
    this.#length -= 1;
    return current.element;
  }

  insert(position, element) {
    const isInvalidPosition = position < 0 && position >= this.#length;
    if (isInvalidPosition) {
      return false;
    }

    const node = new Node(element);
    let current = this.#head;
    let previous = null;
    let index = 0;
    while(index < position) {
      previous = current;
      current = current.next;
      index += 1;
    }

    previous.next = node;
    node.next = current;
    this.#length += 1;
    return true;
  }

  indexOf(element) {
    let current = this.#head;
    let index = 0;
    while(current) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index += 1;
    }

    return -1;
  }

  remove(element) {
    const removeTargetIndex = this.indexOf(element);
    return this.removeAt(removeTargetIndex);
  }

  get size() {
    return this.#length;
  }

  get isEmpty() {
    return this.size === 0;
  }

  getHead() {
    return this.#head;
  }

  print() {
    const elementList = [];
    let current = this.#head;
    while (current) {
      elementList.push(current.element);
      current = current.next;
    }

    console.log(`linked list: [${elementList.join('-')}]`);
  }
}

// Example
const linkedList = new LinkedList();
linkedList.append('neo');
linkedList.append('eloy');
linkedList.append('sunny');
linkedList.append('peter');
linkedList.print();

linkedList.insert(linkedList.indexOf('sunny'), 'hanee');
linkedList.print();
linkedList.removeAt(3);
linkedList.print();
linkedList.remove('hanee');
linkedList.remove('eloy');
linkedList.print();

console.log(linkedList.getHead());
console.log(linkedList.size);
console.log(linkedList.isEmpty);
