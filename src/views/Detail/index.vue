<template>
  <div>
    <!-- 头部导航 Start -->
    <NavBar></NavBar>
    <!-- 头部导航 End -->
    <!-- 作者区域 Start -->
    <div class="author">
      <!-- 标题区域 -->
      <div class="title">
        <h3>123142353479851826542235ou2yalkjshdslajdhalskhjd1685</h3>
      </div>
      <!-- 作者区域 -->
      <div class="author-info">
        <!-- 作者信息 -->
        <div class="author-detail">
          <!-- 头像区域 -->
          <div class="avater">
            <van-image
              round
              width="100%"
              height="100%"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="author-title">
            <span class="author-name">123</span>
            <span class="publisher-data">123</span>
          </div>
        </div>
        <!-- 关注按钮 -->
        <div class="atten-btn">
          <van-button type="info" round>
            <template #icon>
              <van-icon name="plus" />
            </template>
            关注
          </van-button>
        </div>
      </div>
    </div>
    <!-- 作者区域 End -->
    <!-- 主体区域 Start -->
    <div class="main mark-down">
      <DetailContent :detailInfo="detailInfo" ref="contentRef"></DetailContent>
    </div>
    <!-- 主体区域 End -->
    <van-divider>正文结束</van-divider>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import DetailContent from './components/DetailContent.vue'
import { getDetailContent } from '@/api'
// import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      detailInfo: ''
    }
  },
  created() {
    this.getDetailContent()
  },
  components: {
    NavBar,
    DetailContent
  },
  methods: {
    async getDetailContent() {
      const id = this.$route.query.id
      const { data } = await getDetailContent(id)
      this.detailInfo = data.data.content
      this.previewImg()
    },
    previewImg() {
      const contentEl = this.$refs.contentRef.$el
      console.log(contentEl)
      //   const imgSrc = []
      //   imgAll.forEach((item) => {
      //     imgSrc.push(item.src)
      //     item.onclick = () => {
      //       console.log(11)
      //       ImagePreview({
      //         imgSrc
      //       })
      //     }
      //   })
    }
  }
}
</script>

<style lang="less" scoped>
// 作者区域
.author {
  // 标题区域
  .title {
    h3 {
      margin: 0;
      padding: 50px 32px;
      font-size: 40px;
      word-wrap: break-word;
    }
  }
  // 作者区域
  .author-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    height: 84px;
    // 作者信息
    .author-detail {
      display: flex;
      justify-content: flex-start;
      //   头像
      .avater {
        margin-right: 17px;
        width: 70px;
        height: 70px;
      }
      //   作者名字/发布时间
      .author-title {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 24px;
        .publisher-data {
          color: #b7b7b7;
        }
      }
    }
  }
  // 关注按钮
  .van-button {
    width: 170px;
    height: 58px;
  }
}
// 主体区域
.main {
  padding: 55px 32px;
}
</style>
