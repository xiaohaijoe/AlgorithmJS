## 索引

1. <a href="#14">14. 二分查找（简单）</a>
2. <a href="#457">457. 经典二分查找问题（简单）</a>
3. <a href="#458">458. 目标最后位置（简单）</a>
4. <a href="#74">74. 第一个错误的代码版本（中等）</a>

## 二分查找模板

```javascript
  binarySearch(nums, target) {
    if (!nums || nums.length === 0) {
      return -1;
    }

    let start = 0,
      end = nums.length - 1;
    let mid = 0;
    while (start + 1 < end) { // 结束条件
      mid = start + parseInt((end - start) / 2); // 中间切两刀
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
```

## <a name='457'>457. 经典二分查找问题

[链接](http://www.lintcode.com/problem/classical-binary-search/)
**描述**
在一个排序数组中找一个数，返回该数出现的任意位置，如果不存在，返回 -1。

**样例**
样例 1：

```
输入：nums = [1,2,2,4,5,5], target = 2
输出：1 或者 2
```

样例 2：

```
输入：nums = [1,2,2,4,5,5], target = 6
输出：-1
```

**挑战**
O(logn) 的时间

```javascript
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
```

## <a name='14'>14. 二分查找

[链接](https://www.lintcode.com/problem/first-position-of-target/)
**描述**
给定一个排序的整数数组（升序）和一个要查找的整数 target，用 O(logn)的时间查找到 target 第一次出现的下标（从 0 开始），如果 target 不存在于数组中，返回-1。

**样例**

```
样例  1:
	输入:[1,4,4,5,7,7,8,9,9,10]，1
	输出: 0

	样例解释:
	第一次出现在第0个位置。

样例 2:
	输入: [1, 2, 3, 3, 4, 5, 10]，3
	输出: 2

	样例解释:
	第一次出现在第2个位置

样例 3:
	输入: [1, 2, 3, 3, 4, 5, 10]，6
	输出: -1

	样例解释:
	没有出现过6， 返回-1
```

**挑战**
如果数组中的整数个数超过了 2^32，你的算法是否会出错？

## <a name='458'>458. 目标最后位置

**描述**
给一个升序数组，找到 target 最后一次出现的位置，如果没出现过返回 -1

**样例**

```
样例 1：

输入：nums = [1,2,2,4,5,5], target = 2
输出：2
样例 2：

输入：nums = [1,2,2,4,5,5], target = 6
输出：-1
```

```javascript
export class Solution {
  /**
   * lastPosition
   *
   * @param nums: An integer array sorted in ascending order
   * @param target: An integer
   * @return: An integer
   */
  lastPosition(nums, target) {
    // write your code here
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
```

## <a name='74'>74. 第一个错误的代码版本（中等）

[链接](https://www.lintcode.com/problem/first-bad-version/)
**描述**
代码库的版本号是从 1 到 n 的整数。某一天，有人提交了错误版本的代码，因此造成自身及之后版本的代码在单元测试中均出错。请找出第一个错误的版本号。
<br>
你可以通过 isBadVersion 的接口来判断版本号 version 是否在单元测试中出错，具体接口详情和调用方法请见代码的注释部分。

**样例**

```
n = 5:

    isBadVersion(3) -> false
    isBadVersion(5) -> true
    isBadVersion(4) -> true

因此可以确定第四个版本是第一个错误版本。
```

```javascript
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
```
