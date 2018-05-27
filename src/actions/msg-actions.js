
export var setMsg = (msg) => {
  console.log("setting message:", msg);
  return {
    type: 'SET_MSG',
    msg: msg
  };
};
