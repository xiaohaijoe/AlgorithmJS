// 457. 经典二分查找问题
// 描述
// 在一个排序数组中找一个数，返回该数出现的任意位置，如果不存在，返回 -1。
class Solution457  {
    binarySearch(nums, target) {
        if(!nums || nums.length === 0) {
            return -1;
        }

        let start = 0, end = nums.length - 1;
        let mid = 0;
        while(start + 1 < end) {
            mid = start + parseInt((end - start) / 2);
            if(nums[mid] === target) {
                return mid;
            } else if(nums[mid] > target) {
                end = mid;
            } else {
                start = mid;
            }
        }

        if(nums[start] === target) {
            return start;
        }
        if(nums[end] === target) {
            return end;
        }
        return -1;
    }
}