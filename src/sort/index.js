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
  quickList(list, left, right) {
    if (left >= right) {
      return;
    }

    let pivot = list[right];
    let loc = left - 1;
    for (let i = left; i < right; i++) {
      if (list[i] < pivot) {
        loc++;
        this.swap(list, i, loc);
      }
    }
    loc++;
    this.swap(list, loc, right);

    this.quickList(list, left, loc - 1);
    this.quickList(list, loc + 1, right);
  }
  swap(list, i1, i2) {
    const temp = list[i1];
    list[i1] = list[i2];
    list[i2] = temp;
  }
  static test() {
    const solution = new SolutionQuickSort2();
    const arr = [5, 2, 3, 1, 6, 4];
    const res = solution.sortList(arr);
    console.log(res);
  }
}

class SolutionMergeSort {
  mergeSort(arr) {
    const res = this.divideConquer(arr, 0, arr.length - 1);
    return res;
  }
  divideConquer(arr, start, end) {
    if (start >= end) {
      return [arr[start]];
    }

    const mid = start + parseInt((end - start) / 2);
    const left = this.divideConquer(arr, start, mid);
    const right = this.divideConquer(arr, mid + 1, end);

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

    while (p1 < left.length) {
      result.push(left[p1++]);
    }
    while (p2 < right.length) {
      result.push(right[p2++]);
    }
    return result;
  }
  static test() {
    const solution = new SolutionMergeSort();
    const arr = [5, 2, 3, 1, 6, 4, 9, 10, -1];
    const res = solution.mergeSort(arr);
    console.log(res);
  }
}
// SolutionMergeSort.test();

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

// SolutionQuickSort2.test();
