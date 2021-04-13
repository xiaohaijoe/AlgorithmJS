## 链表和数组

**索引**

1. <a href="#450">450. K 组翻转链表(困难)</a>
2. <a href="#96">96. 链表划分(简单)</a>
3. <a href="#165">165. 合并两个排序链表(简单)</a>
4. <a href="#36">36. 翻转链表 II(中等)</a>
5. <a href="#511">511. 交换链表当中两个节点(中等)</a>
6. <a href="#99">99. 重排链表(中等)</a>
7. <a href="#170">170. 旋转链表(中等)</a>
8. <a href="#105">105. 复制带随机指针的链表(中等)</a>
9. <a href="#102">102. 带环链表(中等)</a>
10. <a href="#103">103. 带环链表 II(困难)</a>
11. <a href="#98">98. 链表排序(中等)</a>
12. <a href="#1359">1359. 有序数组转换为二叉搜索树(简单)</a>
13. <a href="#6">6. 合并排序数组(简单)</a>
14. <a href="#64">64. 合并排序数组（简单版）(简单)</a>
15. <a href="#41">41. 最大子数组(简单)</a>
16. <a href="#138">138. 子数组之和(简单)</a>
17. <a href="#65">65. 两个排序数组的中位数(困难)（战术性放弃）</a>
18. <a href="#139">139. 最接近零的子数组和(中等)</a>
19. <a href="#104">104. 合并 k 个排序链表(中等)</a>

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

## <a name='511'>511. 交换链表当中两个节点

