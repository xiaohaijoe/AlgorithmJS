**索引**

1. <a href="#135">135. 数字组合（中等）</a>
2. <a href="#153">153. 数字组合 II（中等）</a>
3. <a href="#136">136. 分割回文串（中等）</a>
4. <a href="#15">15. 全排列（中等）</a>
5. <a href="#16">16. 带重复元素的排列（中等）</a>
6. <a href="#33">33. N 皇后问题（中等）</a>
7. <a href="#121">121. 单词接龙 II（困难）</a>

**必背算法**

1. <a href="#66">二叉树的前序遍历 Binary Tree Preorder Traversal</a>
2. <a href="#67">二叉树中序遍历 Binary Tree Inorder Traversal</a>
3. <a href="68">二叉树后序遍历 Binary Tree Postorder Traversal<a>
4. 二叉查找树迭代器 Binary Search Tree Iterator
5. <a href="17">子集 Subsets</a>
6. <a href="15">全排列 Permutations</a>

**提示**

- 碰到让你找所有方案的题，一定是 DFS
- 90%DFS 的题，要么是排列，要么是组合

**递归三要素**
一般来说，如果面试官不特别要求的话，DFS 都可以使用递归(Recursion)的方式来实现。

递归三要素是实现递归的重要步骤：

- 递归的定义
- 递归的拆解
- 递归的出口

## <a name='135'>135. 数字组合

