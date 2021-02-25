/* 封装的axios请求模块 */

import axios from 'axios'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

export default request
