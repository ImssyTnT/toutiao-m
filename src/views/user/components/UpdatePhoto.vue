<template>
  <div class="update-avatar">
    <img :src="photo" alt="" ref="img" />
    <div class="photo-btn">
      <span @click="unCropper">取消</span>
      <span @click="getCroppedResult">完成</span>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { editUserPhoto } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  mounted() {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    unCropper() {
      this.$parent.$parent.showPop = false
    },
    getCroppedResult() {
      try {
        const fm = new FormData()
        console.log(this.myCropper.getCroppedCanvas())
        this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          fm.append('photo', blob)
          const { data } = await editUserPhoto(fm)
          this.$emit('update', data.data.photo)
        })
      } catch (error) {
        if (error.response.status === 401) {
          this.$toast.fail('请重新登录')
        }
        this.$toast.fail('上传失败')
      } finally {
        this.$parent.$parent.showPop = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
}
.photo-btn {
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  bottom: 10px;
  color: #fff;
  span {
    margin: 0 20px;
    font-size: 32.6px;
  }
}
</style>
