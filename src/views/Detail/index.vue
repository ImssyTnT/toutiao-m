<template>
  <div>
    <!-- 头部导航 Start -->
    <NavBar></NavBar>
    <!-- 头部导航 End -->
    <!-- 作者区域 Start -->
    <div class="author">
      <!-- 标题区域 -->
      <div class="title">
        <h3>{{ this.detailInfo.title }}</h3>
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
              :src="this.detailInfo.aut_photo"
            />
          </div>
          <div class="author-title">
            <span class="author-name">{{ this.detailInfo.aut_name }}</span>
            <span class="publisher-data">{{ time }}</span>
          </div>
        </div>
        <!-- 关注按钮 -->

        <div class="atten-btn">
          <van-button type="info" round v-if="isShow">
            <van-loading color="#fff" size="18px" />
          </van-button>

          <van-button
            type="info"
            round
            @click="isFollowings(detailInfo.aut_id)"
            v-else
          >
            <template #icon>
              <van-icon name="plus" v-if="!detailInfo.is_followed" />
            </template>
            {{ detailInfo.is_followed ? '已关注' : '关注' }}
          </van-button>
        </div>
      </div>
    </div>
    <!-- 作者区域 End -->
    <!-- 主体区域 Start -->
    <div class="main mark-down">
      <!-- 文章内容区域 -->
      <DetailContent
        :detailInfo="detailInfoContent"
        ref="contentRef"
      ></DetailContent>
      <van-divider>正文结束</van-divider>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad('a', detailInfo.art_id)"
        offset="100"
        error-text="加载失败,请点击重新加载"
        v-if="commentShow"
      >
        <!-- 评论区域 -->
        <Comment
          v-for="(item, index) in comments"
          :key="index"
          :item="item"
          @clickReply="clickReply"
        ></Comment>
        <!-- 评论弹出层 -->
        <van-popup
          v-model="showPopup"
          position="bottom"
          :style="{ height: '100%' }"
        >
          <van-nav-bar title="标题" left-arrow @click-left="backPrePage" />
          <div class="popUp">
            <Comment :item="commentInfo"></Comment>
            <van-cell title="全部回复" />
            <van-list
              v-model="loading"
              :finished="finisheds"
              finished-text="没有更多了"
              @load="onLoad('c', commentInfo.com_id)"
              offset="600"
              error-text="加载失败,请点击重新加载"
            >
              <Comment
                v-for="(item, index) in commentsInComments"
                :key="index"
                :item="item"
              ></Comment>
            </van-list>
          </div>
          <div class="floor-btn">
            <van-button round type="default" @click="show = true"
              >评论</van-button
            >
            <!-- 弹出层 -->
            <div class="popup">
              <van-popup
                v-model="show"
                position="bottom"
                :style="{ height: '20%' }"
              >
                <van-form @submit="onSubmit">
                  <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入留言"
                    show-word-limit
                  />
                  <van-button plain type="info" native-type="submit"
                    >发布</van-button
                  >
                </van-form>
              </van-popup>
            </div>
          </div>
        </van-popup>
      </van-list>
    </div>
    <!-- 主体区域 End -->

    <!-- 底部评论栏 Start -->
    <Tabbar
      :detailInfo="detailInfo"
      @onClickLikings="onClickLikings"
      @onClickCollections="onClickCollections"
      @reload="reload"
    ></Tabbar>
    <!-- 底部评论栏 End -->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import DetailContent from './components/DetailContent.vue'
