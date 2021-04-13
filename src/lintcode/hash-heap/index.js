class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class LRUNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
  }
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
// 129. 重哈希
class Solution129 {
  /**
   *
   * @param {ListNode[]} hashTable
   */
  rehashing(hashTable) {
    if (hashTable == null || hashTable.length == 0) {
      return [];
    }
    const size = hashTable.length;
    const newSize = size * 2;
    const results = new Array(newSize);

    for (let i = 0; i < size; i++) {
      let node = hashTable[i];
      while (node != null) {
        const temp = node.next;
        const index = node.val % newSize;
        if (node.val < 0) {
          index = ((node.val % newSize) + newSize) % newSize;
        }
        node.next = null;
        this.insert(results, index, node);

        node = temp;
      }
    }
    return results;
  }
  insert(results, index, node) {
    if (results[index]) {
      const root = results[index];
      while (root.next != null) {
        root = root.next;
      }
      root.next = node;
    } else {
      results[index] = node;
    }
  }
  static test() {
    const solution = new Solution129();
    const n1 = new ListNode(29);
    const n2 = new ListNode(5);
    n1.next = n2;
    const hashTable = [null, null, n1];
    const res = solution.rehashing(hashTable);
    console.log(res);
  }
}

// 134. LRU缓存策略
class Solution134 {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.dummy = new LRUNode(0, 0);
    this.tail = this.dummy;
    this.keyToPrev = new Map();
  }
  get(key) {
    const prev = this.keyToPrev.get(key);
    if (prev == null) {
      return -1;
    }
    this.moveToTail(prev.next.key);
    return this.tail.val;
  }
  set(key, val) {
    if (this.get(key) != -1) {
      // 如果有值
      const prev = this.keyToPrev(key);
      prev.next.val = val;
      return;
    }
    if (this.size < this.capacity) {
      // 如果还有空间
      this.size++;
      const node = new LRUNode(key, val);
      this.tail.next = node;
      this.keyToPrev.set(key, this.tail);

      this.tail = node;
      return;
    }

    // 空间已满，复用头节点
    const first = this.dummy.next;
    this.keyToPrev.delete(first.key);

    first.key = key;
    first.val = val;
    this.keyToPrev.set(first.key, this.dummy);

    this.moveToTail(first.key);
  }
  moveToTail(key) {
    const prev = this.keyToPrev.get(key);
    const curt = prev.next;

    prev.next = prev.next.next;
    this.tail.next = curt;
    curt.next = null;

    if (prev.next != null) {
      this.keyToPrev.set(prev.next.key, prev);
    }
    this.keyToPrev.set(curt.key, this.tail);

    this.tail = curt;
  }

  static test() {
    const lru = new Solution134(4);
    lru.set(2, 1);
    lru.set(1, 1);
    lru.get(2);
    lru.set(4, 1);
    lru.get(1);
    lru.get(2);

    console.log(JSON.stringify(lru.dummy));
  }
}

// 171. 乱序字符串
class Solution171 {
  /**
   *
   * @param {String[]} strs
   * @returns
   */
  anagrams(strs) {
    const result = [];
    if (strs == null || strs.length == 0) {
      return result;
    }
    const map = new Map();
    for (let i = 0; i < strs.length; i++) {
      const str = strs[i];
      const s = [...str].sort().join("");
      if (!map.has(s)) {
        map.set(s, new Array());
      }
      map.get(s).push(str);
    }

    // console.log(map);
    map.forEach((list) => {
      if (list.length > 1) {
        result.push(...list);
      }
    });
    return result;
  }
  static test() {
    const sol = new Solution171(4);
    const strs = ["lint", "intl", "inlt", "code"];
    const res = sol.anagrams(strs);
    console.log(res);
  }
}

// 124. 最长连续序列
class Solution124 {
  /**
   *
   * @param {int[]} num
   * @returns
   */
  longestConsecutive(num) {
    if (num == null || num.length == 0) {
      return 0;
    }

    const set = new Set();
    for (let i = 0; i < num.length; i++) {
      set.add(num[i]);
    }

    let ans = 0;
    for (let i = 0; i < num.length; i++) {
      if (set.has(num[i])) {
        set.delete(num[i]);

        let right = num[i] + 1;
        let left = num[i] - 1;
        while (set.has(right)) {
          set.delete(right);
          right++;
        }
        while (set.has(left)) {
          set.delete(left);
          left--;
        }

        ans = Math.max(ans, right - left - 1);
      }
    }
    return ans;
  }
  static test() {
    const sol = new Solution124();
    const strs = [100, 4, 200, 1, 3, 2];
    const res = sol.longestConsecutive(strs);
    console.log(res);
  }
}

// 4. 丑数 II
class Solution4 {
  /**
   *
   * @param {int} n
   */
  nthUglyNumber(n) {
    const dp = [1];

    let l2 = 0,
      l3 = 0,
      l5 = 0;
    for (let i = 1; i < n; i++) {
      dp[i] = Math.min(dp[l2] * 2, dp[l3] * 3, dp[l5] * 5);
      if (dp[i] == dp[l2] * 2) {
        l2++;
      }
      if (dp[i] == dp[l3] * 3) {
        l3++;
      }
      if (dp[i] == dp[l5] * 5) {
        l5++;
      }
    }
    return dp[n - 1];
  }
  static test() {
    const sol = new Solution4();

    const res = sol.nthUglyNumber(9);
    console.log(res);
  }
}

// 612. K个最近的点
class Solution612 {
  kClosest(points, origin, k) {
    const result = [];

    points = points.sort((a, b) => {
      let diff = this.getDistance(a, origin) - this.getDistance(b, origin);
      if (diff == 0) {
        diff = a.x - b.x;
      }
      if (diff == 0) {
        diff = a.y - b.y;
      }
      return diff;
    });

    return points.slice(0, k);
  }
  getDistance(a, b) {
    return (a.x - b.x) ^ (2 + (a.y - b.y)) ^ 2;
  }
  static test() {
    const sol = new Solution612();
    const points = [
      new Point(4, 6),
      new Point(4, 7),
      new Point(4, 4),
      new Point(2, 5),
      new Point(1, 1),
    ];
    const point = new Point(0, 0);
    const res = sol.kClosest(points, point, 3);
    console.log(res);
  }
}

// 486. 合并 k 个排序数组
class Solution486 {
  mergekSortedArrays(arrays) {
    if (arrays == null || arrays.length == 0) {
      return [];
    }
    return this.helper(arrays, 0, arrays.length - 1);
  }
  helper(arrays, start, end) {
    if (start >= end) {
      return arrays[start];
    }
    const mid = parseInt((start + end) / 2);
    const left = this.helper(arrays, start, mid);
    const right = this.helper(arrays, mid + 1, end);

    return this.merge(left, right);
  }
  merge(left, right) {
    let p1 = 0;
    let p2 = 0;
    const result = [];
    while (p1 < left.length && p2 < right.length) {
      if (left[p1] < right[p2]) {
        result.push(left[p1++]);
      } else {
        result.push(right[p2++]);
      }
    }
    if (p1 < left.length) {
      result.push(...left.slice(p1));
    }
    if (p2 < right.length) {
      result.push(...right.slice(p2));
    }
    return result;
  }
  static test() {
    const sol = new Solution486();
    const arr = [
      [1, 3, 5, 7],
      [2, 4, 6],
      [0, 8, 9, 10, 11],
    ];
    const res = sol.mergekSortedArrays(arr);
    console.log(res);
  }
}
Solution486.test();
