import request from '@/utils/request'

export const getComments = (type, source, offset) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset
    }
  })
}

export const postComment = (target, content, id) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target,
      content,
      art_id: id
    }
  })
}

export const commentLikings = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
export const unCommentLikings = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