**[链接](https://www.lintcode.com/problem/swap-two-nodes-in-linked-list/)**

**描述**

给你一个链表以及两个权值 v1 和 v2，交换链表中权值为 v1 和 v2 的这两个节点。保证链表中节点权值各不相同，如果没有找到对应节点，那么什么也不用做。

**样例**

```
样例 1:

输入: 1->2->3->4->null, v1 = 2, v2 = 4
输出: 1->4->3->2->null
样例 2:

输入: 1->null, v1 = 2, v2 = 1
输出: 1->null
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
     * @param v1: An integer
     * @param v2: An integer
     * @return: a new head of singly-linked list
     */
    public ListNode swapNodes(ListNode head, int v1, int v2) {
        // write your code here
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        head = dummy;
        swap(head, v1, v2);
        return dummy.next;
    }

    private void swap(ListNode head, int v1, int v2) {
      // ListNode n1 = head;
      // ListNode n2 = head;
      List<ListNode> ns = new ArrayList();
      // int i = 0;
      while(head != null) {
        ListNode curt = head.next;
        if(curt != null && (curt.val == v1 || curt.val == v2)) {
          ns.add(head);
        }
        head = head.next;
      }

      if(ns.size() < 2) {
        return;
      }

      ListNode leftDummy = ns.get(0);
      ListNode rightDummy = ns.get(1);

      // v1 = 2, v2 = 4
      // head -> 1 -> 2 -> 3 -> 4 -> null
      //         ^    ^    ^    ^      ^
      //        ld   left  rd right  temp
      ListNode left = leftDummy.next;
      ListNode right = rightDummy.next;

      ListNode temp = right.next;
      leftDummy.next = right;
      rightDummy.next = left;
      right.next = left.next;
      left.next = temp;
    }
}
```

## <a name='99'>99. 重排链表

**[链接](https://www.lintcode.com/problem/reorder-list/)**

**描述**

给定一个单链表 L: L0→L1→…→Ln-1→Ln,

重新排列后为：L0→Ln→L1→Ln-1→L2→Ln-2→…

必须在不改变节点值的情况下进行原地操作。

**样例**

```
样例 1:
	输入: 1->2->3->4->null
	输出: 1->4->2->3->null

样例 2:
	输入: 1->2->3->4->5->null
	输出: 1->5->2->4->3->null

```

**笔记**

1. 分割，利用快慢指针将链表分割成两部分
2. 翻转，将右半边进行链表翻转
3. 合并，将左右两边的链表逐个合并

```
1. 分割
dummy -> 1 -> 2 -> 3 -> 4 -> null
              ^         ^
            slow       fast
2. 翻转，将slow（不包含slow）和fast之间的链表翻转
head: 1 -> 2 -> null;
right: 4 -> 3 -> null;

3. 合并
// 第1次
head: 1 -> 4 -> 2 -> null;
      ^    ^
    point curt
// 结束后
head: 1 -> 4 -> 2 -> null;
                ^
              point
right: 3 -> null;
// 第二次
head: 1 -> 4 -> 2 -> 3 -> null;
                ^    ^
              point curt
// 结束后
head: 1 -> 4 -> 2 -> 3 -> null;
                            ^
                          point
right: null
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
     * @param head: The head of linked list.
     * @return: nothing
     */
    public void reorderList(ListNode head) {
        // write your code here
        if(head == null) {
          return;
        }
        ListNode leftDummy = new ListNode(0);
        leftDummy.next = head;
        ListNode slow = leftDummy;
        ListNode fast = leftDummy;
        // dummy -> 1 -> 2 -> 3 -> 4 - null;
        //               ^         ^
        //              slow      fast
        while(fast.next != null) {
          slow = slow.next;
          fast = fast.next;
          if(fast.next != null) {
            fast = fast.next;
          }
        }

        ListNode right = reverse(slow, fast);
        // slow.next = null;

        ListNode pointer = head;
        // ListNode right = rightDummy.next;
        // 1 -> 2 -> 3 -> 4 -> null
        // pointer: 1 -> 2 -> null;
        // right: 4 -> 3 -> null;
        while(right != null) {
          // pointer: 1 -> 4 -> 2 -> null
          // right: 3 -> null;
          ListNode curt = right;
          right = right.next;

          curt.next = pointer.next;
          pointer.next = curt;

          pointer = curt.next;
        }
    }

    private ListNode reverse(ListNode start, ListNode end) {
      ListNode nk = end.next;

      ListNode prev = null;
      ListNode curt = start.next;
      // dummy -> 1 -> 2 -> 3 -> 4 - null;
      //                    ^    ^    ^
      //                   curt  end  nk
      while(curt != nk) {
        ListNode temp = curt.next;
        curt.next = prev;
        prev = curt;
        curt = temp;
      }

      start.next = null;
      return prev;
    }
}
```

## <a name='170'>170. 旋转链表

**[链接](https://www.lintcode.com/problem/rotate-list/)**

**描述**

给定一个链表，旋转链表，使得每个节点向右移动 k 个位置，其中 k 是一个非负数

**样例**

```
样例 1:

输入：1->2->3->4->5  k = 2
输出：4->5->1->2->3
样例 2:

输入：3->2->1  k = 1
输出：1->3->2
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
     * @param head: the List
     * @param k: rotate to the right k places
     * @return: the list after rotation
     */
    private int getLength(ListNode head) {
        int length = 0;
        while (head != null) {
            length ++;
            head = head.next;
        }
        return length;
    }

    public ListNode rotateRight(ListNode head, int n) {
        if (head == null) {
            return null;
        }

        int length = getLength(head);
        n = n % length;

        ListNode dummy = new ListNode(0);
        dummy.next = head;
        head = dummy;

        ListNode tail = dummy;
        for (int i = 0; i < n; i++) {
            head = head.next;
        }

        while (head.next != null) {
            tail = tail.next;
            head = head.next;
        }

        head.next = dummy.next;
        dummy.next = tail.next;
        tail.next = null;
        return dummy.next;
    }

}
```

## <a name='105'>105. 复制带随机指针的链表

**[链接](https://www.lintcode.com/problem/copy-list-with-random-pointer/)**

**描述**

给出一个链表，每个节点包含一个额外增加的随机指针可以指向链表中的任何节点或空的节点。

返回一个深拷贝的链表。

```java
/**
 * Definition for singly-linked list with a random pointer.
 * class RandomListNode {
 *     int label;
 *     RandomListNode next, random;
 *     RandomListNode(int x) { this.label = x; }
 * };
 */
public class Solution {
    /**
     * @param head: The head of linked list with a random pointer.
     * @return: A new head of a deep copy of the list.
     */
    public RandomListNode copyRandomList(RandomListNode head) {
        // write your code here
        if(head == null) {
          return head;
        }
        RandomListNode dummy = new RandomListNode(0);
        dummy.next = head;
        Map<RandomListNode, RandomListNode> map = new HashMap();

        RandomListNode prev = dummy;
        while(head != null) {
          RandomListNode newNode = null;
          if(map.containsKey(head)) {
            newNode = map.get(head);
          } else {
            newNode = new RandomListNode(head.label);
            map.put(head, newNode);
          }
          prev.next = newNode;

          if(head.random != null) {
            if(map.containsKey(head.random)) {
              newNode.random = map.get(head.random);
            } else {
              RandomListNode newRandom = new RandomListNode(head.random.label);
              map.put(head.random, newRandom);
              newNode.random = newRandom;
            }
          }

          prev = newNode;
          head = head.next;
        }

        return dummy.next;
    }
}
```

## <a name='102'>102. 带环链表

**[链接](https://www.lintcode.com/problem/linked-list-cycle/)**

**描述**

给定一个链表，判断它是否有环。

**样例**

```
样例 1:

输入: 21->10->4->5, then tail connects to node index 1(value 10).
输出: true
样例 2:

输入: 21->10->4->5->null
输出: false
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
     * @param head: The first node of linked list.
     * @return: True if it has a cycle, or false
     */
    public boolean hasCycle(ListNode head) {
        // write your code here
        if (head == null || head.next == null) {
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while(slow != fast) {
          if(fast == null || fast.next == null) {
            return false;
          }
          fast = fast.next.next;
          slow = slow.next;
        }
        return true;
    }
}
```

## <a name='103'>103. 带环链表 II

**[链接](https://www.lintcode.com/problem/linked-list-cycle-ii/)**

**描述**

给定一个链表，如果链表中存在环，则返回到链表中环的起始节点，如果没有环，返回 null。

**样例**

```
样例 1:

输入：null，no cycle
输出：no cycle
解释：
链表为空，所以没有环存在。
样例 2:

输入：-21->10->4->5，tail connects to node index 1
输出：10
解释：
最后一个节点5指向下标为1的节点，也就是10，所以环的入口为10。
挑战
```

**笔记**

1. 使用快慢指针，慢指针走一步，快指针走两步，如果最后两指针相遇，则说明链表中有环；
2. 假设环的长度为 l，环上入口距离链表头距离为 a，两指针第一次相遇处距离环入口为 b，则另一段环的长度为 c=l-b，由于快指针走过的距离是慢指针的两倍，则有 <code>a+b+(l-b)+b=2\*(a+b)</code>,又有 l=b+c，可得 a=c，故当判断有环时(slow==fast)时，移动头指针，同时移动慢指针，两指针相遇处即为环的入口。

```
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 9
^    ^         |    ^              |
s    f         ---------------------
1. 找出相遇点
slow = 5, fast = 5
快慢指针在5相遇

2. 头指针和快指针同时向后移动
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 9
               ^                   ^
               ---------------------
              head                slow
假设
a = 1 -> 4 // 环入口距离链头长度
b = 4 -> 5 // 第一次相遇距离环入口长度
l = 4 -> 9 // 环长度
c = l - b // 环剩余长度
那么
a+b+(l-b)+b = 2*(a+b)
快指针走过的距离 = 慢指针的距离*2
又因为l=b+c
所以a=c

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
     * @param head: The first node of linked list.
     * @return: The node where the cycle begins. if there is no cycle, return null
     */
    public ListNode detectCycle(ListNode head) {
        // write your code here
        if(head == null || head.next == null) {
          return null;
        }
        ListNode slow = head;
        ListNode fast = head.next;

        while(slow != fast) {
          if(fast == null || fast.next == null) {
            return null;
          }
          slow = slow.next;
          fast = fast.next.next;
        }

        // 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
        //                |                        |
        //                --------------------------
        while(head != slow.next) {
          slow = slow.next;
          head = head.next;
        }

        return head;
    }
}
```

## <a name='98'>98. 链表排序

**[链接](https://www.lintcode.com/problem/sort-list/)**

**描述**

在 O(n log n) 时间复杂度和常数级的空间复杂度下给链表排序。

**样例**

```
样例 1:
	输入:  1->3->2->null
	输出:  1->2->3->null

样例 2:
	输入: 1->7->2->6->null
	输出: 1->2->6->7->null
```

**快速排序 Quick Sort**

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
     * @param head: The head of linked list.
     * @return: You should return the head of the sorted linked list, using constant space complexity.
     */
    public ListNode sortList(ListNode head) {
        // write your code here
        if(head == null || head.next == null) {
            return head;
        }

        ListNode mid = getMedian(head);

        ListNode leftDummy = new ListNode(0), leftTail = leftDummy;
        ListNode rightDummy = new ListNode(0), rightTail = rightDummy;
        ListNode middleDummy = new ListNode(0), middleTail = middleDummy;

        while(head != null) {
            if(head.val < mid.val) {
                leftTail.next = head;
                leftTail = leftTail.next;
            } else if(head.val > mid.val) {
                rightTail.next = head;
                rightTail = rightTail.next;
            } else {
                middleTail.next = head;
                middleTail = middleTail.next;
            }
            head = head.next;
        }

        leftTail.next = null;
        rightTail.next = null;
        middleTail.next = null;

        ListNode left = sortList(leftDummy.next);
        ListNode right = sortList(rightDummy.next);

        return concat(left, middleDummy.next, right);
    }

    private ListNode getMedian(ListNode head) {
        ListNode slow = head;
        ListNode fast = head.next;
        while(fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    private ListNode getTail(ListNode node) {
        if(node == null) {
            return node;
        }
        while(node.next != null) {
            node = node.next;
        }
        return node;
    }

    private ListNode concat(ListNode left, ListNode middle, ListNode right) {
        ListNode dummy = new ListNode(0), tail = dummy;

        tail.next = left; tail = getTail(tail);
        tail.next = middle; tail = getTail(tail);
        tail.next = right; tail = getTail(tail);
        return dummy.next;
    }
}
```

**归并排序 Merge Sort**

```javascript
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
     * @param head: The head of linked list.
     * @return: You should return the head of the sorted linked list, using constant space complexity.
     */
    public ListNode sortList(ListNode head) {
        // write your code here
        if(head == null || head.next == null) {
            return head;
        }

        ListNode mid = getMedian(head);

        ListNode right = sortList(mid.next);
        mid.next = null;
        ListNode left = sortList(head);

        return merge(left, right);
    }

    private ListNode merge(ListNode left, ListNode right) {
        ListNode dummy = new ListNode(0), tail = dummy;
        while(left != null && right != null) {
            if(left.val < right.val) {
                tail.next = left;
                left = left.next;
            } else {
                tail.next = right;
                right = right.next;
            }
            tail = tail.next;
        }
        if(left != null){
            tail.next = left;
        }
        if(right != null) {
            tail.next = right;
        }
        return dummy.next;
    }

    private ListNode getMedian(ListNode head) {
        ListNode slow = head;
        ListNode fast = head.next;
        while(fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

}
```

## <a name='1359'>1359. 有序数组转换为二叉搜索树

**[链接](https://www.lintcode.com/problem/1359/)**

**描述**

给定一个数组，其中元素按升序排序，将其转换为高度平衡的 BST。

对于这个问题，高度平衡的二叉树被定义为二叉树，其中每个节点的两个子树的深度从不相差超过 1。

**样例**

```
样例 1:

输入: [-10,-3,0,5,9],
输出: [0,-3,9,-10,#,5],
解释:
针对该数组的其中一个解为 [0,-3,9,-10,null,5], 其对应的平衡BST树如下:
      0
     / \
   -3   9
   /   /
 -10  5
 对于这棵树，你应该返回值为0的根节点。
样例 2:

输入: [1,3]
输出: [3,1]
解释:
针对该数组的其中一个解为 [3,1], 其对应的平衡BST树如下:
  3
 /
1
对于这棵树，你应该返回值为3的根节点。
```

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
    /**
     * @param nums: the sorted array
     * @return: the root of the tree
     */
    public TreeNode convertSortedArraytoBinarySearchTree(int[] nums) {
        // Write your code here.
        if(nums == null) {
            return null;
        }

        TreeNode result = recursion(nums, 0, nums.length - 1);
        return result;
    }

    private TreeNode recursion(int[] nums, int start, int end) {
        if(start > end) {
            return null;
        }
        int mid = start + (end - start)/2;
        TreeNode node = new TreeNode(nums[mid]);
        node.left = recursion(nums, start, mid - 1);
        node.right = recursion(nums, mid + 1, end);

        return node;
    }
}
```

## <a name='6'>6. 合并排序数组

**[链接](https://www.lintcode.com/problem/merge-two-sorted-arrays/)**

**描述**

合并按升序排序的整数数组 A 和 B，新数组也需升序排序。

**样例**

```
样例
Example 1:

Input:

A = [1]
B = [1]
Output:

[1,1]
Explanation:

return array merged.
Example 2:

Input:

A = [1,2,3,4]
B = [2,4,5,6]
Output:

[1,2,2,3,4,4,5,6]
```

```java
public class Solution {
    /**
     * @param A: sorted integer array A
     * @param B: sorted integer array B
     * @return: A new sorted integer array
     */
    public int[] mergeSortedArray(int[] A, int[] B) {
        // write your code here
        int length = A.length + B.length;
        int[] result = new int[length];
        int i = 0, j = 0, index = 0;
        while(i < A.length && j < B.length) {
            if(A[i] < B[j]) {
                result[index++] = A[i++];
            } else if (A[i] > B[j]) {
                result[index++] = B[j++];
            } else {
                result[index++] = A[i++];
                result[index++] = B[j++];
            }
        }
        while(i < A.length) {
            result[index++] = A[i++];
        }
        while(j < B.length) {
            result[index++] = B[j++];
        }
        return result;
    }
}
```

## <a name='64'>64. 合并排序数组（简单版）

**[链接](https://www.lintcode.com/problem/64/)**

**描述**

合并两个排序的整数数组 A 和 B 变成一个新的数组。

**样例**

```
样例 1:

输入：[1, 2, 3]  3  [4,5]  2
输出：[1,2,3,4,5]
解释:
经过合并新的数组为[1,2,3,4,5]
样例 2:

输入：[1,2,5] 3 [3,4] 2
输出：[1,2,3,4,5]
解释：
经过合并新的数组为[1,2,3,4,5]
```

```java
public class Solution {
    /*
     * @param A: sorted integer array A which has m elements, but size of A is m+n
     * @param m: An integer
     * @param B: sorted integer array B which has n elements
     * @param n: An integer
     * @return: nothing
     */
    public void mergeSortedArray(int[] A, int m, int[] B, int n) {
        // write your code here
        int i = m - 1;
        int j = n - 1;
        int index = m + n - 1;
        while(j >= 0 && i >=0) {
          if(A[i] > B[j]) {
            swap(A, index--, i--);
          } else if(A[i] < B[j]) {
            A[index--] = B[j--];
          } else {
            swap(A, index--, i--);
            A[index--] = B[j--];
          }
        }

        while(j >= 0) {
          A[index--] = B[j--];
        }

    }

    private void swap(int[] arr, int l, int r) {
      int temp = arr[l];
      arr[l] = arr[r];
      arr[r] = temp;
    }
}
```

## <a name='41'>41. 最大子数组

**[链接](https://www.lintcode.com/problem/maximum-subarray/)**

**描述**

给定一个整数数组，找到一个具有最大和的子数组，返回其最大和。

每个子数组的数字在数组中的位置应该是连续的。

**样例**

```
样例1:

输入：[−2,2,−3,4,−1,2,1,−5,3]
输出：6
解释：符合要求的子数组为[4,−1,2,1]，其最大和为 6。
样例2:

输入：[1,2,3,4]
输出：10
解释：符合要求的子数组为[1,2,3,4]，其最大和为 10。
```

```java
public class Solution {
    /**
     * @param nums: A list of integers
     * @return: A integer indicate the sum of max subarray
     */
    public int maxSubArray(int[] nums) {
        // write your code here
        int maxAns = Integer.MIN_VALUE; // 全局最大值之和
        int sum = 0; // 当前子数组的和

        for(int i = 0 ; i < nums.length ; i++) {
          sum += nums[i];
          maxAns = Math.max(maxAns, sum);
          sum = Math.max(sum, 0);
        }

        return maxAns;
    }
}
```

## <a name='41'>41. 最大子数组

**[链接](https://www.lintcode.com/problem/subarray-sum/)**

**描述**

给定一个整数数组，找到和为 00 的子数组。

你的代码应该返回满足要求的子数组的起始位置和结束位置

**样例**

```
样例 1:

输入: [-3, 1, 2, -3, 4]
输出: [0,2] 或 [1,3]
样例解释： 返回任意一段和为0的区间即可。
样例 2:

输入: [-3, 1, -4, 2, -3, 4]
输出: [1,5]
```

```java
public class Solution {
    /**
     * @param nums: A list of integers
     * @return: A list of integers includes the index of the first number and the index of the last number
     */
    public List<Integer> subarraySum(int[] nums) {
        // write your code here
        List<Integer> ans = new ArrayList<Integer>();
        Map<Integer, Integer> map = new HashMap();
        int sum = 0;
        map.put(0, -1);

        for(int i = 0 ; i < nums.length ; i++) {
          sum += nums[i];

          if(map.containsKey(sum)) {
            ans.add(map.get(sum) + 1);
            ans.add(i);
          }
          // 把当前的和，存起来
          map.put(sum, i);
        }

        return ans;
    }
}
```

## <a name='65'>65 · 两个排序数组的中位数

**[链接](https://www.lintcode.com/problem/median-of-two-sorted-arrays/)**

**描述**

两个排序的数组 A 和 B 分别含有 m 和 n 个数，找到两个排序数组的中位数，要求时间复杂度应为 O(log (m+n))。

**样例**

```
Example 1

Input:
A = [1,2,3,4,5,6]
B = [2,3,4,5]
Output: 3.5
Example 2

Input:
A = [1,2,3]
B = [4,5]
Output: 3
```

## <a name='139'>139. 最接近零的子数组和

**[链接](https://www.lintcode.com/problem/subarray-sum-closest/)**

**描述**

给定一个整数数组，找到一个和最接近于零的子数组。

返回满足要求的子数组的起始位置和结束位置。

**样例**

```
样例1

输入:
[-3,1,1,-3,5]
输出:
[0,2]
解释: [0,2], [1,3], [1,1], [2,2], [0,4]
```

```java
class Pair {
  public int sum;
  public int index;
  public Pair(int sum, int index) {
    this.sum = sum;
    this.index = index;
  }
}
public class Solution {
    /*
     * @param nums: A list of integers
     * @return: A list of integers includes the index of the first number and the index of the last number
     */
    public int[] subarraySumClosest(int[] nums) {
        // write your code here

        Pair[] pairs = new Pair[nums.length + 1];
        pairs[0] = new Pair(0, 0);
        int prev = 0;
        for(int i = 1 ; i <= nums.length ; i++) {
          pairs[i] = new Pair(prev + nums[i-1], i);
          prev = pairs[i].sum;
        }

        Arrays.sort(pairs, new Comparator<Pair>() {
          public int compare(Pair a, Pair b) {
            return a.sum - b.sum;
          }
        });

        int[] result = new int[2];
        int ans = Integer.MAX_VALUE;
        for(int i = 1 ; i <= nums.length ; i++) {
          if(ans > pairs[i].sum - pairs[i - 1].sum) {
            ans = pairs[i].sum - pairs[i-1].sum;
            int[] temp = new int[]{pairs[i-1].index, pairs[i].index};
            Arrays.sort(temp);
            result[0] = temp[0];
            result[1] = temp[1] - 1;
          }
        }

        return result;
    }
}
```

## <a name='104'>104. 合并 k 个排序链表

**[链接](https://www.lintcode.com/problem/merge-k-sorted-lists/)**

**描述**

合并 k 个排序链表，并且返回合并后的排序链表。尝试分析和描述其复杂度。

**样例**

```
样例 1:

输入:   [2->4->null,null,-1->null]
输出:  -1->2->4->null
样例 2:

输入: [2->6->null,5->null,7->null]
输出:  2->5->6->7->null
```

```java
/**
 * Definition for ListNode.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int val) {
 *         this.val = val;
 *         this.next = null;
 *     }
 * }
 */
public class Solution {
    /**
     * @param lists: a list of ListNode
     * @return: The head of one sorted list.
     */
    public ListNode mergeKLists(List<ListNode> lists) {
        // write your code here
        if(lists == null || lists.size() == 0) {
          return null;
        }

        return helper(lists, 0, lists.size() - 1);
    }

    private ListNode helper(List<ListNode> lists, int start, int end) {
      if(start >= end) {
        return lists.get(start);
      }

      int mid = (start+end)/2;
      ListNode left = helper(lists, start, mid);
      ListNode right = helper(lists, mid+1, end);

      return merge(left, right);
    }

    private ListNode merge(ListNode left, ListNode right) {
      ListNode dummy = new ListNode(0);
      ListNode head = dummy;
      while(left != null && right != null) {
        if(left.val < right.val) {
          head.next = left;
          left = left.next;
        } else {
          head.next = right;
          right = right.next;
        }
        head = head.next;
      }

      if(left != null) {
        head.next = left;
      }
      if(right != null) {
        head.next = right;
      }
      return dummy.next;
    }
}

```
