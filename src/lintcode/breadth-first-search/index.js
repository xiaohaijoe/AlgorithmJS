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

class DirectedGraphNode {
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

// 127. 拓扑排序
class Solution127 {
  topSort(graph) {
    const result = [];
    if (graph == null || graph.length === 0) {
      return result;
    }

    // 1. 拓扑排序先决条件
    // 1. 找出所有入度>0的节点
    const indegree = new Map();
    graph.forEach((n) => {
      n.neighbors.forEach((neighbor) => {
        if (indegree.has(neighbor)) {
          indegree.set(neighbor, indegree.get(neighbor) + 1);
        } else {
          indegree.set(neighbor, 1);
        }
      });
    });

    // 2. 将入度为0的插入到queue和result中
    const queue = [];
    graph.forEach((n) => {
      if (!indegree.has(n)) {
        queue.push(n);
        result.push(n);
      }
    });

    // 3. 遍历所有neighbor，每次indegree-1,直到indegree==0，就插入到result中
    while (queue.length > 0) {
      const n = queue.shift();
      n.neighbors.forEach((neighbor) => {
        indegree.set(neighbor, indegree.get(neighbor) - 1);
        if (indegree.get(neighbor) === 0) {
          result.push(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  static test() {
    const solution = new Solution127();
    const n1 = new DirectedGraphNode(1);
    const n2 = new DirectedGraphNode(2);
    const n3 = new DirectedGraphNode(3);
    const n4 = new DirectedGraphNode(4);
    n1.neighbors = [n2, n3];
    n2.neighbors = [n4];
    n3.neighbors = [n4];
    const graph = [n1, n2, n3, n4];

    const res = solution.topSort(graph);
    console.log(res);
  }
}

// 615. 课程表(拓扑排序)
class Solution615 {
  /**
   *
   * @param {int} numCourses
   * @param {int[][]} prerequisites
   */
  canFinish(numCourses, prerequisites) {
    if (numCourses === 0) {
      return true;
    }
    if (prerequisites.length === 0) {
      return true;
    }

    // 拓扑排序需要提前准备的数据
    // 1. 所有节点的indegree(入度>1的节点)
    // 2. 所有节点的neighbors(边)
    const neighbors = new Array(numCourses).fill(true).map((i) => {
      return [];
    });
    const indegree = new Array(numCourses).fill(0);
    prerequisites.forEach((courses) => {
      indegree[courses[1]]++;
      neighbors[courses[0]].push(courses[1]);
    });

    // 3. 把所有入度==0的节点插入到queue中
    // const queue = indegree.filter((i) => i === 0);
    const queue = [];
    for (let i = 0; i < indegree.length; i++) {
      if (indegree[i] === 0) {
        queue.push(i);
      }
    }

    // 4. 遍历queue
    let count = 0;
    while (queue.length > 0) {
      console.log(queue);
      const course = queue.shift();
      count++;
      // 遍历所有neighbor
      for (let i = 0; i < neighbors[course].length; i++) {
        const neighbor = neighbors[course][i];
        indegree[neighbor]--;
        if (indegree[neighbor] === 0) {
          queue.push(parseInt(neighbor));
        }
      }
    }

    return count === numCourses;
  }

  static test() {
    const solution = new Solution615();
    const numCourses = 6;
    // 比如要学习课程 0 你需要先学习课程 1 ，表示为[0,1]
    // 1 -> 0
    const prerequisites = [
      [0, 1],
      [2, 3],
      [1, 4],
      [1, 5],
    ];
    const res = solution.canFinish(numCourses, prerequisites);
    console.log(res);
  }
}

// 616. 课程表 II
class Solution616 {
  /**
   *
   * @param {int} numCourses
   * @param {int[][]} prerequisites
   */
  findOrder(numCourses, prerequisites) {
    const result = [];

    // 1. 找出所有indegree
    // 2. 找出所有neighbors
    const neighbors = new Array(numCourses).fill(true).map((i) => {
      return [];
    });
    const indegree = new Array(numCourses).fill(0);
    for (let i = 0; i < prerequisites.length; i++) {
      const courses = prerequisites[i];
      indegree[courses[1]];
      neighbors[courses[0]].push(courses[1]);
    }

    // 3. 放入queue
    const queue = [];
    for (let i = 0; i < indegree.length; i++) {
      if (indegree[i] === 0) {
        queue.push(i);
      }
    }

    // 4. bfs
    while (queue.length > 0) {
      const course = queue.shift();
      result.push(course);
      for (let i = 0; i < neighbors[course].length; i++) {
        const neighbor = neighbors[course][i];
        indegree[neighbor]--;
        if (indegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }

    if (result.length != numCourses) {
      return [];
    }
    return result;
  }

  static test() {
    const solution = new Solution616();
    const numCourses = 4;
    // 比如如果你要上课程0，你需要先学课程1，我们用一个匹配来表示他们： [0,1]
    // 1 -> 0
    const prerequisites = [
      [1, 0], // 0 -> 1
      [2, 0], // 0 -> 2
      [3, 1], // 1 -> 3
      [3, 2], // 2 -> 3
    ];
    const res = solution.findOrder(numCourses, prerequisites);
    console.log(res);
  }
}

// 605. 序列重构
class Solution605 {
  /**
   *
   * @param {int[]} org
   * @param {int[][]} seqs
   */
  sequenceReconstruction(org, seqs) {
    const graph = this.getGraph(seqs);
    const topoOrder = this.getTopoList(graph);

    if (topoOrder == null || topoOrder.length != org.length) {
      return false;
    }
    for (let i = 0; i < org.length; i++) {
      if (org[i] != topoOrder[i]) {
        return false;
      }
    }
    return true;
  }

  getGraph(seqs) {
    const graph = new Map();
    seqs.forEach((seq) => {
      seq.forEach((num) => {
        if (!graph.has(num)) {
          graph.set(num, new Set());
        }
      });
    });

    seqs.forEach((seq) => {
      for (let i = 1; i < seq.length; i++) {
        graph.get(seq[i - 1]).add(seq[i]);
      }
    });

    return graph;
  }

  getTopoList(graph) {
    const indegree = new Map();
    for (let set of graph.values()) {
      for (let num of set.values()) {
        if (indegree.has(num)) {
          indegree.set(num, indegree.get(num) + 1);
        } else {
          indegree.set(num, 1);
        }
      }
    }

    const queue = [];
    for(let key of graph.keys()) {
      if(!indegree.has(key)) {
        queue.push(key);
      }
    }

    const result = [];
    while(queue.length > 0) {
      if(queue.length > 1) {
        return null;
      }
      
      const num = queue.shift();
      result.push(num);
      const neighbors = graph.get(num);
      for(let neighbor of neighbors.values()) {
        indegree.set(neighbor, indegree.get(neighbor) - 1);
        if(indegree.get(neighbor) == 0) {
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  

  static test() {
    const solution = new Solution605();
    const org = [1, 2, 3];
    const seqs = [
      [1, 2],
      [1, 3],
      [2, 3],
    ];
    const res = solution.sequenceReconstruction(org, seqs);
    console.log(res);
  }
}

Solution605.test();
