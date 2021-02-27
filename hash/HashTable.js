const LinkedList = require('../list/linkedList');

const TABLE_SIZE = 3;

class HashTable {
  #table = new Array(TABLE_SIZE);

  getIndex(hashCode) {
    return hashCode % TABLE_SIZE;
  }

  getHashCode(value) {
    let hash = 5381;
    for (let i = 0; i< value.length; i++) {
      hash = hash * 33 + value.charCodeAt(i);
    }

    return hash % 1013;
  }

  getHashIndex(key) {
    const hashCode = this.getHashCode(key);
    return this.getIndex(hashCode);
  }

  has(key) {
    const hashIndex = this.getHashIndex(key);
    const linkedList = this.#table[hashIndex];
    return linkedList && !linkedList.isEmpty;
  }

  set(key, value) {
    const hashIndex = this.getHashIndex(key);
    if (!this.#table[hashIndex]) {
      const linkedList = new LinkedList();
      linkedList.append(key, value);
      this.#table[hashIndex] = linkedList;
      return linkedList;
    }

    const linkedList = this.#table[hashIndex];
    linkedList.append(key, value);
    return linkedList;
  }

  get(key) {
    const hashIndex = this.getHashIndex(key);
    const linkedList = this.#table[hashIndex];
    if (linkedList) {
      return linkedList.getByKey(key);
    }
    return linkedList;
  }

  delete(key) {
    const hashIndex = this.getHashIndex(key);
    const linkedList =  this.#table[hashIndex];
    if (linkedList) {
      linkedList.remove(key);
    }
  }

  clear() {
    this.#table = new Array(TABLE_SIZE);
  }

  print() {
    this.#table.forEach((linkedList, index) => {
      console.log('index', index);
      if (linkedList) {
        linkedList.print();
      }
    });
  }
}

// Examples
const hashTable = new HashTable();
hashTable.set('eloy', 'developer');
hashTable.set('hanee', 'designer');
hashTable.set('peter', 'designer');
hashTable.set('ted', 'developer');
hashTable.print();

console.log('ted: ', hashTable.get('ted'));
hashTable.delete('ted');
hashTable.delete('peter');
hashTable.print();

console.log('has peter?: ', hashTable.has('peter'));

