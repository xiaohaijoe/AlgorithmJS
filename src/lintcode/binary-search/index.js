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
class Solution74 {
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

// 447. 在大数组中查找
// 给一个按照升序排序的非负整数数组。这个数组很大以至于你只能通过固定的接口 ArrayReader.get(k) 来访问第k个数(或者C++里是ArrayReader->get(k))，并且你也没有办法得知这个数组有多大。
// 找到给出的整数target第一次出现的位置。你的算法需要在O(logk)的时间复杂度内完成，k为target第一次出现的位置的下标。
// 如果找不到target，返回-1。
class Solution447 {
  /**
   * searchBigSortedArray
   *
   * @param reader: An instance of ArrayReader.
   * @param target: An integer
   * @return: An integer which is the first index of target.
   */
  searchBigSortedArray(reader, target) {
    // write your code here
    let start = 0,
      end = 10;
    let mid = 0;

    while (reader.get(end) < target && reader.get(end) !== 2147483647) {
      start = end;
      end *= 2;
    }

    while (start + 1 < end) {
      mid = start + parseInt((end - start) / 2);

      if (reader.get(mid) === target) {
        end = mid;
      } else if (reader.get(mid) > target) {
        end = mid;
      } else {
        start = mid;
      }
    }

    if (reader.get(start) === target) {
      return start;
    }
    if (reader.get(end) === target) {
      return end;
    }
    return -1;
  }
}

// 159. 寻找旋转排序数组中的最小值
// 假设一个排好序的数组在其某一未知点发生了旋转（比如0 1 2 4 5 6 7 可能变成4 5 6 7 0 1 2）。你需要找到其中最小的元素。
class Solution159 {
  /**
   * findMin
   *
   * @param nums: a rotated sorted array
   * @return: the minimum number in the array
   */
  findMin(nums) {
    // write your code here
    let start = 0,
      end = nums.length - 1;
    let mid = 0;

    while (start + 1 < end) {
      mid = start + parseInt((end - start) / 2);

      if (nums[mid] > nums[end]) {
        start = mid;
      } else {
        end = mid;
      }
    }

    if (nums[end] > nums[start]) {
      return nums[start];
    } else {
      return nums[end];
    }
  }
}

// 28. 搜索二维矩阵
// 写出一个高效的算法来搜索 m × n矩阵中的值。
// 这个矩阵具有以下特性：
// 每行中的整数从左到右是排序的。
// 每行的第一个数大于上一行的最后一个整数。
class Solution28 {
  /**
   * searchMatrix
   *
   * @param matrix: matrix, a list of lists of integers
   * @param target: An integer
   * @return: a boolean, indicate whether matrix contains target
   */
  searchMatrix(matrix, target) {
    // write your code here
    if (!matrix || matrix.length === 0) {
      return false;
    }
    let start = 0,
      end = matrix.length - 1;
    let mid = 0;
    while (start + 1 < end) {
      mid = start + parseInt((end - start) / 2);

      const midLastIndex = matrix[mid].length - 1;
      if (matrix[mid][midLastIndex] > target) {
        end = mid;
      } else {
        start = mid;
      }
    }

    const startLastIndex = matrix[start].length - 1;
    const endLastIndex = matrix[end].length - 1;
    let targetIndex = -1;
    if (matrix[start][0] <= target && matrix[start][startLastIndex] >= target) {
      targetIndex = start;
    }
    if (matrix[end][0] <= target && matrix[end][endLastIndex] >= target) {
      targetIndex = end;
    }

    if (targetIndex < 0) {
      return false;
    }

    start = 0;
    end = matrix[targetIndex].length - 1;
    while (start + 1 < end) {
      mid = start + parseInt((end - start) / 2);

      if (matrix[targetIndex][mid] == target) {
        // end = mid;
        return true;
      } else if (matrix[targetIndex][mid] > target) {
        end = mid;
      } else {
        start = mid;
      }
    }

    if (matrix[targetIndex][start] === target) {
      return true;
    }
    if (matrix[targetIndex][end] === target) {
      return true;
    }
    return false;
  }
}

const a = new Solution28();
const r = a.searchMatrix(
  [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 50],
  ],
  7
);
console.log(r);
