/**
 * Tree Node
 * @class
 */
class TreeNode {
  /**
   * Class constructor
   * @param  {number} value - Tree node value.
   */
  constructor(
    value,
    _parent = undefined,
    _left = undefined,
    _right = undefined
  ) {
    Object.assign(this, {
      value,
      _parent,
      _left,
      _right
    })
  }
}

module.exports = TreeNode;
