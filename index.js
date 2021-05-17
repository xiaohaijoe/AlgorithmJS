var obj = {
  user_list: [
    {
      user_id: "1234",
      nick_name: "aaaa",
      friends: [{ user_id: "2222", nick_name: "bbbb" }],
    },
    {
      userId: "1244",
      nick_name: "aaaa",
    },
  ],
};

var newObj = {};
var translate = function (oldObj, newObj) {
  for (let key in oldObj) {
    if (oldObj.hasOwnProperty(key)) {
      const newKey = toUpper(key);
      if (oldObj[key] instanceof Array) {
        newObj[newKey] = [];
        oldObj[key].forEach((item, index) => {
          newObj[newKey][index] = {};
          translate(item, newObj[newKey][index]);
        });
      } else {
        newObj[newKey] = oldObj[key];
      }
    }
  }
};

var toUpper = function (key) {
  return key.replace(/_(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
};
// translate(obj, newObj);
// console.log(JSON.stringify(newObj));

var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1);
obj.push(2);

console.log(obj);