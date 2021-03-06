## 索引

1. <a href="#69">69. 二叉树的层次遍历（中等）</a>
2. <a href="#7">7. 二叉树的序列化和反序列化（中等）</a>
3. <a href="#70">70. 二叉树的层次遍历 II（中等）</a>
4. <a href="#71">71. 二叉树的锯齿形层次遍历（中等）</a>
5. <a href="#242">242. 将二叉树按照层级转化为链表（简单）</a>
6. <a href="#178">178. 图是否是树（中等）</a>
7. <a href="#127">127. 拓扑排序（中等）</a>
8. <a href="#615">615. 课程表(拓扑排序)（中等）</a>
9. <a href="#605">605. 序列重构(拓扑排序)（中等）</a>
10. <a href="#433">433. 岛屿的个数（中等）</a>
11. <a href="#598">598. 僵尸矩阵（中等）</a>
12. <a href="#120">120. 单词接龙（困难）</a>
13. <a href="#1225">1225. 岛的周长（简单）</a>

## BFS 应用范围

- 二叉树上的宽搜 BFS in Binary Tree
- 图上的宽搜 BFS in Graph
  - 拓扑排序 Topological Sorting
- 棋盘上的宽搜 BFS

## 什么时候应该使用 BFS

**图的遍历 Traversal in Graph**

- 层级遍历 Level Order Traversal
- 由点及面 Connected Component
- 拓扑排序 Topological Sorting

**最短路径 Shortest Path in Simple Graph**

- 仅限简单图求最短路径，即图中每条边长度都是 1，且没有方向

**宽度优先搜索要点 BFS Key Points**

- 使用队列作为主要的数据结构 Queue

**拓扑排序**

- 需要提前准备的数据
  1. 所有节点的入度(indegree > 1)
  2. 所有节点的边(neighbors)
- 拓扑排序步骤
  1. 遍历出所有入度(indegree)
  2. 遍历找出所有的边(neighbors)
  3. 将 indegree==0 的节点插入到 queue 中，插入到结果
  4. 遍历 queue 中的节点的所有 neighbors，并把 indegree-1
  5. 重复 3，4 步骤

## <a name='69'>69. 二叉树的层次遍历

**[链接](https://www.lintcode.com/problem/binary-tree-level-order-traversal/)**

**描述**
给出一棵二叉树，返回其节点值的层次遍历（逐层从左往右访问）

**样例**

```
样例 1:

输入：{1,2,3}
输出：[[1],[2,3]]
解释：
   1
  / \
 2   3
它将被序列化为{1,2,3}
层次遍历
样例 2:

输入：{1,#,2,3}
输出：[[1],[2],[3]]
解释：
1
 \
  2
 /
3
它将被序列化为{1,#,2,3}
层次遍历
```

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
    /**
     * @param root: A Tree
     * @return: Level order a list of lists of integer
     */
    public List<List<Integer>> levelOrder(TreeNode root) {
        // write your code here
        List<List<Integer>> result = new ArrayList<>();
        if(root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            int size = queue.size();
            for(int i = 0 ; i < size; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if(node.left != null) {
                    queue.offer(node.left);
                }
                if(node.right != null) {
                    queue.offer(node.right);
                }
            }
            result.add(level);
        }

        return result;
    }
}
```

## <a name='7'>7. 二叉树的序列化和反序列化

**[链接](https://www.lintcode.com/problem/7)**

**描述**
设计一个算法，并编写代码来序列化和反序列化二叉树。将树写入一个文件被称为“序列化”，读取文件后重建同样的二叉树被称为“反序列化”。

如何反序列化或序列化二叉树是没有限制的，你只需要确保可以将二叉树序列化为一个字符串，并且可以将字符串反序列化为原来的树结构。

**样例**

```
样例 1：

