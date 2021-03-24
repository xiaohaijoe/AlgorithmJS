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
    console.log(b);
  }
}
Solution596.test();
