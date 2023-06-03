function formatterSecondTime(second) {
  var theTime = parseInt(second); // 秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  var theTime3 = 0; // 天
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
      if (theTime2 > 24) {
        theTime3 = parseInt(theTime1 / 24);
        theTime2 = parseInt(theTime1 % 24);
      }
    }
  }
  let result = "" + parseInt(theTime) + "秒";
  result = "" + (theTime1 > 0 ? parseInt(theTime1) : "0") + "分" + result;
  result = "" + (theTime2 > 0 ? parseInt(theTime2) : "0") + "小时" + result;
  result = "" + (theTime3 > 0 ? parseInt(theTime3) : "0") + "天" + result;
  return result;
}
