## 链表和数组

**索引**

1. <a href="#450">450. K 组翻转链表(困难)</a>
2. <a href="#96">96. 链表划分(简单)</a>
3. <a href="#165">165. 合并两个排序链表(简单)</a>
4. <a href="#36">36 · 翻转链表 II(中等)</a>

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

## <a name='96'>96. 链表划分

**[链接](https://www.lintcode.com/problem/partition-list/)**

**描述**

给定一个单链表和数值 x，划分链表使得所有小于 x 的节点排在大于等于 x 的节点之前。

你应该保留两部分内链表节点原有的相对顺序。

**样例**

```
样例 1:

输入: list = null, x = 0
输出: null
样例解释: 空链表本身满足要求
样例 2:

输入: list = 1->4->3->2->5->2->null, x = 3
输出: 1->2->2->4->3->5->null
样例解释: 要保持原有的相对顺序。
```

**笔记**

双指针方法，用两个指针将两个部分分别串起来。最后在将两个部分拼接起来。 left 指针用来串起来所有小于 x 的结点， right 指针用来串起来所有大于等于 x 的结点。 得到两个链表，一个是小于 x 的，一个是大于等于 x 的，做一个拼接即可。

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
     * @param head: The first node of linked list
     * @param x: An integer
     * @return: A ListNode
     */
    public ListNode partition(ListNode head, int x) {
        // write your code here
        ListNode leftDummy = new ListNode(0);
        ListNode rightDummy = new ListNode(0);
        ListNode left = leftDummy;
        ListNode right = rightDummy;

        while(head != null) {
          if(head.val < x) {
            left.next = head;
            left = head;
          }
          if(head.val >= x) {
            right.next = head;
            right = head;
          }
          head = head.next;
        }

        right.next = null;
        left.next = rightDummy.next;
        return leftDummy.next;
    }
}
```

## <a name='165'>165. 合并两个排序链表

**[链接](https://www.lintcode.com/problem/merge-two-sorted-lists/)**

**描述**

将两个排序链表合并为一个新的排序链表

**样例**

```
样例 1:
	输入: list1 = null, list2 = 0->3->3->null
	输出: 0->3->3->null


样例2:
	输入:  list1 =  1->3->8->11->15->null, list2 = 2->null
	输出: 1->2->3->8->11->15->null
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
     * @param l1: ListNode l1 is the head of the linked list
     * @param l2: ListNode l2 is the head of the linked list
     * @return: ListNode head of linked list
     */
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        // write your code here
        ListNode dummy = new ListNode(0);
        // ListNode left = new ListNode(0);
        ListNode node = dummy;
        while(l1 != null && l2 != null) {
          if(l1.val < l2.val) {
            node.next = l1;
            l1 = l1.next;
          } else {
            node.next = l2;
            l2 = l2.next;
          }
          node = node.next;
        }

        while(l1 != null){
          node.next = l1;
          l1 = l1.next;
          node = node.next;
        }

        while(l2 != null){
          node.next = l2;
          l2 = l2.next;
          node = node.next;
        }

        return dummy.next;

    }
}
```

## <a name='36'>36. 翻转链表 II

**[链接](https://www.lintcode.com/problem/reverse-linked-list-ii/)**

**描述**

翻转链表中第 m 个节点到第 n 个节点的部分

**样例**

```
例1:

输入: 1->2->3->4->5->NULL, m = 2 and n = 4,
输出: 1->4->3->2->5->NULL.
例2:

输入: 1->2->3->4->NULL, m = 2 and n = 3,
输出: 1->3->2->4->NULL.
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
     * @param head: ListNode head is the head of the linked list
     * @param m: An integer
     * @param n: An integer
     * @return: The head of the reversed ListNode
     */
    public ListNode reverseBetween(ListNode head, int m, int n) {
        // write your code here
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        head = dummy;
        reverse(head, m, n);
        return dummy.next;
    }
    private void reverse(ListNode head, int m, int n) {
      ListNode start = head;
      ListNode end = head;
      for(int i = 0 ; i < n ; i++) {
        if(i < m - 1) {
          head = head.next;
        }
        if(i < m) {
          start = start.next;
        }
        end = end.next;
      }

      // head -> 1 -> 2 -> 3 -> 4 -> 5 -> null
      //         ^    ^         ^    ^
      //        head start(n1) end   nk
      ListNode n1 = head.next;
      ListNode nk = end.next;

      ListNode prev = null;
      ListNode curt = start;

      // head -> 1  null <- 2 <- 3 <- 4    5 -> null
      //         ^               ^    ^
      //        head           prev  curt
      while(curt != nk) {
        ListNode temp = curt.next;
        curt.next = prev;
        prev = curt;
        curt = temp;
      }

      head.next = prev;
      start.next = curt;
    }
}
```
