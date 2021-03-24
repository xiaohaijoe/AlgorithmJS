class TreeNode {
  // val;
  // left;
  // right;
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}
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
  constructor() {
    this.subtree = null;
    this.subtreeResult = null;
  }
  findSubtree2(root) {
    this.helper(root);
    return this.subtree;
  }
  helper(root) {
    if (root == null) {
      return { size: 0, sum: 0 };
    }

    const left = this.helper(root.left);
    const right = this.helper(root.right);

    const result = {
      size: left.size + right.size + 1,
      sum: left.sum + right.sum + root.val,
    };
    if (
      this.subtree == null ||
      this.subtreeResult.sum * result.size <
        result.sum * this.subtreeResult.size
    ) {
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
          val: -4,
        },
        right: {
          val: -3,
          left: {
            val: 5,
          },
          right: {
            val: 6,
          },
        },
      },
    };
    const result = solution.findSubtree2(root);
    console.log(result);
  }
}

// 480. 找出二叉树所有路径
class Solution480 {
  binaryTreePaths(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const leftPaths = this.binaryTreePaths(root.left);
    const rightPaths = this.binaryTreePaths(root.right);

    leftPaths.forEach((path) => {
      result.push(root.val + "->" + path);
    });
    rightPaths.forEach((path) => {
      result.push(root.val + "->" + path);
    });
    if (result.length === 0) {
      result.push("" + root.val);
    }
    return result;
  }

  static test() {
    const a = new Solution480();
    const root = {
      val: 1,
      left: {
        val: 2,
      },
      right: {
        val: 3,
      },
    };
    const r = a.binaryTreePaths(root);
    console.log(r);
  }
}

// 596. 最小子树
class Solution596 {
  constructor() {
    this.subtree = null;
    this.subtreeSum = Number.MAX_VALUE;
  }

  findSubtree(root) {
    this.helper(root);
    return this.subtree;
  }

  helper(root) {
    if (root == null) {
      return 0;
    }
    const left = this.helper(root.left);
    const right = this.helper(root.right);

    const sum = left + right + root.val;
    if (sum <= this.subtreeSum) {
      this.subtreeSum = sum;
      this.subtree = root;
    }

    return sum;
  }

  static test() {
    const a = new Solution596();
    const n1 = {
      val: 1,
      left: {
        val: -5,
        left: {
          val: 1,
        },
        right: {
          val: 2,
        },
      },
      right: {
        val: 2,
        left: {
          val: -4,
        },
        right: {
          val: -5,
        },
      },
    };
    const r = a.findSubtree(n1);
    console.log(r);
    const n2 = { val: -10 };
    const b = a.findSubtree(n2);
    console.log;
  }
}

class Solution1311 {
  lowestCommonAncestor(root, p, q) {
    if (root == null || root == p || root == q) {
      return root;
    }

    const left = this.lowestCommonAncestor(root.left, p, q);
    const right = this.lowestCommonAncestor(root.right, p, q);

    if (left != null && right != null) {
      return root;
    }
    if (left != null) {
      return left;
    }
    if (right != null) {
      return right;
    }
    return null;
  }
  static test() {
    const solution = new Solution1311();
    const p = {
      val: 8,
    };
    const p = {
      val: 61,
    };
    const root = {
      val: 31,
      left: {
        val: 11,
        left: p,
      },
      right: {
        val: 51,
        left: {
          val: 41,
        },
        right: q,
      },
    };
    const res = solution.lowestCommonAncestor(root, p, q);
    console.log(res);
  }
}

// 95. 验证二叉查找树
class Solution95 {
  isValidBST(root) {
    const result = this.helper(root);
    return result.isBST;
  }
  helper(root) {
    if (root == null) {
      return { isBST: true };
    }

    const left = this.helper(root.left);
    const right = this.helper(root.right);

    if (!left.isBST && !right.isBST) {
      return { isBST: false };
    }

    if (left.maxNode != null && left.maxNode.val >= root.val) {
      return { isBST: false };
    }

    if (right.minNode != null && right.minNode.val <= root.val) {
      return { isBST: false };
    }

    const maxNode = right.maxNode != null ? right.maxNode : root;
    const minNode = left.minNode != null ? left.minNode : root;
    return { isBST: true, maxNode, minNode };
  }
  static test() {
    const solution = new Solution95();
    const root = {
      val: 10,
      left: {
        val: 5,
        left: {
          val: 1,
        },
        right: {
          val: 100,
        },
      },
    };
    const res = solution.isValidBST(root);
    console.log(res);
  }
}
// Solution95.test();

// 453. 将二叉树拆成链表
class Solution453 {
  flatten(root) {
    this.helper(root);
    return root;
  }
  helper(root) {
    if (root == null) {
      return null;
    }

    // 获取左节点叶子节点
    const leftLast = this.helper(root.left);
    // 获取右节点叶子节点
    const rightLast = this.helper(root.right);

    if (leftLast != null) {
      leftLast.right = root.right;
      root.right = root.left;
      root.left = null;
    }

    if (rightLast != null) {
      return rightLast;
    }

    if (leftLast != null) {
      return leftLast;
    }

    return root;
  }
  static test() {
    const solution = new Solution453();
    const root = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 3,
        },
        right: {
          val: 4,
        },
      },
      right: {
        val: 5,
        right: {
          val: 6,
        },
      },
    };
    const res = solution.flatten(root);
    console.log(res);
  }
}

// 86. 二叉查找树迭代器
class BSTIterator86 {
  constructor(root) {
    this.array = helper(root);
  }

  helper(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const leftResult = this.helper(root.left);
    const rightResult = this.helper(root.right);

    result.push(...leftResult);
    result.push(root);
    result.push(...rightResult);

    return result;
  }

  hasNext() {
    if (this.array.length === 0) {
      return false;
    }
    return true;
  }

  next() {
    if (this.array.length == 0) {
      return null;
    }
    const node = this.array[0];
    this.array = this.array.splice(0, 1);
    return node;
  }
}
// Solution453.test();

// 448. 二叉查找树的中序后继
class Solution448 {
  inorderSuccessor(root, p) {
    if(root == null || p == null) {
      return null;
    }

    if(root.val <= p.val) {
      return this.inorderSuccessor(root.right, p);
    } else {
      const left = this.inorderSuccessor(root.left, p);
      return left != null ? left : root;
    }
  }
  static test() {
    const solution = new Solution448();
    const p = {
      val: 2,
    };
    const root = {
      val: 4,
      left: {
        val: 3,
        left: p,
      },
      right: {
        val: 5,
        right: {
          val: 6,
        },
      },
    };
    const res = solution.inorderSuccessor(root, p);
    console.log(res);
  }
}

Solution448.test();
