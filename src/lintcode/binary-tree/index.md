## 索引

1. <a href="#66">66. 二叉树的前序遍历（简单）</a>
2. <a href="#67">67. 二叉树的中序遍历（简单）</a>
3. <a href="#97">97. 二叉树的最大深度（简单）</a>
4. <a href="#93">93. 平衡二叉树（简单）</a>
5. <a href="#597">597. 具有最大平均数的子树（简单）</a>

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

## <a name='67'>67. 二叉树的中序遍历

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

## <a name='93'>93. 平衡二叉树

**[链接](https://www.lintcode.com/problem/balanced-binary-tree/)**

**描述**
给定一个二叉树,确定它是高度平衡的。对于这个问题,一棵高度平衡的二叉树的定义是：

一棵二叉树中每个节点的两个子树的深度相差不会超过 1。

**样例**

```
样例  1:
	输入: tree = {1,2,3}
	输出: true

	样例解释:
	如下，是一个平衡的二叉树。
		  1
		 / \
		2  3


样例  2:
	输入: tree = {3,9,20,#,#,15,7}
	输出: true

	样例解释:
	如下，是一个平衡的二叉树。
		  3
		 / \
		9  20
		  /  \
		 15   7


样例  2:
	输入: tree = {1,#,2,3,4}
	输出: false

	样例解释:
	如下，是一个不平衡的二叉树。1的左右子树高度差2
		  1
		   \
		   2
		  /  \
		 3   4
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

class ResultType {
    public int maxDepth;
    public int depth;
    public boolean isBalanced;
    public ResultType(boolean isBalanced, int depth, int maxDepth) {
        this.isBalanced = isBalanced;
        this.depth = depth;
        this.maxDepth = maxDepth;
    }
}

public class Solution {
    /**
     * @param root: The root of binary tree.
     * @return: True if this Binary tree is Balanced, or false.
     */
    public boolean isBalanced(TreeNode root) {
        // write your code here
        ResultType node = helper(root, 0);
        return node.isBalanced;
    }

    private ResultType helper(TreeNode root, int depth) {
        if(root == null) {
            return new ResultType(true, depth, 0);
        }

        ResultType left = helper(root.left, depth + 1);
        ResultType right = helper(root.right, depth + 1);

        if(!left.isBalanced || !right.isBalanced) {
            return new ResultType(false, depth, -1);
        }

        if(Math.abs(left.maxDepth - right.maxDepth) > 1) {
            return new ResultType(false, depth, -1);
        }

        return new ResultType(true, depth, Math.max(left.maxDepth, right.maxDepth) + 1);
    }
}
```

## <a name='597'>597. 具有最大平均数的子树

**[链接](https://www.lintcode.com/problem/subtree-with-maximum-average/)**

**描述**
给一棵二叉树，找到有最大平均值的子树。返回子树的根结点。

**样例**

```
样例1

输入：
{1,-5,11,1,2,4,-2}
输出：11
说明:
这棵树如下所示：
     1
   /   \
 -5     11
 / \   /  \
1   2 4    -2
11子树的平均值是4.333，为最大的。
样例2

输入：
{1,-5,11}
输出：11
说明:
     1
   /   \
 -5     11
1,-5,11 三棵子树的平均值分别是 2.333,-5,11。因此11才是最大的
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

class ResultType {
    public int count;
    public int sum;
    public ResultType(int count, int sum) {
        this.count = count;
        this.sum = sum;
    }
}
public class Solution {
    private ResultType subtreeResult;
    private TreeNode subtree;
    /**
     * @param root: the root of binary tree
     * @return: the root of the maximum average of subtree
     */
    public TreeNode findSubtree2(TreeNode root) {
        // write your code here
        helper(root);
        return subtree;
    }

    private ResultType helper(TreeNode root) {
        if(root == null) {
            return new ResultType(0,0);
        }

        ResultType left = helper(root.left);
        ResultType right = helper(root.right);

        int count = left.count + right.count + 1;
        int sum = left.sum + right.sum + root.val;
        ResultType result = new ResultType(count, sum);
        if(subtree == null || subtreeResult.sum * result.count < result.sum * subtreeResult.count) {
            subtreeResult = result;
            subtree = root;
        }

        return result;
    }
}
```
