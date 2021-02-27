/* 新闻相关请求模块 */
import request from '@/utils/request'

// 获取频道下的新闻推荐列表
export const getArticles = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}
