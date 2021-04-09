## 两根指针

**索引**

1. <a href="#604">604. 滑动窗口内数的和(简单)</a>
1. <a href="#539">539. 移动零(简单)</a>

## <a name='604'>604. 滑动窗口内数的和

**[链接](https://www.lintcode.com/problem/window-sum/)**

**描述**

给你一个大小为 n 的整型数组和一个大小为 k 的滑动窗口，将滑动窗口从头移到尾，输出从开始到结束每一个时刻滑动窗口内的数的和。

**样例**

```
样例 1

输入：array = [1,2,7,8,5], k = 3
输出：[10,17,20]
解析：
1 + 2 + 7 = 10
2 + 7 + 8 = 17
7 + 8 + 5 = 20
```

```java
public class Solution {
    /**
     * @param nums: a list of integers.
     * @param k: length of window.
     * @return: the sum of the element inside the window at each moving.
     */
    public int[] winSum(int[] nums, int k) {
        // write your code here

        if(nums.length == 0) {
          return new int[]{};
        }

        int len = nums.length - k + 1;
        int[] result = new int[len];

        int[] sums = new int[nums.length + 1];
        sums[0] = 0;

        int left = 0;
        int right = k;
        for(int i = 1 ; i <= nums.length ; i++) {
          sums[i] = sums[i-1] + nums[i-1];
          if(i >= k) {
            result[left] = sums[right] - sums[left];
            left++;
            right++;
          }
        }

        return result;
    }
}
```

## <a name='539'>539. 移动零

**[链接](https://www.lintcode.com/problem/move-zeroes/)**

**描述**

给一个数组 nums 写一个函数将 0 移动到数组的最后面，非零元素保持原数组的顺序

**样例**

```
例1:

输入: nums = [0, 1, 0, 3, 12],
输出: [1, 3, 12, 0, 0].
例2:

输入: nums = [0, 0, 0, 3, 1],
输出: [3, 1, 0, 0, 0].
```

```java
public class Solution {
    /**
     * @param nums: an integer array
     * @return: nothing
     */
    public void moveZeroes(int[] nums) {
        // write your code here
        if(nums.length <= 1) {
          return;
        }
        int left = 0;
        int right = 0;
        while(right < nums.length) {
          if(nums[right] != 0) {
            if(left != right) {
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
}
```
