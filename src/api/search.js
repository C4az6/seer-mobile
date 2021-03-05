/* 搜索相关的请求函数 */
import request from '@/utils/request'

// 获取搜索联想建议
export const getSearchSuggestion = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: { q }
  })
}
