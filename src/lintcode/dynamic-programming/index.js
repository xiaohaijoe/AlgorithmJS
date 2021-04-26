// 109. 数字三角形
class Solution109 {
  /**
   *
   * @param {int[][]} triangle
   */
  minimumTotal(triangle) {
    const n = triangle.length;
    const m = triangle[n - 1].length;

    const f = new Array(n).fill([]).map((item, i) => {
      return new Array(i + 1);
    });
    f[0][0] = triangle[0][0];
    for (let i = 1; i < n; i++) {
      f[i][0] = f[i - 1][0] + triangle[i][0];
      f[i][i] = f[i - 1][i - 1] + triangle[i][i];
    }

    for (let i = 1; i < n; i++) {
      for (let j = 1; j < i; j++) {
        f[i][j] = Math.min(f[i - 1][j - 1], f[i - 1][j]) + triangle[i][j];
      }
    }

    return Math.min(...f[n - 1]);
  }
  static test() {
    const sol = new Solution109();
    const triangle = [[2], [3, 2], [6, 5, 7], [4, 4, 8, 1]];
    const res = sol.minimumTotal(triangle);
    console.log(res);
  }
}

// 110. 最小路径和
class Solution110 {
  /**
   *
   * @param {int[][]} grid
   */
  minPathSum(grid) {
    let n = grid.length;
    let m = grid[0].length;
    const f = new Array(n).fill([]).map((_) => {
      return new Array(m);
    });

    f[0][0] = grid[0][0];
    for (let i = 1; i < n; i++) {
      f[i][0] = f[i - 1][0] + grid[i][0];
    }
    for (let i = 1; i < m; i++) {
      f[0][i] = f[0][i - 1] + grid[0][i];
    }

    for (let i = 1; i < n; i++) {
      for (let j = 1; j < m; j++) {
        f[i][j] = Math.min(f[i - 1][j], f[i][j - 1]) + grid[i][j];
      }
    }
    return f[n - 1][m - 1];
  }
  static test() {
    const sol = new Solution110();
    const triangle = [
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ];
    const res = sol.minPathSum(triangle);
    console.log(res);
  }
}

// 114. 不同的路径
class Solution114 {
  uniquePaths(m, n) {
    const f = new Array(n).fill([]).map((_) => {
      return new Array(m);
    });
    for (let i = 0; i < n; i++) {
      f[i][0] = 1;
    }
    for (let i = 0; i < m; i++) {
      f[0][i] = 1;
    }
    for (let i = 1; i < n; i++) {
      for (let j = 1; j < m; j++) {
        f[i][j] = f[i - 1][j] + f[i][j - 1];
      }
    }
    return f[n - 1][m - 1];
  }
  static test() {
    const sol = new Solution114();
    const res = sol.uniquePaths(3, 3);
    console.log(res);
  }
}

// 111. 爬楼梯
class Solution111 {
  /**
   *
   * @param {int} n
   */
  climbStairs(n) {
    const f = [1, 2];
    if (n == 0) {
      return 0;
    }
    if (n <= 2) {
      return f[n - 1];
    }

    for (let i = 2; i < n; i++) {
      f[i] = f[i - 1] + f[i - 2];
    }
    return f[n - 1];
  }
  static test() {
    const sol = new Solution111();
    const res = sol.climbStairs(5);
    console.log(res);
  }
}

// 116. 跳跃游戏
class Solution116 {
  /**
   *
   * @param {int[]} A
   */
  canJump(A) {
    const can = new Array(A.length).fill(false);
    can[0] = true;

    for (let i = 1; i < A.length; i++) {
      for (let j = 0; j < i; j++) {
        if (can[j] && j + A[j] >= i) {
          can[i] = true;
          break;
        }
      }
    }
    return can[A.length - 1];
  }
  static test() {
    const sol = new Solution116();
    const A = [3, 2, 1, 0, 4];
    const res = sol.canJump(A);
    console.log(res);
  }
}

// 77. 最长公共子序列
class Solution77 {
  longestCommonSubsequence(A, B) {
    const n = A.length;
    const m = B.length;

    const dp = new Array(n + 1).fill([]).map((_) => {
      return new Array(m + 1).fill(0);
    });

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        if (A[i - 1] == B[j - 1]) {
          dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + 1);
        }
      }
    }
    return dp[n][m];
  }
  static test() {
    const sol = new Solution77();
    const A = "daabeddbcedeabcbcbec";
    const B = "daceeaeeaabbabbacedd";
    const res = sol.longestCommonSubsequence(A, B);
    console.log(res);
  }
}

