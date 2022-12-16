function formser(form) {
  var form = document.getElementById(form);
  let arr1 = [];
  var arr = {};
  for (var i = 0; i < form.elements.length; i++) {
    var feled = form.elements[i];
    switch (feled.type) {
      case undefined:
      case "button":
      case "file":
      case "reset":
      case "submit":
        break;
      case "checkbox":
      case "radio":
        if (!feled.checked) {
          break;
        }
      default:
        if (arr[feled.name]) {
          arr[feled.name] = arr[feled.name] + "," + feled.value;
        } else {
          arr[feled.name] = feled.value;
        }
    }
  }

  return arr;
}
function serializeToJSON(data) {
  var values = {};
  // 宣告一個物件
  // for (index in data) {
  //   values[data[index].name] = data[index].value;
  //   // values[key]=value  物件新增屬性的方法
  // }
  data.forEach((val, i) => {
    values[val.name] = val.value;
  });
  return JSON.stringify(values);
  //     回傳迴圈跑完的值轉成JSON字串
}
export default formser;
