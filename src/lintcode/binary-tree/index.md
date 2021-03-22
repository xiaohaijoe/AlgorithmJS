## 索引

1. <a href="#66">66. 二叉树的前序遍历（简单）</a>
2. <a href="#67">67. 二叉树的中序遍历（简单）</a>

## 二叉树

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

## 利用分治法(Divide Conquer)

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

## 利用非递归(non-recursion)

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

## 利用分治法(Divide Conquer)

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

## 利用非递归(non-recursion)

```java

```
