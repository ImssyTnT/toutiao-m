<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="backPrePage" />
  </div>
</template>

<script>
export default {
  methods: {
    // 返回上一页
    backPrePage() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  position: fixed;
  width: 100%;
  :deep(.van-nav-bar__content) {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
}
</style>
