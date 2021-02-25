import request from '@/utils/request'
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
