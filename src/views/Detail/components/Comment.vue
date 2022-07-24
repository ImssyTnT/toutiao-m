<template>
  <div class="comment">
    <div class="pic">
      <van-image width="36" height="36" round :src="item.aut_photo" />
    </div>
    <div class="content">
      <div class="title">
        <span class="user-name">{{ item.aut_name }}</span>
        <div
          class="title-btn"
          @click="commentLike(item)"
          :class="item.is_liking ? 'islike' : ''"
        >
          <van-icon name="good-job-o" />
          <span class="good">赞</span>
        </div>
      </div>
      <div class="content-text">
        <p>
          {{ item.content }}
        </p>
        <div class="floor">
          <span class="ago">{{ time }}</span>
          <van-button type="default" round size="mini" @click="showPopup(item)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { commentLikings, unCommentLikings } from '@/api'
export default {
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    time() {
      const oldtiem = dayjs(this.item.pubdate).fromNow()
      return oldtiem
    }
  },
  methods: {
    // 评论点赞
    async commentLike(item) {
      try {
        if (item.is_liking) {
          await unCommentLikings(item.com_id)
        } else {
          await commentLikings(item.com_id)
        }
      } catch (error) {
        if (item.is_liking) {
          this.$toast.fail('取消点赞失败')
        } else {
          this.$toast.fail('点赞失败')
        }
      } finally {
        item.is_liking = !item.is_liking
      }
    },
    // 评论回复
    showPopup(item) {
      this.$store.commit('setComment', item)
      this.$emit('clickReply')
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #ebedf0;
  font-size: 26px;
  .pic {
    margin-right: 26.6664px;
  }
  .content {
    flex: 1;
    .title {
      display: flex;
      justify-content: space-between;
      .user-name {
        color: #406599;
        font-size: 27.7336px;
      }
      .title-btn {
        .van-icon {
          font-size: 30px;
        }
        .good {
          font-size: 20.2664px;
          margin-left: 8.5336px;
        }
      }
    }
    .content-text {
      p {
        font-size: 32px;
        word-break: break-all;
      }
      .floor {
        display: flex;
        align-items: center;
        .ago {
          margin-right: 26.6664px;
          font-size: 20.2664px;
        }
        .van-button--mini {
          padding: 0 30px;
        }
        :deep(.content-text) {
          font-size: 21.3336px;
        }
      }
    }
  }
  .islike {
    color: red;
  }
}
</style>
