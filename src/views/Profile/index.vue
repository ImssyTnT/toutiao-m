<template>
  <div class="profile">
    <!-- 头部 Start -->
    <header>
      <!-- 用户已登录 -->
      <div class="user-info banner" v-if="isShow">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 用户头像/编辑按钮 -->
        <van-row class="user">
          <!-- 用户头像 -->
          <van-col span="12" class="user-avater">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span>{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <!-- 编辑按钮 -->
          <van-col span="12">
            <van-row type="flex" justify="end" align="center" class="user-btn">
              <van-button type="default" round size="mini" @click="goEdit"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 用户未登录 -->
      <div class="login-register banner" v-else>
        <div class="go-login" @click="goLogin">
          <img src="@/assets/images/mobile.png" alt="" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>
    <!-- 头部 End -->

    <!-- 主体 Start -->
    <main>
      <!-- 收藏/历史 -->
      <van-grid column-num="2" class="grid" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 消息通知/小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 主体 End -->

    <!-- 底部退出按钮 Start -->
    <van-button v-if="isShow" class="out-login" block @click="outLogin"
      >退出</van-button
    >
    <!-- 底部退出按钮 End -->
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  name: 'profile',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isShow() {
      return !!this.$store.state.user.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 退出登录
    outLogin() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号?'
        })
        .then(() => {
          this.$store.commit('setUser', {})
        })
    },
    // 去登录
    goLogin() {
      this.$router.push('/login')
    },
    // 获取用户自己的信息
    async getUserInfo() {
      try {
        if (this.isShow) {
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.$toast.fail('请重新登录!')
        }
      }
    },
    // 编辑资料
    goEdit() {
      this.$router.push({
        path: '/user'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  background-color: #f5f7f9;
  height: calc(100vh - 50px);
  // 背景图
  .banner {
    width: 100%;
    height: 401px;
    background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
  }
  // 用户已登录信息
  .user-info {
    display: flex;
    flex-direction: column;
    > .van-row {
      flex: 1;
    }
    .user {
      .user-avater {
        span {
          font-size: 0.4rem;
          color: #fff;
        }
      }
      .van-col {
        height: 100%;
        .user-btn {
          height: 100%;
          margin-right: 40px;
          .van-button--default {
            color: #666;
          }
        }
      }
    }
    .grid {
      :deep(.van-grid-item__content) {
        background-color: unset;
        color: #fff;
        font-size: 0.34667rem;
        .van-grid-item__text {
          color: #fff;
        }
      }
    }
  }
  // 用户未登录
  .login-register {
    display: flex;
    justify-content: center;
    align-items: center;
    .go-login {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 1.76rem;
        height: 1.76rem;
        margin-bottom: 10px;
      }
      span {
        font-size: 0.37333rem;
        color: #fff;
      }
    }
  }
  // 主体区域
  main {
    // 收藏/历史
    .grid {
      color: #646566;
      .toutiao {
        font-size: 0.6rem;
        &.toutiao-lishi {
          color: #ffb31d;
        }
        &.toutiao-shoucang {
          color: #ed5253;
        }
      }
    }
    // 消息提示/小智同学
    .link {
      margin: 10px 0;
    }
  }
  // 退出按钮
  .out-login {
    color: red;
    border: 0;
  }
}
</style>
