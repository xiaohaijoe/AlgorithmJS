## 索引

1. <a href="#66">66. 二叉树的前序遍历（简单）</a>
2. <a href="#67">67. 二叉树的中序遍历（简单）</a>
3. <a href="#97">97. 二叉树的最大深度（简单）</a>
4. <a href="#480">480. 二叉树的所有路径（简单）</a>
5. <a href="#596">596. 最小子树（简单）</a>

## 分治法(Divide Conquer Algorithm)

**遍历法 vs 分治法**

- 它们都是递归算法

  - 遍历法结果保存在参数中，分治法结果以函数返回值返回
  - 遍历法从上->下，分治法从下->上
  - 分治法例子：归并排序(Merge Sort)，快速排序(Quick Sort)
  - 使用分治法可以解决 90%二叉树问题！

- DFS 深度优先搜索
  - 用递归实现
    - 分治法
    - 遍历法
  - 用非递归实现

## <a name='66'>66. 二叉树的前序遍历

**[链接](https://www.lintcode.com/problem/binary-tree-preorder-traversal/)**

**描述**
给出一棵二叉树，返回其节点值的前序遍历。

**样例**

```
样例 1:

输入：{1,2,3}
输出：[1,2,3]
解释：
   1
  / \
 2   3
它将被序列化为{1,2,3}
前序遍历
样例 2:

输入：{1,#,2,3}
输出：[1,2,3]
解释：
1
 \
  2
 /
3
它将被序列化为{1,#,2,3}
前序遍历
```

**利用分治法(Divide Conquer)**

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
     * @return: Preorder in ArrayList which contains node values.
     */
    public ArrayList<Integer> preorderTraversal(TreeNode root) {
        // write your code here
        ArrayList<Integer> result = new ArrayList<Integer>();
        if(root == null) {
            return result;
        }

        ArrayList<Integer> left = preorderTraversal(root.left);
        ArrayList<Integer> right = preorderTraversal(root.right);

        result.add(root.val);
        result.addAll(left);
        result.addAll(right);

        return result;
    }
}
```

**利用非递归(non-recursion)**

```java

