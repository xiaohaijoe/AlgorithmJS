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
| <a href="#quick-sort">快速排序</a>     | O(nlgn)    | O(1)       |
| <a href="#merge-sort">归并排序</a>     | O(nlgn)    | O(n)       |

**各排序算法总结**

1. 冒泡排序

   双重循环，每次循环结果，将最大的数一步步挪到数组最后一位

2. 插入排序

   双重循环(i=1;i<length;)，每次循环，都将 i 前面的位置排好序；

   对比 j 与 j-1 的大小，如果 arr[j]<arr[j-1]，则交换位置，直到 i 的前;

3. 快速排序

   利用二分法，设定一个 pivot 值，将所有 arr[left] > pivot 的值和 arr[right] < pivot 的值进行位置互换；

   递归循环[start, right]和[left, end]的数组

4. 归并排序

   利用分治法，递归将数组拆成 left 和 right 两个数组，最后再合并 left 和 right；

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
before: 5, 10, 4, 6, 2, 3, 7
after:  5, 10, 4, 6, 2, 3, 7
           ^
          i,j
第2次
i: 2
j: 2 ~ 1
before: 5, 10, 4, 6, 2, 3, 7
               ^
              i,j
after:  4, 5, 10, 6, 2, 3, 7
        ^     ^
        j     i
第3次
i: 3
j: 3 ~ 1
before: 4, 5, 10, 6, 2, 3, 7
                  ^
                 i,j
after:  4, 5, 6, 10, 2, 3, 7
              ^  ^
              j  i
第3次
i: 4
j: 4 ~ 1
before: 4, 5, 6, 10, 2, 3, 7
                     ^
                    i,j
after:  2, 4, 5, 6, 10, 3, 7
        ^           ^
        j           i
第4次
i: 5
j: 5 ~ 1
before:  2, 4, 5, 6, 10, 3, 7
                         ^
                        i,j
after:   2, 3, 4, 5, 6, 10, 7
            ^           ^
            j           i
第5次
i: 6
j: 6 ~ 1
before: 2, 3, 4, 5, 6, 10, 7
                           ^
                          i,j
after:  2, 3, 4, 5, 6, 7, 10
                       ^  ^
                       j  i
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

## <a name='quick-sort'>快速排序

快速排序有两种思路

**笔记**

### Version 1

