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
