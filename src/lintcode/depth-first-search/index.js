// 135. 数字组合
class Solution135 {
  /**
   *
   * @param {int[]} candidates
   * @param {int} target
   */
  combinationSum(candidates, target) {
    const result = [];
    if (candidates == null || candidates.length === 0) {
      return result;
    }

    const nums = [...new Set(candidates)].sort();
    const temp = [];
    this.traversal(nums, target, 0, temp, result);

    return result;
  }

  traversal(candidates, target, start, temp, result) {
    if (target === 0) {
      result.push([].concat(temp));
      return;
    }
    if (target < 0) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      temp.push(candidates[i]);
      this.traversal(candidates, target - candidates[i], i, temp, result);
      temp.pop();
    }
  }

  static test() {
    const solution = new Solution135();
    const candidates = [2, 3, 6, 7];
    const target = 7;
    const res = solution.combinationSum(candidates, target);
    console.log(res);
  }
}

// 153. 数字组合 II
class Solution153 {
  /**
   *
   * @param {int[]} num
   * @param {int} target
   */
  combinationSum2(num, target) {
    const results = [];
    if (num == null || num.length == 0) {
      return results;
    }

    num.sort();
    const combination = [];

    this.dfs(num, target, 0, combination, results);

    return results;
  }

  dfs(num, remainTarget, start, combination, results) {
    if (remainTarget === 0) {
      results.push([].concat(combination));
      return;
    }
    if (remainTarget < 0) {
      return;
    }
    for (let i = start; i < num.length; i++) {
      if (i != start && num[i] === num[i - 1]) {
        continue;
      }
      combination.push(num[i]);
      this.dfs(num, remainTarget - num[i], i + 1, combination, results);
      combination.pop();
    }
  }
  static test() {
    const solution = new Solution153();
    const num = [7, 1, 2, 5, 1, 6, 10];
    const target = 8;
    const res = solution.combinationSum2(num, target);
    console.log(res);
  }
}

// 136. 分割回文串
class Solution136 {
  /**
   *
   * @param {String} s
   */
  partition(s) {
    const results = [];
    if (s == null || s.length == 0) {
      return results;
    }

    const combination = [];
    this.dfs(s, 0, combination, results);
    return results;
  }
  dfs(s, startIndex, combination, results) {
    if (s.length === startIndex) {
      results.push([].concat(combination));
    }

    for (let i = startIndex; i < s.length; i++) {
      const substr = s.substring(startIndex, i + 1);
      if (!this.isPalindrome(substr)) {
        continue;
      }
      combination.push(substr);
      this.dfs(s, i + 1, combination, results);
      combination.pop();
    }
  }
  isPalindrome(str) {
    let end = str.length - 1;
    for (let i = 0; i < str.length / 2; i++) {
      if (str[i] != str[end]) {
        return false;
      }
      end--;
    }
    return true;
  }
  static test() {
    const solution = new Solution136();
    const s = "aabbaacaccc";
    const res = solution.partition(s);
    console.log(res);
  }
}

// 15. 全排列
class Solution15 {
  /**
   *
   * @param {int[]} nums
   */
  permute(nums) {
    const results = [];
    if (nums == null) {
      return results;
    }

    const combination = [];
    const visited = new Array(nums.length).fill(false);
    this.dfs(nums, visited, combination, results);
    return results;
  }

  dfs(nums, visited, combination, results) {
    if (combination.length === nums.length) {
      results.push([].concat(combination));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (visited[i]) {
        continue;
      }
      combination.push(nums[i]);
      visited[i] = true;
      this.dfs(nums, visited, combination, results);
      combination.pop();
      visited[i] = false;
    }
  }

  static test() {
    const solution = new Solution15();
    const nums = [1, 2, 3];
    const res = solution.permute(nums);
    console.log(res);
  }
}

// 16. 带重复元素的排列
class Solution16 {
  /**
   *
   * @param {int[]} nums
   */
  permuteUnique(nums) {
    const results = [];
    if (nums == null) {
      return results;
    }

    const combination = [];
    const visited = new Array(nums.length).fill(false);

    this.dfs(nums, visited, combination, results);
    return results;
  }

