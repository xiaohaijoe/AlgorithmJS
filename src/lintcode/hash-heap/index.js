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
Solution134.test();
