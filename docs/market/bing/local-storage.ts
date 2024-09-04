const toJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
};
export function setLocalstorage(key: string, value: object[]) {
  const now = new Date();

  // 计算当前时间到第二天零点的毫秒数
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const item = {
    value: value,
    expiry: tomorrow.getTime(), // 设置为第二天零点的时间戳
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalstorage(key: string) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return [];
  }

  const item = toJSON(itemStr);
  const now = new Date();

  // 检查当前时间是否已经过了第二天零点
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key); // 如果过期，移除该项
    return [];
  }

  return item.value;
}
