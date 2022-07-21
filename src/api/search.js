import request from '@/utils/request'

export const getSearchSuggetion = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResult = (q, page) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
