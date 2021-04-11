class Solution604 {
  /**
   *
   * @param {int[]} nums
   * @param {int} k
   */
  winSum(nums, k) {
    if (nums.length === 0) {
      return [];
    }
    let result = [];
    let left = 0;
    let right = k;
    let sums = [0];
    let prev = 0;
    for (let i = 0; i < nums.length; i++) {
      prev = prev + nums[i];
      sums.push(prev);
      if (i + 1 >= right) {
        result.push(sums[right++] - sums[left++]);
      }
    }
    return result;
  }
  static test() {
    const solution = new Solution604();
    const nums = [1, 2, 5, 7, 3];
    const res = solution.winSum(nums, 3);
    console.log(res);
  }
}

// 539. 移动零
class Solution539 {
  moveZeroes(nums) {
    let left = 0;
    let right = 0;

    while (right < nums.length) {
      if (nums[right] != 0) {
        if (left != right) {
          nums[left] = nums[right];
        }
        left++;
      }
      right++;
    }
    while (left < nums.length) {
      if (nums[left] != 0) {
        nums[left] = 0;
      }
      left++;
    }
  }
  static test() {
    const solution = new Solution539();
    const nums = [1, 0, 2, 0, 5, 0, 7, 3];
    solution.moveZeroes(nums);
    console.log(nums);
  }
}

// 100. 删除排序数组中的重复数字
class Solution100 {
  /**
   *
   * @param {int} nums
   */
  removeDuplicates(nums) {
    if (nums.length == 0) {
      return 0;
    }
    let left = 0;
    let right = 0;
    while (right < nums.length) {
      if (nums[left] != nums[right]) {
        if (left + 1 != right) {
          nums[left + 1] = nums[right];
        }
        left++;
      }
      right++;
    }
    return left + 1;
  }
  static test() {
    const solution = new Solution100();
    const nums = [1, 1, 2, 2, 3, 3, 3, 4, 5];
    const res = solution.removeDuplicates(nums);
    console.log(res, nums.slice(0, res));
  }
}

// 415. 有效回文串
class Solution415 {
  /**
   *
   * @param {String} s
   */
  isPalindrome(s) {
    const reg = /[^\w\d]/g;
    const str = s.replace(reg, "").toLowerCase();
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] != str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }
  static test() {
    const solution = new Solution415();
    const s = "A man, a plan, a canal: Panama";
    const res = solution.isPalindrome(s);
    console.log(res);
  }
}

// 8. 旋转字符串
class Solution8 {
  /**
   *
   * @param {char[]} str
   * @param {int} offset
   * @returns
   */
  rotateString(str, offset) {
    if (str == null || str.length == 0) {
      return;
    }
    const k = offset % str.length;
    this.reverse(str, 0, str.length - k - 1);
    this.reverse(str, str.length - k, str.length - 1);
    this.reverse(str, 0, str.length - 1);
  }
  reverse(str, start, end) {
    while (start < end) {
      const temp = str[start];
      str[start] = str[end];
      str[end] = temp;

      start++;
      end--;
    }
  }
  static test() {
    const solution = new Solution8();
    const str = "abcdefg".split("");
    solution.rotateString(str, 3);
    console.log(str.join(""));
  }
}

// 39. 恢复旋转排序数组
class Solution39 {
  /**
   *
   * @param {List<Integer>} nums
   */
  recoverRotatedSortedArray(nums) {
    if (nums == null || nums.length <= 1) {
      return;
    }
    let slow = 0;
    let fast = 1;
    while (fast < nums.length) {
      if (nums[fast] < nums[slow]) {
        break;
      }
      fast++;
      slow++;
    }

    this.reverse(nums, 0, slow);
    this.reverse(nums, slow + 1, nums.length - 1);
    this.reverse(nums, 0, nums.length - 1);
  }
  reverse(nums, start, end) {
    while (start < end) {
      const temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;

      start++;
      end--;
    }
  }
  static test() {
    const solution = new Solution39();
    const nums = [6, 7, 8, 9, 1, 2];
    solution.recoverRotatedSortedArray(nums);
    console.log(nums);
  }
}

