/* 封装的axios请求模块 */

import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

request.interceptors.request.use(config => {
  const { user } = store.state
  // 如果用户已登录，统一给接口设置 token 信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完请求之后一定要把config返回，否则请求就会停在这里
  return config
}, error => {
  return Promise.reject(error)
})

export default request
