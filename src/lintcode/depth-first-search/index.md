**索引**

1. <a href="#135">135. 数字组合（中等）</a>
2. <a href="#153">153. 数字组合 II（中等）</a>
3. <a href="#136">136. 分割回文串（中等）</a>
4. <a href="#15">15. 全排列（中等）</a>
5. <a href="#16">16. 带重复元素的排列（中等）</a>

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
