class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class RandomListNode {
  constructor(label) {
    this.label = label;
    this.next = null;
    this.random = null;
  }
}
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
// 450. K 组翻转链表
class Solution450 {
  reverseKGroup(head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;
    head = dummy;
    while (head != null) {
      head = this.reverseK(head, k);
    }
    return dummy.next;
  }
  reverseK(head, k) {
    // 找到尾巴节点
    let tail = head;
    for (let i = 0; i < k; i++) {
      if (tail == null) {
        return null;
      }
      tail = tail.next;
    }

    if (tail == null) {
      return null;
    }

    const start = head.next;
    const end = tail.next;

    let prev = null;
    let curt = start;
    while (curt != end) {
      const temp = curt.next;
      curt.next = prev;
      prev = curt;
      curt = temp;
    }
    // null <- 1 <- 2   3 -> 4 -> null
    head.next = prev;
    start.next = curt;
    return start;
  }
  static test() {
    const solution = new Solution450();
    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    const n4 = new ListNode(4);
    const n5 = new ListNode(5);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    const res = solution.reverseKGroup(n1, 2);
    console.log(res);
  }
}

// 96. 链表划分
class Solution96 {
  /**
   *
   * @param {ListNode} head
   * @param {int} x
   */
  partition(head, x) {
    const dummyLeft = new ListNode(0);
    const dummyRight = new ListNode(0);

    let left = dummyLeft;
    let right = dummyRight;
    while (head != null) {
      if (head.val < x) {
        left.next = head;
        left = left.next;
      }
      if (head.val >= x) {
        right.next = head;
        right = right.next;
      }
      head = head.next;
    }

    right.next = null;
    left.next = dummyRight.next;

    return dummyLeft.next;
  }
  static test() {
    const solution = new Solution96();
    // 1 -> 5 -> 4 -> 3 -> 2 -> null
    const n1 = new ListNode(1);
    const n2 = new ListNode(5);
    const n3 = new ListNode(4);
    const n4 = new ListNode(3);
    const n5 = new ListNode(2);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    const res = solution.partition(n1, 3);
    console.log(res);
  }
}

// 165. 合并两个排序链表
class Solution165 {
  mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let head = dummy;

    const leftDummy = new ListNode(0);
    const rightDummy = new ListNode(0);
    let left = leftDummy;
    let right = rightDummy;
    while (l1 != null && l2 != null) {
      if (l1.val < l2.val) {
        head.next = l1;
        l1 = l1.next;
      } else {
        head.next = l2;
        l2 = l2.next;
      }
      head = head.next;
    }

    while (l1 != null) {
      head.next = l1;
      l1 = l1.next;
      head = head.next;
    }

    while (l2 != null) {
      head.next = l2;
      l2 = l2.next;
      head = head.next;
    }
    return dummy.next;
  }
  static test() {
    const solution = new Solution165();
    const n1 = new ListNode(1);
    const n2 = new ListNode(4);
    const n3 = new ListNode(5);

    const n4 = new ListNode(2);
    const n5 = new ListNode(3);
    n1.next = n2;
    n2.next = n3;
    // n3.next = n4;
    n4.next = n5;
    const res = solution.mergeTwoLists(n1, n4);
    console.log(JSON.stringify(res));
  }
}

// 36. 翻转链表 II
class Solution36 {
  /**
   *
   * @param {ListNode} head
   * @param {int} m
   * @param {int} n
   */
  reverseBetween(head, m, n) {
    const dummy = new ListNode(0);
    dummy.next = head;

    head = dummy;
    this.reverse(head, m, n);
    return dummy.next;
  }
  reverse(head, m, n) {
    let start = head;
    let end = head;

    for (let i = 0; i < n; i++) {
      if (i < m - 1) {
        head = head.next;
      }
      if (i < m) {
        start = start.next;
      }
      end = end.next;
    }

    const n1 = head.next;
    const nk = end.next;
    let prev = null;
    let curt = start;

    while (curt != nk) {
      const temp = curt.next;
      curt.next = prev;
      prev = curt;
      curt = temp;
    }

    head.next = prev;
    start.next = curt;
  }
  static test() {
    const solution = new Solution36();
    // 1 -> 2 -> 3 -> 4 -> 5 -> null
    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    const n4 = new ListNode(4);
    const n5 = new ListNode(5);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    const res = solution.reverseBetween(n1, 1, 3);
    console.log(JSON.stringify(res));
  }
}

