// NPM Dependencies
const chai = require('chai');
const { expect } = chai;

// Local Dependencies
const BinarySearchTree = require('../binary-search-tree');
const TreeNode = require('../tree-node');

describe('Binary Search Tree', function() {
    describe('constructor()', () => {
      it('should create an instance of BST', () => {
        const binarySearchTree = new BinarySearchTree(5);

        expect(binarySearchTree).to.be.an.instanceOf(BinarySearchTree);
      });

      it('should throw an error when value param is missing', () => {
        const instanceFunction = () => new BinarySearchTree();

        expect(instanceFunction).to.throw(/The `value` param is required/);
      });
    });

    describe('insert()', () => {
      let binarySearchTree;

      beforeEach(() => {
        binarySearchTree = new BinarySearchTree(5);
      });

      describe('when inserting a value less than the root value', () => {
        let leftNode;

        beforeEach(() => {
          binarySearchTree.insert(4);
          leftNode = binarySearchTree._root._left;
        });

        it('should be instance of type tree node', () => {
          expect(leftNode).to.be.an.instanceOf(TreeNode);
        });

        it('should contain the correct value', () => {
          expect(leftNode.value).to.equal(4);
        });

        it('should contain a value less than it\'s parent\'s value', () => {
          expect(leftNode.value).to.be.below(binarySearchTree._root.value);
        });

        it('should traverse the tree until it finds an undefined leaf', () => {
          binarySearchTree.insert(2);

          expect(leftNode._left).to.exist;
          expect(leftNode._left.value).to.equal(2);
        });
      });

      describe('when inserting a value greater than the root value', () => {
        let leftNode;

        beforeEach(() => {
          binarySearchTree.insert(7);
          rightNode = binarySearchTree._root._right;
        });

        it('should be instance of type tree node', () => {
          expect(rightNode).to.be.an.instanceOf(TreeNode);
        });

        it('should contain the correct value', () => {
          expect(rightNode.value).to.equal(7);
        });

        it('should contain a value greater than it\'s parent\'s value', () => {
          expect(rightNode.value).to.be.above(binarySearchTree._root.value);
        });

        it('should traverse the tree until it finds an undefined leaf', () => {
          binarySearchTree.insert(9);

          expect(rightNode._right).to.exist;
          expect(rightNode._right.value).to.equal(9);
        });
      });
    });
})
