import request from '@/utils/request'

export const getArticleList = (channelId, timestamp) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
