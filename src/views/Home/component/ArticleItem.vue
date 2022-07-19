<template>
  <div>
    <!-- 无图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <!-- 单图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3.09333rem"
        height="1.94667rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <!-- 多图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <!-- 图片 -->
        <div class="pics">
          <van-image
            width="100px"
            height="100px"
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            :src="item"
          />
        </div>
        <!-- 评论 -->
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  }
}
</script>

<style lang="less" scoped>
.pics {
  display: flex;
  justify-content: space-between;
}
</style>
