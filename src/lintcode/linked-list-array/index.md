## 链表和数组

**索引**

1. <a href="#450">450. K 组翻转链表</a>

## <a name='450'>450. K 组翻转链表

**[链接](https://www.lintcode.com/problem/reverse-nodes-in-k-group/)**

**描述**
给定一个链表，一次反转链表 k 的节点并返回其修改后的列表。

如果节点的数量不是 k 的倍数，那么最后遗漏的节点应该保持原样。

不能更改节点中的值，只能更改节点本身。

只允许使用常量内存。

**样例**

```
样例1

输入:
list = 1->2->3->4->5->null
k = 2
输出:
2->1->4->3->5
样例2

输入:
list = 1->2->3->4->5->null
k = 3
输出:
3->2->1->4->5
```

**笔记**
翻转列表过程
```javascript
k = 3
head -> 1 -> 2 -> 3 -> 4 -> 5 -> null

1. 找到尾节点
head -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                  ^
                 tail

2. 记录当前的组的头和尾
head -> 1 -> 2 -> 3 -> 4 -> 5 -> null
        ^              ^
        n1             nk

3. 创建指针prev=null, curt指向组的开头
head -> 1 -> 2 -> 3 -> 4 -> 5 -> null
        ^
       curt

4. 翻转开始
temp = curt.next
curt.next = prev
       head 
        |
        ∨
null <- 1      2 -> 3 -> 4 -> 5 -> null
  ^     ^      ^
prev   curt   temp

5. curt 和 prev 向后移动一步
prev = curt
curt = temp
null <- 1      2 -> 3 -> 4 -> 5 -> null
        ^      ^
      prev   curt

6. 重复4，5步骤
7. 将链表重新拼接
结束状态：
null <- 1 <- 2 <- 3    4 -> 5 -> null
        ^         ^    ^
        n1      prev   curt
链接头和尾
head.next = prev;
n1.next = curt;
head -> 3 -> 2 -> 1 -> 4 -> 5 -> null
        ^         ^    ^
      prev        n1  curt
```

```java
/**
 * Definition for ListNode
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */

public class Solution {
    /**
     * @param head: a ListNode
     * @param k: An integer
     * @return: a ListNode
     */
    public ListNode reverseKGroup(ListNode head, int k) {
        // write your code here
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        head = dummy;
        while(head != null) {
          head = reverseK(head, k);
        }

        return dummy.next;
    }
    private ListNode reverseK(ListNode head, int k) {
      ListNode tail = head;
      // 找到尾指针
      for(int i = 0 ; i < k ; i++){
        if(tail == null) {
          return null;
        }
        tail = tail.next;
      }

      // 凑不够k个
      if(tail == null) {
        return null;
      }

      ListNode n1 = head.next;
      ListNode nk = tail.next;
      ListNode prev = null;
      ListNode curt = n1;
      while(curt != nk) {
        ListNode temp = curt.next;
        curt.next = prev;
        prev = curt;
        curt = temp;
      }
      head.next = tail;
      n1.next = nk;
      return n1;
    }
}
```
