## 哈希表与堆

**索引**

1. <a href="#129">129. 重哈希(中等)</a>
2. <a href="#134">134. LRU 缓存策略(困难)</a>
3. <a href="#105">105. 复制带随机指针的链表(中等)</a>
4. <a href="#171">171. 乱序字符串(中等)</a>
5. <a href="#124">124. 最长连续序列(中等)</a>
6. <a href="#4">4. 丑数 II(中等)</a>
7. <a href="#545">545. 前 K 大数 II(中等)</a>
8. <a href="#612">612. K 个最近的点(中等)</a>
9. <a href="#486">486. 合并 k 个排序数组(中等)</a>
10. <a href="#81">81. 寻找数据流的中位数(困难)</a>
11. <a href="#544">544. 前 K 大数(中等)</a>
12. <a href="#401">401. 排序矩阵中的从小到大第 k 个数(中等)</a>

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

## <a name='134'>134. LRU 缓存策略

**[链接](https://www.lintcode.com/problem/134/)**

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

## <a name='105'>105. 复制带随机指针的链表

**[链接](https://www.lintcode.com/problem/copy-list-with-random-pointer/)**

**描述**

A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

Return a deep copy of the list.

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
          return null;
        }
        RandomListNode dummy = new RandomListNode(0);
        Map<RandomListNode, RandomListNode> map = new HashMap();

        RandomListNode prev = dummy;
        while(head != null) {
          RandomListNode node = null;
          if(map.containsKey(head)) {
            node = map.get(head);
          } else {
            node = new RandomListNode(head.label);
            map.put(head, node);
          }
          prev.next = node;
          if(head.random != null) {
            if(map.containsKey(head.random)) {
              node.random = map.get(head.random);
            } else {
              RandomListNode newRandom = new RandomListNode(head.random.label);
              map.put(head.random, newRandom);
              node.random = newRandom;
            }
          }

          prev = node;
          head = head.next;
        }

        return dummy.next;
    }
}
```

## <a name='171'>171. 乱序字符串

**[链接](https://www.lintcode.com/problem/anagrams/)**

**描述**

给出一个字符串数组 S，找到其中所有的乱序字符串(Anagram)。如果一个字符串是乱序字符串，那么他存在一个字母集合相同，但顺序不同的字符串也在 S 中。

**样例**

```
样例1:

输入:["lint", "intl", "inlt", "code"]
输出:["lint", "inlt", "intl"]
样例 2:

输入:["ab", "ba", "cd", "dc", "e"]
输出: ["ab", "ba", "cd", "dc"]
```

```java
public class Solution {
    /**
     * @param strs: A list of strings
     * @return: A list of strings
     */
    public List<String> anagrams(String[] strs) {
        // write your code here
        List<String> result = new ArrayList();
        if(strs == null || strs.length == 0) {
          return result;
        }

        Map<String, ArrayList<String>> map = new HashMap<String, ArrayList<String>>();
        for(int i = 0 ; i < strs.length ; i++) {
          char[] c =  strs[i].toCharArray();
          Arrays.sort(c);
          String s = String.valueOf(c);
          if(!map.containsKey(s)) {
            ArrayList<String> arr = new ArrayList();
            map.put(s, arr);
          }
          map.get(s).add(strs[i]);
        }

        for(Map.Entry<String, ArrayList<String>> entry : map.entrySet()) {
            if (entry.getValue().size() >= 2) {
                result.addAll(entry.getValue());
            }
        }

        return result;
    }
}
```

## <a name='124'>124. 最长连续序列

**[链接](https://www.lintcode.com/problem/longest-consecutive-sequence/)**

**描述**

给定一个未排序的整数数组，找出最长连续序列的长度。

**样例**

```
样例 1

输入 : [100, 4, 200, 1, 3, 2]
输出 : 4
解释 : 这个最长的连续序列是 [1, 2, 3, 4]. 返回所求长度 4

