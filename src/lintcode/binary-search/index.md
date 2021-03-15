## 索引
14. <a href="#14">二分查找（简单）</a>
457. <a href="#457">经典二分查找问题（简单）</a>

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

457. <a name='457'>经典二分查找问题

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

14. <a name='14'>二分查找

[描述](https://www.lintcode.com/problem/first-position-of-target/)
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