public class Solution {
    /**
     * @param root: A Tree
     * @return: Preorder in ArrayList which contains node values.
     */
    public ArrayList<Integer> preorderTraversal(TreeNode root) {
        // write your code here
        ArrayList<Integer> result = new ArrayList<Integer>();
        if(root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<TreeNode>();
        stack.push(root);
        while(!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            if(node.right != null) {
                stack.push(node.right);
            }
            if(node.left != null) {
                stack.push(node.left);
            }
        }

        return result;
    }
}
```

## <a name='67'>67. 二叉树的中序遍历

**[链接](https://www.lintcode.com/problem/binary-tree-inorder-traversal/)**

**描述**
给出一棵二叉树,返回其中序遍历

**样例**

```
样例 1:

输入：{1,2,3}
输出：[2,1,3]
解释：
   1
  / \
 2   3
它将被序列化为{1,2,3}
中序遍历
样例 2:

输入：{1,#,2,3}
输出：[1,3,2]
解释：
1
 \
  2
 /
3
它将被序列化为{1,#,2,3}
中序遍历
```

**利用分治法(Divide Conquer)**

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
     * @return: Inorder in ArrayList which contains node values.
     */
    public ArrayList<Integer> inorderTraversal(TreeNode root) {
        // write your code here
        ArrayList<Integer> result = new ArrayList<Integer>();
        if(root == null) {
            return result;
        }

        ArrayList<Integer> left = inorderTraversal(root.left);
        ArrayList<Integer> right = inorderTraversal(root.right);

        result.addAll(left);
        result.add(root.val);
        result.addAll(right);

        return result;
    }
}
```

**利用非递归(non-recursion)**

```java

public class Solution {
    /**
     * @param root: A Tree
     * @return: Inorder in ArrayList which contains node values.
     */
    public ArrayList<Integer> inorderTraversal(TreeNode root) {
        // write your code here
        ArrayList<Integer> result = new ArrayList<Integer>();
        if(root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode curt = root;
        while (curt != null || !stack.isEmpty()) {
            while (curt != null) {
                stack.add(curt);
                curt = curt.left;
            }
            curt = stack.pop();
            result.add(curt.val);
            curt = curt.right;
        }
        return result;
    }
}
```

## <a name='97'>97. 二叉树的中序遍历

**[链接](https://www.lintcode.com/problem/maximum-depth-of-binary-tree/)**

**描述**
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的距离。

**样例**

```
样例 1:

输入: tree = {}
输出: 0
样例解释: 空树的深度是0。
样例 2:

输入: tree = {1,2,3,#,#,4,5}
输出: 3
样例解释: 树表示如下，深度是3
   1
  / \
 2   3
    / \
   4   5
它将被序列化为{1,2,3,#,#,4,5}
```

**利用分治法(Divide Conquer)**

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
     * @param root: The root of binary tree.
     * @return: An integer
     */
    public int maxDepth(TreeNode root) {
        // write your code here
        if(root == null) {
            return 0;
        }

        int left = maxDepth(root.left);
        int right = maxDepth(root.right);

        return Math.max(left, right) + 1;
    }
}
```

## <a name='480'>480. 二叉树的所有路径

**[链接](https://www.lintcode.com/problem/binary-tree-paths/)**

**描述**
给一棵二叉树，找出从根节点到叶子节点的所有路径。

**样例**

```
样例 1:

输入：{1,2,3,#,5}
输出：["1->2->5","1->3"]
解释：
   1
 /   \
2     3
 \
  5
样例 2:

输入：{1,2}
输出：["1->2"]
解释：
   1
 /
2
```

**利用分治法(Divide Conquer)**

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
     * @param root: the root of the binary tree
     * @return: all root-to-leaf paths
     */
    public ArrayList<String> binaryTreePaths(TreeNode root) {
        // write your code here
        ArrayList<String> result = new ArrayList<String>();
        if(root == null) {
            return result;
        }

        ArrayList<String> leftPaths = binaryTreePaths(root.left);
        ArrayList<String> rightPaths = binaryTreePaths(root.right);

        for (String path : leftPaths) {
            result.add(root.val + "->" + path);
        }
        for (String path : rightPaths) {
            result.add(root.val + "->" + path);
        }

        if(result.size() == 0) {
            result.add("" + root.val);
        }
        return result;
    }
}
```

## <a name='596'>596. 最小子树

**[链接](https://www.lintcode.com/problem/minimum-subtree/)**

**描述**
给一棵二叉树, 找到和为最小的子树, 返回其根节点。

输入输出数据范围都在 int 内。

**样例**

```
样例 1:

输入:
{1,-5,2,1,2,-4,-5}
输出:1
说明
这棵树如下所示：
     1
   /   \
 -5     2
 / \   /  \
1   2 -4  -5
整颗树的和是最小的，所以返回根节点1.
样例 2:

输入:
{1}
输出:1
说明:
这棵树如下所示：
   1
这棵树只有整体这一个子树，所以返回1.
```

**利用分治法(Divide Conquer)**

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
    private TreeNode subtree;
    private int subtreeSum = Integer.MAX_VALUE;
    /**
     * @param root: the root of binary tree
     * @return: the root of the minimum subtree
     */
    public TreeNode findSubtree(TreeNode root) {
        // write your code here

        helper(root);
        return subtree;
    }

    private int helper(TreeNode root) {
        if(root == null) {
            return 0;
        }

        int left = helper(root.left);
        int right = helper(root.right);

        int sum = left + right + root.val;
        if(sum <= subtreeSum) {
            subtree = root;
            subtreeSum = sum;
        }
        return sum;
    }
}
```
