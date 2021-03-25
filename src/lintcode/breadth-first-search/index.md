## 索引

1.

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
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()) {
            String level = "";
            int size = queue.size();
            for(int i = 0 ; i < size ; i++) {
                TreeNode node = queue.poll();
                if(node.left != null) {
                    queue.offer(node.left);
                }
                if(node.right != null) {
                    queue.offer(node.right);
                }
                if(level.length() == 0) {
                    level += node.val;
                } else {
                    level += "," + node.val;
                }
            }
            result += level;
        }
        return "{" + result + "}";
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
        if(data == null || data.length() <= 2) {
            return null;
        }
        String substring = data.substring(1, data.length() - 2);
        String[] strs = substring.split(",");

        TreeNode root = new TreeNode(0);
        helper(root, strs, 0, 1);
        return root.left;
    }

    private void helper(TreeNode root, String[] strs, int nextStart, int nextEnd) {
        int i = nextStart;
        while(i < nextEnd && i < strs.length) {
            String val = strs[i];
            boolean left = i % 2 == 0;
            if(val == "#") {

            } else {
                TreeNode node = new TreeNode(Integer.parseInt(val));
                if(left) {
                    root.left = node;
                } else {
                    root.right = node;
                }
                helper(node, strs, nextEnd, 2 * nextEnd + 1);
            }
            i++;
        }
        
    }
}
```
