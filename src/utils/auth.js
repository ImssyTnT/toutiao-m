import storage from '@/utils/storage'

const TOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'

const SEARCH_KEY = 'SEARCH_KEY'

export const getToken = () => storage.get(TOKEN_KEY)

export const setToken = (token) => storage.set(TOKEN_KEY, token)

export const removeToken = () => storage.remove(TOKEN_KEY)

export const setSearch = (searchInfo) => storage.set(SEARCH_KEY, searchInfo)

export const getSearch = () => storage.get(SEARCH_KEY)
