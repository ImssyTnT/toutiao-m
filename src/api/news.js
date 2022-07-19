import request from '@/utils/request'

/**
 * 获取新闻列表
 * @param {String|Number} channelId 获取新闻的频道的ID
 * @param {*} timestamp
 * @returns Promise
 */
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