```javascript
在数组的start和end中间取一个pivot，
让eft = start, right = end
把list[left] > pivot的值移到pivot右边, left++
把list[right] < pivot的值移到pivot左边, right--
以[start,right]和[left,end]为边界进行递归

list= [5, 10, 4, 6, 2, 3, 7], length=7
start = 0;
end = 6

/************* 第1次 **************/
quickSort(list=[5, 10, 4, 6, 2, 3, 7], start=0, end=6):
pivot= list[(start+end)/2] = 6
left = 0
right = 6
list = [5, 10, 4, 6, 2, 3, 7];
        ^         ^        ^
       s,l        p       e,r
loop start:
list = [5, 3, 4, 6, 2, 10, 7] // left=1与right=5交换,then left++,right--
           ^     ^     ^
           l     p     r
list = [5, 3, 4, 2, 6, 10, 7] // left=3与right=4交换,then left++,right--
                 ^  ^
                l,p r
指针最后指向
list = [5, 3, 4, 2, 6, 10, 7]
        ^        ^  ^      ^
        s       r,p l      e
left = 4
right = 3
loop end;
quickSort(list, start=0, right=3); // 跳转至第1-1次(步骤1)
quickSort(list, left=4, end=6); // 跳转至第1-2次（步骤8）

/************* 第1-1次 **************/
quickSort(list=[5, 3, 4, 2, 6, 10, 7], start=0, end=3):
pivot= list[(start+end)/2=1] = 3
left = 0
right = 3
list = [5, 3, 4, 2, 6, 10, 7];
        ^  ^     ^
       s,l p    e,r
loop start:
list = [2, 3, 4, 5, 6, 10, 7] // left=0与right=3交换,then left++,right--
        ^  ^     ^
        l  p     r
指针最后指向:
list = [2, 3, 4, 5, 6, 10, 7]
        ^  ^  ^  ^
        s r,p l  e
loop end;
left = 2
right = 1
quickSort(list, start=0, right=1); // 跳转至第1-1-1次(步骤2)
quickSort(list, left=2, end=3); // 跳转至第1-1-2次（步骤5）

/************* 第1-1-1次 **************/
quickSort(list=[2, 3, 4, 5, 6, 10, 7], start=0, end=1):
pivot = list[(start+end)/2 = 0] = 2;
left = 0;
right = 1;
loop start:
指针最后指向:
list = [2, 3, 4, 5, 6, 10, 7]
        ^  ^
       r,p l
loop end;
left=1;
right=0;
quickSort(list, start=0,right=0); // 递归结束（步骤3）
quickSort(list, left=1, end=1); // 递归结束（步骤4）

/************* 第1-1-2次 **************/
quickSort(list=[2, 3, 4, 5, 6, 10, 7], start=2, end=3)
pivot = list[(start+end)/2=2]=4
left = 2;
right = 3;
loop start:
指针最后指向:
list = [2, 3, 4, 5, 6, 10, 7]
              ^  ^
             r,p l
loop end;
left=3;
right=2;
quickSort(list, start=2,right=2); // 递归结束（步骤6）
quickSort(list, left=3, end=3); // 递归结束（步骤7）

/************* 第1-2次 **************/
quickSort(list=[2, 3, 4, 5, 6, 10, 7], start=4, end=6)
pivot = list[(start+end)/2=5] = 10
left = 4
right = 6
loop start:
list = [2, 3, 4, 5, 6, 7, 10] // left=5与right=6交换，left++，right--
                       ^  ^
                      l,p r
指针最后指向：
list = [2, 3, 4, 5, 6, 7, 10]
                       ^  ^
                      r,p l
loop end;
left=6
right=5
quickSort(list, start=4, right=5); // 跳转到第1-2-1次（步骤9）
quickSort(list, left=6, end=6); // 递归结束（步骤12）

/************* 第1-2-1次 **************/
quickSort(list=[2, 3, 4, 5, 6, 7, 10], start=4, end=5)
pivot = list[(start+end)/2=5] = 6
left = 4
right = 5
loop start:
list = [2, 3, 4, 5, 6, 7, 10]
                    ^  ^
                   l,p r
指针最后指向
list = [2, 3, 4, 5, 6, 7, 10]
                    ^  ^
                   r,p l
loop end;
left=5
right=4
quickSort(list, start=4, right=4); // 递归结束（步骤10）
quickSort(list, left=5, end=5); // 递归结束（步骤11）
```

```javascript
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
```

### Version 2

**笔记**

