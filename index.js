const BinarySearchTree = require('./binary-search-tree');

let binarySearchTree = new BinarySearchTree(5);
binarySearchTree.insert(4);
binarySearchTree.insert(2);
binarySearchTree.insert(20);
binarySearchTree.insert(10);
binarySearchTree.insert(1);
binarySearchTree.delete(2);
binarySearchTree.contains(20);
binarySearchTree.depthFirstSearch((value) => console.log(value));
