import { range, add } from 'ramda';

class Tree {
  constructor(input) {
    this.root = new Node(input);
  }

  sumMetadata() {
    return this.root.sumMetadata();
  }

  getRootNodeValue() {
    return this.root.getNodeValue();
  }
}

class Node {

  constructor(input) {
    const [numberOfChildren, numberOfMetadataEntries, ...rest] = input;

    let remaining = rest;
    this.children = range(0, numberOfChildren).reduce((children) => {
      const childNode = new Node(remaining);
      remaining = childNode.getRemainingInput();
      return [...children, childNode];
    }, []);
    this.metadataEntries = remaining.slice(0, numberOfMetadataEntries);

    remaining = remaining.slice(numberOfMetadataEntries);
    this.remainingInput = remaining;
  }

  getRemainingInput() {
    return this.remainingInput;
  }

  sumMetadata() {
    const ownSum = this.getOwnMetadataSum();
    const childrenSum = this.children.reduce((result, child) => {
      return result + child.sumMetadata();
    }, 0);
    return ownSum + childrenSum;
  }

  getNodeValue() {
    if (!this.children.length) {
      return this.getOwnMetadataSum();
    } else {
      const children = this.getChildrenByMetadata();
      return children.reduce((sum, child) => {
        return sum + child.getNodeValue();
      }, 0);
    }
  }

  getOwnMetadataSum() {
    return this.metadataEntries.reduce((result, item) => result + item);
  }

  getChildrenByMetadata() {
    return this.metadataEntries
      .map(add(-1)) // metadata will be used as indices into children array; meaningful metadata indices start from 1
      .filter(entry => entry >= 0) // to make indices valid
      .reduce((nodes, entry) => {
        const child = this.children[entry];
        if (child) {
          return [...nodes, child];
        } else {
          return nodes;
        }
      }, []);
  }

}

export default Tree;
