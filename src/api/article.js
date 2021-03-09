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

// 收藏文章
export const collectArticle = data => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data
  })
}

// 取消收藏文章
export const cancelCollectArticle = articleId => {
  return request({
    url: `/app/v1_0/article/collections/${articleId}`,
    method: 'DELETE'
  })
}

// 对文章点赞
export const likings = data => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data
  })
}

// 取消对文章点赞
export const cancelLike = articleId => {
  return request({
    url: `/app/v1_0/article/likings/${articleId}`,
    method: 'DELETE'
  })
}
