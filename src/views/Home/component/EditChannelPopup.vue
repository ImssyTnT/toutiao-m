<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popup-main">
      <!-- 我的频道 -->
      <div class="my-channel">
        <!-- title -->
        <van-cell title="我的频道" center :border="false">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道内容 -->
        <van-grid :border="false" gutter="10">
          <van-grid-item
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClickMyChannel(item, index)"
          >
            <template #icon>
              <van-icon v-show="isEdit && item.name !== '推荐'" name="close" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- title -->
        <van-cell title="推荐频道" center :border="false" />
        <!-- 推荐频道内容 -->
        <van-grid :border="false" gutter="10">
          <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            @click="addChannel(item)"
          >
            <template #icon>
              <van-icon name="plus" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  created() {
    this.getAllChannels()
  },
  props: {
    myChannels: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 获取所有频道
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 点击我的频道
    onClickMyChannel(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('delMyChannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('changeActive', index)
      }
    },
    addChannel(channel) {
      if (this.isEdit) {
        this.$emit('addChannel', { ...channel })
      }
    }
  },
  computed: {
    // 通过计算获取推荐频道
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 推荐频道 高亮
.active-channel {
  :deep(.van-grid-item__text) {
    color: #ff69b4;
  }
}
.popup-main {
  padding-top: 100px;
  // 编辑按钮
  .edit-btn {
    padding: 0 30px;
    height: 48px;
    color: red;
    border: 0.02667rem solid red;
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  // 我的频道
  .my-channel {
    // 我的频道关闭图标样式
    .van-grid-item {
      position: relative;
      :deep(.van-grid-item__icon-wrapper) {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-25%, -50%);
        z-index: 999;
        font-size: 35px;
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      justify-content: space-evenly;
      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
