class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class UndirectedGraphNode {
  constructor(label) {
    this.label = label;
    this.neighbors = [];
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

// 70. 二叉树的层次遍历 II
class Solution70 {
  levelOrderBottom(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const queue = [root];

    while (queue.length > 0) {
      const size = queue.length;
      const level = [];
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
    return result.reverse();
  }

  static test() {
    const solution = new Solution70();
    const root = {
      val: 1,
      left: {
        val: 2,
      },
      right: {
        val: 3,
      },
    };
    const res = solution.levelOrderBottom(root);
    console.log(res);
  }
}

// 71. 二叉树的锯齿形层次遍历
class Solution71 {
  zigzagLevelOrder(root) {
    const result = [];
    if (root == null) {
      return result;
    }
    const queue = [root];
    let isReverse = false;
    while (queue.length > 0) {
      const size = queue.length;
      const level = [];
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
      if (isReverse) {
        level.reverse();
      }
      isReverse = !isReverse;
      result.push(level);
    }
    return result;
  }
  static test() {
    const solution = new Solution71();
    const root = {
      val: 1,
      left: {
        val: 2,
      },
      right: {
        val: 3,
      },
    };
    const res = solution.zigzagLevelOrder(root);
    console.log(res);
  }
}

// 242. 将二叉树按照层级转化为链表
class Solution242 {
  binaryTreeToLists(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const queue = [root];
    while (queue.length > 0) {
      const size = queue.length;
      let level = null;
      let pointer = null;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        if (level == null) {
          level = new ListNode(node.val);
          pointer = level;
        } else {
          pointer.next = new ListNode(node.val);
          pointer = pointer.next;
        }
      }
      result.push(level);
    }
    return result;
  }

  static test() {
    const solution = new Solution242();
    const root = {
      val: 1,
      left: {
        val: 2,
      },
      right: {
        val: 3,
      },
    };
    const res = solution.binaryTreeToLists(root);
    console.log(res);
  }
}

// 178. 图是否是树
class Solution178 {
  validTree(n, edges) {
    if (n === 0) {
      return false;
    }
    if (edges.length != n - 1) {
      return false;
    }
    // 把所有的节点存到hashMap里，里面每一个节点保存连接到的下一个节点
    const map = this.initializeMap(n, edges);

    const queue = [0];
    const set = new Set().add(0);

    while (queue.length != 0) {
      const num = queue.shift();
      for (let neighbor of map.get(num).values()) {
        if (set.has(neighbor)) {
          continue;
        }
        queue.push(neighbor);
        set.add(neighbor);
      }
    }

    return set.size === n;
  }
  initializeMap(n, edges) {
    const map = new Map();
    for (let i = 0; i < n; i++) {
      map.set(i, new Set());
    }

    for (let i = 0; i < edges.length; i++) {
      const u = edges[i][0];
      const v = edges[i][1];
      map.get(u).add(v);
      map.get(v).add(u);
    }
    // map = {
    //     0: {1,2,3,4},
    //     1: {0},
    //     2: {0},
    //     3: {0},
    //     4: {0},
    // }
    return map;
  }
  static test() {
    const solution = new Solution178();
    const res = solution.validTree(5, [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ]);
    console.log(res);
  }
}

// 137 · 克隆图
class Solution137 {
  cloneGraph(node) {
    if (node == null) {
      return null;
    }

    // 1. 用bfs遍历所有的点
    const nodes = this.getAllNodes(node);

    // 2. 复制所有的点(label)
    const mapping = new Map();
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      mapping.set(n, new UndirectedGraphNode(n.label));
    }

    // 3. 复制所有的边(neighbor)
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const newNode = mapping.get(n);
      for (let j = 0; j < n.neighbors.length; j++) {
        const newNeighbor = mapping.get(n.neighbors[j]);
        newNode.neighbors.push(newNeighbor);
      }
    }

    return mapping.get(node);
  }
  getAllNodes(node) {
    const queue = [node];
    const set = new Set();

    while (queue.length !== 0) {
      const n = queue.shift();
      for (let i = 0; i < n.neighbors.length; i++) {
        const neighbor = n.neighbors[i];
        if (set.has(neighbor)) {
          continue;
        }
        queue.push(neighbor);
        set.add(neighbor);
      }
    }

    return [...set.values()];
  }
  static test() {
    const n1 = new UndirectedGraphNode(1);
    const n2 = new UndirectedGraphNode(2);
    const n3 = new UndirectedGraphNode(3);
    n1.neighbors = [n2, n3];
    n2.neighbors = [n1, n3];
    n3.neighbors = [n1, n2];
    const solution = new Solution137();
    const res = solution.cloneGraph(n1);
    console.log(res);
  }
}
Solution137.test();
