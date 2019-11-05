class Circle {

  constructor() {
    this.currentNode = null;
  }

  isFirst() {
    return this.currentNode === null;
  }

  add(value) {
    if (this.isFirst()) {
      return this.addFirst(value);
    } else if (value % 23 === 0) {
      return this.scoringMove(value);
    } else {
      const node = new Node(value);
      const currentPlusOne = this.currentNode.next;
      const currentPlusTwo = currentPlusOne.next;
      node.previous = currentPlusOne;
      node.next = currentPlusTwo;
      currentPlusOne.next = node;
      currentPlusTwo.previous = node;
      this.currentNode = node;
      return 0;
    }
  }

  addFirst(value) {
    const node = new Node(value);
    node.previous = node;
    node.next = node;
    this.currentNode = node;
    return 0;
  }

  scoringMove(value) {
    let cursor = this.currentNode;
    for (let i = 0; i < 7; i++) {
      cursor = cursor.previous;
    }
    const previousNode = cursor.previous;
    const nextNode = cursor.next;
    cursor.clear();
    previousNode.next = nextNode;
    nextNode.previous = previousNode;
    this.currentNode = nextNode;
    return cursor.value + value;
  }

}

class Node {
  constructor(value) {
    this.value = value;
  }

  setPrevious(node) {
    this.previous = node;
  }

  setNext(node) {
    this.next = node;
  }

  clear() {
    this.previous = null;
    this.next = null;
  }
}

export default Circle;
