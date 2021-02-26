/* 封装操作本地存储模块 */

// 获取本地存储数据
export const getItem = k => {
  const data = window.localStorage.getItem(k)
  // 为什么把 JSON.parse 放到try-catch中?
  // 因为 data 可能不是 JSON 格式字符串，例如'123asd'
  try {
    // 尝试把 data 转为 JavaScript 对象
    return JSON.parse(data)
  } catch (error) {
    // data 不是JSON格式字符串，直接原样返回
    return data
  }
}

// 设置本地存储数据
export const setItem = (k, v) => {
  // 如果 v 是对象，就把 v 转换成JSON 格式字符串再存储
  if (typeof v === 'object') {
    v = JSON.stringify(v)
  }
  window.localStorage.setItem(k, v)
}

// 删除本地存储指定数据
export const removeItem = (k) => {
  window.localStorage.removeItem(k)
}

// 删除本地存储所有数据
export const removeAll = _ => {
  window.localStorage.clear()
}
