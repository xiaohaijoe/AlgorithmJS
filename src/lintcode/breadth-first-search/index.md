## 索引

1. <a href="#69">69. 二叉树的层次遍历（中等）</a>
2. <a href="#7">7. 二叉树的序列化和反序列化（中等）</a>
3. <a href="#70">70. 二叉树的层次遍历 II（中等）</a>
4. <a href="#71">71. 二叉树的锯齿形层次遍历（中等）</a>
5. <a href="#242">242. 将二叉树按照层级转化为链表（简单）</a>

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
