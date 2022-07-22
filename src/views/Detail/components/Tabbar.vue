<template>
  <div>
    <div class="art-bottom">
      <div class="btn-left">
        <van-button type="default" round size="mini" @click="showPopup = true"
          >写评论</van-button
        >
        <van-popup
          v-model="showPopup"
          position="bottom"
          :style="{ height: '20%' }"
        >
          <van-form @submit="onSubmit">
            <van-field
              v-model="message"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入留言"
              show-word-limit
            />
            <van-button plain type="info" native-type="submit">发布</van-button>
          </van-form>
        </van-popup>
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
import { postComment } from '@/api'
export default {
  data() {
    return {
      showShare: false,
      showPopup: false,
      message: '',
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
    },
    // 发布评论
    async onSubmit() {
      console.log(this.detailInfo)
      const res = await postComment(this.detailInfo.art_id, this.message)
      console.log(res)
      this.showPopup = false
      this.message = ''
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
  .van-popup--bottom {
    padding: 32px 0 32px 32px;
    box-sizing: border-box;
    border: 0;
    .van-form {
      display: flex;
      align-items: center;
      .van-button--info {
        border: 1px solid #fff;
        padding: 0;
      }
      .van-cell {
        background-color: #f5f7f9;
      }
      .van-button {
        width: 122px;
        height: 88px;
        .van-button__text {
          color: #6ba3d8;
        }
      }
    }
  }
}
</style>
