<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      @click="onClickSearchSuggetion(item)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggetion } from '@/api'
export default {
  data() {
    return {
      suggetion: [],
      time: null
    }
  },
  methods: {
    // 获取模糊匹配数据
    async getSearchSuggetion() {
      try {
        const res = await getSearchSuggetion(this.keywords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggetion = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    // 点击将模糊匹配的数据传入input框
    onClickSearchSuggetion(item) {
      const str = item.replace(/<[^>]*>/g, '')
      this.$emit('getSearchSuggetion', str)
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    // 监听keywords变化发起请求
    keywords: {
      handler() {
        clearInterval(this.tiem)
        this.tiem = setTimeout(() => {
          this.getSearchSuggetion()
        }, 500)
      },
      immediate: true
    }
  },
  computed: {
    // 将数据中和输入框相同的字符变为红色
    highlightData() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggetion.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
  margin-right: 5px;
}
</style>