import Tabbar from './components/Tabbar.vue'
import {
  getDetailContent,
  userFollowings,
  unFollowings,
  artLikings,
  unArtLikings,
  collections,
  unCollections,
  getComments,
  postComment
} from '@/api'
import { ImagePreview } from 'vant'
import dayjs from '@/utils/dayjs'
import Comment from './components/Comment.vue'
export default {
  name: 'detail',
  data() {
    return {
      detailInfo: {},
      detailInfoContent: '',
      isShow: false,
      loading: true,
      finished: false,
      showPopup: false,
      comments: [],
      error: false,
      finisheds: false,

      show: false,
      message: '',

      preID: '',
      endID: '',

      commentInfo: {},
      commentsInComments: [],
      commentShow: true
    }
  },
  created() {
    this.getDetailContent()
  },
  updated() {
    this.previewImg()
  },
  components: {
    NavBar,
    DetailContent,
    Tabbar,
    Comment
  },
  methods: {
    // 获取文章数据
    async getDetailContent() {
      const id = this.$route.query.id
      const { data } = await getDetailContent(id)
      console.log(data.data)
      this.detailInfo = data.data
      this.detailInfoContent = data.data.content
      this.loading = false
    },
    // 图片预览功能
    previewImg() {
      const contentEl = this.$refs.contentRef.$el
      const imgAll = contentEl.querySelectorAll('img')

      const images = []
      imgAll.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
            closeable: true
          })
        }
      })
    },
    // 关注用户
    async isFollowings(id) {
      this.isShow = true
      if (!this.detailInfo.is_followed) {
        try {
          await userFollowings(id)
        } catch (error) {
          this.$toast.fail('关注失败')
        } finally {
          this.getDetailContent()
          this.isShow = false
        }
      } else {
        try {
          await unFollowings(id)
        } catch (error) {
          this.$toast.fail('取消关注失败')
        } finally {
          this.getDetailContent()
          this.isShow = false
        }
      }
    },
    // 文章点赞
    async onClickLikings() {
      if (this.detailInfo.attitude === 1) {
        try {
          await unArtLikings(this.detailInfo.art_id)
        } catch (error) {
          this.$toast.fail('取消点赞失败')
        } finally {
          this.getDetailContent()
          this.detailInfo.attitude = 0
        }
      } else {
        try {
          await artLikings(this.detailInfo.art_id)
        } catch (error) {
          this.$toast.fail('点赞失败')
        } finally {
          this.getDetailContent()
          this.detailInfo.attitude = 1
        }
      }
    },
    // 文章收藏
    async onClickCollections() {
      if (this.detailInfo.is_collected) {
        try {
          await unCollections(this.detailInfo.art_id)
        } catch (error) {
          this.$toast.fail('取消收藏失败')
        } finally {
          this.getDetailContent()
        }
      } else {
        try {
          await collections(this.detailInfo.art_id)
        } catch (error) {
          this.$toast.fail('收藏文章失败')
        } finally {
          this.getDetailContent()
        }
      }
    },
    // 进度条到达底部加载评论
    async onLoad(type, id) {
      await this.getComments(type, id)
    },
    // 加载评论
    async getComments(type, id) {
      try {
        if (this.preID === '') {
          const { data } = await getComments(type, id)
          this.preID = data.data.last_id
          if (type === 'a') {
            this.comments = data.data.results
          } else if (type === 'c') {
            this.commentsInComments = data.data.results
          }
        } else {
          const { data } = await getComments(type, id, this.preID)
          this.preID = data.data.last_id
          if (type === 'a') {
            this.comments.push(...data.data.results)
          } else {
            this.commentsInComments.push(...data.data.results)
          }
        }
        if (this.preID === null) {
          if (type === 'a') {
            return (this.finished = true)
          } else {
            return (this.finisheds = true)
          }
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    backPrePage() {
      this.showPopup = false
      this.commentsInComments = []
    },
    // 评论弹出层
    clickReply() {
      this.preID = ''
      this.showPopup = true
      this.finisheds = false
      this.commentInfo = this.$store.state.comment
    },
    // 重载评论页面
    reload(type = 'a', id = this.detailInfo.art_id) {
      this.preID = ''
      this.getComments(type, id)
    },
    // 发布评论
    async onSubmit() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        await postComment(
          this.commentInfo.com_id,
          this.message,
          this.detailInfo.art_id
        )
        this.message = ''
        this.show = false
        this.reload('c', this.commentInfo.com_id)
        this.$toast.success('评论成功')
      } catch (error) {
        this.$toast.fail('回复评论失败')
      } finally {
        this.$toast.clear()
      }
    }
  },
  computed: {
    time() {
      const oldtime = dayjs(this.detailInfo.pubdate).fromNow()
      return oldtime
    }
  }
}
</script>

<style lang="less" scoped>
// 作者区域
.author {
  // 标题区域
  .title {
    padding-top: 46px;
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
  padding-bottom: 88px;
}
.popUp {
  padding: 0 32px;
  .van-cell {
    position: unset;
    padding: 20px 0;
    border-bottom: 1px solid #ebedf0;
    .van-cell__title {
      font-size: 28px;
    }
  }
}
.floor-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 101px;
  width: 100%;
  background-color: #ff69b4;
  .van-button {
    width: 640px;
    height: 80px;
  }
}
.popup {
  .van-popup--bottom {
    padding: 32px 0 32px 32px;
    box-sizing: border-box;
    border: 0;
    .van-form {
      display: flex;
      align-items: center;
      .van-button--info {
        border: 1px solid #fff;
        padding: 0;
      }
      .van-cell {
        background-color: #f5f7f9;
      }
      .van-button {
        width: 122px;
        height: 88px;
        .van-button__text {
          color: #6ba3d8;
        }
      }
    }
  }
}
.van-nav-bar {
  z-index: 0;
}
</style>
