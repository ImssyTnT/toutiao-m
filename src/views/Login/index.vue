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
    <van-form @submit="loginFn" class="form" ref="loginForm">
      <van-field
        v-model="mobile"
        name="手机号"
        placeholder="请输入手机号"
        :rules="mobileRules"
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
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
          />
          <van-button
            round
            v-else
            @click="sendCode"
            size="mini"
            class="code-btn"
            native-type="button"
            >发送验证码</van-button
          >
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
import { login, sendCode } from '@/api/user.js'
import { mobileRules, codeRules } from './rules.js'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    // 返回上一页
    backProPage() {
      this.$router.back()
    },
    // 登录
    async loginFn() {
      this.$toast.loading({
        message: '正在登陆...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (err) {
        const status = err.response.status
        let message = '登录错误,请刷新'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 发送验证码
    async sendCode() {
      try {
        await this.$refs.loginForm.validate('手机号')
        const res = await sendCode(this.mobile)
        console.log(res)
        this.isShowCountDown = true
      } catch (err) {
        if (!err.response) {
          this.$toast.fail(err.message)
        } else {
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
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
