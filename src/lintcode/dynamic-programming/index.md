## 动态规划

**索引**

1. <a href="109">109. 数字三角形(中等)</a>
2. <a href="110">110. 最小路径和(简单)</a>
3. <a href="114">114. 不同的路径(简单)</a>
4. <a href="111">111. 爬楼梯(简单)</a>
5. <a href="116">116. 跳跃游戏(中等)</a>
6. <a href="117">117. 跳跃游戏 II(中等)</a>
7. <a href="77">77. 最长公共子序列(中等)</a>
8. <a href="76">76. 最长上升子序列(中等)</a>
9. <a href="602">602. 俄罗斯套娃信封(困难)</a>
10. <a href="622">622. 青蛙跳(困难)</a>

## 什么情况下使用动态规划？

- 满足下面三个条件之一：
  - 求最大值最小值
  - 判断是否可行
  - 统计方案个数
- 则 极有可能 是使用动态规划求解

## 动态规划四要素

1. 状态 State

   灵感，创㐀力，存储小规模问题的结果

2. 方程 Function

   状态之间的联系，怎么通过小的状态，来算大的状态

3. 初始化 Initialization

最极限的小状态是什么, 起点

4.  答案 Answer

    最大的那个状态是什么，终点

## <a name='109'>109. 数字三角形

