export const validation = {
  checkValidEmail,
  findFromArray,
  deleteFromArray,
  insertIntoArray,
};
function checkValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function insertIntoArray(array, value) {
  const index = array.indexOf(value);
  if (index === -1) array.push(value);
  return array;
}

function deleteFromArray(array, value) {
  const index = array.indexOf(value);
  if (index != -1) array.splice(index, 1);

  return array;
}

function findFromArray(array, value) {
  const index = array.indexOf(value);
  return index != -1 ? true : false;
}
