## 排序算法

**索引**

1. <a href="#bubble-sort">冒泡排序</a>
2. <a href="#insertion-sort">插入排序</a>
3. <a href="#quick-sort">快速排序</a>
4. <a href="#merge-sort">归并排序</a>

**排序性能对比**

| 算法                                   | 时间复杂度 | 空间复杂度 |
| -------------------------------------- | ---------- | ---------- |
| <a href="#bubble-sort">冒泡排序</a>    | O(n^2)     | O(1)       |
| <a href="#insertion-sort">插入排序</a> | O(n^2)     | O(1)       |
| <a href="#quick-sort">快速排序</a>     | a          | b          |
| <a href="#merge-sort">归并排序</a>     | a          | b          |

## <a name='bubble-sort'>冒泡排序

**笔记**

每一轮比较，都把最大的那个数排到数组最后面

```
list: 5, 10, 4, 6, 2, 3, 7
length: 7

第1次
i: 0
j: 0 - 5 (j < 7-1-0)
list: 5, 4, 6, 2, 3, 7, 10
第2次
i: 1
j: 0 - 4 (j < 7-1-1)
list: 4, 5, 2, 3, 6, 7, 10
第3次
i: 2
j: 0 - 3 (j < 7-1-2)
list: 4, 2, 3, 5, 6, 7, 10
第3次
i: 3
j: 0 - 2 (j < 7-1-3)
list: 2, 3, 4, 5, 6, 7, 10
第4次
i: 4
j: 0 - 1 (j < 7-1-4)
list: 2, 3, 4, 5, 6, 7, 10
第5次
i: 5
j: 0 - 0 (j < 7-1-5)
list: 2, 3, 4, 5, 6, 7, 10
```

```javascript
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
```

## <a name='insertion-sort'>插入排序

**笔记**

i = 1 - A.length, j = i, 把第 j 位的数和它下标以前的所有数作比较和交换

```
list: 5, 10, 4, 6, 2, 3, 7
length: 7

第1次
i: 1
j: 1 ~ 1
list: 5, 10, 4, 6, 2, 3, 7
第2次
i: 2
j: 2 ~ 1
list: 4, 5, 10, 6, 2, 3, 7
第3次
i: 3
j: 3 ~ 1
list: 4, 5, 6, 10, 2, 3, 7
第3次
i: 4
j: 4 ~ 1
list: 2, 4, 5, 6, 10, 3, 7
第4次
i: 5
j: 5 ~ 1
list: 2, 3, 4, 5, 6, 10, 7
第5次
i: 6
j: 6 ~ 1
list: 2, 3, 4, 5, 6, 7, 10
```

```javascript
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
```