// 511. 交换链表当中两个节点
class Solution511 {
  /**
   *
   * @param {ListNode} head
   * @param {int} v1
   * @param {int} v2
   */
  swapNodes(head, v1, v2) {
    const dummy = new ListNode(0);
    dummy.next = head;
    head = dummy;
    this.swap(head, v1, v2);
    return dummy.next;
  }
  swap(head, v1, v2) {
    const ns = [];
    while (head != null) {
      const curt = head.next;
      if (curt != null && (curt.val === v1 || curt.val === v2)) {
        ns.push(head);
      }
      head = head.next;
    }

    if (ns.length < 2) {
      return;
    }

    const leftDummy = ns[0];
    const rightDummy = ns[1];

    let left = leftDummy.next;
    let right = rightDummy.next;

    let temp = left.next;
    leftDummy.next = right;
    rightDummy.next = left;
    left.next = right.next;
    right.next = temp;
  }
  static test() {
    const solution = new Solution511();
    // 1 -> 2 -> 3 -> 4 -> 5 -> null
    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    const n4 = new ListNode(4);
    const n5 = new ListNode(5);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    const res = solution.swapNodes(n1, 2, 5);
    console.log(JSON.stringify(res));
  }
}

// 99. 重排链表
class Solution99 {
  /**
   *
   * @param {ListNode} head
   */
  reorderList(head) {
    if (head == null) {
      return head;
    }
    const dummy = new ListNode(0);
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;
    while (fast.next != null) {
      slow = slow.next;
      fast = fast.next;
      if (fast.next != null) {
        fast = fast.next;
      }
    }

    let right = this.reverse(slow, fast);
    let pointer = head;
    while (right != null) {
      // 获取单独节点
      const curt = right;
      right = right.next;

      curt.next = pointer.next;
      pointer.next = curt;

      pointer = curt.next;
    }
  }
  reverse(start, end) {
    let nk = end.next;
    let prev = null;
    let curt = start.next;

    while (curt != nk) {
      const temp = curt.next;
      curt.next = prev;
      prev = curt;
      curt = temp;
    }

    // 切断原来的链表
    start.next = null;
    return prev;
  }
  static test() {
    const solution = new Solution99();
    // 1 -> 2 -> 3 -> 4 -> 5 -> null
    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    const n4 = new ListNode(4);
    const n5 = new ListNode(5);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    solution.reorderList(n1);
    console.log(JSON.stringify(n1));
  }
}

// 170 · 旋转链表
class Solution170 {
  /**
   *
   * @param {ListNode} head
   * @param {int} k
   */
  rotateRight(head, k) {
    if (head == null) {
      return head;
    }
    const length = this.getLength(head);
    k = k % length;

    const dummy = new ListNode(0);
    dummy.next = head;
    head = dummy;

    let tail = dummy;
    for (let i = 0; i < k; i++) {
      head = head.next;
    }

    while (head.next != null) {
      tail = tail.next;
      head = head.next;
    }

    // 5 -> 1 -> 2 ->3 ->4 ->5 -> 循环
    head.next = dummy.next;
    // dummy -> 4 -> 5 -> 1 -> 2 -> 3 -> 4 -> 5 -> 循环
    dummy.next = tail.next;
    // dummy -> 4 -> 5 -> 1 -> 2 -> 3 -> null;
    tail.next = null;
    return dummy.next;
  }
  getLength(head) {
    let length = 0;
    while (head != null) {
      length++;
      head = head.next;
    }
    return length;
  }
  static test() {
    const solution = new Solution170();
    // 1 -> 2 -> 3 -> 4 -> 5 -> null
    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    const n4 = new ListNode(4);
    const n5 = new ListNode(5);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    const res = solution.rotateRight(n1, 2);
    console.log(JSON.stringify(res));
  }
}