```

```java
public class Solution {
    /**
     * @param num: A list of integers
     * @return: An integer
     */
    public int longestConsecutive(int[] num) {
        // write your code here
        if(num == null || num.length == 0) {
          return 0;
        }
        int count = 0;
        Set<Integer> set = new HashSet();
        for(int i = 0 ; i < num.length ; i++) {
          set.add(num[i]);
        }

        for(int i = 0 ; i < num.length ; i++) {
          if(set.contains(num[i])) {
            set.remove(num[i]);

            int right = num[i] + 1;
            int left = num[i] - 1;
            while(set.contains(right)) {
              set.remove(right);
              right++;
            }
            while(set.contains(left)) {
              set.remove(left);
              left--;
            }

            count = Math.max(count, right - left - 1);
          }
        }
        return count;
    }
}
```

## <a name='4'>4. 丑数 II

**[链接](https://www.lintcode.com/problem/ugly-number-ii/)**

**描述**

如果一个数的质数因子为 2，3，5 ，那么这个数称之为丑数。

前 10 个丑数分别为 1, 2, 3, 4, 5, 6, 8, 9, 10, 12...设计一个算法，找出第 N 个丑数。

**样例**

```
样例 1：

输入：

n = 9
输出：

10
解释：

[1,2,3,4,5,6,8,9,10,....],第9个丑数为10
样例 2：

输入：

n = 1
输出：

1

```

**笔记(最小堆)**

- 解题思路
- 很容易想到的方法是：从 1 起检验每个数是否为丑数，直到找到 n 个丑数为止。但是随着 n 的增大，绝大部分数字都不是丑数，我们枚举的效率非常低。因此，换个角度思考，如果我们只生成丑数，且生成 n 个，这道题就迎刃而解。
- 不难发现生成丑数的规律：如果已知丑数 ugly，那么 ugly \* 2，ugly \* 3 和 ugly \* 5 也都是丑数。
- 既然求第 n 小的丑数，可以采用最小堆来解决。每次弹出堆中最小的丑数，然后检查它分别乘以 2、3 和 5 后的数是否生成过，如果是第一次生成，那么就放入堆中。第 n 个弹出的数即为第 n 小的丑数。

```java
public class Solution {
    /**
     * @param n: An integer
     * @return: return a  integer as description.
     */
    public int nthUglyNumber(int n) {
        // write your code here
        PriorityQueue<Long> heap = new PriorityQueue<Long>();
        heap.add(1L);

        HashSet<Long> set = new HashSet<Long>();
        set.add(1L);

        int[] factors = new int[]{2,3,5};

        long currUgly = 1;
        for(int i = 0 ; i < n ; i++) {
          currUgly = heap.poll();

          for(int factor : factors) {
            long newUgly = currUgly * factor;
            if(!set.contains(newUgly)) {
              set.add(newUgly);
              heap.add(newUgly);
            }
          }
        }
        return (int)currUgly;
    }
}
```

**笔记（动态规划）**

- 解题思路
- 在最小堆方法中，我们的思路是把当前丑数能生成的丑数都加入到堆中，然后再弹出最小值。如果我们能知道下一个最小的丑数，每次只生成最小的那个，就可以节省最小值查询的时间消耗。
- 采用动态规划的方法，用一个有序数组 dp 记录前 n 个丑数。三个指针 l2，l3 和 l5 指向 dp 中的元素，最小的丑数只可能出现在 dp[l2]的 2 倍、dp[l3]的 3 倍和 dp[l5]的 5 倍三者中间。通过移动三个指针，就能保证生成的丑数是有序的。

```javascript
public class Solution {
    /**
     * @param n: An integer
     * @return: return a  integer as description.
     */
    public int nthUglyNumber(int n) {
        // write your code here
        int[] dp = new int[n];
        dp[0] = 1;

        int l2 = 0,l3=0,l5=0;
        for(int i = 1 ; i < n ; i++) {
          dp[i] = Math.min(Math.min(dp[l2]*2, dp[l3]*3), dp[l5]*5);
          if(dp[i] == dp[l2] * 2) {
            l2++;
          }
          if(dp[i] == dp[l3] * 3) {
            l3++;
          }
          if(dp[i] == dp[l5] * 5) {
            l5++;
          }
        }
        return dp[n - 1];
    }
}
```

## <a name='545'>545. 前 K 大数 II

**[链接](https://www.lintcode.com/problem/top-k-largest-numbers-ii/)**

**描述**

实现一个数据结构，提供下面两个接口

1. add(number) 添加一个元素
2. topk() 返回此数据结构中最大的 k 个数字。当我们创建数据结构时，k 是给定的。

**样例**

```
样例1

