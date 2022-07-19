import request from '@/utils/request'
import storage from '@/utils/storage'

/**
 * 获取用户频道
 * @returns Promise
 */
export const getMyChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannels = () => {
  return request({
    methdos: 'GET',
    url: '/v1_0/channels'
  })
}

/**
 * 删除用户频道
 * @param {String|Number} target 删除用户频道的ID
 * @returns Promise
 */
export const delMyChannel = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
}

/**
 * 添加用户频道
 * @param {Number} id 需要添加的频道ID
 * @param {Number} seq 需要添加到的位置的索引号
 * @returns
 */
export const addChannel = (id, seq) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelsToLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)

export const setMyChannelsToLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