// 105. 复制带随机指针的链表
class Solution105 {
  /**
   *
   * @param {RandomListNode} head
   */
  copyRandomList(head) {
    if (head == null) {
      return head;
    }

    const dummy = new RandomListNode(0);
    const map = new Map();
    let prev = dummy;
    let newNode = null;
    while (head != null) {
      if (map.has(head)) {
        newNode = map.get(head);
      } else {
        newNode = new RandomListNode(head.label);
        map.set(head, newNode);
      }

      prev.next = newNode;

      if (head.random) {
        let random = null;
        if (map.has(head.random)) {
          random = map.get(head.random);
        } else {
          random = new RandomListNode(head.random.label);
          map.set(head.random, random);
        }
        newNode.random = random;
      }

      prev = newNode;
      head = head.next;
    }
    return dummy.next;
  }
  static test() {
    const solution = new Solution105();
    // 1 -> 2 -> 3 -> 4 -> 5 -> null
    const n1 = new RandomListNode(1);
    const n2 = new RandomListNode(2);
    const n3 = new RandomListNode(3);
    const n4 = new RandomListNode(4);
    const n5 = new RandomListNode(5);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    n2.random = n5;
    n5.random = n1;
    n3.random = n1;
    const res = solution.copyRandomList(n1, 2);
    // console.log(JSON.stringify(res));
    console.log(res);
  }
}

// 102。 带环链表
class Solution102 {
  hasCycle(head) {
    if (head == null || head.next == null) {
      return false;
    }
    let slow = head;
    let fast = head.next;
    while (slow != fast) {
      if (fast == null || fast.next == null) {
        return false;
      }
      slow = slow.next;
      fast = fast.next.next;
    }
    return true;
  }
  static test() {
    const solution = new Solution102();
    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    const n4 = new ListNode(4);
    const n5 = new ListNode(5);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    n5.next = n3;
    const res = solution.hasCycle(n1);
    console.log(res);
  }
}

// 103. 带环链表 II
class Solution103 {
  /**
   *
   * @param {ListNode} head
   */
  detectCycle(head) {
    if (head == null || head.next == null) {
      return null;
    }
    let slow = head;
    let fast = head.next;

    while (slow != fast) {
      if (fast == null || fast.next == null) {
        return null;
      }
      slow = slow.next;
      fast = fast.next.next;
    }

    while (head != slow.next) {
      head = head.next;
      slow = slow.next;
    }
    return head;
  }
  static test() {
    const solution = new Solution103();
    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    const n4 = new ListNode(4);
    const n5 = new ListNode(5);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    n5.next = n3;
    const res = solution.detectCycle(n1);
    console.log(res);
  }
}

