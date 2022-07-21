import request from '@/utils/request'

export const getDetailContent = (id) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${id}`
  })
}
