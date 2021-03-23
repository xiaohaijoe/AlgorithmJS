// 66. 二叉树的前序遍历
class Solution66 {
  preorderTraversal(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const left = this.preorderTraversal(root.left);
    const right = this.preorderTraversal(root.right);

    result.push(root.val);
    result.push(...left);
    result.push(...right);

    return result;
  }

  test() {
    const root = {
      val: 1,
      left: {
        val: 2,
      },
      right: {
        val: 3,
      },
    };
    const r = this.preorderTraversal(root);
    console.log(r);
  }
}

// 67. 二叉树的中序遍历
class Solution67 {
  inorderTraversal(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const left = this.inorderTraversal(root.left);
    const right = this.inorderTraversal(root.right);

    result.push(...left);
    result.push(root.val);
    result.push(...right);

    return result;
  }

  test() {
    const root = {
      val: 1,
      left: {
        val: 2,
      },
      right: {
        val: 3,
      },
    };
    const r = this.inorderTraversal(root);
    console.log(r);
  }
}

class Solution93 {
  isBalanced(root) {
    const result = this.helper(root, 0);
    return result.isBalanced;
  }

  helper(root, depth) {
    if (root == null) {
      return { isBalanced: false, depth, maxDepth: -1 };
    }

    const left = this.helper(root.left, depth + 1);
    const right = this.helper(root.right, depth + 1);

    if (!left.isBalanced || !right.isBalanced) {
      return { isBalanced: false, depth, maxDepth: -1 };
    }

    if (Math.abs(left.maxDepth - right.maxDepth) > 1) {
      return { isBalanced: false, depth, maxDepth: -1 };
    }

    return {
      isBalanced: true,
      depth,
      maxDepth: Math.max(left.maxDepth, right.maxDepth) + 1,
    };
  }

  static test() {
    const solution = new Solution93();
    const root = {
      val: 1,
      left: {
        val: 2,
      },
      right: {
        val: 3,
        left: {
          val: 3,
          left: {
            val: 5,
          },
        },
      },
    };
    const r = solution.isBalanced(root);
    console.log(r);
  }
}

// 597. 具有最大平均数的子树
class Solution597 {
  subtree = null;
  subtreeResult = null;
  findSubtree2(root) {
    this.helper(root);
    return this.subtree;
  }
  helper(root) {
    if(root == null) {
      return {size: 0, sum: 0};
    }

    const left = this.helper(root.left);
    const right = this.helper(root.right);

    const result = {
      size: left.size + right.size + 1,
      sum: left.sum + right.sum + root.val,
    }
    if(this.subtree == null || this.subtreeResult.sum * result.size < result.sum * this.subtreeResult.size) {
      this.subtree = root;
      this.subtreeResult = result;
    }

    return result;
  }

  static test() {
    const solution = new Solution597();
    const root = {
      val: -1,
      left: {
        val: -2,
        left: {
          val: -4
        },
        right: {
          val: -3,
          left: {
            val: 5
          },
          right: {
            val: 6
          }
        }
      }
    }
    const result = solution.findSubtree2(root);
    console.log(result);
  }
}
Solution597.test();
