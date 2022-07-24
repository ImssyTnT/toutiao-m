import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, getSearch, setSearch } from '@/utils'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: getToken() || {},
    search: getSearch() || [],
    comment: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      setToken(payload)
    },
    setSearch(state, searchInfo) {
      state.search = searchInfo
      setSearch(searchInfo)
    },
    setComment(state, commentInfo) {
      state.comment = commentInfo
    }
  }
})