输入:
s = new Solution(3);
s.add(3)
s.add(10)
s.topk()
s.add(1000)
s.add(-99)
s.topk()
s.add(4)
s.topk()
s.add(100)
s.topk()

输出:
[10, 3]
[1000, 10, 3]
[1000, 10, 4]
[1000, 100, 10]

解释:
s = new Solution(3);
>> 生成了一个新的数据结构, 并且 k = 3.
s.add(3)
s.add(10)
s.topk()
>> 返回 [10, 3]
s.add(1000)
s.add(-99)
s.topk()
>> 返回 [1000, 10, 3]
s.add(4)
s.topk()
>> 返回 [1000, 10, 4]
s.add(100)
s.topk()
>> 返回 [1000, 100, 10]
样例2

输入:
s = new Solution(1);
s.add(3)
s.add(10)
s.topk()
s.topk()

输出:
[10]
[10]

解释:
s = new Solution(1);
>> 生成了一个新的数据结构, 并且 k = 1.
s.add(3)
s.add(10)
s.topk()
>> 返回 [10]
s.topk()
>> 返回 [10]

```

```java
public class Solution {
    private PriorityQueue<Integer> minHeap;
    private int k;
    /*
    * @param k: An integer
    */public Solution(int k) {
        // do intialization if necessary
        this.k = k;
        this.minHeap = new PriorityQueue();
    }

    /*
     * @param num: Number to be added
     * @return: nothing
     */
    public void add(int num) {
        // write your code here
        if(minHeap.size() < k) {
          minHeap.offer(num);
          return;
        }
        if(num > minHeap.peek()) {
          minHeap.poll();
          minHeap.offer(num);
        }
    }

    /*
     * @return: Top k element
     */
    public List<Integer> topk() {
        // write your code here
        List<Integer> result = new ArrayList();
        Iterator it = minHeap.iterator();
        while(it.hasNext()) {
          result.add((Integer)it.next());
        }
        Collections.sort(result, Collections.reverseOrder());
        return result;
    }
}
```

## <a name='612'>612. K 个最近的点

**[链接](https://www.lintcode.com/problem/k-closest-points/)**

**描述**

在二维空间里给定一些 points 和一个 origin，从 points 中找到 k 个离 origin 欧几里得距离最近的点。

按照欧几里得距离由小到大返回。

如果两个点有相同欧几里得距离，则按照 x 值来排序；若 x 值也相同，就再按照 y 值排序。

**样例**

```
例1:

输入: points = [[4,6],[4,7],[4,4],[2,5],[1,1]], origin = [0, 0], k = 3
输出: [[1,1],[2,5],[4,4]]
例2:

输入: points = [[0,0],[0,9]], origin = [3, 1], k = 1
输出: [[0,0]]
```

```java
/**
 * Definition for a point.
 * class Point {
 *     int x;
 *     int y;
 *     Point() { x = 0; y = 0; }
 *     Point(int a, int b) { x = a; y = b; }
 * }
 */

// Version 1
public class Solution {
    /**
     * @param points: a list of points
     * @param origin: a point
     * @param k: An integer
     * @return: the k closest points
     */
    public Point[] kClosest(Point[] points, Point origin, int k) {
        // write your code here
        Point[] result = new Point[k];
        PriorityQueue<Point> heap = new PriorityQueue<Point>(k, new Comparator<Point>() {
          @Override
          public int compare(Point a, Point b) {
              int diff = getDistance(b, origin) - getDistance(a, origin);
              if(diff == 0) {
                diff = b.x - a.x;
              }
              if(diff == 0) {
                diff = b.y - a.y;
              }
              return diff;
          }
        });

        for(int i = 0 ; i < points.length ; i++) {
          heap.offer(points[i]);
          if(heap.size() > k) {
            heap.poll();
          }
        }

        while(heap.size() > 0) {
          result[--k] = heap.poll();
        }
        return result;
    }
    private int getDistance(Point a, Point b) {
      return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
    }
}