**[链接](https://www.lintcode.com/problem/combination-sum/)**

**描述**
给定一个候选数字的集合 candidates 和一个目标值 target.

找到 candidates 中所有的和为 target 的组合.

在同一个组合中, candidates 中的某个数字不限次数地出现.

**样例**

```
样例 1:

输入: candidates = [2, 3, 6, 7], target = 7
输出: [[7], [2, 2, 3]]
样例 2:

输入: candidates = [1], target = 3
输出: [[1, 1, 1]]
```

```java
public class Solution {
    /**
     * @param candidates: A list of integers
     * @param target: An integer
     * @return: A list of lists of integers
     */
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // write your code here
        List<List<Integer>> results = new ArrayList();
        if(candidates == null || candidates.length == 0) {
          return results;
        }
        List<Integer> temp = new ArrayList();
        int[] nums = removeDuplicates(candidates);
        dfs(nums, target, 0,temp, results);

        return results;
    }

    private int[] removeDuplicates(int[] candidates) {
      Arrays.sort(candidates);

      int index = 0;
      for(int i = 0 ; i < candidates.length ; i++) {
        if(candidates[i] != candidates[index]) {
          candidates[++index] = candidates[i];
        }
      }

      int[] nums = new int[index + 1];
      for (int i = 0; i < index + 1; i++) {
          nums[i] = candidates[i];
      }

      return nums;
    }

    private void dfs(int[] nums, int target, int start,List<Integer> temp, List<List<Integer>> results) {
      if(target == 0) {
        results.add(new ArrayList<Integer>(temp));
        return;
      }
      if(target < 0) {
        return;
      }

      for(int i = start ; i < nums.length ; i++) {
        temp.add(nums[i]);
        dfs(nums, target - nums[i], i, temp, results);
        temp.remove(temp.size() - 1);
      }
    }
}
```

## <a name='153'>153. 数字组合 II

**[链接](https://www.lintcode.com/problem/combination-sum-ii/)**

**描述**
给定一个数组 num 和一个整数 target.

找到 num 中所有的数字之和为 target 的组合.

1. 在同一个组合中, num 中的每一个数字仅能被使用一次.
2. 所有数值 (包括 target ) 都是正整数.
3. 返回的每一个组合内的数字必须是非降序的.
4. 返回的所有组合之间可以是任意顺序.
5. 解集不能包含重复的组合.

**样例**

```
样例 1:

输入: num = [7,1,2,5,1,6,10], target = 8
输出: [[1,1,6],[1,2,5],[1,7],[2,6]]
样例 2:

输入: num = [1,1,1], target = 2
输出: [[1,1]]
解释: 解集不能包含重复的组合
```

```java
public class Solution {
    /**
     * @param num: Given the candidate numbers
     * @param target: Given the target number
     * @return: All the combinations that sum to target
     */
    public List<List<Integer>> combinationSum2(int[] num, int target) {
        // write your code here
        List<List<Integer>> results = new ArrayList();
        if(num == null || num.length == 0) {
          return results;
        }

        Arrays.sort(num);
        List<Integer> combination = new ArrayList();
        dfs(num, target, 0, combination, results);

        return results;
    }

    private void dfs(int[] nums, int remainTarget, int start, List<Integer> combination, List<List<Integer>> results) {
      if(remainTarget == 0) {
        results.add(new ArrayList<Integer>(combination));
        return;
      }
      if(remainTarget < 0) {
        return;
      }

      for(int i = start ; i < nums.length; i++) {
        if(i != start && nums[i] == nums[i-1]) {
          continue;
        }
        combination.add(nums[i]);
        dfs(nums, remainTarget - nums[i], i + 1, combination, results);
        combination.remove(combination.size() - 1);
      }
    }
}
```

## <a name='136'>136. 分割回文串

**[链接](https://www.lintcode.com/problem/palindrome-partitioning/)**

**描述**
给定字符串 s, 需要将它分割成一些子串, 使得每个子串都是回文串.

返回所有可能的分割方案.

**样例**

```
样例 1:

输入: "a"
输出: [["a"]]
解释: 字符串里只有一个字符, 也就只有一种分割方式 (就是它本身)
样例 2:

输入: "aab"
输出: [["aa", "b"], ["a", "a", "b"]]
解释: 有两种分割的方式.
    1. 将 "aab" 分割成 "aa" 和 "b", 它们都是回文的.
    2. 将 "aab" 分割成 "a", "a" 和 "b", 它们全都是回文的.
```

**笔记**

- 所有的切割问题，都是组合问题
- n 个字符的切割问题，就是 n-1 个数字的组合问题

```
"abc" -> a 1 b 2 c
a b c -> [1,2] // 选择1和2作为切割位
ab c -> [2] // 选择2作为切割位
a bc -> [1] // 选择1作为切割位
abc -> [] // 没有切割位
```

```java
public class Solution {
    /*
     * @param s: A string
     * @return: A list of lists of string
     */
    public List<List<String>> partition(String s) {
        // write your code here
        List<List<String>> results = new ArrayList();
        if(s == null || s.length() == 0) {
          return results;
        }

        List<String> combination = new ArrayList();
        dfs(s, 0, combination, results);

        return results;
    }

    private void dfs(String s, int startIndex, List<String> combination, List<List<String>> results) {
      if(s.length() == startIndex){
        results.add(new ArrayList<String>(combination));
        return;
      }
      for(int i = startIndex; i < s.length() ; i++) {
        String substr = s.substring(startIndex, i+1);
        if(!isPalindrome(substr)){
          continue;
        }
        combination.add(substr);
        dfs(s, i+1, combination, results);
        combination.remove(combination.size() - 1);
      }

    }

    private boolean isPalindrome(String str) {
      int end = str.length() - 1;
      for(int i = 0 ; i < str.length() / 2 ; i++) {
        int s = str.charAt(i);
        int e = str.charAt(end);
        if(s != e) {
          return false;
        }
        end--;
      }
      return true;
    }
}
```

## <a name='15'>15. 全排列

**[链接](https://www.lintcode.com/problem/permutations/)**

**描述**
给定一个数字列表，返回其所有可能的排列。

**样例**

```
样例 1：

输入：[1]
输出：
[
  [1]
]
样例 2：

输入：[1,2,3]
输出：
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

```java
public class Solution {
    /*
     * @param nums: A list of integers.
     * @return: A list of permutations.
     */
    public List<List<Integer>> permute(int[] nums) {
        // write your code here
        List<List<Integer>> results = new ArrayList();
        if(nums == null) {
          return results;
        }

        List<Integer> combination = new ArrayList();
        boolean[] visited = new boolean[nums.length];
        dfs(nums, visited, combination, results);

        return results;
    }

    private void dfs(int[] nums, boolean[] visited, List<Integer> combination, List<List<Integer>> results) {
      if(combination.size() == nums.length) {
        results.add(new ArrayList<Integer>(combination));
        return;
      }

      for(int i = 0; i < nums.length ; i++) {
        if(visited[i]) {
          continue;
        }
        combination.add(nums[i]);
        visited[i] = true;
        dfs(nums, visited, combination, results);
        visited[i] = false;
        combination.remove(combination.size() - 1);
      }
    }
}
```

## <a name='16'>16. 带重复元素的排列

**[链接](https://www.lintcode.com/problem/permutations-ii/)**

**描述**
给出一个具有重复数字的列表，找出列表所有不同的排列。

**样例**

```
样例 1：

输入：[1,1]
输出：
[
  [1,1]
]
样例 2：

输入：[1,2,2]
输出：
[
  [1,2,2],
  [2,1,2],
  [2,2,1]
]
```

```java
public class Solution {
    /*
     * @param :  A list of integers
     * @return: A list of unique permutations
     */
    public List<List<Integer>> permuteUnique(int[] nums) {
        // write your code here
        List<List<Integer>> results = new ArrayList();
        if(nums == null) {
          return results;
        }

        Arrays.sort(nums);
        List<Integer> combination = new ArrayList();
        boolean[] visited = new boolean[nums.length];
        dfs(nums, visited, combination, results);

        return results;
    }

    private void dfs(int[] nums, boolean[] visited, List<Integer> combination, List<List<Integer>> results) {
      if(nums.length == combination.size()) {
        results.add(new ArrayList<Integer>(combination));
      }

      for(int i = 0 ; i < nums.length ; i++) {
        if(visited[i]) {
          continue;
        }

        // 去重
        if(i != 0 && nums[i] == nums[i - 1] && !visited[i - 1]) {
          continue;
        }
        combination.add(nums[i]);
        visited[i] = true;
        dfs(nums, visited, combination, results);
        visited[i] = false;
        combination.remove(combination.size() - 1);
      }
    }
};
```

## <a name='33'>33. N 皇后问题

**[链接](https://www.lintcode.com/problem/n-queens/)**

**描述**
n 皇后问题是将 n 个皇后放置在 n\*n 的棋盘上，皇后彼此之间不能相互攻击(任意两个皇后不能位于同一行，同一列，同一斜线)。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每个解决方案包含一个明确的 n 皇后放置布局，其中“Q”和“.”分别表示一个女王和一个空位置。

**样例**

```
例1:

输入:1
输出:
   [["Q"]]


例2:

输入:4
输出:
[
  // Solution 1
  [".Q..",
   "...Q",
   "Q...",
   "..Q."
  ],
  // Solution 2
  ["..Q.",
   "Q...",
   "...Q",
   ".Q.."
  ]
]

```

```java
public class Solution {
    /*
     * @param n: The number of queens
     * @return: All distinct solutions
     */
    public List<List<String>> solveNQueens(int n) {
        // write your code here
        List<List<String>> results = new ArrayList();
        if(n <= 0) {
            return results;
        }

        List<String> cols = new ArrayList();
        dfs(n, cols, results);

        return results;
    }

    private void dfs(int n, List<String> cols, List<List<String>> results) {
        if(cols.size() == n) {
            results.add(new ArrayList<String>(cols));
            return;
        }

        for(int i = 0 ; i < n ; i++) {
            if(!isValid(n, cols, i)){
                continue;
            }
            StringBuilder sb = new StringBuilder();
            for(int j = 0 ; j < n ; j++) {
                sb.append('.');
            }
            sb.replace(i,i+1, "Q");
            cols.add(sb.toString());
            dfs(n, cols, results);
            cols.remove(cols.size() - 1);
        }
    }

    private boolean isValid(int n, List<String> cols, int colIndex) {
        int rows = cols.size();
        for(int rowIndex = 0 ; rowIndex < cols.size() ; rowIndex++) {
            // 竖直方向
            if(cols.get(rowIndex).charAt(colIndex) == 'Q') {
                return false;
            }
            // 左斜上方
            int leftTop = rowIndex - rows + colIndex;
            if(leftTop >= 0 && cols.get(rowIndex).charAt(leftTop) == 'Q') {
                return false;
            }
            // row + colIndex - rowIndex
            int rightTop = rows + colIndex - rowIndex;
            if(rightTop < n && cols.get(rowIndex).charAt(rightTop) == 'Q') {
                return false;
            }
        }
        return true;
    }
}
```

## <a name='121'>121. 单词接龙 II

**[链接](https://www.lintcode.com/problem/word-ladder-ii/)**

**描述**
给出两个单词（start 和 end）和一个字典，找出所有从 start 到 end 的最短转换序列。

变换规则如下：

1. 每次只能改变一个字母。
2. 变换过程中的中间单词必须在字典中出现。

**样例**

```
样例 1:

输入：start = "a"，end = "c"，dict =["a","b","c"]
输出：[["a","c"]]
解释：
"a"->"c"
样例 2:

输入：start ="hit"，end = "cog"，dict =["hot","dot","dog","lot","log"]
输出：[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
解释：
1."hit"->"hot"->"dot"->"dog"->"cog"
2."hit"->"hot"->"lot"->"log"->"cog"
```

**笔记**

- 先做 bfs，从起点出发，计算每个点到终点的距离，还有每个点的 neighbors
- 然后做 dfs，从起点出发，每一次移动都离终点更近一步

```java
public class Solution {
    /*
     * @param start: a string
     * @param end: a string
     * @param dict: a set of string
     * @return: a list of lists of string
     */
    public List<List<String>> findLadders(String start, String end, Set<String> dict) {
        // write your code here
        dict.add(start);
        dict.add(end);
        // 保存每一个字符串的邻居
        Map<String, List<String>> neighbors = new HashMap();
        // 保存每一个字符串到起点的距离
        Map<String, Integer> distance = new HashMap();
        // 从起点往终点做bfs，计算每个点到起点的距离，保存到distance中
        bfs(start, end, dict, distance, neighbors);

        List<List<String>> ladders = new ArrayList();
        List<String> path = new ArrayList();
        // 从起点到终点做dfs，
        dfs(start,end,dict,ladders,distance,neighbors, path);

        return ladders;
    }

    private void bfs(String start, String end, Set<String> dict, Map<String, Integer> distance, Map<String, List<String>> neighbors) {
      Queue<String> queue = new LinkedList();
      queue.offer(start);
      distance.put(start, 0);
      // 初始化paths
      for(String key : dict) {
        neighbors.put(key, new ArrayList<String>());
      }

      while(!queue.isEmpty()) {
        String crt = queue.poll();

        for(String next : getNextWords(crt, dict)) {
          neighbors.get(next).add(crt);
          if (!distance.containsKey(next)) {
            distance.put(next, distance.get(crt) + 1);
            queue.offer(next);
          }
        }
      }

    }

    private void dfs(String crt, String end, Set<String> dict, List<List<String>> ladders, Map<String, Integer> distance, Map<String, List<String>> neighbors, List<String> path) {
      path.add(crt);
      if(crt.equals(end)) {
        ladders.add(new ArrayList<String>(path));
      } else {
        for(String next : neighbors.get(crt)) {
          if(distance.containsKey(next) && distance.get(next) == distance.get(crt) + 1) {
            dfs(next, end, dict, ladders,distance,neighbors,path);
          }
        }
      }
      path.remove(path.size() - 1);
    }

    private List<String> getNextWords(String crt, Set<String> dict) {
      List<String> nextWords = new ArrayList();

      for(int i = 0 ; i < crt.length() ; i++) {
        for(char c = 'a' ; c <= 'z' ; c++) {
          if(crt.charAt(i) != c) {
            String newStr = crt.substring(0,i) + c + crt.substring(i+1);
            if(dict.contains(newStr)) {
              nextWords.add(newStr);
            }
          }

        }
      }

      return nextWords;
    }
}
```

## <a name='66'>66. 二叉树的前序遍历

**[链接](https://www.lintcode.com/problem/66/)**

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
    public List<Integer> preorderTraversal(TreeNode root) {
        // write your code here
        // 1. dfs
        List<Integer> results = new ArrayList();
        traversal(root, results);
        // 2. 分治
        // List<Integer> results = divideConquer(root);
        // 3. 非递归
        // List<Integer> results = nonRecursion(root);
        return results;
    }

    private void traversal(TreeNode root, List<Integer> results) {
      if(root == null) {
        return;
      }

      results.add(root.val);
      traversal(root.left, results);
      traversal(root.right, results);
    }

    private List<Integer> divideConquer(TreeNode node) {
      List<Integer> result = new ArrayList();
      if(node == null) {
        return result;
      }

      result.add(node.val);
      List<Integer> left = divideConquer(node.left);
      List<Integer> right = divideConquer(node.right);
      result.addAll(left);
      result.addAll(right);

      return result;
    }

    private List<Integer> nonRecursion(TreeNode root) {
      List<Integer> result = new ArrayList();
      Stack<TreeNode> stack = new Stack();

      if(root == null) {
        return result;
      }

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

**[链接](https://www.lintcode.com/problem/67/)**

**笔记**
按照左根右的次序遍历二叉树，搜索左子树，存入当前点，搜索右子树。

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
        ArrayList<Integer> result = new ArrayList();
        if(root == null) {
          return result;
        }

        Stack<TreeNode> stack = new Stack();
        TreeNode curt = root;

        while(curt != null || !stack.isEmpty()) {
          while(curt != null) {
            stack.push(curt);
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

## <a name='68'>68. 二叉树的后序遍历

**[链接](https://www.lintcode.com/problem/67/)**

**笔记**
使用栈进行二叉树后序遍历，首先对左子树进行遍历压入栈中，直至左子树为空，然后访问右子树。故每个节点会被访问两次，当节点被第二次访问时，该节点出栈。

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
        ArrayList<Integer> result = new ArrayList();
        if(root == null) {
          return result;
        }

        Stack<TreeNode> stack = new Stack();
        TreeNode curt = root;

        while(curt != null || !stack.isEmpty()) {
          while(curt != null) {
            stack.push(curt);
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

## <a name='17'>17. 子集

**[链接](https://www.lintcode.com/problem/17/)**

**描述**

给定一个含不同整数的集合，返回其所有的子集。

**样例**

```
样例 1：

输入：[0]
输出：
[
  [],
  [0]
]
样例 2：

输入：[1,2,3]
输出：
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

```java
public class Solution {
    /**
     * @param nums: A set of numbers
     * @return: A list of lists
     */
    public List<List<Integer>> subsets(int[] nums) {
        // write your code here
        List<List<Integer>> results = new ArrayList();
        if(nums == null) {
          return results;
        }

        List<Integer> combination = new ArrayList();
        dfs(nums, 0, combination, results);

        return results;
    }
    private void dfs(int[] nums, int startIndex, List<Integer> combination, List<List<Integer>> results) {
      results.add(new ArrayList<Integer>(combination));

      for(int i = startIndex ; i < nums.length ; i++) {
        combination.add(nums[i]);
        dfs(nums, i + 1, combination, results);
        combination.remove(combination.size() - 1);
      }
    }
}
```
