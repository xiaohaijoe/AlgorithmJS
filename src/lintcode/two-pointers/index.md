## 两根指针

**索引**

1. <a href="#604">604. 滑动窗口内数的和(简单)</a>
2. <a href="#539">539. 移动零(简单)</a>
3. <a href="#100">100. 删除排序数组中的重复数字(简单)</a>
4. <a href="#415">415. 有效回文串(中等)</a>
5. <a href="#8">8. 旋转字符串(简单)</a>
6. <a href="#39">39. 恢复旋转排序数组(简单)</a>
7. <a href="#56">56. 两数之和(简单)</a>
8. <a href="#607">607. 两数之和 III-数据结构设计(简单)</a>
9. <a href="#608">608. 两数和 II-输入已排序的数组(中等)</a>
10. <a href="#587">587. 两数之和 - 不同组成(中等)</a>
11. <a href="#57">57. 三数之和(中等)</a>

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

## <a name='100'>100. 删除排序数组中的重复数字

**[链接](https://www.lintcode.com/problem/100/)**

**描述**

给定一个排序数组，在原数组中“删除”重复出现的数字，使得每个元素只出现一次，并且返回“新”数组的长度。

不要使用额外的数组空间，必须在不使用额外空间的条件下原地完成。

**样例**

```
样例 1:

输入:  []
输出: 0
样例 2:

输入:  [1,1,2]
输出: 2
解释:  数字只出现一次的数组为: [1,2]
```

```java
public class Solution {
    /*
     * @param nums: An ineger array
     * @return: An integer
     */
    public int removeDuplicates(int[] nums) {
        // write your code here
        if(nums.length == 0) {
          return 0;
        }
        int left = 0;
        int right = 0;
        int len = nums.length;
        while(right < len) {
          if(nums[left] != nums[right]) {
            if(left + 1 != right) {
              nums[left+1] = nums[right];
            }
            left++;
          }
          right++;
        }
        return left+1;
    }
}
```

## <a name='415'>415. 有效回文串

**[链接](https://www.lintcode.com/problem/valid-palindrome/)**

**描述**

给定一个字符串，判断其是否为一个回文串。

只考虑字母和数字，忽略大小写。

**样例**

```
样例 1:

输入: "A man, a plan, a canal: Panama"
输出: true
解释: "amanaplanacanalpanama"
样例 2:

输入: "race a car"
输出: false
解释: "raceacar"
```

```java
public class Solution {
    /**
     * @param s: A string
     * @return: Whether the string is a valid palindrome
     */
    public boolean isPalindrome(String s) {
        // write your code here
        if(s.length() == 0) {
          return true;
        }
        String str = s.replaceAll("[^\\w\\d]", "").toLowerCase();
        int left = 0;
        int right = str.length() - 1;
        while(left <= right) {
          if(str.charAt(left) != str.charAt(right)) {
            return false;
          }
          left++;
          right--;
        }
        return true;
    }
}
```

## <a name='8'>8. 旋转字符串

**[链接](https://www.lintcode.com/problem/rotate-string/)**

**描述**

给定一个字符串（以字符数组的形式给出）和一个偏移量，根据偏移量原地旋转字符串(从左向右旋转)。

**样例**

```
Example 1:

Input:

str = ""abcdefg"
offset = 3
Output:

"efgabcd"
Explanation:

Note that it is rotated in place, that is, after str is rotated, it becomes "efgabcd".
Example 2:

Input:

str = ""abcdefg"
offset = 0
Output:

"abcdefg"
Explanation:

Note that it is rotated in place, that is, after str is rotated, it becomes "abcdefg".
Example 3:

Input:

str = ""abcdefg"
offset = 1
Output:

"gabcdef"
Explanation:

Note that it is rotated in place, that is, after str is rotated, it becomes "gabcdef".
Example 4:

Input:

str = ""abcdefg"
offset = 2
Output:

"fgabcde"
Explanation:

Note that it is rotated in place, that is, after str is rotated, it becomes "fgabcde".
Example 5:

Input:

str = ""abcdefg"
offset = 10
Output:

"efgabcd"
```

```java
public class Solution {
    /**
     * @param str: An array of char
     * @param offset: An integer
     * @return: nothing
     */
    public void rotateString(char[] str, int offset) {
        // write your code here
        if(str == null || str.length == 0) {
          return;
        }

        int k = offset % str.length;
        reverse(str, 0, str.length - k - 1);
        reverse(str, str.length - k, str.length - 1);
        reverse(str, 0, str.length - 1);
    }

    private void reverse(char[] str, int start, int end) {
      while(start < end) {
        char temp = str[start];
        str[start] = str[end];
        str[end] = temp;

        start++;
        end--;
      }
    }

}
```

## <a name='39'>39. 恢复旋转排序数组

**[链接](https://www.lintcode.com/problem/recover-rotated-sorted-array/)**

**描述**

给定一个旋转排序数组，在原地恢复其排序。（升序）

**样例**

```
样例1:
[4, 5, 1, 2, 3] -> [1, 2, 3, 4, 5]
样例2:
[6,8,9,1,2] -> [1,2,6,8,9]
```

```java
public class Solution {
    /**
     * @param nums: An integer array
     * @return: nothing
     */
    public void recoverRotatedSortedArray(List<Integer> nums) {
        // write your code here
        if(nums == null || nums.size() <= 1) {
          return;
        }

        int slow = 0;
        int fast = 1;
        while(fast < nums.size()) {
          if(nums.get(fast) < nums.get(slow)){
            break;
          }
          slow++;
          fast++;
        }

        reverse(nums, 0, slow);
        reverse(nums, slow+1, nums.size() - 1);
        reverse(nums, 0, nums.size() - 1);

    }
    private void reverse(List<Integer> nums, int start, int end) {
      while(start < end) {
        int temp = nums.get(start);
        nums.set(start, nums.get(end));
        nums.set(end, temp);

        start++;
        end--;
      }
    }
}
```

## <a name='56'>56. 两数之和

**[链接](https://www.lintcode.com/problem/two-sum/)**

**描述**

Given an array of integers, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are zero-based.

**样例**

```
样例1:
给出 numbers = [2, 7, 11, 15], target = 9, 返回 [0, 1].
样例2:
给出 numbers = [15, 2, 7, 11], target = 9, 返回 [1, 2].
```

```java
public class Solution {
    /**
     * @param numbers: An array of Integer
     * @param target: target = numbers[index1] + numbers[index2]
     * @return: [index1 + 1, index2 + 1] (index1 < index2)
     */
    public int[] twoSum(int[] numbers, int target) {
        // write your code here
        Map<Integer, Integer> map = new HashMap();
        for(int i = 0 ; i < numbers.length ; i++) {
          if(map.get(numbers[i]) != null) {
            int[] result = new int[]{map.get(numbers[i]), i};
            return result;
          }
          map.put(target - numbers[i], i);
        }

        return new int[2];
    }
}
```

## <a name='607'>607. 两数之和 III-数据结构设计

**[链接](https://www.lintcode.com/problem/607/)**

**描述**

设计 b 并实现一个 TwoSum 类。他需要支持以下操作:add 和 find。

<code>add</code> -把这个数添加到内部的数据结构。

<code>find</code> -是否存在任意一对数字之和等于这个值

**样例**

```
样例 1:

add(1);add(3);add(5);
find(4)//返回true
find(7)//返回false

样例 2:
add(2);add(3);add(6);
find(4)//返回false
find(5)//返回true
find(6)//返回false
```

```java
public class TwoSum {
    public Map<Integer, Integer> map = new HashMap();
    public List<Integer> list = new ArrayList();
    /**
     * @param number: An integer
     * @return: nothing
     */
    public void add(int number) {
        // write your code here
        list.add(number);
        if(map.containsKey(number)) {
          map.put(number, map.get(number) + 1);
        } else {
          map.put(number, 1);
        }
    }

    /**
     * @param value: An integer
     * @return: Find if there exists any pair of numbers which sum is equal to the value.
     */
    public boolean find(int value) {
        // write your code here
        for(int i = 0 ; i < list.size() ; i++) {
          int num1 = list.get(i);
          int num2 = value - num1;
          if((num1 == num2 && map.get(num1) > 1) ||
             (num1 != num2 && map.containsKey(num2))) {
               return true;
          }
        }
        return false;
    }
}
```

## <a name='608'>608. 两数和 II-输入已排序的数组

**[链接](https://www.lintcode.com/problem/608/)**

**描述**

给定一个已经 按升序排列 的数组，找到两个数使他们加起来的和等于特定数。

函数应该返回这两个数的下标，index1 必须小于 index2。注意返回的值不是 0-based。

**样例**

```
例1:

输入: nums = [2, 7, 11, 15], target = 9
输出: [1, 2]
例2:

输入: nums = [2,3], target = 5
输出: [1, 2]
```

```java
public class Solution {
    /**
     * @param nums: an array of Integer
     * @param target: target = nums[index1] + nums[index2]
     * @return: [index1 + 1, index2 + 1] (index1 < index2)
     */
    public int[] twoSum(int[] nums, int target) {
        // write your code here
        if(nums == null || nums.length < 2) {
          return new int[2];
        }
        int left = 0;
        int right = nums.length - 1;
        while(left < right) {
          int sum = nums[left] + nums[right];
          if(sum == target) {
            return new int[]{left + 1, right + 1};
          }else if(sum > target) {
            right--;
          } else  {
            left++;
          }
        }
        return new int[2];
    }
}
```

## <a name='587'>587. 两数之和 - 不同组成

**[链接](https://www.lintcode.com/problem/two-sum-unique-pairs/)**

**描述**

给一整数数组, 找到数组中有多少组 不同的元素对 有相同的和, 且和为给出的 target 值, 返回对数.

**样例**

```
例1:

输入: nums = [1,1,2,45,46,46], target = 47
输出: 2
解释:

1 + 46 = 47
2 + 45 = 47

例2:

输入: nums = [1,1], target = 2
输出: 1
解释:
1 + 1 = 2
```

```java
public class Solution {
    /**
     * @param nums: an array of integer
     * @param target: An integer
     * @return: An integer
     */
    public int twoSum6(int[] nums, int target) {
        // write your code here
        if(nums == null || nums.length < 2) {
          return 0;
        }
        Arrays.sort(nums);
        int left = 0;
        int right = nums.length - 1;
        int count = 0;
        while(left < right) {
          int sum = nums[left] + nums[right];
          if(sum == target) {
            count++;
            left++;
            right--;
            while(left < right && nums[right] == nums[right + 1]) {
              right--;
            }
            while(left < right && nums[left] == nums[left - 1]) {
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
}
```

## <a name='57'>57. 三数之和

**[链接](https://www.lintcode.com/problem/3sum/)**

**描述**

给出一个有 n 个整数的数组 S，在 S 中找到三个整数 a, b, c，找到所有使得 a + b + c = 0 的三元组。

**样例**

```
例1:

输入:[2,7,11,15]
输出:[]
例2:

输入:[-1,0,1,2,-1,-4]
输出:[[-1, 0, 1],[-1, -1, 2]]
```

```java
// DFS
public class Solution {
    /**
     * @param numbers: Give an array numbers of n integer
     * @return: Find all unique triplets in the array which gives the sum of zero.
     */
    public List<List<Integer>> threeSum(int[] numbers) {
        // write your code here
        List<List<Integer>> result = new ArrayList();
        if(numbers == null || numbers.length < 3) {
          return result;
        }

        Arrays.sort(numbers);
        // -4, -1, -1, 0, 1, 2
        List<Integer> combination = new ArrayList();
        helper(numbers, 0, combination, result);

        return result;
    }

    private void helper(int[] nums, int start,List<Integer> combination, List<List<Integer>> result) {
      if(combination.size() == 3 && combination.get(0) + combination.get(1) + combination.get(2) == 0) {
        result.add(new ArrayList<Integer>(combination));
        return;
      }
      if(combination.size() == 3) {
        return;
      }
      for(int i = start; i < nums.length ; i++) {
        if(i > start && nums[i] == nums[i - 1]) {
          continue;
        }
        combination.add(nums[i]);
        helper(nums, i+1, combination, result);
        combination.remove(combination.size() - 1);
      }
    }
}

// two sum
public class Solution {
    /**
     * @param numbers: Give an array numbers of n integer
     * @return: Find all unique triplets in the array which gives the sum of zero.
     */
    public List<List<Integer>> threeSum(int[] numbers) {
        // write your code here
        List<List<Integer>> results = new ArrayList();
        if(numbers == null || numbers.length < 3) {
          return results;
        }

        Arrays.sort(numbers);

        for(int i = 0 ; i < numbers.length - 2; i++) {
          if(i > 0 && numbers[i] == numbers[i - 1]) {
            continue;
          }
          int left = i+1;
          int right = numbers.length - 1;
          int target = -numbers[i];

          twoSum(numbers, left, right, target, results);
        }
        return results;
    }

    private void twoSum(int[] nums, int left, int right, int target, List<List<Integer>> results) {
      while(left < right) {
        int sum = nums[left] + nums[right];
        if(sum == target) {
          List<Integer> res = new ArrayList();
          res.add(-target);
          res.add(nums[left]);
          res.add(nums[right]);

          results.add(res);
          left++;
          right--;
          while(left < right && nums[right] == nums[right + 1]) {
            right--;
          }
          while(left < right && nums[left] == nums[left - 1]) {
            left++;
          }
        } else if(sum > target) {
          right--;
        } else {
          left++;
        }
      }
    }
}
```
