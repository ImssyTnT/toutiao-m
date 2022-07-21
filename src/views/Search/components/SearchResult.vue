<template>
  <div class="result">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      finished-text="没有更多了"
      error-text="加载失败,请点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in resultList" :key="item.id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  name: 'searchresult',
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      resultList: [],
      error: false
    }
  },
  created() {
    this.getSearchResult()
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    // 获取搜索结果
    async getSearchResult() {
      this.loading = true
      try {
        const { data } = await getSearchResult(this.keywords)
        console.log(data)
        this.resultList = data.data.results

        this.totalCount = data.data.total_count
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    // 加载事件
    async onLoad() {
      try {
        const { data } = await getSearchResult(this.keywords, ++this.page)

        const result = data.data.results

        if (result.length === 0) {
          return (this.finished = true)
        }
        this.resultList.push(...result)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 54px);
  overflow: auto;
}
</style>
