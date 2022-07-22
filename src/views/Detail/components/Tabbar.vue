<template>
  <div>
    <div class="art-bottom">
      <div class="btn-left">
        <van-button type="default" round size="mini">写评论</van-button>
      </div>
      <div class="btn-right">
        <van-badge :content="detailInfo.comm_count">
          <van-icon name="comment-o" />
        </van-badge>
        <van-icon
          :name="detailInfo.is_collected ? 'star' : 'star-o'"
          @click="isCollections"
        />
        <van-icon
          name="good-job-o"
          :style="{ color: detailInfo.attitude === 1 ? 'red' : '' }"
          @click="onClickLikings"
        />

        <van-icon name="share" @click="showShare = true" />
        <!-- 分享面板 -->
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  methods: {
    // 点赞事件
    onClickLikings() {
      this.$emit('onClickLikings')
    },
    // 收藏事件
    isCollections() {
      this.$emit('onClickCollections')
    },
    // 分享面板
    onSelect(option) {
      this.showShare = false
    }
  }
}
</script>

<style lang="less" scoped>
.art-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  z-index: 999;
  background-color: #fff;
  .van-button {
    margin: 0 20px;
    width: 282px;
    color: #a7a7a7;
  }
  .btn-right {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #a7a7a7;
    :deep(.van-badge--fixed) {
      top: 10px;
    }
  }
  .van-icon-star {
    color: yellow;
  }
}
</style>
