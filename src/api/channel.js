/* 频道相关接口请求函数 */
import request from '@/utils/request'

export const getAllchannels = _ => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
