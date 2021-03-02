/* 频道相关接口请求函数 */
import request from '@/utils/request'

// 获取所有用户频道
export const getAllchannels = _ => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

// 添加用户频道
export const addChannels = data => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data
  })
}

// 删除用户频道
export const removeChannels = channelId => {
  return request({
    url: `/app/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
