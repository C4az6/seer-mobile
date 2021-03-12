/* 评论相关接口请求函数 */
import request from '@/utils/request'

// 获取评论列表或者回复评论
/*
  params的参数用于获取评论列表;
  data的参数用于发送评论;
*/
export const getCommentlist = (params, data) => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params,
    data
  })
}

// 对评论或评论回复点赞
export const addCommentLike = commentId => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }
  })
}

// 取消对评论或评论回复点赞
export const cancelCommentLike = commentId => {
  return request({
    url: `/app/v1_0/comment/likings/${commentId}`,
    method: 'DELETE'
  })
}

// 添加评论或评论回复
/*
  对文章评论不需要传递 art_id;
  对评论进行评论则需要传递 art_id;
*/
export const addComment = data => {
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}
