import Tree from './tree';

export function performFirstCheck(input) {
  const tree = parseInput(input);
  return tree.sumMetadata();
}

export function performSecondCheck(input) {
  const tree = parseInput(input);
  return tree.getRootNodeValue();
}

/*
Rules:

The input is an array of numbers representing a tree.
The tree is made up of nodes; a single, outermost node forms the tree's root,
and it contains all other nodes in the tree (or contains nodes that contain nodes, and so on).

A node consists of:

- A header, which is always exactly two numbers:
  - The quantity of child nodes.
  - The quantity of metadata entries.
- Zero or more child nodes (as specified in the header).
- One or more metadata entries (as specified in the header).
*/

function parseInput(input) {
  input = input.map(string => parseInt(string, 10));
  return new Tree(input);
}
