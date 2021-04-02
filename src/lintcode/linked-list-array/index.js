class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
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

Solution450.test();