// Version 2
/**
 * Definition for a point.
 * class Point {
 *     int x;
 *     int y;
 *     Point() { x = 0; y = 0; }
 *     Point(int a, int b) { x = a; y = b; }
 * }
 */

public class Solution {
    /**
     * @param points: a list of points
     * @param origin: a point
     * @param k: An integer
     * @return: the k closest points
     */
    public Point[] kClosest(Point[] points, Point origin, int k) {
        // write your code here
        Point[] result = new Point[k];

        Arrays.sort(points, new Comparator<Point>(){
          @Override
          public int compare(Point a, Point b) {
            int diff = getDistance(a, origin) - getDistance(b, origin);
            if(diff == 0) {
              diff = a.x - b.x;
            }
            if(diff == 0) {
              diff = a.y - b.y;
            }
            return diff;
          }
        });

        for(int i = 0 ; i < k ; i++) {
          result[i] = points[i];
        }
        return result;
    }
    private int getDistance(Point a, Point b) {
      return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
    }
}
```

## <a name='486'>486. 合并 k 个排序数组

**[链接](https://www.lintcode.com/problem/merge-k-sorted-arrays/)**

**描述**

将 k 个有序数组合并为一个大的有序数组。

**样例**

```
样例 1:

输入:
  [
    [1, 3, 5, 7],
    [2, 4, 6],
    [0, 8, 9, 10, 11]
  ]
输出: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
样例 2:

输入:
  [
    [1,2,3],
    [1,2]
  ]
输出: [1,1,2,2,3]
```

```java
// Version 1
public class Solution {
    /**
     * @param arrays: k sorted integer arrays
     * @return: a sorted array
     */
    public int[] mergekSortedArrays(int[][] arrays) {
        // write your code here
        if(arrays == null || arrays.length == 0) {
          return null;
        }
        return helper(arrays, 0, arrays.length - 1);
    }
    private int[] helper(int[][] arrays, int start, int end) {
      if(start >= end) {
        return arrays[start];
      }

      int mid = start + (end - start) / 2;
      int[] left = helper(arrays, start, mid);
      int[] right = helper(arrays, mid+1,end);
      return merge(left, right);
    }

    private int[] merge(int[] left, int[] right) {
      int[] result = new int[left.length + right.length];

      int p1 = 0;
      int p2 = 0;
      int i = 0;
      while(p1 < left.length && p2 < right.length) {
        if(left[p1] < right[p2]) {
          result[i] = left[p1];
          p1++;
        } else {
          result[i] = right[p2];
          p2++;
        }
        i++;
      }

      while(p1 < left.length) {
        result[i++] = left[p1];
        p1++;
      }
      while(p2 < right.length) {
        result[i++] = right[p2];
        p2++;
      }
      return result;
    }
}

// Version 2
// 使用heap
class Element {
  public int row;
  public int col;
  public int val;
  public Element(int row, int col, int val) {
    this.row = row;
    this.col = col;
    this.val = val;
  }
}
public class Solution {
    private Comparator<Element> ElementComparator = new Comparator<Element>() {
      @Override
      public int compare(Element a, Element b) {
        return a.val - b.val;
      }
    };
    /**
     * @param arrays: k sorted integer arrays
     * @return: a sorted array
     */
    public int[] mergekSortedArrays(int[][] arrays) {
        // write your code here
        if(arrays == null || arrays.length == 0) {
          return null;
        }
        Queue<Element> queue = new PriorityQueue(arrays.length, ElementComparator);

        int totalSize = 0;
        for(int i = 0 ; i < arrays.length ; i++) {
          if(arrays[i].length > 0) {
            Element elem = new Element(i, 0, arrays[i][0]);
            queue.offer(elem);
            totalSize += arrays[i].length;
          }
        }

        int[] result = new int[totalSize];
        int index = 0;
        while(!queue.isEmpty()) {
          Element elem = queue.poll();
          result[index++] = elem.val;
          if(elem.col + 1 < arrays[elem.row].length) {
            elem.col++;
            elem.val = arrays[elem.row][elem.col];
            queue.offer(elem);
          }
        }

        return result;
    }

}
```

## <a name='81'>81. 寻找数据流的中位数

**[链接](https://www.lintcode.com/problem/81/)**

**描述**

```
本题将给出一个整数数据流，你将实现如下两个函数：

