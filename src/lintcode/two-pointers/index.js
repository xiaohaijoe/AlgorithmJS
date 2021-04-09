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

Solution539.test();
