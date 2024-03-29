import request from '@/utils/request.js'

/**
 * 登录
 * @param {Sting} mobile
 * @param {String} code
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: { mobile, code }
  })
}

export const sendCode = (mobile) => {
  return request({
    metshod: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

export const getProfileInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
export const editUserInfo = (name, gender, birthday) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data: {
      name,
      gender,
      birthday
    }
  })
}
export const editUserPhoto = (photo) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data: photo
  })
}