- 函数 add(val) ：从数据流中获得一个数字。
- 函数 getMedian() ：返回你从数据流获得的所有数字的 中位数。
  本题的 中位数 不等同于数学定义里的 中位数 。
  本题的中位数是指将所有数字排序后得到数组的中间值，如果有数组 A 中有 n 个数，则中位数为 A[(n - 1) / 2] 。
  比如：数组 A=[1,2,3] 的中位数是 A[(3-1)/2] = A[1] = 2，数组 A=[1,19] 的中位数是 A[(2-1)/2] = A[0] = 1 。

```

**样例**

```
样例 1：

输入：

add(1)
getMedian()
add(2)
getMedian()
add(3)
getMedian()
add(4)
getMedian()
add(5)
getMedian()
输出：

1
1
2
2
3
解释：

[1] 和 [1,2] 的中位数是 1，
[1,2,3] 和 [1,2,3,4] 的中位数是 2，
[1,2,3,4,5] 的中位数是 3。

样例 2：

输入：

add(4)
getMedian()
add(5)
getMedian()
add(1)
getMedian()
add(3)
getMedian()
add(2)
getMedian()
add(6)
getMedian()
add(0)
getMedian()
输出：

4
4
4
3
3
3
3
解释：

[4], [4,5] 和 [4,5,1] 的中位数是 4，
[4,5,1,3], [4,5,1,3,2], [4,5,1,3,2,6] 和 [4,5,1,3,2,6,0] 的中位数是 3。

```

```java
public class Solution {
    private PriorityQueue<Integer> minHeap;
    private PriorityQueue<Integer> maxHeap;
    private int median;
    private boolean isFirst = true;
    public Solution() {
        // do initialize if it is necessary
        this.minHeap = new PriorityQueue();
        this.maxHeap = new PriorityQueue<>(new Comparator<Integer>() {
          @Override
          public int compare(Integer a, Integer b) {
            return b - a;
          }
        });
    }

    /**
     * @param val: An integer
     * @return: nothing
     */
    public void add(int val) {
        // write your code here
        if(isFirst) {
          this.median = val;
          isFirst = false;
          return;
        }

        if(val < this.median) {
          this.maxHeap.offer(val);
        } else {
          this.minHeap.offer(val);
        }
        // 比较堆中数字数量，调整堆和中位数
        if (this.maxHeap.size() > this.minHeap.size()) {
                this.minHeap.add(this.median);
                this.median = this.maxHeap.poll();
        }
        if (this.maxHeap.size() < this.minHeap.size() - 1) {
            this.maxHeap.add(this.median);
            this.median = this.minHeap.poll();
        }
    }

    /**
     * @return: return the median of the data stream
     */
    public int getMedian() {
        // write your code here
        return this.median;
    }
}
```

## <a name='544'>544. 前 K 大数

**[链接](https://www.lintcode.com/problem/top-k-largest-numbers/)**

**描述**

在一个数组中找到前 K 大的数

**样例**

```
样例
样例1

输入: [3, 10, 1000, -99, 4, 100] 并且 k = 3
输出: [1000, 100, 10]
样例2

输入: [8, 7, 6, 5, 4, 3, 2, 1] 并且 k = 5
输出: [8, 7, 6, 5, 4]

```

```java
// Version 1
// heap
public class Solution {
    /**
     * @param nums: an integer array
     * @param k: An integer
     * @return: the top k largest numbers in array
     */
    public int[] topk(int[] nums, int k) {
        // write your code here
        int[] result = new int[k];

        PriorityQueue<Integer> queue = new PriorityQueue();

        for(int i = 0 ; i < nums.length ; i++){
          if(queue.size() >= k) {
            if(queue.peek() < nums[i]) {
              queue.poll();
              queue.offer(nums[i]);
            }
          } else {
            queue.offer(nums[i]);
          }

        }

        while(!queue.isEmpty()) {
          result[--k] = queue.poll();
        }
        return result;
    }
}


