import request from '@/utils/request.js'

/**
 * 登录
 * @param {Sting} mobile
 * @param {String} code
 * @returns
 */

export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: { mobile, code }
  })
}
