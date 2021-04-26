## 索引

1. <a href="#66">66. 二叉树的前序遍历（简单）</a>
2. <a href="#67">67. 二叉树的中序遍历（简单）</a>
3. <a href="#97">97. 二叉树的最大深度（简单）</a>
4. <a href="#480">480. 二叉树的所有路径（简单）</a>
5. <a href="#596">596. 最小子树（简单）</a>
6. <a href="#93">93. 平衡二叉树（简单）</a>
7. <a href="#597">597. 具有最大平均数的子树（简单）</a>
8. <a href="#1311">1311. 二叉搜索树的最近公共祖先（简单）</a>
9. <a href="#95">95. 验证二叉查找树（中等）</a>
10. <a href="#86">86. 二叉查找树迭代器（困难）</a>
11. <a href="#448">448. 二叉查找树的中序后继（中等）</a>
12. <a href="#85">85. 在二叉查找树中插入节点（简单）</a>
13. <a href="#593">593. 根据前序和后序遍历构造二叉树（中等）</a>

## 分治法(Divide Conquer Algorithm)

**遍历法 vs 分治法**

- 它们都是递归算法

  - 遍历法结果保存在参数中，分治法结果以函数返回值返回
  - 遍历法从上->下，分治法从下->上
  - 分治法例子：归并排序(Merge Sort)，快速排序(Quick Sort)
  - 使用分治法可以解决 90%二叉树问题！

- DFS 深度优先搜索
  - 用递归实现
    - 分治法（Divide Conquer）
    - 遍历法（Traversal）
  - 用非递归实现

## 前序遍历的三种写法

- 遍历法（Taversal）
- 分治法（Divide Conquer）
- 非递归法（Non Recursion）

```javascript
// 前序遍历的三种写法
class SolutionPostOrder {
  postorderTraversal(root) {
    const helper = (root, result) => {
      if (root == null) {
        return null;
      }

      result.push(root.val);
      helper(root.left, result);
      helper(root.right, result);
    };
    const result = [];
    helper(root, result);
    return result;
  }

  postorderDivideConquer(root) {
    const helper = (root) => {
      const result = [];
      if (root == null) {
        return result;
      }

      const left = helper(root.left);
      const right = helper(root.right);

      result.push(root.val);
      result.push(...left);
      result.push(...right);

      return result;
    };
    const result = helper(root);
    return result;
  }

  postorderNonRecursion(root) {
    const result = [];
    if (root == null) {
      return result;
    }

    const stack = [];
    stack.push(root);
    while (stack.length !== 0) {
      const node = stack.pop();
      result.push(node.val);
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
    }
    return result;
  }

  static test() {
    const solution = new SolutionPostOrder();
    const root = {
      val: 2,
      left: {
        val: 1,
        left: {
          val: 4,
        },
        right: {
          val: 5,
        },
      },
      right: {
        val: 3,
      },
    };
    const a = solution.postorderTraversal(root);
    const b = solution.postorderDivideConquer(root);
    const c = solution.postorderNonRecursion(root);
    console.log(a, b, c);
  }
}
```

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

## <a name='1311'>1311. 二叉搜索树的最近公共祖先

