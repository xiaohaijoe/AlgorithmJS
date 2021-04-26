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
    const q = {
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
    if (root == null || p == null) {
      return null;
    }

    if (root.val <= p.val) {
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

// 前序遍历的三种写法
class SolutionPostOrder {
  postorderTraversal(root) {
    const helper = (root, result) => {
      if (root == null) {
        return null;
      }

      result.push(root.val);
      helper(root.left, result);
      helper(root.right, result);
    };
    const result = [];
    helper(root, result);
    return result;
  }

  postorderDivideConquer(root) {
    const helper = (root) => {
      const result = [];
      if (root == null) {
        return result;
      }

      const left = helper(root.left);
      const right = helper(root.right);

      result.push(root.val);
      result.push(...left);
      result.push(...right);

      return result;
    };
    const result = helper(root);
    return result;
  }

  postorderNonRecursion(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const stack = [];
    stack.push(root);
    while (stack.length !== 0) {
      const node = stack.pop();
      result.push(node.val);
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
    }
    return result;
  }

  static test() {
    const solution = new SolutionPostOrder();
    const root = {
      val: 2,
      left: {
        val: 1,
        left: {
          val: 4,
        },
        right: {
          val: 5,
        },
      },
      right: {
        val: 3,
      },
    };
    const a = solution.postorderTraversal(root);
    const b = solution.postorderDivideConquer(root);
    const c = solution.postorderNonRecursion(root);
    console.log(a, b, c);
  }
}

// 11. 二叉查找树中搜索区间
class Solution11 {
  searchRange(root, k1, k2) {
    const result = [];
    this.helper(root, k1, k2, result);
    return result;
  }
  helper(root, k1, k2, result) {
    if (root == null) {
      return null;
    }

    if (root.val >= k1) {
      this.helper(root.left, k1, k2, result);
    }
    if (root.val >= k1 && root.val <= k2) {
      result.push(root.val);
    }
    if (root.val <= k2) {
      this.helper(root.right, k1, k2, result);
    }
    return root;
  }
  static test() {
    const solution = new Solution11();
    const root = {
      val: 2,
      left: {
        val: 1,
      },
    };
    const res = solution.searchRange(root, 0, 4);
    console.log(res);
  }
}

// 85. 在二叉查找树中插入节点
class Solution85 {
  insertNode(root, node) {
    if (root == null) {
      return node;
    }
    this.helper(root, node);
    return root;
  }
  helper(root, node) {
    if (root == null) {
      return null;
    }

    if (root.val > node.val) {
      this.helper(root.left, node);
    }

    if (root.val <= node.val) {
      this.helper(root.right, node);
    }

    if (root.left == null && root.val > node.val) {
      root.left = node;
    }
    if (root.right == null && root.val <= node.val) {
      root.right = node;
    }
    return root;
  }
  static test() {
    const solution = new Solution85();
    const root = {
      val: 2,
      left: {
        val: 1,
      },
      right: {
        val: 4,
        left: {
          val: 3,
        },
      },
    };
    const node = {
      val: 6,
    };
    const res = solution.insertNode(root, node);
    console.log(res);
  }
}

// 1593. 根据前序和后序遍历构造二叉树
class Solution1593 {
  constructFromPrePost(pre, post) {
    return this.buildTree(pre, 0, pre.length - 1, post, 0, post.length - 1);
  }
  buildTree(pre, preStart, preEnd, post, postStart, postEnd) {
    console.log(preStart, preEnd, postStart, postEnd);
    if (preStart > preEnd) {
      return null;
    }
    if (postStart > postEnd) {
      return null;
    }

    const root = new TreeNode(pre[preStart]);

    if (preStart == preEnd || postStart == postEnd) {
      return root;
    }
    let position = -1;
    // 找到子节点的分界线
    for (let i = 0; i < post.length; i++) {
      if (post[i] == pre[preStart + 1]) {
        position = i;
        break;
      }
    }
    let leftLen = position - postStart;
    // let rightLen = postEnd - position - 1;
    root.left = this.buildTree(
      pre,
      preStart + 1,
      preStart + 1 + leftLen,// preStart + 1 + position - postStart,
      post,
      postStart,
      position
    );
    root.right = this.buildTree(
      pre,
      // preEnd - postEnd + position + 2,
      preStart + 1 + (position - postStart) + 1,
      preEnd,
      post,
      position + 1,
      postEnd - 1
    );

    return root;
  }
  static test() {
    const solution = new Solution1593();

    const pre = [1, 2, 4, 5, 3, 6, 7];
    const post = [4, 5, 2, 6, 7, 3, 1];
    const res = solution.constructFromPrePost(pre, post);
    console.log(res);
  }
}
Solution1593.test();
