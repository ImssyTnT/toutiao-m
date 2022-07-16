<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
        {{ $store.state.user.token ? '我的' : '未登录' }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.van-tabbar-item {
  justify-content: space-evenly;
  :deep(.van-tabbar-item__icon) {
    font-size: 0.32rem;
    margin: 0;
    .toutiao {
      font-size: 0.53333rem;
    }
  }
}
</style>