**[链接](https://www.lintcode.com/problem/triangle/)**

**描述**

给定一个数字三角形，找到从顶部到底部的最小路径和。

每一步可以移动到下面一行的相邻数字上。

**样例**

```
Example 1:

Input the following triangle:
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
Output: 11
Explanation: The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
Example 2:

Input the following triangle:
[
     [2],
    [3,2],
   [6,5,7],
  [4,4,8,1]
]
Output: 12
Explanation: The minimum path sum from top to bottom is 12 (i.e., 2 + 2 + 7 + 1 = 12).

```

**动态规划四要素**

1. state: f[x][y]从起点走到 x,y 的最短路径
2. function: f[x][y] = min(f[x-1][y], f[x][y-1]) + A[x][y]
3. intialize:

   f[i][0] = sum(0,0 ~ i,0)

   f[0][i] = sum(0,0 ~ 0,i)

4. answer: f[n-1][m-1]

```java

// Version 1
// Divider Conquer + Momerize Search
public class Solution {
    // private int best = Integer.MAX_VALUE;
    /**
     * @param triangle: a list of lists of integers
     * @return: An integer, minimum path sum
     */
    public int minimumTotal(int[][] triangle) {
        // write your code here
        int n = triangle.length;
        int m = triangle[n-1].length;
        int[][] hash = new int[n][m];
        for(int i = 0 ; i < n ; i++) {
          for(int j = 0 ; j < m ; j++) {
            hash[i][j] = Integer.MAX_VALUE;
          }
        }
        int best = traversal(triangle, 0, 0, hash);
        return best;
    }

    private int traversal(int[][] triangle, int x, int y, int[][] hash) {
      if(x == triangle.length || y == triangle[x].length) {
        return 0;
      }
      if(hash[x][y] != Integer.MAX_VALUE) {
        return hash[x][y];
      }
      int left = traversal(triangle, x + 1, y, hash);
      int right = traversal(triangle, x + 1, y + 1, hash);

      hash[x][y] = Math.min(left, right) + triangle[x][y];
      return hash[x][y];
    }
}

// Version 2
// Dynamic Programming
public class Solution {
    /**
     * @param triangle: a list of lists of integers
     * @return: An integer, minimum path sum
     */
    public int minimumTotal(int[][] triangle) {
        // write your code here
        int n = triangle.length;
        int m = triangle[n-1].length;
        int[][] f = new int[n][m];

        f[0][0] = triangle[0][0];
        for(int i = 1 ; i < n ; i++) {
          f[i][0] = f[i-1][0] + triangle[i][0];
          f[i][i] = f[i-1][i-1] + triangle[i][i];
        }
        for(int i = 1 ; i < n ; i++) {
          for(int j = 1; j < i; j++) {
            f[i][j] = Math.min(f[i-1][j], f[i-1][j-1]) + triangle[i][j];
          }
        }

        int best = f[n-1][0];
        for(int i = 1; i < n ; i++) {
          best = Math.min(f[n-1][i], best);
        }
        return best;
    }

}
```

## <a name='110'>110. 最小路径和

**[链接](https://www.lintcode.com/problem/minimum-path-sum/)**

**描述**

给定一个只含非负整数的 m\*n 网格，找到一条从左上角到右下角的可以使数字和最小的路径。

**样例**

```
Example 1:

Input:  [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation:
Path is: 1 -> 3 -> 1 -> 1 -> 1
Example 2:

Input:  [[1,3,2]]
Output: 6
Explanation:
Path is: 1 -> 3 -> 2
```

```java
public class Solution {
    /**
     * @param grid: a list of lists of integers
     * @return: An integer, minimizes the sum of all numbers along its path
     */
    public int minPathSum(int[][] grid) {
        // write your code here
        int n = grid.length;
        int m = grid[0].length;

        int[][] f = new int[n][m];
        f[0][0] = grid[0][0];
        for(int i = 1 ; i < n ; i++) {
          f[i][0] = f[i-1][0] + grid[i][0];
        }
        for(int i = 1 ; i < m ; i++) {
          f[0][i] = f[0][i - 1] + grid[0][i];
        }

        for(int i = 1 ; i < n ; i++) {
          for(int j = 1 ; j < m ; j++) {
            f[i][j] = Math.min(f[i-1][j], f[i][j-1]) + grid[i][j];
          }
        }

        return f[n-1][m-1];
    }
}
```

## <a name='114'>114. 不同的路径

**[链接](https://www.lintcode.com/problem/unique-paths/)**

**描述**

有一个机器人的位于一个 m × n 个网格左上角。

机器人每一时刻只能向下或者向右移动一步。机器人试图达到网格的右下角。

问有多少条不同的路径？

**样例**

```
样例 1:

输入: n = 1, m = 3
输出: 1
解释: 只有一条通往目标位置的路径。
样例 2:

输入:  n = 3, m = 3
输出: 6
解释:
	D : Down
	R : Right
	1) DDRR
	2) DRDR
	3) DRRD
	4) RRDD
	5) RDRD
	6) RDDR
```

```java
public class Solution {
    /**
     * @param m: positive integer (1 <= m <= 100)
     * @param n: positive integer (1 <= n <= 100)
     * @return: An integer
     */
    public int uniquePaths(int m, int n) {
        // write your code here
        int[][] f = new int[n][m];
        for(int i = 0 ; i < m ; i++) {
          f[0][i] = 1;
        }
        for(int i = 0 ; i < n ; i++) {
          f[i][0] = 1;
        }

        for(int i = 1; i < n ; i++) {
          for(int j = 1; j < m ; j++) {
            f[i][j] = f[i-1][j] + f[i][j-1];
          }
        }

        return f[n-1][m-1];
    }


}
```

## <a name='111'>111. 爬楼梯

**[链接](https://www.lintcode.com/problem/climbing-stairs/)**

**描述**

假设你正在爬楼梯，需要 n 步你才能到达顶部。

但每次你只能爬一步或者两步，爬到顶部的方法有多少种？

**样例**

```
样例 1:
	输入:  n= 3
	输出: 3

	样例解释：
	1) 1, 1, 1
	2) 1, 2
	3) 2, 1
	共3种


样例 2:
	输入:  n = 1
	输出: 1

	解释:
	只有一种方案
```

```java
public class Solution {
    /**
     * @param n: An integer
     * @return: An integer
     */
    public int climbStairs(int n) {
        // write your code here
        int[] f = new int[n];

        if(n == 0) {
          return 0;
        }
        if(n == 1) {
          return 1;
        }
        f[0] = 1;
        f[1] = 2;
        for(int i = 2 ; i < n ; i++) {
          f[i] = f[i-1] + f[i-2];
        }
        return f[n-1];
    }
}
```

## <a name='116'>116. 跳跃游戏

**[链接](https://www.lintcode.com/problem/jump-game/)**

**描述**

给出一个非负整数数组，你最初定位在数组的第一个位置。

数组中的每个元素代表你在那个位置可以跳跃的最大长度。

判断你是否能到达数组的最后一个位置。

**样例**

```
样例 1

输入 : [2,3,1,1,4]
输出 : true
样例 2

输入 : [3,2,1,0,4]
输出 : false
```

```java
// Version 1
// Dynamic Programming
public class Solution {
    /**
     * @param A: A list of integers
     * @return: A boolean
     */
    public boolean canJump(int[] A) {
        // write your code here
        boolean[] can = new boolean[A.length];
        can[0] = true;

        for(int i = 1; i < A.length ; i++) {
          for(int j = 0 ; j < i ; j++) {
            if(can[j] && A[j] + j >= i) {
              can[i] = true;
              break;
            }
          }
        }

        return can[A.length - 1];
    }
}

// Version 2
// Greedy
public class Solution {
    /**
     * @param A: A list of integers
     * @return: A boolean
     */
    public boolean canJump(int[] A) {
        // write your code here
        if(A == null || A.length == 0) {
          return false;
        }

        int farthest = A[0];
        for(int i = 1; i < A.length ; i++) {
          if(i <= farthest && farthest <= A[i] + i) {
            farthest = A[i] + i;
          }
        }

        return farthest >= A.length - 1;
    }
}
```

## <a name='117'>117. 跳跃游戏 II

**[链接](https://www.lintcode.com/problem/jump-game-ii/)**

**描述**

给出一个非负整数数组，你最初定位在数组的第一个位置。

数组中的每个元素代表你在那个位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

**样例**

```
样例 1

输入 : [2,3,1,1,4]
输出 : 2
解释 : 到达最后位置的最小跳跃次数是2(从下标0到1跳跃1个距离长度，然后跳跃3个距离长度到最后位置)

```

```java
public class Solution {
    /**
     * @param A: A list of integers
     * @return: An integer
     */
    public int jump(int[] A) {
        // write your code here
        // f[i] 表示从前i-1个跳到当前位置所用步数
        int[] f = new int[A.length];
        for(int i = 1 ; i < f.length ; i++) {
          for(int j = 0 ; j < i ; j++) {
            if(j + A[j] >= i) {
              if(f[i] == 0 || f[i] > f[j] + 1) {
                f[i] = f[j] + 1;
              }
            }
          }
        }
        return f[A.length - 1];
    }
}
```

## <a name='77'>77. 最长公共子序列

**[链接](https://www.lintcode.com/problem/jump-game-ii/)**

**描述**

给出两个字符串，找到最长公共子序列(LCS)，返回 LCS 的长度。

**样例**

```
样例 1:
	输入:  "ABCD" and "EDCA"
	输出:  1

	解释:
	LCS 是 'A' 或  'D' 或 'C'


样例 2:
	输入: "ABCD" and "EACB"
	输出:  2

	解释:
	LCS 是 "AC"
```

```java
public class Solution {
    private int maxLen = 0;
    /**
     * @param A: A string
     * @param B: A string
     * @return: The length of longest common subsequence of A and B
     */
    public int longestCommonSubsequence(String A, String B) {
        // write your code here
        int n = A.length();
        int m = B.length();

        int[][] dp = new int[n+1][m+1];

        for(int i = 1 ; i <= n ; i++) {
          for(int j = 1; j <= m ; j++) {
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            if(A.charAt(i - 1) == B.charAt(j - 1)) {
              dp[i][j] = Math.max(dp[i][j], dp[i-1][j-1] + 1);
            }
          }
        }
        return dp[n][m];
    }
}
```

## <a name='76'>76. 最长上升子序列

**[链接](https://www.lintcode.com/problem/longest-increasing-subsequence/)**

**描述**

给定一个整数序列，找到最长上升子序列（LIS），返回 LIS 的长度。

**样例**

```
样例 1:
	输入:  [5,4,1,2,3]
	输出:  3

	解释:
	LIS 是 [1,2,3]


样例 2:
	输入: [4,2,4,5,3,7]
	输出:  4

	解释:
	LIS 是 [2,4,5,7]
```

**笔记**

- 将 n 个数看做 n 个木桩，目的是从某个木桩出发，从前向后，从低往高，看做多能踩多少个木桩。
- state: f[i] 表示（从任意某个木桩）跳到第 i 个木桩，最多踩过多少根木桩
- function: f[i] = max{f[j] + 1}, j 必须满足 j < i && nums[j] < nums[i]
- initialize: f[0..n-1] = 1
- answer: max{f[0..n-1]}

```java
public class Solution {
    /**
     * @param nums: An integer array
     * @return: The length of LIS (longest increasing subsequence)
     */
    public int longestIncreasingSubsequence(int[] nums) {
        // write your code here

        // dp[i] 表示子序列最大的长度
        int[] dp = new int[nums.length];

        for(int i = 0 ; i < nums.length ; i++) {
          dp[i] = 1;
        }

        for(int i = 1 ; i < dp.length ; i++) {
          for(int j = 0 ; j < i ; j++) {
            if(nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
              dp[i] = dp[j] + 1;
            }
          }
        }

        int longest = 0;
        for(int i = 0 ; i < dp.length ; i++) {
          if(dp[i] > longest) {
            longest = dp[i];
          }
        }

        return longest;
    }
}
```

## <a name='602'>602. 俄罗斯套娃信封

**[链接](https://www.lintcode.com/problem/russian-doll-envelopes/)**

**描述**

给一定数量的信封，带有整数对 (w, h) 分别代表信封宽度和高度。

一个信封的宽高均大于另一个信封时可以放下另一个信封。

求最大的信封嵌套层数。

**样例**

```
样例 1:

输入：[[5,4],[6,4],[6,7],[2,3]]
输出：3
解释：
最大的信封嵌套层数是 3 ([2,3] => [5,4] => [6,7])。
样例 2:

输入：[[4,5],[4,6],[6,7],[2,3],[1,1]]
输出：4
解释：
最大的信封嵌套层数是 4 ([1,1] => [2,3] => [4,5] / [4,6] => [6,7])。
```

```java
public class Solution {
    /**
     * @param envelopes: a number of envelopes with widths and heights
     * @return: the maximum number of envelopes
     */
    public int maxEnvelopes(int[][] envelopes) {
        // write your code here
        Arrays.sort(envelopes, new Comparator<int[]>() {
          @Override
          public int compare(int[] a, int[] b) {
            int diff = a[0] - b[0];
            if(diff == 0) {
              return b[1] - a[1];
            }
            return diff;
          }
        });

        int[] dp = new int[envelopes.length];
        dp[0] = 1;
        int len = 0;
        for(int i = 0; i < dp.length ; i++) {
          // array, fromIndex, toIndex, key
          int index = Arrays.binarySearch(dp, 0, len, envelopes[i][1]);
          if(index < 0) {
            index = -index - 1;
          }
          dp[index] = envelopes[i][1];
          if (index == len) {
            len++;
          }
        }

        return len;
    }
}
```

## <a name='622'>622. 青蛙跳

**[链接](https://www.lintcode.com/problem/frog-jump/)**

**描述**

一只青蛙正要过河，这条河分成了 x 个单位，每个单位可能存在石头，青蛙可以跳到石头上，但它不能跳进水里。

按照顺序给出石头所在的位置，判断青蛙能否到达最后一块石头所在的位置。

刚开始时青蛙在第一块石头上，假设青蛙第一次跳只能跳一个单位的长度。

如果青蛙最后一个跳 k 个单位，那么它下一次只能跳 k - 1 ，k 或者 k + 1 个单位。注意青蛙只能向前跳。

**样例**

```
样例 1:

给出石头的位置为 [0,1,3,5,6,8,12,17]
输入:
[0,1,3,5,6,8,12,17]
输出:
true

解释:
总共8块石头。
第一块石头在 0 位置，第二块石头在 1 位置，第三块石头在 3 位置等等......
最后一块石头在 17 位置。
返回 true。青蛙可以通过跳 1 格到第二块石头，跳 2 格到第三块石头，跳 2 格到第四块石头，跳 3 格到第六块石头，跳 4 格到第七块石头，最后跳 5 格到第八块石头。
样例 2:

给出石头的位置为 `[0,1,2,3,4,8,9,11]`
输入:
[0,1,2,3,4,8,9,11]
输出:
false

解释:
返回 false。青蛙没有办法跳到最后一块石头因为第五块石头跟第六块石头的距离太大了。

```

```java
public class Solution {
    /**
     * @param stones: a list of stones' positions in sorted ascending order
     * @return: true if the frog is able to cross the river or false
     */
    public boolean canCross(int[] stones) {
        // write your code here

        HashMap<Integer, HashSet<Integer>> dp = new HashMap();
        for(int i = 0 ; i < stones.length ; i++) {
          dp.put(stones[i], new HashSet());
        }

        dp.get(0).add(0);

        for(int i = 0 ; i < stones.length - 1; i++) {
          int stone = stones[i];
          // 跳到当前位置，所用的步数
          for(int step : dp.get(stone)) {
            // k - 1
            if(step - 1 > 0 && dp.containsKey(stone + step - 1)) {
              dp.get(stone + step - 1).add(step - 1);
            }
            // k
            if(dp.containsKey(stone + step)) {
              dp.get(stone + step).add(step);
            }
            // k + 1
            if(dp.containsKey(stone + step + 1)) {
              dp.get(stone + step + 1).add(step + 1);
            }
          }
        }
        return !dp.get(stones[stones.length - 1]).isEmpty();
    }
}
```
