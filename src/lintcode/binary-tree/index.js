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
    if(root == null) {
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

const a = new Solution67();
a.test();