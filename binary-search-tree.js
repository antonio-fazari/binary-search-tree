// Local Dependencies
const TreeNode = require('./tree-node');

/**
 * Binary Search Tree
 * @class
 */
class BinarySearchTree {
  /**
   * Class constructor
   * @param  {number} value - Tree node value.
   */
  constructor(value) {
    if (!value) {
      throw new Error('constructor(): The `value` param is required');
    }

    // Create new node object and set as the tree root.
    this._root = new TreeNode(value);
  }

  /**
   * Inserts node into tree.
   * @param  {number} value - Tree node value.
   */
  insert(value) {
    this._insert(value);
  }

  /**
   * Recursive helper insert function.
   * @param  {number} value - Tree node value.
   * @param  {object} [current] - Current tree node.
   */
  _insert(value, current = this._root) {
    let insertKey;

    if (value < current.value) {
      insertKey = '_left';
    } else {
      insertKey = '_right';
    }

    if (!current[insertKey]) {
      current[insertKey] = new TreeNode(value, current);
    } else {
      this._insert(value, current[insertKey]);
    }
  }

  /**
   * Checks if the tree contains the value.
   * @param  {number} value - Tree node value.
   * @return {boolean|TreeNode} False or the node containing the value.
   */
  contains(value) {
    return this._contains(value);
  }

  /**
   * Recursive helper function to check tree contains the value.
   * @param  {number} value - Tree node value.
   * @param  {TreeNode} [current] - Current tree node to traverse.
   * @return {boolean|TreeNode} False or the node containing the value.
   */
  _contains(value, current = this._root) {
    let containsValue = false;

    if (value === current.value) {
      containsValue = current;
    }

    if (value < current.value && current._left) {
      return this._contains(value, current._left);
    }

    if (value > current.value && current._right) {
      return this._contains(value, current._right);
    }

    return containsValue;
  }

  /**
   * Delete node from a given value.
   * @param  {number} value - Tree node value.
   * @return {boolean} True/false depending on whether the node is deleted.
   */
  delete(value) {
    const node = this.contains(value);

    if (!node) {
      return false;
    }

    if (!node._parent) {
      throw new Error('delete() - Illegal operation, not permitted to delete root node.');
    }

    if (node._left && node._right) {
      let min = this._findMin(node._right);
      let temp = node.value;
      node.value = min.value;
      min.value = temp;

      return this.delete(min);
    } else {
      if (node._left) {
        this._replaceChildNode(node._parent, node, node._left);
      } else if (node._right) {
        this._replaceChildNode(node._parent, node, node._right);
      } else {
        this._replaceChildNode(node._parent, node);
      }

      return true;
    }
  }

  /**
   * Find minimum value in given tree.
   * @param  {TreeNode} node - Tree node.
   * @param  {TreeNode} current - Current tree node.
   * @return {TreeNode} Tree node with the minimum value in the subset.
   */
  _findMin(node, current) {
    current = current || { value: Infinity };

    if (!node) {
      return current;
    }

    if (current.value > node.value) {
      current = node;
    }

    return this._findMin(node._left, current);
  }

  /**
   * Replace an old child node with new child node.
   * @param  {TreeNode} parent - Parent of child to replace.
   * @param  {TreeNode} oldChild - Old child being replaced.
   * @param  {TreeNode} newChild - New child replacing the old.
   */
  _replaceChildNode(parent, oldChild, newChild) {
    if (!parent) {
      this._root = newChild;

      if (this._root) {
        this._root._parent = undefined;
      }
    } else {
      if (parent._left === oldChild) {
        parent._left = newChild;
      } else {
        parent._right = newChild;
      }

      if (newChild) {
        newChild._parent = parent;
      }
    }
  }

  /**
   * Depth first search
   * @param  {Function} callback - Callback executed on every value.
   */
  depthFirstSearch(callback) {
      this._depthFirstSearch(this._root, callback);
  }

  /**
   * Recursive helper to depth first search.
   * @param  {TreeNode} current - Current tree node.
   * @param  {Function} callback - Callback executed on every value.
   */
  _depthFirstSearch(current, callback) {
    callback.call(current, current.value);

    if (current._left) {
      this._depthFirstSearch(current._left, callback);
    }

    if (current._right) {
      this._depthFirstSearch(current._right, callback);
    }
  }
}

module.exports = BinarySearchTree;
