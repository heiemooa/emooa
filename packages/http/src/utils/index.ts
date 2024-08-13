export function isObject(obj: any): obj is { [key: string]: any } {
  const opt = Object.prototype.toString;
  return opt.call(obj) === '[object Object]';
}

export function JsonParse(str) {
  try {
    const data = JSON.parse(str);
    return data;
  } catch (e) {
    return str;
  }
}