// 117. 跳跃游戏 II
class Solution117 {
  /**
   *
   * @param {int[]} A
   */
  jump(A) {
    const f = new Array(A.length).fill(0);

    for (let i = 1; i < f.length; i++) {
      for (let j = 0; j < i; j++) {
        if (j + A[j] >= i) {
          if (f[i] == 0 || f[i] > f[j] + 1) {
            f[i] = f[j] + 1;
          }
        }
      }
    }
    return f[A.length - 1];
  }
  static test() {
    const sol = new Solution117();
    const A = [13, 52, 42, 21, 58];
    const res = sol.jump(A);
    console.log(res);
  }
}

// 76. 最长上升子序列
class Solution76 {
  longestIncreasingSubsequence(nums) {
    const dp = new Array(nums.length).fill(1);

    for (let i = 1; i < dp.length; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1;
        }
      }
    }

    return Math.max(...dp);
  }
  static test() {
    const sol = new Solution76();
    const A = [4, 2, 4, 5, 3, 7];
    const res = sol.longestIncreasingSubsequence(A);
    console.log(res);
  }
}

// 602. 俄罗斯套娃信封
class Solution602 {
  /**
   *
   * @param {int[][]} envelopes
   */
  maxEnvelopes(envelopes) {
    envelopes = envelopes.sort((a, b) => {
      if (a[0] == b[0]) {
        return b[1] - a[0];
      } else {
        return a[0] - b[0];
      }
    });

    const dp = new Array(envelopes.length).fill(0);

    let len = 0;
    for (let i = 0; i < envelopes.length; i++) {
      let index = this.binarySearch(dp, 0, len, envelopes[i][1]);
      if (index < 0) {
        index = 0;
      }
      dp[index] = envelopes[i][1];
      if (index == len) {
        len++;
      }
    }
    return len;
  }
  binarySearch(arr, start, end, value) {
    if (end == 0) {
      return -1;
    }

    while (start + 1 < end) {
      let mid = parseInt((start + end) / 2);
      if (arr[mid] >= value) {
        end = mid;
      } else {
        start = mid;
      }
    }
    if (arr[start] >= value) {
      return start;
    }
    return end;
  }
  static test() {
    const sol = new Solution602();
    const A = [
      [4, 5],
      [4, 6],
      [6, 7],
      [2, 3],
      [1, 1],
    ];
    const res = sol.maxEnvelopes(A);
    console.log(res);
  }
}

// 622. 青蛙跳
class Solution622 {
  /**
   *
   * @param {int[]} stones
   */
  canCross(stones) {
    const dp = new Map();
    for (let i = 0; i < stones.length; i++) {
      dp.set(stones[i], new Set());
    }

    dp.get(0).add(0);
    for (let i = 0; i < stones.length - 1; i++) {
      const stone = stones[i];
      for (let step of dp.get(stone)) {
        // k - 1
        if (step - 1 > 0 && dp.has(stone + step - 1)) {
          dp.get(stone + step - 1).add(step - 1);
        }
        if (dp.has(stone + step)) {
          dp.get(stone + step).add(step);
        }
        if (dp.has(stone + step + 1)) {
          dp.get(stone + step + 1).add(step + 1);
        }
      }
    }
    return dp.get(stones[stones.length - 1]).size > 0;
  }
  static test() {
    const sol = new Solution622();
    const stones = [0, 1, 3, 5, 6, 8, 12, 17];
    const res = sol.canCross(stones);
    console.log(res);
  }
}

// 92. 背包问题
class Solution92 {
  backPack(m, A) {
    const dp = new Array(m + 1).fill(0);

    if (A.length == 0 || m == 0) {
      return 0;
    }
    for (let i = 0; i < A.length; i++) {
      for (let j = m; j >= A[i]; j--) {
        dp[j] = Math.max(dp[j], dp[j - A[i]] + A[i]);
      }
    }
    return dp[m];
  }
  static test() {
    const sol = new Solution92();
    const stones = 10;
    const A = [3, 4, 8, 5];
    // const A = [12, 3, 7, 4, 5, 13, 2, 8, 4, 7, 6, 5, 7];
    const res = sol.backPack(stones, A);
    console.log(res);
  }
}
Solution92.test();
