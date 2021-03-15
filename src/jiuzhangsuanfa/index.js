// 带重复元素的子集
// [1,2,2] -> [1],[2],[1,2]

function fun1(nums) {
  const results = [];
  if (!nums || nums.length === 0) {
    return results;
  }

  const subset = [];

  subsetHelper(nums, 0, subset, results);
  console.log(results);
  return results;
}

function subsetHelper(nums, startIndex, subset, results) {
  // deep copy subset & add to results
  console.log(results);
  results.push(subset);

  for (let i = startIndex; i < nums.length; i++) {
    subset.push(nums[i]);
    // console.log(subset);
    subsetHelper(nums, i + 1, subset, results);
    // subset.splice(subset.length - 1, 1);
    subset.length = subset.length - 1;
  }
}

const nums = [1, 2, 2];
const results = fun1(nums);
console.log(results);
