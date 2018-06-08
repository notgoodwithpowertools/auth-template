
export var setLocalStorage = (item, val) => {
  console.log("setLocalStorage... item", item + " val:", val);
  localStorage.setItem(item, val);
}

export var getLocalStorage = (item) => {
  console.log("getLocalStorage value:", localStorage.getItem(item));
  return localStorage.getItem(item);
}
