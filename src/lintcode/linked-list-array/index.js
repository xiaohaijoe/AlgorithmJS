class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
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

Solution165.test();
