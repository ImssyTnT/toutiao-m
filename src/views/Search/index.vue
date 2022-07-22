<template>
  <!-- 头部搜索框 -->
  <form action="/">
    <van-search
      v-model="keywords"
      show-action
      background="#3296FA"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="backPrePage"
      @focus="visibleSearchSuggetion"
    />
    <component
      :is="componentSearch"
      :keywords="keywords"
      :searchInfo="searchInfo"
      @getSearchSuggetion="getSearchSuggetion"
      @delSearchHistory="delSearchHistory"
    ></component>
  </form>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggetion from './components/SearchSuggetion.vue'
export default {
  data() {
    return {
      keywords: '',
      isShowSearchResult: false,
      searchInfo: []
    }
  },
  created() {
    this.searchInfo = this.$store.state.search
  },
  methods: {
    // 搜索框回车事件
    onSearch() {
      this.isShowSearchResult = true
      this.searchInfo.unshift(this.keywords)
      this.searchInfo = [...new Set(this.searchInfo)]
      this.$store.commit('setSearch', this.searchInfo)
    },
    // 点击取消按钮返回上一页
    backPrePage() {
      this.$router.go(-1)
    },
    // 搜索框获取焦点事件
    visibleSearchSuggetion() {
      this.isShowSearchResult = false
    },
    // 获取模糊匹配选中的内容
    getSearchSuggetion(str) {
      this.keywords = str
      this.onSearch()
    },
    // 删除搜索历史
    delSearchHistory(index) {
      if (index === -1) {
        this.searchInfo = []
      } else {
        this.searchInfo.splice(index, 1)
      }

      this.$store.commit('setSearch', this.searchInfo)
    }
  },
  computed: {
    componentSearch() {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }

      return 'SearchSuggetion'
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggetion
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
</style>
