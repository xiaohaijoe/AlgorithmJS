## 索引

1. <a href="#69">69. 二叉树的层次遍历（中等）</a>
2. <a href="#7">7. 二叉树的序列化和反序列化（中等）</a>
3. <a href="#70">70. 二叉树的层次遍历 II（中等）</a>
4. <a href="#71">71. 二叉树的锯齿形层次遍历（中等）</a>
5. <a href="#242">242. 将二叉树按照层级转化为链表（简单）</a>
6. <a href="#178">178. 图是否是树（中等）</a>
7. <a href="#127">127. 拓扑排序（中等）</a>

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
