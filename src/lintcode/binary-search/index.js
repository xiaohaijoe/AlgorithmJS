// 457. 经典二分查找问题
// 在一个排序数组中找一个数，返回该数出现的任意位置，如果不存在，返回 -1。
class Solution457 {
  binarySearch(nums, target) {
    if (!nums || nums.length === 0) {
      return -1;
    }

    let start = 0,
      end = nums.length - 1;
    let mid = 0;
    while (start + 1 < end) {
      mid = start + parseInt((end - start) / 2);
      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] > target) {
        end = mid;
      } else {
        start = mid;
      }
    }

    if (nums[start] === target) {
      return start;
    }
    if (nums[end] === target) {
      return end;
    }
    return -1;
  }
}

// 14. 二分查找
// 给定一个排序的整数数组（升序）和一个要查找的整数target，用O(logn)的时间查找到target第一次出现的下标（从0开始），如果target不存在于数组中，返回-1。
class Solution14 {
  binarySearch(nums, target) {
    if (!nums || nums.length === 0) {
      return -1;
    }

    let start = 0,
      end = nums.length - 1;
    let mid = 0;
    while (start + 1 < end) {
      mid = start + parseInt((end - start) / 2);

      if (nums[mid] === target) {
        end = mid;
      } else if (nums[mid] > target) {
        end = mid;
      } else {
        start = mid;
      }
    }
    if (nums[start] === target) {
      return start;
    }
    if (nums[end] === target) {
      return end;
    }
    return -1;
  }
}

// 458. 目标最后位置
// 给一个升序数组，找到 target 最后一次出现的位置，如果没出现过返回 -1
class Solution458 {
  /**
   * lastPosition
   *
   * @param nums: An integer array sorted in ascending order
   * @param target: An integer
   * @return: An integer
   */
  lastPosition(nums, target) {
    if (!nums || nums.length === 0) {
      return -1;
    }

    let start = 0,
      end = nums.length - 1;
    let mid = 0;
    while (start + 1 < end) {
      mid = start + parseInt((end - start) / 2);

      if (nums[mid] === target) {
        start = mid;
      } else if (nums[mid] > target) {
        end = mid;
      } else {
        start = mid;
      }
    }

    if (nums[end] === target) {
      return end;
    }
    if (nums[start] === target) {
      return start;
    }
    return -1;
  }
}

// 74. 第一个错误的代码版本
// 代码库的版本号是从 1 到 n 的整数。某一天，有人提交了错误版本的代码，因此造成自身及之后版本的代码在单元测试中均出错。请找出第一个错误的版本号。
// 你可以通过 isBadVersion 的接口来判断版本号 version 是否在单元测试中出错，具体接口详情和调用方法请见代码的注释部分。
export class Solution74 {
  /**
   * findFirstBadVersion
   *
   * @param n: An integer
   * @return: An integer which is the first bad version.
   */
  findFirstBadVersion(n) {
    // write your code here
    let start = 1,
      end = n;
    let mid = 1;

    while (start + 1 < end) {
      mid = start + parseInt((end - start) / 2);

      if (isBadVersion(mid) === true) {
        end = mid;
      } else {
        start = mid;
      }
    }

    if (isBadVersion(start)) {
      return start;
    }
    return end;
  }
}
