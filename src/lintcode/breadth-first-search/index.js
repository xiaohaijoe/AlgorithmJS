class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
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

// 7. 二叉树的序列化和反序列化
class Solution7 {
  serialize(root) {
    if (root == null) {
      return "{}";
    }

    const queue = [root];
    // 宽度优先搜索将元素放进队列中
    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];
      if (node == null) {
        continue;
      }
      queue.push(node.left);
      queue.push(node.right);
    }

    while (queue[queue.length - 1] == null) {
      queue.splice(queue.length - 1, 1);
    }

    let result = "{";
    result += queue[0].val;
    for (let i = 1; i < queue.length; i++) {
      if (queue[i] == null) {
        result += ",#";
      } else {
        result += "," + queue[i].val;
      }
    }
    result += "}";
    return result;
  }
  deserialize(data) {
    if (data == null || data === "{}") {
      return null;
    }

    const strs = data.substring(1, data.length - 1).split(",");

    const root = new TreeNode(parseInt(strs[0]));
    const queue = [root];

    let index = 0;
    let isLeft = true;
    for (let i = 1; i < strs.length; i++) {
      if (strs[i] != "#") {
        const node = new TreeNode(parseInt(strs[i]));
        if (isLeft) {
          queue[index].left = node;
        } else {
          queue[index].right = node;
        }
        queue.push(node);
      }
      isLeft = !isLeft;
      if (isLeft) {
        index++;
      }
    }
    return root;
  }
  static test() {
    const solution = new Solution7();
    const root = "{3,9,20,#,#,15,7}";
    const res = solution.deserialize(root);
    const serial = solution.serialize(res);
    console.log(res);
    console.log(serial);
  }
}
Solution7.test();
