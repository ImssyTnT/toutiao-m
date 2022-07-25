<template>
  <div>
    <!-- 头部区域 Start -->
    <NavBar title="个人信息"></NavBar>
    <!-- 头部区域 End -->
    <!-- 主体区域 Start -->
    <div class="edit-user">
      <!-- 头像 -->
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <input
          type="file"
          hidden
          ref="file"
          accept=".jpg,.png,.gif,.jpeg,.psd,.webp"
          @change="addImg"
        />
        <van-image width="30" height="30" round :src="userInfo.photo" />
      </van-cell>
      <!-- 昵称 -->
      <van-cell
        title="昵称"
        is-link
        :value="userInfo.name"
        @click="
          ;(show = true), (showPicker = 'nickname'), (message = userInfo.name)
        "
      />
      <!-- 性别 -->
      <van-cell
        title="性别"
        is-link
        :value="userInfo.gender === 0 ? '男' : '女'"
        @click=";(show = true), (showPicker = 'sex')"
      />
      <!-- 生日 -->
      <van-cell
        title="生日"
        is-link
        :value="userInfo.birthday"
        @click=";(show = true), (showPicker = 'birthday')"
      />
      <!-- 弹出层 -->
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: showPicker === 'nickname' ? '100%' : '30%' }"
      >
        <!-- 选择生日 -->
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="optionBirthday"
          @cancel="cancel"
          v-show="showPicker === 'birthday'"
        />
        <!-- 选择性别 -->
        <van-picker
          v-show="showPicker === 'sex'"
          title="选择性别"
          show-toolbar
          :columns="columns"
          @confirm="confirm"
          @cancel="cancel"
        />
        <!-- 修改昵称 -->
        <div class="nickname" v-show="showPicker === 'nickname'">
          <van-nav-bar
            title="标题"
            left-text="取消"
            right-text="保存"
            @click-left="cancel"
            @click-right="changeNickname"
          />
          <van-field
            v-model="message"
            rows="1"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
          />
        </div>
      </van-popup>
      <van-popup v-model="showPop" class="photo">
        <!-- 上传头像 -->
        <UpdatePhoto :photo="photo" @update="update"></UpdatePhoto>
      </van-popup>
    </div>
    <!-- 主体区域 End -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
import NavBar from '@/components/NavBar.vue'
import { getProfileInfo, editUserInfo } from '@/api'
import UpdatePhoto from './components/UpdatePhoto.vue'
export default {
  created() {
    this.getProfileInfo()
  },
  data() {
    return {
      userInfo: {},
      currentDate: new Date(),
      minDate: new Date('1900-1-1'),
      maxDate: new Date('2022-12-31'),
      show: false,
      showPicker: '',
      columns: ['男', '女'],
      message: '',
      photo: '',

      myCropper: null,
      showPop: false
    }
  },
  components: {
    NavBar,
    UpdatePhoto
  },

  methods: {
    // 获取用户个人信息
    async getProfileInfo() {
      console.log(111)
      try {
        const { data } = await getProfileInfo()
        this.userInfo = data.data
      } catch (error) {
        if (error.response.status === 401) {
          return this.$toast.fail('请重新登录')
        }
        this.$toast.fail('获取失败请重新加载')
      }
    },
    // 修改生日
    optionBirthday(value) {
      const time = dayjs(value).format('YYYY-MM-DD')
      this.show = false
      this.editUserInfo(this.userInfo.name, this.userInfo.gender, time)
    },
    // 修改性别
    confirm(value) {
      const sex = value === '男' ? 0 : 1
      this.show = false
      this.editUserInfo(this.userInfo.name, sex)
    },
    // 取消选择
    cancel() {
      this.show = false
    },
    // 修改昵称
    changeNickname() {
      this.show = false
      this.editUserInfo(this.message)
    },
    // 修改用户信息请求
    async editUserInfo(name, gender, birthday) {
      try {
        await editUserInfo(name, gender, birthday)
      } catch (error) {
        if (error.response === 401) {
          this.$toast.fail('请重新登录')
        } else if (error.response === 409) {
          this.$toast.fail('用户名已存在')
        }
        this.$toast.fail('更新失败')
      } finally {
        this.getProfileInfo()
      }
    },
    // 选择图片
    addImg(e) {
      const file = this.$refs.file.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.showPop = true
        this.showPicker = 'photo'
      }
    },
    update(photo) {
      this.userInfo.photo = photo
    }
  }
}
</script>

<style lang="less" scoped>
.edit-user {
  padding-top: 92px;
  .van-cell {
    align-items: center;
    .van-image {
      vertical-align: middle;
    }
  }
}
.photo {
  height: 100%;
  width: 100%;
}
</style>
