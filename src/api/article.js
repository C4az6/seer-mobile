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

// 获取文章详情内容
export const getArticleDetail = articleId => {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}