  dfs(nums, visited, combination, results) {
    if (combination.length == nums.length) {
      results.push([].concat(combination));
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (visited[i]) {
        continue;
      }
      if (i != 0 && nums[i] == nums[i - 1] && !visited[i - 1]) {
        continue;
      }
      combination.push(nums[i]);
      visited[i] = true;
      this.dfs(nums, visited, combination, results);
      visited[i] = false;
      combination.pop();
    }
  }
  static test() {
    const solution = new Solution16();
    const nums = [1, 2, 2];
    const res = solution.permuteUnique(nums);
    console.log(res);
  }
}

// 33. N皇后问题
class Solution33 {
  /**
   *
   * @param {int} n
   */
  solveNQueens(n) {
    const results = [];
    if (n <= 0) {
      return results;
    }

    const cols = [];
    this.dfs(n, cols, results);

    return results;
  }

  dfs(n, cols, results) {
    if (cols.length === n) {
      results.push([].concat(cols));
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!this.isValid(cols, i, n)) {
        continue;
      }
      const str = new Array(n)
        .fill(".")
        .map((s, j) => {
          return j === i ? "Q" : s;
        })
        .join("");
      cols.push(str);
      this.dfs(n, cols, results);
      cols.pop();
    }
  }

  isValid(cols, colIndex, n) {
    const rows = cols.length;
    for (let rowIndex = 0; rowIndex < cols.length; rowIndex++) {
      // 正上方
      if (cols[rowIndex][colIndex] == "Q") {
        return false;
      }
      // 左上方
      const leftTop = -rows + rowIndex + colIndex;
      if (leftTop >= 0 && cols[rowIndex][leftTop] == "Q") {
        return false;
      }
      // 右上方
      const rightTop = rows - rowIndex + colIndex;
      if (rightTop <= n && cols[rowIndex][rightTop] == "Q") {
        return false;
      }
    }
    return true;
  }

  static test() {
    const solution = new Solution33();
    const res = solution.solveNQueens(4);
    console.log(res);
  }
}

// 121. 单词接龙 II
class Solution121 {
  /**
   *
   * @param {String} start
   * @param {String} end
   * @param {Set<String>} dict
   */
  findLadders(start, end, dict) {
    const results = [];

    dict.add(start);
    dict.add(end);
    const neighbors = new Map();
    const distance = new Map();
    // bfs找出所有点到起点的距离
    this.bfs(start, end, dict, distance, neighbors);

    const path = [];
    // dfs从起点出发根据距离每次离终点更近一步
    this.dfs(start, end, dict, distance, results, path, neighbors);

    return results;
  }

  bfs(start, end, dict, distance, neighbors) {
    const queue = [start];
    distance.set(start, 0);

    while (queue.length > 0) {
      const crt = queue.shift();

      const nextWords = this.getNextWords(crt, dict);
      neighbors.set(crt, nextWords);
      for (let i = 0 ; i < nextWords.length ; i++) {
        const next = nextWords[i];
        if (distance.has(next)) {
          continue;
        }
        distance.set(next, distance.get(crt) + 1);
        queue.push(next);
      }
    }
  }

  dfs(crt, end, dict, distance, results, path, neighbors) {
    path.push(crt);
    if (crt === end) {
      results.push([].concat(path));
    } else {
      const nextWords = neighbors.get(crt);
      for (let next of nextWords) {
        if (distance.get(next) === distance.get(crt) + 1) {
          this.dfs(next, end, dict, distance, results, path, neighbors);
        }
      }
    }
    path.pop();
  }

  getNextWords(crt, dict) {
    const nextWords = [];
    for (let i = 0; i < crt.length; i++) {

      for (let c = "a".charCodeAt(); c <= "z".charCodeAt(); c++) {
        const ch = String.fromCharCode(c);
        if (crt.charAt(i) != ch) {
          const newStr = crt.substring(0,i) + ch + crt.substring(i+1);
          if (dict.has(newStr)) {
            nextWords.push(newStr);
          }
        }
      }
    }
    return nextWords;
  }
  static test() {
    const solution = new Solution121();
    const start = "hit";
    const end = "cog";
    const dict = new Set(["hot", "dot", "dog", "lot", "log"]);
    const res = solution.findLadders(start, end, dict);
    console.log(res);
  }
}
Solution121.test();