输入：{3,9,20,#,#,15,7}
输出：{3,9,20,#,#,15,7}
解释：
二叉树 {3,9,20,#,#,15,7}，表示如下的树结构：
	  3
	 / \
	9  20
	  /  \
	 15   7
它将被序列化为 {3,9,20,#,#,15,7}
样例 2：

输入：{1,2,3}
输出：{1,2,3}
解释：
二叉树 {1,2,3}，表示如下的树结构：
   1
  / \
 2   3
它将被序列化为 {1,2,3}
我们的数据是进行 BFS 遍历得到的。当你测试结果 Wrong Answer 时，你可以作为输入调试你的代码。

你可以采用其他的方法进行序列化和反序列化。
```

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */
public class Solution {
    /**
     * This method will be invoked first, you should design your own algorithm
     * to serialize a binary tree which denote by a root node to a string which
     * can be easily deserialized by your own "deserialize" method later.
     */
    public String serialize(TreeNode root) {
        // write your code here
        if(root == null) {
            return "{}";
        }

        String result = "";
        ArrayList<TreeNode> queue = new ArrayList<>();
        queue.add(root);

        for(int i = 0 ; i < queue.size(); i++) {
            TreeNode node = queue.get(i);
            if(node == null) {
                continue;
            }
            queue.add(node.left);
            queue.add(node.right);
        }

        while(queue.get(queue.size() - 1) == null) {
            queue.remove(queue.size() - 1);
        }

        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(queue.get(0).val);
        for(int i = 1; i < queue.size(); i++) {
            TreeNode node = queue.get(i);
            if(node == null) {
                sb.append(",#");
            } else {
                sb.append(",");
                sb.append(node.val);
            }
        }
        sb.append("}");
        return sb.toString();
    }

    /**
     * This method will be invoked second, the argument data is what exactly
     * you serialized at method "serialize", that means the data is not given by
     * system, it's given by your own serialize method. So the format of data is
     * designed by yourself, and deserialize it here as you serialize it in
     * "serialize" method.
     */
    public TreeNode deserialize(String data) {
        // write your code here
        if(data == null || data.equals("{}")) {
            return null;
        }

        String[] strs = data.substring(1, data.length() - 1).split(",");
        TreeNode root = new TreeNode(Integer.parseInt(strs[0]));
        ArrayList<TreeNode> queue = new ArrayList<>();
        queue.add(root);

        int index = 0;
        boolean isLeft = true;
        for(int i = 1 ; i < strs.length; i++) {
            if(!strs[i].equals("#")) {
                TreeNode node = new TreeNode(Integer.parseInt(strs[i]));
                if(isLeft) {
                    queue.get(index).left = node;
                } else {
                    queue.get(index).right = node;
                }
                queue.add(node);
            }
            isLeft = !isLeft;
            if(isLeft) {
                index++;
            }
        }
        return root;
    }
}
```

## <a name='70'>70. 二叉树的层次遍历 II

**[链接](https://www.lintcode.com/problem/binary-tree-level-order-traversal-ii/)**

**描述**
给出一棵二叉树，返回其节点值从底向上的层次序遍历（按从叶节点所在层到根节点所在的层遍历，然后逐层从左往右遍历）

**样例**

```
例1:

输入:
{1,2,3}
输出:
[[2,3],[1]]
解释:
1
/ \
2 3
它将被序列化为 {1,2,3}
层次遍历
例2:

输入:
{3,9,20,#,#,15,7}
输出:
[[15,7],[9,20],[3]]
解释:
3
/ \
9 20
/ \
15 7
它将被序列化为 {3,9,20,#,#,15,7}
层次遍历
```

**笔记**

从上到下进行层次遍历，最后结果进行翻转即可得到结果

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
    /**
     * @param root: A tree
     * @return: buttom-up level order a list of lists of integer
     */
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        // write your code here
        List<List<Integer>> result = new ArrayList<>();
        if(root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();
            for(int i = 0 ; i < size ; i++) {
                TreeNode node = queue.poll();
                if(node.left != null) {
                    queue.offer(node.left);
                }
                if(node.right != null) {
                    queue.offer(node.right);
                }
                level.add(node.val);
            }
            result.add(level);
        }
        Collections.reverse(result);
        return result;
    }
}
```

## <a name='71'>71. 二叉树的锯齿形层次遍历

**[链接](https://www.lintcode.com/problem/binary-tree-zigzag-level-order-traversal/)**

**描述**
给出一棵二叉树，返回其节点值的锯齿形层次遍历（先从左往右，下一层再从右往左，层与层之间交替进行）

**样例**

```
样例 1:

输入:{1,2,3}
输出:[[1],[3,2]]
解释:
1
/ \
2 3
它将被序列化为 {1,2,3}
样例 2:

输入:{3,9,20,#,#,15,7}
输出:[[3],[20,9],[15,7]]
解释:
3
/ \
9 20
/ \
15 7
它将被序列化为 {3,9,20,#,#,15,7}
```

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
    /**
     * @param root: A Tree
     * @return: A list of lists of integer include the zigzag level order traversal of its nodes' values.
     */
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        // write your code here
        List<List<Integer>> result = new ArrayList<>();
        if(root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        boolean isReverse = false;
        while(!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<Integer>();
            for(int i = 0 ; i < size ; i++) {
                TreeNode node = queue.poll();
                if(node.left != null) {
                    queue.offer(node.left);
                }
                if(node.right != null) {
                    queue.offer(node.right);
                }
                level.add(node.val);

            }
            if(isReverse) {
                Collections.reverse(level);
            }
            result.add(level);
            isReverse = !isReverse;
        }
        return result;
    }
}
```

## <a name='242'>242. 将二叉树按照层级转化为链表

**[链接](https://www.lintcode.com/problem/binary-tree-zigzag-level-order-traversal/)**

**描述**
给一棵二叉树，设计一个算法为每一层的节点建立一个链表。也就是说，如果一棵二叉树有 D 层，那么你需要创建 D 条链表。

**样例**

```
样例 1:

输入: {1,2,3,4}
输出: [1->null,2->3->null,4->null]
解释:
1
/ \
2 3
/
4
样例 2:

输入: {1,#,2,3}
输出: [1->null,2->null,3->null]
解释:
1
\
2
/
3
```

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    /**
     * @param root the root of binary tree
     * @return a lists of linked list
     */
    public List<ListNode> binaryTreeToLists(TreeNode root) {
        // Write your code here
        List<ListNode> result = new ArrayList<>();
        if(root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()) {
            int size = queue.size();
            ListNode header = null;
            ListNode listNode = null;
            for(int i = 0 ; i < size ; i++) {
                TreeNode node = queue.poll();

                if(node.left != null) {
                    queue.offer(node.left);
                }
                if(node.right != null) {
                    queue.offer(node.right);
                }
                if(header == null) {
                    header = new ListNode(node.val);
                    listNode = header;
                } else {
                    listNode.next = new ListNode(node.val);
                    listNode = listNode.next;
                }
            }
            result.add(header);
        }
        return result;
    }
}
```

## <a name='178'>178. 图是否是树

**[链接](https://www.lintcode.com/problem/graph-valid-tree/)**

**描述**
给出 n 个节点，标号分别从 0 到 n - 1 并且给出一个 无向 边的列表 (给出每条边的两个顶点), 写一个函数去判断这张｀无向｀图是否是一棵树

**样例**

```
样例 1:

输入: n = 5 edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
输出: true.
样例 2:

输入: n = 5 edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
输出: false.
```

```java
public class Solution {
    /**
     * @param n: An integer
     * @param edges: a list of undirected edges
     * @return: true if it's a valid tree, or false
     */
    public boolean validTree(int n, int[][] edges) {
        // write your code here
        if(n == 0) {
            return false;
        }
        if(edges.length != n-1) {
            return false;
        }

        Map<Integer, Set<Integer>> map = initializeMap(n, edges);

        Queue<Integer> queue = new LinkedList<>();
        Set<Integer> set = new HashSet<>();

        queue.offer(0);
        set.add(0);

        while(!queue.isEmpty()) {
            int num = queue.poll();
            for(Integer neighbor : map.get(num)) {
                if(set.contains(neighbor)) {
                    continue;
                }
                queue.offer(neighbor);
                set.add(neighbor);
            }
        }

        return set.size() == n;
    }

    private Map<Integer, Set<Integer>> initializeMap(int n, int[][] edges) {
        Map<Integer, Set<Integer>> map = new HashMap<>();
        for(int i = 0 ; i < n ; i++) {
            map.put(i, new HashSet<Integer>());
        }

        for(int i = 0 ; i < edges.length ; i++) {
            int u = edges[i][0];
            int v = edges[i][1];
            map.get(u).add(v);
            map.get(v).add(u);
        }

        return map;
    }
}
```

## <a name='178'>178. 图是否是树

**[链接](https://www.lintcode.com/problem/graph-valid-tree/)**

**描述**
克隆一张无向图. 无向图的每个节点包含一个 label 和一个列表 neighbors. 保证每个节点的 label 互不相同.

你的程序需要返回一个经过深度拷贝的新图. 新图和原图具有同样的结构, 并且对新图的任何改动不会对原图造成任何影响.

**样例**

```
样例1

输入:
{1,2,4#2,1,4#4,1,2}
输出:
{1,2,4#2,1,4#4,1,2}
解释:
1----2
 \   |
  \  |
   \ |
    \|
     4
```

```java
/**
 * Definition for Undirected graph.
 * class UndirectedGraphNode {
 *     int label;
 *     List<UndirectedGraphNode> neighbors;
 *     UndirectedGraphNode(int x) {
 *         label = x;
 *         neighbors = new ArrayList<UndirectedGraphNode>();
 *     }
 * }
 */

public class Solution {
    /**
     * @param node: A undirected graph node
     * @return: A undirected graph node
     */
    public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {
        // write your code here
        if(node == null) {
          return node;
        }

        // 1. 使用bfs遍历所有的点
        List<UndirectedGraphNode> nodes = getAllNodes(node);

        // 2. 复制所有的点
        HashMap<UndirectedGraphNode,UndirectedGraphNode> mapping = new HashMap<>();
        for(UndirectedGraphNode n : nodes) {
          mapping.put(n, new UndirectedGraphNode(n.label));
        }

        // 3. 复制所有的边
        for(UndirectedGraphNode n : nodes) {
          UndirectedGraphNode newNode = mapping.get(n);
          for(UndirectedGraphNode neighbor : n.neighbors) {
            UndirectedGraphNode newNeighbor = mapping.get(neighbor);
            newNode.neighbors.add(newNeighbor);
          }

        }
        return mapping.get(node);
    }

    private List<UndirectedGraphNode> getAllNodes(UndirectedGraphNode node) {
      Queue<UndirectedGraphNode> queue = new LinkedList<>();
      Set<UndirectedGraphNode> set = new HashSet<>();

      queue.offer(node);
      set.add(node);

      while(!queue.isEmpty()) {
        UndirectedGraphNode n = queue.poll();
        for(UndirectedGraphNode neighbor : n.neighbors) {
          if(set.contains(neighbor)) {
            continue;
          }
          queue.offer(neighbor);
          set.add(neighbor);
        }
      }

      return new ArrayList<UndirectedGraphNode>(set);
    }
}
```

## <a name='127'>127. 拓扑排序

**[链接](https://www.lintcode.com/problem/topological-sorting/)**

**描述**
给定一个有向图，图节点的拓扑排序定义如下:

- 对于图中的每一条有向边 A -> B , 在拓扑排序中 A 一定在 B 之前.
- 拓扑排序中的第一个节点可以是图中的任何一个没有其他节点指向它的节点.

针对给定的有向图找到任意一种拓扑排序的顺序.

**样例**

![alt 属性文本](./assets/127.jpg)

```
拓扑排序可以为:

[0, 1, 2, 3, 4, 5]
[0, 2, 3, 1, 5, 4]
```

```java
/**
 * Definition for Directed graph.
 * class DirectedGraphNode {
 *     int label;
 *     List<DirectedGraphNode> neighbors;
 *     DirectedGraphNode(int x) {
 *         label = x;
 *         neighbors = new ArrayList<DirectedGraphNode>();
 *     }
 * }
 */

public class Solution {
    /**
     * @param graph: A list of Directed graph node
     * @return: Any topological order for the given graph.
     */
    public ArrayList<DirectedGraphNode> topSort(ArrayList<DirectedGraphNode> graph) {
        // write your code here
        ArrayList<DirectedGraphNode> result = new ArrayList<>();
        if(graph == null || graph.size() == 0) {
          return result;
        }

        // 1. 找出所有neighbors（入度>0）节点
        HashMap<DirectedGraphNode, Integer> indegree = new HashMap<>();
        // HashSet<DirectedGraphNode> set = new HashSet<>();
        for(DirectedGraphNode n : graph) {
          for(DirectedGraphNode neighbor : n.neighbors) {
            if(indegree.containsKey(neighbor)) {
              indegree.put(neighbor, indegree.get(neighbor) + 1);
            } else {
              indegree.put(neighbor, 1);
            }
          }
        }

        // 2. 将所有顶点边插入queue和result
        Queue<DirectedGraphNode> queue = new LinkedList<>();
        for(DirectedGraphNode n : graph) {
          if(!indegree.containsKey(n)) {
            queue.offer(n);
            result.add(n);
          }
        }

        // 3. 遍历queue，将所有节点的入度依次-1，直到==0，就加入result
        while(!queue.isEmpty()) {
          DirectedGraphNode n = queue.poll();
          for(DirectedGraphNode neighbor : n.neighbors) {
            indegree.put(neighbor, indegree.get(neighbor) - 1);
            if(indegree.get(neighbor) == 0) {
              queue.offer(neighbor);
              result.add(neighbor);
            }
          }
        }
        return result;
    }

}
```

## <a name='615'>615. 课程表(拓扑排序)

**[链接](https://www.lintcode.com/problem/course-schedule/)**

**描述**
现在你总共有 n 门课需要选，记为 0 到 n - 1.

一些课程在修之前需要先修另外的一些课程，比如要学习课程 0 你需要先学习课程 1 ，表示为[0,1]

给定 n 门课以及他们的先决条件，判断是否可能完成所有课程？

**样例**

```
例1:

输入: n = 2, prerequisites = [[1,0]]
输出: true
例2:

输入: n = 2, prerequisites = [[1,0],[0,1]]
输出: false
```

```java
public class Solution {
    /**
     * @param numCourses: a total of n courses
     * @param prerequisites: a list of prerequisite pairs
     * @return: true if can finish all courses or false
     */
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // write your code here
        if(numCourses == 0) {
          return true;
        }
        if(prerequisites.length == 0) {
          return true;
        }
        // 拓扑排序需要提前准备的数据
        // 1. 每个节点的入度indegree
        // 2. 每个节点的neighbors（边）

        List<Integer>[] neighbors = new ArrayList[numCourses];
        for(int i = 0 ; i < numCourses; i++) {
          neighbors[i] = new ArrayList<Integer>();
        }

        int[] indegree = new int[numCourses];
        for(int[] courses : prerequisites) {
          // 1. 每个index的入度
          indegree[courses[0]]++;
          // 2. 每个index的neighbors
          neighbors[courses[1]].add(courses[0]);
        }

        // 3. 将入度==0的插入到queue中
        Queue<Integer> queue = new LinkedList<>();
        for(int i = 0 ; i < numCourses ; i++) {
          if(indegree[i] == 0) {
            queue.offer(i);
          }
        }

        // 4. 取出queue，遍历所有neighbor，直到indegree==0
        int count = 0;
        while(!queue.isEmpty()) {
          int course = queue.poll();
          count++;
          for(Integer neighbor : neighbors[course]) {
            indegree[neighbor]--;
            if(indegree[neighbor] == 0) {
              // 入度==0，插入到queue中
              queue.offer(neighbor);
            }
          }
        }

        return count == numCourses;
    }
}
```

## <a name='616'>616. 课程表 II(拓扑排序)

**[链接](https://www.lintcode.com/problem/course-schedule-ii/)**

**描述**
你需要去上 n 门九章的课才能获得 offer，这些课被标号为 0 到 n-1 。

有一些课程需要“前置课程”，比如如果你要上课程 0，你需要先学课程 1，我们用一个匹配来表示他们： [0,1]

给你课程的总数量和一些前置课程的需求，返回你为了学完所有课程所安排的学习顺序。

可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。

**样例**

```
例1:

输入: n = 2, prerequisites = [[1,0]]
输出: [0,1]
例2:

输入: n = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
输出: [0,1,2,3] or [0,2,1,3]
```

```java
public class Solution {
    /*
     * @param numCourses: a total of n courses
     * @param prerequisites: a list of prerequisite pairs
     * @return: the course order
     */
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        // write your code here
        int[] result = new int[numCourses];
        int index = numCourses - 1;

        List<Integer>[] neighbors = new ArrayList[numCourses];
        int[] indegree = new int[numCourses];
        for(int i = 0 ; i < numCourses ; i++) {
          neighbors[i] = new ArrayList<Integer>();
        }
        // 1. 找出所有的indegree
        // 2. 找出所有的neighbors
        for(int i = 0 ; i < prerequisites.length ;i++) {
          int[] course = prerequisites[i];
          indegree[course[1]]++;
          neighbors[course[0]].add(course[1]);
        }

        Queue<Integer> queue = new LinkedList();
        // 把所有indegree==0的节点插入到queue中
        for(int i = 0 ; i < indegree.length ; i++) {
          if(indegree[i] == 0) {
            queue.offer(i);
          }
        }

        // 遍历queue
        while(!queue.isEmpty()) {
          int course = queue.poll();
          // result.push(course);
          result[index--] = course;
          for(Integer neighbor : neighbors[course]) {
            // 查找所有neighbor的入度
            indegree[neighbor]--;
            if(indegree[neighbor] == 0) {
              queue.offer(neighbor);
            }
          }
        }

        if(index > 0) {
          return new int[]{};
        }
        return result;
    }
}
```

## <a name='605'>605. 序列重构(拓扑排序)

**[链接](https://www.lintcode.com/problem/sequence-reconstruction/)**

**描述**
判断是否序列 org 能唯一地由 seqs 重构得出.

org 是一个由从 1 到 n 的正整数排列而成的序列，1≤n≤10^4。

重构表示组合成 seqs 的一个最短的父序列 (意思是，一个最短的序列使得所有 seqs 里的序列都是它的子序列).

判断是否有且仅有一个能从 seqs 重构出来的序列，并且这个序列是 org。

**样例**

```
例1:

输入:org = [1,2,3], seqs = [[1,2],[1,3]]
输出: false
解释:
[1,2,3] 并不是唯一可以被重构出的序列，还可以重构出 [1,3,2]
例2:

输入: org = [1,2,3], seqs = [[1,2]]
输出: false
解释:
能重构出的序列只有 [1,2].
例3:

输入: org = [1,2,3], seqs = [[1,2],[1,3],[2,3]]
输出: true
解释:
序列 [1,2], [1,3], 和 [2,3] 可以唯一重构出 [1,2,3].
例4:

输入:org = [4,1,5,2,6,3], seqs = [[5,2,6,3],[4,1,5,2]]
输出:true
```

```java
public class Solution {
    /**
     * @param org: a permutation of the integers from 1 to n
     * @param seqs: a list of sequences
     * @return: true if it can be reconstructed only one or false
     */
    public boolean sequenceReconstruction(int[] org, int[][] seqs) {
        // write your code here
              Map<Integer, Set<Integer>> graph = buildGraph(seqs);
        List<Integer> topoOrder = getTopoOrder(graph);

        if (topoOrder == null || topoOrder.size() != org.length) {
            return false;
        }
        for (int i = 0; i < org.length; i++) {
            if (org[i] != topoOrder.get(i)) {
                return false;
            }
        }
        return true;
    }

    private Map<Integer, Set<Integer>> buildGraph(int[][] seqs) {
        Map<Integer, Set<Integer>> graph = new HashMap();
        for (int[] seq : seqs) {
            for (int i = 0; i < seq.length; i++) {
                if (!graph.containsKey(seq[i])) {
                    graph.put(seq[i], new HashSet<Integer>());
                }
            }
        }
        for (int[] seq : seqs) {
            for (int i = 1; i < seq.length; i++) {
                graph.get(seq[i - 1]).add(seq[i]);
            }
        }
        return graph;
    }

    private Map<Integer, Integer> getIndegrees(Map<Integer, Set<Integer>> graph) {
        Map<Integer, Integer> indegrees = new HashMap();
        for (Integer node : graph.keySet()) {
            indegrees.put(node, 0);
        }
        for (Integer node : graph.keySet()) {
            for (Integer neighbor : graph.get(node)) {
                indegrees.put(neighbor, indegrees.get(neighbor) + 1);
            }
        }
        return indegrees;
    }

    private List<Integer> getTopoOrder(Map<Integer, Set<Integer>> graph) {
        Map<Integer, Integer> indegrees = getIndegrees(graph);
        Queue<Integer> queue = new LinkedList();
        List<Integer> topoOrder = new ArrayList();

        for (Integer node : graph.keySet()) {
            if (indegrees.get(node) == 0) {
                queue.offer(node);
                topoOrder.add(node);
            }
        }

        while (!queue.isEmpty()) {
            if (queue.size() > 1) {
                return null;
            }

            Integer node = queue.poll();
            for (Integer neighbor : graph.get(node)) {
                indegrees.put(neighbor, indegrees.get(neighbor) - 1);
                if (indegrees.get(neighbor) == 0) {
                    queue.offer(neighbor);
                    topoOrder.add(neighbor);
                }
            }
        }

        if (graph.size() == topoOrder.size()) {
            return topoOrder;
        }

        return null;
    }
}
```

## <a name='433'>433. 岛屿的个数

**[链接](https://www.lintcode.com/problem/number-of-islands/)**

**描述**
给一个 01 矩阵，求不同的岛屿的个数。

0 代表海，1 代表岛，如果两个 1 相邻，那么这两个 1 属于同一个岛。我们只考虑上下左右为相邻。

**样例**

```
样例 1：

输入：
[
  [1,1,0,0,0],
  [0,1,0,0,1],
  [0,0,0,1,1],
  [0,0,0,0,0],
  [0,0,0,0,1]
]
输出：
3
样例 2：

输入：
[
  [1,1]
]
输出：
1
```

```java
class Coordinate {
    public int x;
    public int y;
    public Coordinate(int x,int y) {
        this.x = x;
        this.y = y;
    }
}

public class Solution {
    int[] deltaX = { -1, 0, 1, 0}; // 上右下左
    int[] deltaY = { 0, 1, 0, -1}; // 上右下左
    /**
     * @param grid: a boolean 2D matrix
     * @return: an integer
     */
    public int numIslands(boolean[][] grid) {
        // write your code here
        if(grid == null || grid.length == 0) {
            return 0;
        }
        if(grid[0] == null || grid[0].length == 0) {
            return 0;
        }
        int islands = 0;
        int n = grid.length; // 纵像
        int m = grid[0].length; // 横向
        boolean[][] visited = new boolean[n][m];

        // 查找岛屿
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < m ; j++) {
                // 找到了没有访问过的岛
                if(grid[i][j] && !visited[i][j]) {
                    bfs(grid, i, j, visited);
                    islands++;
                }
            }
        }

        return islands;
    }

    private void bfs(boolean[][] grid, int x, int y, boolean[][] visited) {
        Coordinate coord = new Coordinate(x,y);
        Queue<Coordinate> queue = new LinkedList<>();
        queue.offer(coord);
        visited[x][y] = true;

        while(!queue.isEmpty()) {
            Coordinate c = queue.poll();
            // 向每个方向移动
            for(int direction = 0 ; direction < 4 ; direction++) {
                int newX = c.x + deltaX[direction];
                int newY = c.y + deltaY[direction];
                if(!isValid(grid, newX, newY, visited)) {
                    continue;
                }
                queue.offer(new Coordinate(newX, newY));
                visited[newX][newY] = true;
            }
        }
    }

    private boolean isValid(boolean[][] grid, int newX, int newY, boolean[][] visited) {
        int n = grid.length;
        int m = grid[0].length;
        if(newX < 0 || newX >= n || newY < 0 || newY >= m) {
            return false;
        }
        if(visited[newX][newY]) {
            return false;
        }
        return grid[newX][newY];
    }
}
```

## <a name='598'>598. 僵尸矩阵

**[链接](https://www.lintcode.com/problem/zombie-in-matrix/)**

**描述**
给一个二维网格，每一个格子都有一个值，2 代表墙，1 代表僵尸，0 代表人类(数字 0, 1, 2)。

僵尸每天可以将上下左右最接近的人类感染成僵尸，但不能穿墙。将所有人类感染为僵尸需要多久，如果不能感染所有人则返回 -1。

**样例**

```
例1:

输入:
[[0,1,2,0,0],
 [1,0,0,2,1],
 [0,1,0,0,0]]
输出:
2
例2:

输入:
[[0,0,0],
 [0,0,0],
 [0,0,1]]
输出:
4
```

```java
class Coordinate {
    public int x;
    public int y;
    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
public class Solution {
    private int HUMAN = 0;
    private int ZOMBIE = 1;
    private int WALL = 2;

    private int[] deltaX = {-1, 0, 1, 0};
    private int[] deltaY = {0, 1, 0 , -1};
    /**
     * @param grid: a 2D integer grid
     * @return: an integer
     */
    public int zombie(int[][] grid) {
        // write your code here
        if(grid == null || grid.length == 0) {
            return -1;
        }
        if(grid[0] == null || grid[0].length == 0) {
            return -1;
        }

        int n = grid.length;
        int m = grid[0].length;
        int human = 0;
        Queue<Coordinate> queue = new LinkedList();
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < m ; j++) {
                if(grid[i][j] == HUMAN) {
                    human++;
                } else if (grid[i][j] == ZOMBIE){
                    queue.offer(new Coordinate(i,j));
                }
            }
        }

        if(human == 0) {
            return 0;
        }

        int days = 0;
        while(!queue.isEmpty()) {
            int size = queue.size();
            days++;
            for(int i = 0 ; i < size ; i++) {
                Coordinate zb = queue.poll();

                for(int direction = 0 ; direction < 4 ; direction++) {

                    int newX = zb.x + deltaX[direction];
                    int newY = zb.y + deltaY[direction];
                    // Coordinate nCoor = new Coordinate(newX, newY);
                    if(!isHuman(grid, newX, newY)) {
                        continue;
                    }
                    grid[newX][newY] = ZOMBIE;
                    human--;
                    if(human == 0) {
                        return days;
                    }
                    queue.offer(new Coordinate(newX, newY));
                }
            }
        }
        return -1;
    }

    private boolean isHuman(int[][] grid, int x, int y) {
        int n = grid.length;
        int m = grid[0].length;
        if(x < 0 || x >= n || y < 0 || y >= m) {
            return false;
        }
        return (grid[x][y] == HUMAN);
    }
}
```

## <a name='120'>120. 单词接龙

**[链接](https://www.lintcode.com/problem/word-ladder/)**

**描述**
给出两个单词（start 和 end）和一个字典，找出从 start 到 end 的最短转换序列，输出最短序列的长度。

变换规则如下：

1. 每次只能改变一个字母。
2. 变换过程中的中间单词必须在字典中出现。(起始单词和结束单词不需要出现在字典中)

**样例**

```
样例 1:

输入：start = "a"，end = "c"，dict =["a","b","c"]
输出：2
解释：
"a"->"c"
样例 2:

输入：start ="hit"，end = "cog"，dict =["hot","dot","dog","lot","log"]
输出：5
解释：
"hit"->"hot"->"dot"->"dog"->"cog"
```

```java
public class Solution {
    /*
     * @param start: a string
     * @param end: a string
     * @param dict: a set of string
     * @return: An integer
     */
    public int ladderLength(String start, String end, Set<String> dict) {
        // write your code here
        if(start == null || start.length() == 0) {
          return 0;
        }
        if(end == null || end.length() == 0) {
          return 0;
        }
        dict.add(start);
        dict.add(end);

        Set<String> visited = new HashSet();
        Queue<String> queue = new LinkedList();
        queue.offer(start);
        visited.add(start);

        int count = 1;
        while(!queue.isEmpty()) {
          int size = queue.size();
          count++;
          for(int i = 0 ; i < size; i++) {
            String str = queue.poll();
            for(String nextWord : getNextWords(dict, str, visited)) {
              // if (visited.contains(nextWord)) {
              //   continue;
              // }
              if (nextWord.equals(end)) {
                  return count;
              }
              visited.add(nextWord);				//存入新单词
              queue.offer(nextWord);
            }
          }
        }

        return 0;
    }

    private List<String> getNextWords(Set<String> dict, String current, Set<String> visited) {
      List<String> nextWords = new ArrayList();
      for(String str : dict) {
        int diff = 0;
        if(visited.contains(str)) {
          continue;
        }
        for(int i = 0 ; i < str.length() ; i++) {
          char c = str.charAt(i);
          char cc = current.charAt(i);
          if(c != cc) {
            diff++;
          }
        }
        if(diff == 1) {
          nextWords.add(str);
        }
      }
      return nextWords;
    }
}
```

## <a name='1225'>1225. 岛的周长

**[链接](https://www.lintcode.com/problem/1225/)**

**描述**

给定一张用二维数组表示的网格地图，其中 1 表示陆地单元格，0 表示水域单元格。网格地图中的单元格视为水平/垂直相连（斜向不相连）。这个网格地图四周完全被水域包围着，并且其中有且仅有一个岛（定义为一块或多块相连的陆地单元格）。这个岛不包含湖（定义为不和外围水域相连的水域单元格）。一个地图单元格是边长为 1 的一个正方形；网格地图是一个矩形，并且它的长和宽不超过 100。你要做的是求出这个岛的周长。

**样例**

```
样例
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]

答案：16
```

```java
class Island {
  public int x;
  public int y;
  public int length;
  public Island(int x, int y, int length) {
    this.x = x;
    this.y = y;
    this.length = length;
  }
}
public class Solution {
    private int[] deltaX = new int[]{-1, 0, 1, 0};
    private int[] deltaY = new int[]{0, 1, 0, -1};

    private int length = 0;
    /**
     * @param grid: a 2D array
     * @return: the perimeter of the island
     */
    public int islandPerimeter(int[][] grid) {
        // Write your code here
        int n = grid.length;
        int m = grid[0].length;
        Island[][] paths = new Island[n][m];

        Queue<Island> queue = new LinkedList();
        for(int i = 0 ; i < n ; i++) {
          if(!queue.isEmpty()) {
            break;
          }
          for(int j = 0 ; j < m ; j++) {
            if(grid[i][j] == 1) {
              Island island = new Island(i,j,4);
              queue.offer(island);
              paths[i][j] = island;
              length += 4;
              break;
            }
          }
        }
        bfs(grid, queue, paths);

        return length;
    }

    private void bfs(int[][]grid, Queue<Island> queue, Island[][] paths) {
      while(!queue.isEmpty()) {
        Island island = queue.poll();
        for(int direction = 0 ; direction < 4 ; direction++) {
          int newX = island.x + deltaX[direction];
          int newY = island.y + deltaY[direction];
          if(isValid(grid, newX, newY, island, paths)) {
            if(paths[newX][newY] != null) {
              if(paths[newX][newY].length > 0) {
                paths[newX][newY].length -= 1;
                length -= 1;
              }
              continue;
            }
            Island newIsland = new Island(newX, newY,3);
            paths[newX][newY] = newIsland;
            length += 3;
            queue.offer(newIsland);
          }
        }
      }
    }

    private boolean isValid(int[][] grid, int x, int y, Island island, Island[][] paths) {
      if(x < 0 || x >= grid.length) {
        return false;
      }
      if(y < 0 || y >= grid[0].length) {
        return false;
      }
      if(grid[x][y] == 1) {
        return true;
      }
      return false;
    }
}
```
