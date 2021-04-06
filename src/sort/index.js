// 快速排序 Version 1
class SolutionQuickSort {
  sortList(list) {
    if (list == null || list.length <= 1) {
      return list;
    }

    this.quickList(list, 0, list.length - 1);
    return list;
  }
  quickList(list, start, end) {
    if (start >= end) {
      return;
    }
    const index = start + parseInt((end - start) / 2);
    const pivot = list[index];

    let left = start;
    let right = end;
    while (left <= right) {
      while (left <= right && list[left] < pivot) {
        left++;
      }
      while (left <= right && list[right] > pivot) {
        right--;
      }
      if (left <= right) {
        const temp = list[left];
        list[left] = list[right];
        list[right] = temp;

        left++;
        right--;
      }
    }

    this.quickList(list, start, right);
    this.quickList(list, left, end);
  }
  static test() {
    const solution = new SolutionQuickSort();
    const arr = [5, 2, 3, 1, 6, 4];
    const res = solution.sortList(arr);
    console.log(res);
  }
}

// 快速排序 Version 2
class SolutionQuickSort2 {
  sortList(list) {
    if (list == null || list.length <= 1) {
      return list;
    }

    this.quickList(list, 0, list.length - 1);
    return list;
  }
  quickList(list, start, end) {
    if (start >= end) {
      return;
    }
    const index = start + parseInt((end - start) / 2);
    const pivot = list[index];

    this.quickList(list, start, right);
    this.quickList(list, left, end);
  }
  static test() {
    const solution = new SolutionQuickSort();
    const arr = [5, 2, 3, 1, 6, 4];
    const res = solution.sortList(arr);
    console.log(res);
  }
}

// 冒泡排序
class SolutionBubbleSort {
  sortList(list) {
    if (list == null || list.length <= 1) {
      return list;
    }

    for (let i = 0; i < list.length - 1; i++) {
      for (let j = 0; j < list.length - 1 - i; j++) {
        if (list[j] > list[j + 1]) {
          const temp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = temp;
        }
      }
    }
    return list;
  }
  static test() {
    const solution = new SolutionBubbleSort();
    const arr = [5, 2, 3, 1, 6, 4];
    const res = solution.sortList(arr);
    console.log(res);
  }
}

// 插入排序
class SolutionInsertionSort {
  sortList(list) {
    for (let i = 1; i < list.length; i++) {
      let j = i;
      while (j > 0 && list[j] < list[j - 1]) {
        const temp = list[j];
        list[j] = list[j - 1];
        list[j - 1] = temp;
        j--;
      }
    }
    return list;
  }
  static test() {
    const solution = new SolutionInsertionSort();
    const arr = [5, 2, 3, 1, 6, 4];
    const res = solution.sortList(arr);
    console.log(res);
  }
}

class SolutionQS {
  sortList(A) {
    this.quickSort(A, 0, A.length - 1);
    return A;
  }
  quickSort(A, start, end) {
    if (start >= end) {
      return;
    }

    const pivot = A[start + parseInt((end - start) / 2)];
    let left = start;
    let right = end;
    while (left <= right) {
      while (left <= right && A[left] < pivot) {
        left++;
      }
      while (left <= right && A[right] > pivot) {
        right--;
      }
      if (left <= right) {
        const temp = A[left];
        A[left] = A[right];
        A[right] = temp;

        left++;
        right--;
      }
    }

    this.quickSort(A, start, right);
    this.quickSort(A, left, end);
  }
  static test() {
    const solution = new SolutionQS();
    const arr = [5, 2, 3, 1, 6, 4];
    const res = solution.sortList(arr);
    console.log(res);
  }
}

class SolutionQS2 {
  sortList(A) {
    this.quickSort(A, 0, A.length - 1);
    return A;
  }
  quickSort(A, left, right) {
    if (left >= right) {
      return;
    }
    const pivot = A[right];
    let loc = left - 1;
    for (let i = left; i < A.length - 1; i++) {
      if (A[i] < pivot) {
        loc++;
        this.swap(A, i, loc);
      }
    }

    loc++;
    this.swap(A, right, loc);

    this.quickSort(A, left, loc - 1);
    this.quickSort(A, loc + 1, right);
  }
  swap(A, i1, i2) {
    const temp = A[i1];
    A[i1] = A[i2];
    A[i2] = temp;
  }
  static test() {
    const solution = new SolutionQS2();
    const arr = [5, 2, 3, 1, 6, 4];
    const res = solution.sortList(arr);
    console.log(res);
  }
}
SolutionQS2.test();
