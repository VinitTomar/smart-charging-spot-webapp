const deepClone = function (obj: any) {
  const clone: any = [];

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      clone[key] = deepClone(obj[key]);
    } else {
      clone[key] = obj[key]
    }
  }

  return clone;
}

export {
  deepClone
}