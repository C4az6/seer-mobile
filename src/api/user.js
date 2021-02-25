import request from '@/utils/request'
/* 用户相关请求模块 */
export const userLogin = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
