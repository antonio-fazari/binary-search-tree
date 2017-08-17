// NPM Dependencies
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

// Local Dependencies
const BinarySearchTree = require('../src/binary-search-tree');
const TreeNode = require('../src/tree-node');

describe('Binary Search Tree', function() {
	let sandbox, binarySearchTree;

	before(() => {
		sandbox = sinon.sandbox.create();
	});

    beforeEach(() => {
        binarySearchTree = new BinarySearchTree(5);
    });

	afterEach(() => {
		sandbox.restore();
	});

    describe('constructor()', () => {
      it('should create an instance of BST', () => {
        expect(binarySearchTree).to.be.an.instanceOf(BinarySearchTree);
      });

      it('should throw an error when value param is missing', () => {
        const instanceFunction = () => new BinarySearchTree();

        expect(instanceFunction).to.throw(/The `value` param is required/);
      });
    });

    describe('insert()', () => {
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

	describe('contains()', () => {
		beforeEach(() => {
			binarySearchTree.insert(4);
			binarySearchTree.insert(3);
			binarySearchTree.insert(7);
		});

		describe('when the value exists in the tree', () => {
			it('should return the current node when the value parameter is equal to the current node value', () => {
				const treeNode = binarySearchTree.contains(4);

				expect(treeNode).to.exist;
                expect(treeNode.value).to.equal(4);
			});

            it('should traverse the tree to find a left node', () => {
                const treeNode = binarySearchTree.contains(3);

				expect(treeNode).to.exist;
                expect(treeNode.value).to.equal(3);
                expect(treeNode._parent).to.exist;
            });

            it('should traverse the tree to find a right node', () => {
                const treeNode = binarySearchTree.contains(7);

				expect(treeNode).to.exist;
                expect(treeNode.value).to.equal(7);
                expect(treeNode._parent).to.exist;
            });
		});

        describe('when the value does not exist in the tree', () => {
            it('should return a false boolean and not the current node', () => {
                const treeNode = binarySearchTree.contains(10);

                expect(treeNode).to.be.false;
            });
        });
	});

    describe('delete()', () => {
        beforeEach(() => {
            binarySearchTree.insert(4);
			binarySearchTree.insert(3);
			binarySearchTree.insert(7);
        });

        describe('when the node does not exist in the tree', () => {
            it('should return a false boolean', () => {
                const wasDeleted = binarySearchTree.delete(8);

                expect(wasDeleted).to.be.false;
            });
        });

        describe('when the node exists in the tree', () => {
            it('should remove the node from the tree', () => {
                const wasDeleted = binarySearchTree.delete(7);

                expect(wasDeleted).to.be.true;
                expect(binarySearchTree._root._right).to.not.exist;
            });
        });
    });

    describe('depthFirstSearch()', () => {
        let callbackStub;

        beforeEach(() => {
            callbackStub = sandbox.stub();
            binarySearchTree.insert(4);
			binarySearchTree.insert(3);
			binarySearchTree.insert(7);
            binarySearchTree.depthFirstSearch(callbackStub);
        });

        describe('when traversing through each tree node', () => {
            it('should call the passed callback on every node', () => {
                expect(callbackStub.callCount).to.be.equal(4);
            });
        })
    });
})