// Version 2
// quick sort
public class Solution {
    /**
     * @param nums: an integer array
     * @param k: An integer
     * @return: the top k largest numbers in array
     */
    public int[] topk(int[] nums, int k) {
        // write your code here
        helper(nums, 0, nums.length - 1);
        int[] result = new int[k];
        for(int i = 0 ; i < k ; i++) {
          result[i] = nums[i];
        }
        return result;
    }

    private void helper(int[] nums, int start, int end) {
      if(start >= end) {
        return;
      }

      int left = start;
      int right = end;
      int pivot = nums[(start+end)/2];
      while(left <= right) {
        while(left <= right && nums[left] > pivot) {
          left++;
        }
        while(left <= right && nums[right] < pivot) {
          right--;
        }
        if(left <= right) {
          int temp = nums[left];
          nums[left] = nums[right];
          nums[right] = temp;

          left++;
          right--;
        }
      }

      helper(nums, start, right);
      helper(nums, left, end);
    }
}
```

## <a name='401'>401. 排序矩阵中的从小到大第 k 个数

**[链接](https://www.lintcode.com/problem/kth-smallest-number-in-sorted-matrix/)**

**描述**

在一个排序矩阵中找从小到大的第 k 个整数。

排序矩阵的定义为：每一行递增，每一列也递增。

**样例**

```
样例 1:

输入:
[
  [1 ,5 ,7],
  [3 ,7 ,8],
  [4 ,8 ,9],
]
k = 4
输出: 5
样例 2:

输入:
[
  [1, 2],
  [3, 4]
]
k = 3
输出: 3

```

```java

// Version 1
// heap
class Element {
  public int col;
  public int row;
  public int val;
  public Element(int row, int col,  int val) {
    this.row = row;
    this.col = col;
    this.val = val;
  }
}
public class Solution {
    /**
     * @param matrix: a matrix of integers
     * @param k: An integer
     * @return: the kth smallest number in the matrix
     */
    public int kthSmallest(int[][] matrix, int k) {
        // write your code here
        PriorityQueue<Element> queue = new PriorityQueue<Element>(k,new Comparator<Element>() {
          public int compare(Element a, Element b) {
            return a.val - b.val;
          }
        });
        for(int i = 0 ; i < matrix.length; i++) {
          if(matrix[i].length > 0) {
            queue.offer(new Element(i,0,matrix[i][0]));
          }
        }

        int index = 1;
        while(!queue.isEmpty()) {
          Element elem = queue.poll();
          if(index == k) {
            return elem.val;
          }
          if(elem.col + 1 < matrix[elem.row].length) {
            elem.col++;
            elem.val = matrix[elem.row][elem.col];
            queue.offer(elem);
          }
          index++;
        }
        return -1;
    }
}


// Version 2
// binary search
class ResultType {
    public int num;
    public boolean exists;
    public ResultType(boolean e, int n) {
        exists = e;
        num = n;
    }
}
public class Solution {
    /**
     * @param matrix: a matrix of integers
     * @param k: An integer
     * @return: the kth smallest number in the matrix
     */
    public int kthSmallest(int[][] matrix, int k) {
        // write your code here
        int n = matrix.length;
        int m = matrix[0].length;

        int left = matrix[0][0];
        int right = matrix[n-1][m-1];

        while (left <= right) {
            int mid = left + (right - left) / 2;
            ResultType type = check(mid, matrix);
            if (type.exists && type.num == k) {
                return mid;
            } else if (type.num < k) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }

    public ResultType check(int value, int[][] matrix) {
      int n = matrix.length;
      int m = matrix[0].length;
      
      boolean exists = false;
      int num = 0;
      int i = n - 1, j = 0;
      while (i >= 0 && j < m) {
          if (matrix[i][j] == value)
              exists = true;
              
          if (matrix[i][j] <= value) {
              num += i + 1;
              j += 1;
          } else {
              i -= 1;
          }
      }
      
      return new ResultType(exists, num);
    }
}
```
