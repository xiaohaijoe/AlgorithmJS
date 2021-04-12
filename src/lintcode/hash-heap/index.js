class ListNode {
  constructor(val) {
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

Solution129.test();