```javascript
以数组的right为pivot,
定义i从left到right进行循环，loc=left-1
循环从i=left~right
for(let i = left; i < right; i++) {
    if(list[i] < pivot) {
        loc++;
        swap(list, i, loc);
    }
}
循环结束时交换loc与right
以[start, loc-1]和[loc+1, end]为边界进行递归

list = [5, 10, 4, 6, 2, 3, 7], length=7
left = 0;
right = 6;

/************ 第1次(步骤1) **************/
quickSort(list=[5, 10, 4, 6, 2, 3, 7], left=0, right=6):
list = null [5, 3, 4, 2, 6, 10, 7];
        ^    ^                  ^
       loc   l                  r
loc = left-1 = -1;
pivot = list[right] = 7;

loop start: (i = left ; i < right ; i++)
当i=0时, list[i] < pivot, loc = loc+1 = 0
swap(list, i, loc);
list = [5, 10, 4, 6, 2, 3, 7]
        ^                  ^
      loc,i               pivot
当i=1时,list[i] > pivot,什么都不做
list = [5, 10, 4, 6, 2, 3, 7]
        ^   ^              ^
       loc  i            pivot
当i=2时,list[i] < pivot, loc = loc+1 = 1
swap(list, i, loc);
list = [5, 4, 10, 6, 2, 3, 7]
           ^   ^           ^
          loc  i         pivot
当i=3时, list[i] < pivot, loc = loc+1 = 2
swap(list, i, loc);
list = [5, 4, 6, 10, 2, 3, 7]
              ^   ^        ^
             loc  i      pivot
当i=4时,list[i] < pivot, loc = loc+1 = 3
swap(list, i, loc);
list = [5, 4, 6, 2, 10, 3, 7]
                 ^   ^     ^
                loc  i   pivot
当i=5时,list[i] > pivot, loc = loc+1 = 4
swap(list, i, loc);
list = [5, 4, 6, 2, 3, 10, 7]
                    ^   ^  ^
                   loc  i  p
loop end;
// 此时list[loc+1]为left~right区间最大值
loc = loc + 1 = 5;
swap(list, loc, right);  // 交换loc与right
list = [5, 4, 6, 2, 3, 7, 10]
                       ^   ^
                      loc right
quickSort(list, left=0, loc-1=4); // 跳转到第1-1次递归(步骤2)
quickSort(list, loc+1=6, right=6); // 循环结束(步骤9)

/************ 第1-1次 **************/
quickSort(list=[5, 4, 6, 2, 3, 7, 10], left = 0, right = 4):
list = null [5, 4, 6, 2, 3, 7, 10]
        ^    ^           ^
       loc   l          r,p
loc = left - 1 = -1;
pivot = list[right] = 3
loop start: for(let i = left; i < right; i++)
当i = 0时, list[i] > pivot, 什么都不做
当i = 1时, list[i] > pivot, 什么都不做
当i = 2时, list[i] > pivot, 什么都不做
当i = 3时, list[i] <> pivot, loc = loc+1 = 0
swap(list, i, loc)
list = [2, 4, 6, 5, 3, 7, 10]
        ^        ^  ^
      loc        i  p
loop end;
loc = loc + 1;
swap(list, loc, right);
list = [2, 3, 6, 5, 4, 7, 10]
           ^     ^
          loc   right

quickSort(list, left=0, loc-1=0); // 循环结束(步骤3)
quickSort(list, loc+1=2, right=4); // 跳转至第1-1-2次递归(步骤4)


/************ 第1-1-2次 **************/
quickSort(list=[2, 3, 6, 5, 4, 7, 10], left = 2, right = 4):
list = [2, 3, 6, 5, 4, 7, 10]
           ^  ^     ^
          loc l    r,p
loc = left - 1 = 1;
pivot = list[right] = 4;
loop start: for(let i = left; i < right; i++)
当i = 2, list[i] > pivot, 什么都不做
当i = 3, list[i] > pivot, 什么都不做
loop end
loc = loc + 1 = 2
swap(list, loc, right);
list = [2, 3, 4, 5, 6, 7, 10]
              ^     ^
             loc   right
quickSort(list, left=2, loc-1 = 1); // 循环结束(步骤5)
quickSort(list, loc+1=3, right = 4); // 跳转至第1-1-2-2次递归(步骤6)

/************ 第1-1-2-2次 **************/
quickSort(list=[2, 3, 4, 5, 6, 7, 10], left = 3, right = 4):
list = [2, 3, 4, 5, 6, 7, 10]
              ^  ^  ^
             loc l r,p
loc = left - 1 = 2;
pivot = list[right] = 6;
loop start: for(let i = left; i < right; i++)
当i = 3, list[i] < pivot, loc = loc+1
swap(list, i, loc)
list = [2, 3, 4, 5, 6, 7, 10]
                 ^  ^
              loc,i p
loop end
loc = loc + 1 = 4
swap(list, loc, right);
list = [2, 3, 4, 5, 6, 7, 10]
                    ^
                loc,right
quickSort(list, left=3, loc-1 = 3); // 循环结束(步骤7)
quickSort(list, loc+1=5, right = 4); // 循环结束(步骤8)
```

```javascript
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
```
