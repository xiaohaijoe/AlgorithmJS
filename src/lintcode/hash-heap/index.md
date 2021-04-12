## 哈希表与堆

**索引**

1. <a href="#129">129. 重哈希(中等)</a>
1. <a href="#134">134. LRU 缓存策略(困难)</a>

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

## <a name='129'>129. 重哈希

**[链接](https://www.lintcode.com/problem/rehashing/)**

**描述**

为最近最少使用（LRU）缓存策略设计一个数据结构，它应该支持以下操作：获取数据和写入数据。

- get(key) 获取数据：如果缓存中存在 key，则获取其数据值（通常是正数），否则返回-1。
- set(key, value) 写入数据：如果 key 还没有在缓存中，则设置或插入其数据值。当缓存达到上限，它应该在写入新数据之前删

除最近最少使用的数据用来腾出空闲位置。

最终, 你需要返回每次 get 的数据.

**样例**

```
样例 1:

输入：
LRUCache(2)
set(2, 1)
set(1, 1)
get(2)
set(4, 1)
get(1)
get(2)
输出：[1,-1,1]
解释：
cache上限为2，set(2,1)，set(1, 1)，get(2) 然后返回 1，set(4,1) 然后 delete (1,1)，因为 （1,1）最少使用，get(1) 然后返回 -1，get(2) 然后返回 1。
样例 2:

输入：
LRUCache(1)
set(2, 1)
get(2)
set(3, 2)
get(2)
get(3)
输出：[1,-1,2]
解释：
cache上限为 1，set(2,1)，get(2) 然后返回 1，set(3,2) 然后 delete (2,1)，get(2) 然后返回 -1，get(3) 然后返回 2。
```

```java
class ListNode {
    public int key;
    public int value;
    public ListNode next;
    public ListNode(int key, int value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}
public class LRUCache {
    private ListNode dummy;
    private ListNode tail;
    private int capacity;
    private int size;
    private Map<Integer, ListNode> keyToPrev;
    /*
    * @param capacity: An integer
    */public LRUCache(int capacity) {
        // do intialization if necessary
        this.dummy = new ListNode(0,0);
        this.tail = this.dummy;
        this.keyToPrev = new HashMap<Integer, ListNode>();
        this.capacity = capacity;
    }

    /*
     * @param key: An integer
     * @return: An integer
     */
    public int get(int key) {
        // write your code here
        ListNode prev = keyToPrev.get(key);
        if(prev == null) {
            return -1;
        }
        moveToTail(prev.next.key);

        return tail.value;
    }

    private void moveToTail(int key) {
        ListNode prev = keyToPrev.get(key);
        ListNode curt = prev.next;

        if(tail == curt) {
            return;
        }

        prev.next = prev.next.next;
        tail.next = curt;
        curt.next = null;

        if(prev.next != null) {
            keyToPrev.put(prev.next.key, prev);
        }
        keyToPrev.put(curt.key, tail);
        tail = curt;

    }

    /*
     * @param key: An integer
     * @param value: An integer
     * @return: nothing
     */
    public void set(int key, int value) {
        // write your code here
        if(get(key) != -1) {
            // 如果队列里有这个节点了，就取出来，放在链表尾部
            ListNode prev = keyToPrev.get(key);
            prev.next.value = value;
            return;
        }

        if(size < capacity) {
            size++;
            ListNode curt = new ListNode(key, value);
            tail.next = curt;

            keyToPrev.put(key, tail);
            tail = curt;
            return;
        }
        // 如果超过了大小，就把链表头去掉
        ListNode first = dummy.next;
        keyToPrev.remove(first.key);

        first.key = key;
        first.value = value;
        keyToPrev.put(key, dummy);

        moveToTail(key);

    }
}
```
