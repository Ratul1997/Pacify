export const calculation = {
  convertDatetoString,
};
function convertDatetoString(time) {
  const date = new Date(time.seconds * 1000);
  console.log(date);
  const dateString =
    date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  const newTime = date.getHours() + ':' + date.getMinutes();
  return {time: newTime, dateString: dateString};
}
