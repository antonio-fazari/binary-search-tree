// Local Dependencies
const BinarySearchTree = require('./src/binary-search-tree');

// Create a binary search tree with an initial tree node with value of 5.
let binarySearchTree = new BinarySearchTree(5);

// Insert several tree nodes.
binarySearchTree.insert(4);
binarySearchTree.insert(2);
binarySearchTree.insert(20);
binarySearchTree.insert(10);
binarySearchTree.insert(1);

// Check if the tree contains a node with the value of 20.
let node = binarySearchTree.contains(20);
console.log('=== Contains node: ', !!node + '\n');

// Check if the tree contains a node with the value of 33.
node = binarySearchTree.contains(33);
console.log('=== Doesn\'t contain node: ', node + '\n');

// Search all nodes in tree and build array.
const searchedNodes = [];
binarySearchTree.depthFirstSearch((value) => {
	searchedNodes.push(value);
});
console.log('=== Deef first search nodes: ', searchedNodes + '\n');

// Delete root node and show result.
binarySearchTree.delete(5);
console.log('=== Binary tree after delete: ', binarySearchTree);
