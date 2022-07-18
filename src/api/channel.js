import request from '@/utils/request'

export const getMyChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

export const getAllChannels = () => {
  return request({
    methdos: 'GET',
    url: '/v1_0/channels'
  })
}
