import request from '@/utils/request'
import store from '@/store'
/* 用户相关请求模块 */
export const userLogin = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/* 获取短信验证码 */
export const sendSms = data => {
  return request({
    url: `/app/v1_0/sms/codes/${data}`,
    method: 'GET'
  })
}

/* 获取当前用户信息 */
export const getCurrentUser = data => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