**[链接](https://www.lintcode.com/problem/1311/)**

**描述**
给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

**样例**

```
样例 1:

输入:
{6,2,8,0,4,7,9,#,#,3,5}
2
8
输出: 6
解释: 节点 2 和节点 8 的最近公共祖先是 6。
样例 2:

输入:
{6,2,8,0,4,7,9,#,#,3,5}
2
4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
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
     * @param root: root of the tree
     * @param p: the node p
     * @param q: the node q
     * @return: find the LCA of p and q
     */
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == null || root == p || root == q) {
            return root;
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if(left != null && right != null) {
            return root;
        }
        if(left != null) {
            return left;
        }
        if(right != null) {
            return right;
        }
        return null;
    }
}
```

## <a name='95'>95. 验证二叉查找树

**[链接](https://www.lintcode.com/problem/validate-binary-search-tree/)**

**描述**
给定一个二叉树，判断它是否是合法的二叉查找树(BST)

一棵 BST 定义为：

- 节点的左子树中的值要严格小于该节点的值。
- 节点的右子树中的值要严格大于该节点的值。
- 左右子树也必须是二叉查找树。
- 一个节点的树也是二叉查找树。

**样例**

```
样例 1:

输入：{-1}
输出：true
解释：
二叉树如下(仅有一个节点）:
	-1
这是二叉查找树。
样例 2:

输入：{2,1,4,#,#,3,5}
输出：true
解释：
	二叉树如下：
	  2
	 / \
	1   4
	   / \
	  3   5
这是二叉查找树。
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
    public boolean isBST;
    public TreeNode maxNode;
    public TreeNode minNode;
    public ResultType(boolean isBST, TreeNode maxNode, TreeNode minNode) {
        this.isBST = isBST;
        this.maxNode = maxNode;
        this.minNode = minNode;
    }
}

public class Solution {
    /**
     * @param root: The root of binary tree.
     * @return: True if the binary tree is BST, or false
     */
    public boolean isValidBST(TreeNode root) {
        // write your code here
        ResultType result = helper(root);
        return result.isBST;

    }

    private ResultType helper(TreeNode root) {
        ResultType result = new ResultType(true, null, null);
        if(root == null) {
            return result;
        }

        ResultType left = helper(root.left);
        ResultType right = helper(root.right);

        if(!left.isBST || !right.isBST) {
            return new ResultType(false, null, null);
        }

        if(left.maxNode != null && left.maxNode.val >= root.val) {
            return new ResultType(false, null, null);
        }
        if(right.minNode != null && right.minNode.val <= root.val) {
            return new ResultType(false, null, null);
        }

        TreeNode maxNode = right.maxNode != null ? right.maxNode : root;
        TreeNode minNode = left.minNode != null ? left.minNode : root;
        return new ResultType(true, maxNode, minNode);

    }
}
```

## <a name='453'>453. 将二叉树拆成链表

**[链接](https://www.lintcode.com/problem/flatten-binary-tree-to-linked-list/)**

**描述**
将一棵二叉树按照前序遍历拆解成为一个 假链表。所谓的假链表是说，用二叉树的 right 指针，来表示链表中的 next 指针。

**样例**

```
样例 1：

输入：{1,2,5,3,4,#,6}
输出：{1,#,2,#,3,#,4,#,5,#,6}
解释：
     1
    / \
   2   5
  / \   \
 3   4   6

1
\
 2
  \
   3
    \
     4
      \
       5
        \
         6
样例 2：

输入：{1}
输出：{1}
解释：
         1
         1
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
     * @param root: a TreeNode, the root of the binary tree
     * @return: nothing
     */
    public void flatten(TreeNode root) {
        // write your code here
        helper(root);
    }

    private TreeNode helper(TreeNode root) {
        if(root == null) {
            return null;
        }

        // 获取左叶子节点（最后一个节点）
        TreeNode leftLast = helper(root.left);
        // 获取右叶子节点（最后一个节点）
        TreeNode rightLast = helper(root.right);

        if(leftLast != null) {
            leftLast.right = root.right;
            root.right = root.left;
            root.left = null;
        }

        if(rightLast != null) {
            return rightLast;
        }

        if(leftLast != null) {
            return leftLast;
        }

        return root;
    }
}
```

## <a name='86'>86. 二叉查找树迭代器

**[链接](https://www.lintcode.com/problem/flatten-binary-tree-to-linked-list/)**

**描述**
设计实现一个带有下列属性的二叉查找树的迭代器：

next()返回 BST 中下一个最小的元素

- 元素按照递增的顺序被访问（比如中序遍历）
- next()和 hasNext()的询问操作要求均摊时间复杂度是 O(1)

**样例**

```
样例 1:

输入：{10,1,11,#,6,#,12}
输出：[1, 6, 10, 11, 12]
解释：
二叉查找树如下 :
  10
  /\
 1 11
  \  \
   6  12
可以返回二叉查找树的中序遍历 [1, 6, 10, 11, 12]
样例 2:

输入：{2,1,3}
输出：[1,2,3]
解释：
二叉查找树如下 :
  2
 / \
1   3
可以返回二叉查找树的中序遍历 [1,2,3]
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
 * Example of iterate a tree:
 * BSTIterator iterator = new BSTIterator(root);
 * while (iterator.hasNext()) {
 *    TreeNode node = iterator.next();
 *    do something for node
 * }
 */


public class BSTIterator {
    private ArrayList<TreeNode> array = new ArrayList<>();
    /**
    * @param root: The root of binary tree.
    */
    public BSTIterator(TreeNode root) {
        // do intialization if necessary
        // 构造
        this.array = helper(root);
    }

    private ArrayList<TreeNode> helper(TreeNode root) {
        ArrayList<TreeNode> result = new ArrayList<>();
        if(root == null) {
            return result;
        }

        ArrayList<TreeNode> leftArray = helper(root.left);
        ArrayList<TreeNode> rightArray = helper(root.right);

        result.addAll(leftArray);
        result.add(root);
        result.addAll(rightArray);

        return result;
    }

    /**
     * @return: True if there has next node, or false
     */
    public boolean hasNext() {
        // write your code here
        if(this.array.size() == 0) {
            return false;
        }
        return true;
    }

    /**
     * @return: return next node
     */
    public TreeNode next() {
        // write your code here
        TreeNode node = this.array.get(0);
        this.array.remove(0);
        return node;
    }
}
```

## <a name='448'>448. 二叉查找树的中序后继

**[链接](https://www.lintcode.com/problem/448/)**

**描述**
给定一个二叉查找树(什么是二叉查找树)，以及一个节点，求该节点在中序遍历的后继，如果没有则返回 null

**样例**

```
样例 1:

输入: {1,#,2}, node with value 1
输出: 2
解释:
  1
   \
    2
样例 2:

输入: {2,1,3}, node with value 1
输出: 2
解释:
    2
   / \
  1   3
二叉树的表示
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    /*
     * @param root: The root of the BST.
     * @param p: You need find the successor node of p.
     * @return: Successor of p.
     */
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        if (root == null || p == null) {
            return null;
        }

        if (root.val <= p.val) {
            return inorderSuccessor(root.right, p);
        } else {
            TreeNode left = inorderSuccessor(root.left, p);
            return (left != null) ? left : root;
        }
    }
}
```

## <a name='11'>11. 二叉查找树中搜索区间

**[链接](https://www.lintcode.com/problem/11)**

**描述**
给定一个二叉查找树和范围[k1, k2]。按照升序返回给定范围内的节点值。

**样例**

```
样例 1:

输入：{5},6,10
输出：[]
        5
它将被序列化为 {5}
没有数字介于6和10之间
样例 2:

输入：{20,8,22,4,12},10,22
输出：[12,20,22]
解释：
        20
       /  \
      8   22
     / \
    4   12
它将被序列化为 {20,8,22,4,12}
[12,20,22]介于10和22之间
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
    private ArrayList<Integer> array = new ArrayList<Integer>();
    /**
     * @param root: param root: The root of the binary search tree
     * @param k1: An integer
     * @param k2: An integer
     * @return: return: Return all keys that k1<=key<=k2 in ascending order
     */
    public ArrayList<Integer> searchRange(TreeNode root, int k1, int k2) {
        // write your code here
        helper(root, k1, k2);
        return this.array;
    }

    private void helper(TreeNode root, int k1, int k2) {
        if(root == null) {
            return;
        }
        // 剪枝，如果当前节点小于等于k1，不必访问左子树
        if (root.val > k1) {
            helper(root.left, k1, k2);
        }
        if (k1 <= root.val && root.val <= k2) {
            this.array.add(root.val);
        }
        // 剪枝，如果当前节点大于等于k2，不必访问右子树
        if (root.val < k2) {
            helper(root.right, k1, k2);
        }

    }
}
```

## <a name='85'>85. 在二叉查找树中插入节点

**[链接](https://www.lintcode.com/problem/insert-node-in-a-binary-search-tree/)**

**描述**

给定一棵二叉查找树和一个新的树节点，将节点插入到树中。

你需要保证该树仍然是一棵二叉查找树。

**样例**

```
样例  1:
	输入: tree = {}, node= 1
	输出: {1}

	样例解释:
	在空树中插入一个点，应该插入为根节点。


样例 2:
	输入: tree = {2,1,4,3}, node = 6
	输出: {2,1,4,3,6}

	样例解释:
	如下：

	  2             2
	 / \           / \
	1   4   -->   1   4
	   /             / \
	  3             3   6
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
    private TreeNode result;
    /*
     * @param root: The root of the binary search tree.
     * @param node: insert this node into the binary search tree
     * @return: The root of the new binary search tree.
     */
    public TreeNode insertNode(TreeNode root, TreeNode node) {
        // write your code here
        if(root == null) {
            return node;
        }
        helper(root, node);
        return root;
    }

    private TreeNode helper(TreeNode root, TreeNode node) {
        if(root == null) {
            return null;
        }
        if(root.val > node.val) {
            helper(root.left, node);
        }
        if(root.val <= node.val) {
            helper(root.right, node);
        }

        if(root.left == null && root.val > node.val) {
            root.left = node;
        }
        if(root.right == null && root.val <= node.val) {
            root.right = node;
        }
        return root;
    }
}
```

## <a name='593'>593. 根据前序和后序遍历构造二叉树

**[链接](https://www.lintcode.com/problem/1593/)**

**描述**

返回与给定的前序和后序遍历匹配的任何二叉树。

pre 和 post 遍历中的值是不同的正整数。

**样例**

```
样例 1:

输入：pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1]
输出：[1,2,3,4,5,6,7]
解释：
     1
    / \
   2   3
  / \ / \
 4  5 6  7
样例 2:

输入：pre = [1,2,3,4], post = [3,2,4,1]
输出：[1,2,4,3]
解释：
   1
  / \
 2   4
 /
3
```

**笔记**

题解： 左边分支有 L 个节点。左边分支头节点是 pre1,但是也是左边分支后序遍历的最后一个。所以 pre1 = postL-1。因此，L = post.indexOf(pre1) + 1。 在递归过程中，左边分支节点位于 pre1 : L + 1 和 post0 : L 中，右边分支节点位于 preL+1 : N 和 postL : N-1 中。(不包括区间右端点)

```javascript
const pre = [1, 2, 4, 5, 3, 6, 7];
//           ^  ^     ^        ^
//           |  +1  +1+len     |
//        preStart           preEnd

//      len: position - postStart
//            |-----|
const post = [4, 5, 2, 6, 7, 3, 1];
//            ^     ^           ^
//            |    pos          |
//        postStart          postEnd
// root.left: 
// 左子树前序遍历pre: preStart + 1 ~ preStart + 1 + (position - postStart)
// 左子树后序遍历post: postStart ~ position 
// root.right: 
// 右子树前序遍历pre: preStart + 1 + (position - postStart) + 1 ~ preEnd
// 右子树后序遍历post: position + 1 ~ postEnd - 1
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
    public TreeNode constructFromPrePost(int[] pre, int[] post) {
        // write your code here
        return buildTree(pre, 0, pre.length - 1, post, 0, post.length - 1);
    }

    private TreeNode buildTree(int[] pre, int preStart, int preEnd, int[] post, int postStart, int postEnd) {
      if(preStart > preEnd) {
        return null;
      }
      if(postStart > preEnd) {
        return null;
      }

      TreeNode root = new TreeNode(pre[preStart]);

      if (preStart == preEnd || postStart == postEnd) {
        return root;
      }
      int position = 0;
      for(int i = 0; i < post.length ; i++) {
        if(post[i] == pre[preStart+1]) {
          position = i;
        }
      }

      // 前序遍历开始-结束，后序遍历开始-结束
      root.left = buildTree(
        pre,
        preStart + 1,
        preStart + 1 + position - postStart,
        post,
        postStart,
        position
        );
      root.right = buildTree(
        pre,
        preStart + 1 + position - postStart + 1 ,
        preEnd,
        post,
        position + 1,
        postEnd - 1
        );

      return root;
    }
}
```
