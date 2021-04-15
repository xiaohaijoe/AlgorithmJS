## 动态规划

**索引**

1. <a href="109">109. 数字三角形(中等)</a>
1. <a href="110">110. 最小路径和(简单)</a>

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