// 56. 两数之和
class Solution56 {
  /**
   *
   * @param {int[]} numbers
   * @param {int} target
   */
  twoSum(numbers, target) {
    const map = new Map();

    for (let i = 0; i < numbers.length; i++) {
      if (map.has(numbers[i])) {
        return [map.get(numbers[i]), i];
      }
      map.set(target - numbers[i], i);
    }
    return [];
  }
  static test() {
    const solution = new Solution56();
    const nums = [2, 7, 11, 15];
    const res = solution.twoSum(nums, 9);
    console.log(res);
  }
}

// 607. 两数之和 III-数据结构设计
class Solution607 {
  constructor() {
    this.list = [];
    this.map = new Map();
  }
  /**
   *
   * @param {int} number
   */
  add(number) {
    this.list.push(number);
    if (this.map.has(number)) {
      this.map.set(number, this.map.get(number) + 1);
    } else {
      this.map.set(number, 1);
    }
  }
  /**
   *
   * @param {int} value
   */
  find(value) {
    for (let i = 0; i < this.list.length; i++) {
      let num1 = this.list[i];
      let num2 = value - num1;
      if (
        (num1 == num2 && this.map.get(num1) > 1) ||
        (num1 != num2 && this.map.has(num2))
      ) {
        return true;
      }
    }
    return false;
  }
  static test() {
    const solution = new Solution607();
    solution.add(2);
    solution.add(3);
    solution.add(5);
    console.log(solution.find(4));
    console.log(solution.find(5));
    console.log(solution.find(6));
  }
}

// 608. 两数和 II-输入已排序的数组
class Solution608 {
  twoSum(nums, target) {
    if (nums == null || nums.length < 2) {
      return [];
    }
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[left] + nums[right];
      if (sum == target) {
        return [left, right];
      } else if (sum > target) {
        right--;
      } else {
        left++;
      }
    }
    return [];
  }
  static test() {
    const solution = new Solution608();
    const nums = [2, 7, 11, 15];
    const res = solution.twoSum(nums, 13);
    console.log(res);
  }
}

// 587. 两数之和 - 不同组成
class Solution587 {
  twoSum6(nums, target) {
    if (nums == null || nums.length < 2) {
      return 0;
    }
    let left = 0;
    let right = nums.length - 1;
    let count = 0;
    while (left < right) {
      let sum = nums[left] + nums[right];
      if (sum == target) {
        count++;
        left++;
        right--;
        while (left < right && nums[right] == nums[right + 1]) {
          right--;
        }
        while (left < right && nums[left] == nums[left - 1]) {
          left++;
        }
      } else if (sum > target) {
        right--;
      } else {
        left++;
      }
    }
    return count;
  }
  static test() {
    const solution = new Solution587();
    const nums = [1, 1, 2, 45, 46, 46];
    const res = solution.twoSum6(nums, 47);
    console.log(res);
  }
}

// 57. 三数之和
class Solution57 {
  /**
   *
   * @param {int[]} numbers
   */
  threeSum(numbers) {
    const results = [];
    if (numbers == null || numbers.length < 3) {
      return results;
    }
    numbers = numbers.sort();
    const combination = [];
    this.helper(numbers, 0, 0, combination, results);

    return results;
  }
  helper(nums, start, sum, combination, results) {
    if (sum == 0 && combination.length == 3) {
      results.push([].concat(combination));
      return;
    }
    if (combination.length == 3) {
      return;
    }

    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] == nums[i - 1]) {
        continue;
      }
      combination.push(nums[i]);
      this.helper(nums, i + 1, sum + nums[i], combination, results);
      combination.pop();
    }
  }
  static test() {
    const solution = new Solution57();
    const nums = [-1, 0, 1, 2, -1, -4];
    const res = solution.threeSum(nums);
    console.log(res);
  }
}

// 382. 三角形计数
class SOlution382 {
  /**
   *
   * @param {int[]} S
   */
  triangleCount(S) {
    let count = 0;
    for (let i = 0; i < S.length; i++) {
      let left = 0;
      let right = i - 1;

      while (left < right) {
        if (S[left] + S[right] > S[i]) {
          count += right - left;
          right--;
        } else {
          left++;
        }
      }
    }
    return count;
  }
  static test() {
    const solution = new SOlution382();
    const nums = [3, 4, 6, 7, 8, 13, 20, 21];
    const res = solution.triangleCount(nums);
    console.log(res);
  }
}
SOlution382.test();