// 98. 链表排序
class Solution98 {
  /**
   *
   * @param {ListNode} head
   */
  sortListQuick(head) {
    // 快速排序
    if (head == null || head.next == null) {
      return head;
    }

    let mid = this.getMedian(head);

    let leftDummy = new ListNode(0),
      leftTail = leftDummy;
    let rightDummy = new ListNode(0),
      rightTail = rightDummy;
    let middleDummy = new ListNode(0),
      middleTail = middleDummy;

    while (head != null) {
      if (head.val < mid.val) {
        leftTail.next = head;
        leftTail = leftTail.next;
      } else if (head.val > mid.val) {
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

    const left = this.sortListQuick(leftDummy.next);
    const right = this.sortListQuick(rightDummy.next);

    return this.concat(left, middleDummy.next, right);
  }
  /**
   *
   * @param {ListNode} head
   */
  sortListMerge(head) {
    // 归并排序
    if (head == null || head.next == null) {
      return head;
    }

    const mid = this.getMedian(head);

    const right = this.sortListMerge(mid.next);
    mid.next = null;
    const left = this.sortListMerge(head);

    // console.log("left", left);
    // console.log("right", right);
    return this.merge(left, right);
  }

  merge(left, right) {
    let dummy = new ListNode(0);
    let tail = dummy;

    while (left != null && right != null) {
      if (left.val < right.val) {
        tail.next = left;
        left = left.next;
      } else if (left.val >= right.val) {
        tail.next = right;
        right = right.next;
      }
      tail = tail.next;
    }

    if (left != null) {
      tail.next = left;
    }
    if (right != null) {
      tail.next = right;
    }
    return dummy.next;
  }

  concat(left, middle, right) {
    const dummy = new ListNode(0);
    let tail = dummy;
    tail.next = left;
    tail = this.getTail(tail);
    tail.next = middle;
    tail = this.getTail(tail);
    tail.next = right;

    return dummy.next;
  }

  getTail(head) {
    if (head == null) {
      return head;
    }
    while (head.next != null) {
      head = head.next;
    }
    return head;
  }

  getMedian(head) {
    if (head == null || head.next == null) {
      return head;
    }
    let slow = head;
    let fast = head.next;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  static test() {
    const solution = new Solution98();
    const n1 = new ListNode(5);
    const n2 = new ListNode(3);
    const n3 = new ListNode(4);
    const n4 = new ListNode(1);
    const n5 = new ListNode(2);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    n4.next = n5;
    const res = solution.sortListMerge(n1);
    console.log(JSON.stringify(res));
  }
}

// 1359. 有序数组转换为二叉搜索树
class Solution1359 {
  /**
   *
   * @param {int[]} nums
   */
  convertSortedArraytoBinarySearchTree(nums) {
    if (nums == null) {
      return null;
    }

    // const node = new TreeNode()
    const result = this.recursion(nums, 0, nums.length - 1);
    return result;
  }

  recursion(nums, left, right) {
    if (left > right) {
      return null;
    }

    const mid = parseInt((right + left) / 2);
    const node = new TreeNode(nums[mid]);
    node.left = this.recursion(nums, left, mid - 1);
    node.right = this.recursion(nums, mid + 1, right);

    return node;
  }
  static test() {
    const solution = new Solution1359();
    const nums = [0, 1, 3, 4, 5, 7];
    const res = solution.convertSortedArraytoBinarySearchTree(nums);
    console.log(res);
  }
}

// 6. 合并排序数组
class Solution6 {
  /**
   *
   * @param {int[]} A
   * @param {int[]} B
   */
  mergeSortedArray(A, B) {
    let i = 0,
      j = 0;
    const result = [];
    while (i < A.length && j < B.length) {
      if (A[i] < B[j]) {
        result.push(A[i++]);
      } else if (A[i] > B[j]) {
        result.push(B[j++]);
      } else {
        result.push(A[i++]);
        result.push(B[j++]);
      }
    }

    if (i < A.length) {
      result.push(...A.slice(i, A.length));
    }
    if (j < B.length) {
      result.push(...B.slice(j, B.length));
    }
    return result;
  }
  static test() {
    const solution = new Solution6();
    const A = [0, 1, 3, 4, 5, 7];
    const B = [0, 1, 3, 4];
    const res = solution.mergeSortedArray(A, B);
    console.log(res);
  }
}

// 64. 合并排序数组（简单版）
class Solution64 {
  /**
   *
   * @param {int[]} A
   * @param {int} m
   * @param {int[]} B
   * @param {int} n
   */
  mergeSortedArray(A, m, B, n) {
    let i = m - 1;
    let j = n - 1;
    let index = m + n - 1;
    while (i >= 0 && j >= 0) {
      if (A[i] > B[j]) {
        this.swap(A, index--, i--);
      } else if (A[i] < B[j]) {
        A[index--] = B[j--];
      } else {
        this.swap(A, index--, i--);
        A[index--] = B[j--];
      }
    }

    while (i >= 0) {
      this.swap(A, index--, i--);
    }
    while (j >= 0) {
      A[index--] = B[j--];
    }
  }
  swap(arr, i1, i2) {
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
  }
  static test() {
    const solution = new Solution64();
    const A = new Array(10);
    A.splice(0, 4, ...[3, 5, 7, 9]);
    const B = [4, 6, 8, 9, 10, 12];
    solution.mergeSortedArray(A, 4, B, 6);
    console.log(A);
  }
}

// 547. 两数组的交集
class Solution547 {
  /**
   *
   * @param {int[]} nums1
   * @param {int[]} nums2
   */
  intersection(nums1, nums2) {
    const set = new Set(nums1);
    const result = [
      ...nums2.reduce((newSet, num) => {
        if (set.has(num)) {
          newSet.add(num);
        }
        return newSet;
      }, new Set()),
    ];
    return result;
  }

  static test() {
    const solution = new Solution547();
    const nums1 = [1, 2, 2, 1, 3];
    const nums2 = [1, 1, 3];
    const res = solution.intersection(nums1, nums2);
    console.log(res);
  }
}

// 41. 最大子数组
class Solution41 {
  /**
   *
   * @param {int[]} nums
   */
  maxSubArray(nums) {
    let maxAns = Number.MIN_VALUE;
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
      sum += nums[i];
      maxAns = Math.max(maxAns, sum);
      sum = Math.max(sum, 0); // 如果子串的值小于0，直接放弃子串
    }

    return maxAns;
  }
  static test() {
    const solution = new Solution41();
    const nums = [-2, 2, -3, 4, -1, 2, 1, -5, 3];
    const res = solution.maxSubArray(nums);
    console.log(res);
  }
}

class Solution138 {
  /**
   *
   * @param {int[]} nums
   */
  subarraySum(nums) {
    const ans = [];
    const map = new Map();

    map.set(0, -1);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
      sum += nums[i];
      if (map.has(sum)) {
        ans.push(map.get(sum) + 1);
        ans.push(i);
        return ans;
      }

      map.set(sum, i);
    }

    return ans;
  }
  static test() {
    const solution = new Solution138();
    const nums = [2, 2, -3, 4, -1, 2, 1, -5, 3];
    const res = solution.subarraySum(nums);
    console.log(res);
  }
}

// 139. 最接近零的子数组和
class Solution139 {
  /**
   *
   * @param {int[]} nums
   */
  subarraySumClosest(nums) {
    class Pair {
      constructor(sum, index) {
        this.sum = sum;
        this.index = index;
      }
    }

    let pairs = [new Pair(0, 0)];
    let prev = 0;
    for (let i = 1; i <= nums.length; i++) {
      prev = prev + nums[i - 1];
      pairs.push(new Pair(prev, i));
    }

    pairs = pairs.sort((a, b) => a.sum - b.sum);

    let result = [];
    let ans = Number.MAX_VALUE;
    for (let i = 1; i <= nums.length; i++) {
      if (ans > pairs[i].sum - pairs[i - 1].sum) {
        ans = pairs[i].sum - pairs[i - 1].sum;
        let temp = [pairs[i].index, pairs[i - 1].index].sort((a, b) => a - b);
        result[0] = temp[0];
        result[1] = temp[1] - 1;
      }
    }
    return result;
  }
  static test() {
    const solution = new Solution139();
    const nums = [-3, 1, 1, -3, 5];
    const res = solution.subarraySumClosest(nums);
    console.log(res);
  }
}
Solution139.test();
