<template>
  <div>
    <!-- 头部区域 Start -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="backProPage"
      class="navbar"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 头部区域 End -->

    <!-- 表单区域 Start -->
    <van-form @submit="loginFn" class="form">
      <van-field
        v-model="mobile"
        name="手机号"
        placeholder="请输入手机号"
        :rules="[
          {
            required: true,
            message: '请输入手机号',
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
          }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码', pattern: /\d{6}/ }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round size="mini" class="code-btn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <!-- 表单区域 End -->
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    backProPage() {
      this.$router.back()
    },
    async loginFn() {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #1989fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    flex: 1;
    margin-right: 10px;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    color: #666;
    padding: 0 10px;
  }
  :deep(.van-button--block) {
    border-radius: 10px;
  }
}
</style>
