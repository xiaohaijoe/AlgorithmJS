**索引**

1. <a href="#13">13. 字符串查找</a>

## <a name="13">13. 字符串查找

**[链接](https://www.lintcode.com/problem/13/)**

**描述**

对于一个给定的 source 字符串和一个 target 字符串，你应该在 source 字符串中找出 target 字符串出现的第一个位置(从 0 开始)。如果不存在，则返回 -1。

**样例**

```
样例 1：

输入：

source = "source"
target = "target"
输出：

-1
解释：

如果source里没有包含target的内容，返回-1

样例 2：

输入：

source = "abcdabcdefg"
target = "bcd"
输出：

1
解释：

如果source里包含target的内容，返回target在source里第一次出现的位置
```

```javascript
public class Solution {
    /**
     * @param source:
     * @param target:
     * @return: return the index
     */
    public int strStr(String source, String target) {
        // Write your code here
        if(source == null || target == null) {
          return -1;
        }

        for(int i = 0 ; i < source.length() - target.length() ; i++) {
          int j = 0;
          for(j = 0 ; j < target.length();j++) {
            if(source.charAt(i+j) != target.charAt(j)) {
              break;
            }
          }
          if(j == target.length()) {
            return i;
          }
        }
        return -1;
    }
}
```
