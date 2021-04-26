**索引**

1. <a href="#235">235. 分解质因数</a>
2. <a href="#46">46. 主元素</a>
3. <a href="#807">807. 回文数 II</a>
4. <a href="#768">768. 杨辉三角</a>

## <a name="235">235. 分解质因数

**[链接](https://www.lintcode.com/problem/235/)**

**描述**

将一个整数分解为若干质因数之乘积。

**样例**

```
样例 1：

输入：10
输出：[2, 5]
样例 2：

输入：660
输出：[2, 2, 3, 5, 11]
```

```javascript
public class Solution {
    /**
     * @param num: An integer
     * @return: an integer array
     */
    public List<Integer> primeFactorization(int num) {
        // write your code here
        List<Integer> result = new ArrayList();
        for(int i = 2; i * i <= num ; i++) {
          while(num % i == 0) {
            num = num / i;
            result.add(i);
          }
        }

        if(num != 1) {
          result.add(num);
        }
        return result;

    }
}
```

## <a name="46">46. 主元素

**[链接](https://www.lintcode.com/problem/46)**

**描述**

给定一个整型数组，找出主元素，它在数组中的出现次数大于数组元素个数的二分之一。

**样例**

```
样例 1:

输入: [1, 1, 1, 1, 2, 2, 2]
输出: 1
样例 2:

输入: [1, 1, 1, 2, 2, 2, 2]
输出: 2
```

```javascript
public class Solution {
    /*
     * @param nums: a list of integers
     * @return: find a  majority number
     */
    public int majorityNumber(List<Integer> nums) {
        // write your code here
        if(nums == null || nums.size() == 0) {
          return -1;
        }
        int candidate = nums.get(0);
        int count = 1;
        for(int i = 1 ; i < nums.size() ; i++) {
          if(count == 0) {
            candidate = nums.get(i);
            count++;
          }
          if(candidate == nums.get(i)) {
            count++;
          } else {
            count--;
          }
        }
        return candidate;
    }
}
```

## <a name="807">807. 回文数 II

**[链接](https://www.lintcode.com/problem/807)**

**描述**

判断一个非负整数 n 的二进制表示是否为回文数

**样例**

```
样例1

输入: n = 0
输出: True
解释:
0 的二进制表示为：0。
样例2

输入: n = 3
输出: True
解释:
3 的二进制表示为：11。
样例3

输入: n = 4
输出: False
解释:
4 的二进制表示为：100。
样例4

输入: n = 6
输出: False
解释:
6 的二进制表示为：110。
```

```javascript
public class Solution {
    /**
     * @param n: non-negative integer n.
     * @return: return whether a binary representation of a non-negative integer n is a palindrome.
     */
    public boolean isPalindrome(int n) {
        // Write your code here
        int[] bin = new int[32];
        int len = 0;
        do {
          bin[len++] = n & 1;
          n >>= 1;
        } while (n > 0);

        for(int i = 0 ; i < len/2 ; i++) {
          if(bin[i] != bin[len - i - 1]) {
            return false;
          }
        }
        return true;
    }
}
```

## <a name="768">768. 杨辉三角

**[链接](https://www.lintcode.com/problem/768)**

**描述**

给一整数 n, 返回杨辉三角的前 n 行

**样例**

```
样例 1:

输入 : n = 4
输出 :
[
 [1]
 [1,1]
 [1,2,1]
 [1,3,3,1]
]
```

```javascript
public class Solution {
    /**
     * @param n: a Integer
     * @return: the first n-line Yang Hui's triangle
     */
    public List<List<Integer>> calcYangHuisTriangle(int n) {
        // write your code here
        List<List<Integer>> result = new ArrayList();
        for(int i = 0 ; i < n ; i++) {
          List<Integer> line = new ArrayList();
          line.add(1);

          for(int j = 1; j < i ; j++) {
            int num = result.get(i - 1).get(j - 1) + result.get(i-1).get(j);
            line.add(num);
          }

          if(i > 0) {
            line.add(1);
          }
          result.add(line);
        }
        return result;
    }
}
```
