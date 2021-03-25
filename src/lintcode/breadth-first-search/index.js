// 69. 二叉树的层次遍历
class Solution69 {
  levelOrder(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const queue = [root];
    while (queue.length !== 0) {
      const level = [];
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        level.push(node.val);
      }
      result.push(level);
    }
    return result;
  }
  static test() {
    const solution = new Solution69();
    const root = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 4,
        },
      },
      right: {
        val: 3,
        left: {
          val: 6,
        },
        right: {
          val: 5,
        },
      },
    };
    const res = solution.levelOrder(root);
    console.log(res);
  }
}

class Solution11 {
  deserialize(data) {
    // write your code here
    if (data == null || data.length <= 2) {
      return null;
    }
    console.log(data);
    const substring = data.substring(1, data.length - 1);
    console.log(substring)
    const strs = substring.split(",");

    // TreeNode root = new TreeNode(0);
    const head = {};
    this.helper(root, strs, 0, 1);
    return root.right;
  }

  helper(root, strs, nextStart, nextEnd) {
    let i = nextStart;
    // console.log(nextStart, nextEnd, strs.length);
    while (i < nextEnd && i < strs.length) {
      const val = strs[i];
      const left = i % 2 == 1;
      console.log(val, left, i, strs);
      if (val == "#") {
      } else {
        const node = { val: parseInt(val) };
        if (left) {
          root.left = node;
        } else {
          root.right = node;
        }
        this.helper(node, strs, nextEnd, 2 * nextEnd + 1);
      }
      i++;
    }
  }
  static test() {
      const solution = new Solution11();
      const root = "{3,1,2,#,5}";
      const res = solution.deserialize(root);
      console.log(res);
  }
}
Solution11.test();
