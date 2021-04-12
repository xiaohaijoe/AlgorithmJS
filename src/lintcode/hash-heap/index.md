## 哈希表与堆

**索引**

1. <a href="#129">129. 重哈希(中等)</a>

## <a name='129'>129. 重哈希

**[链接](https://www.lintcode.com/problem/rehashing/)**

**描述**

```
哈希表容量的大小在一开始是不确定的。如果哈希表存储的元素太多（如超过容量的十分之一），我们应该将哈希表容量扩大一倍，并将所有的哈希值重新安排。假设你有如下一哈希表：

size=3, capacity=4

[null, 21, 14, null]
↓ ↓
9 null
↓
null
哈希函数为：

int hashcode(int key, int capacity) {
return key % capacity;
}
这里有三个数字 9，14，21，其中 21 和 9 共享同一个位置，因为它们有相同的哈希值 1(21 % 4 = 9 % 4 = 1)。我们将它们存储在同一个链表中。

重建哈希表，将容量扩大一倍，我们将会得到：

size=3, capacity=8

index: 0 1 2 3 4 5 6 7
hash : [null, 9, null, null, null, 21, 14, null]
给定一个哈希表，返回重哈希后的哈希表。

哈希表中负整数的下标位置可以通过下列方式计算：

C++/Java：如果你直接计算-4 % 3，你会得到-1，你可以应用函数：a % b = (a % b + b) % b 得到一个非负整数。
Python：你可以直接用-1 % 3，你可以自动得到 2。
```

**样例**

```
样例 1

输入 : [null, 21->9->null, 14->null, null]
输出 : [null, 9->null, null, null, null, 21->null, 14->null, null]

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
     * @param hashTable: A list of The first node of linked list
     * @return: A list of The first node of linked list which have twice size
     */
    public ListNode[] rehashing(ListNode[] hashTable) {
        // write your code here
        if(hashTable == null || hashTable.length == 0) {
          return new ListNode[]{};
        }
        int size = hashTable.length;
        int newSize = size * 2;
        ListNode[] results = new ListNode[newSize];

        for(int i = 0 ; i < size; i++) {
          ListNode node = hashTable[i];
          while(node != null) {
            ListNode temp = node.next;
            int index = node.val % newSize;
            if(node.val < 0) {
              index = (node.val % newSize + newSize) % newSize;
            }
            node.next = null;
            insert(results, index, node);

            node = temp;
          }
        }

        return results;
    }

    private void insert(ListNode[] results, int index, ListNode node) {
      if(results[index] == null) {
        results[index] = node;
      } else {
        ListNode root = results[index];
        while(root.next != null) {
          root = root.next;
        }
        root.next = node;
      }
    }
};

```
