<template>
  <div>
    <!-- 头部导航 Start -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 头部导航 End -->
    <!-- tabs选项卡 Start -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
      <EditChannelPopup
        ref="popup"
        :myChannels="myChannels"
        @delMyChannel="delMyChannel"
        @changeActive="changeActive"
        @addChannel="addChannel"
      ></EditChannelPopup>
    </van-tabs>
    <!-- tabs选项卡 End -->
  </div>
</template>

<script>
import {
  getMyChannels,
  getMyChannelsToLocal,
  setMyChannelsToLocal,
  delMyChannel,
  addChannel
} from '@/api'
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      myChannels: []
    }
  },
  created() {
    this.getMyChannels()
  },
  methods: {
    // 获取频道列表
    async getMyChannels() {
      try {
        if (!this.isLogin) {
          const myChannels = getMyChannelsToLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            const {
              data: { data }
            } = await getMyChannels()
            this.myChannels = data.channels
          }
        } else {
          const {
            data: { data }
          } = await getMyChannels()
          this.myChannels = data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    // 显示弹出层
    showPopup() {
      this.$refs.popup.isShow = true
    },
    // 删除我的频道
    async delMyChannel(id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMyChannelsToLocal(this.myChannels)
      } else {
        try {
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    // 更改active 频道高亮
    changeActive(index) {
      this.active = index
    },
    // 添加频道
    async addChannel(channel) {
      this.myChannels.push(channel)
      if (!this.isLogin) {
        setMyChannelsToLocal(this.myChannels)
      } else {
        try {
          await addChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加用户频道失败')
        }
      }
      this.$toast.success('添加用户频道成功')
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  }
}
</script>

<style lang="less" scoped>
// 头部导航
.navbar {
  background-color: #5094f3;
  :deep(.van-nav-bar__title) {
    max-width: unset;
    .van-button {
      width: 555px;
      height: 64px;
      background-color: #73a9f5;
      border: 0;
      .van-button__content {
        color: #fff;
        .van-icon {
          color: #fff;
        }
      }
    }
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}
/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
