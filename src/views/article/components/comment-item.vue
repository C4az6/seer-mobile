<template>
  <div class="comment-item">
    <van-cell>
      <div slot="icon">
        <van-image class="avatar" fit="cover" round :src="comment.aut_photo" />
      </div>

      <div slot="title">
        <div class="username-wrap">
          <span>{{ comment.aut_name }}</span>
          <div class="like-count-wrap" @click="onCommentLike">
            <van-icon :name="comment.is_liking?'good-job':'good-job-o'" :class="{liked: comment.is_liking}" />
            <span class="like-count">{{ comment.like_count }}</span>
          </div>
        </div>
        <div class="content-wrap van-multi-ellipsis--l3">
          {{ comment.content }}
        </div>
        <div class="pubdate-wrap">
          <span class="pubdate">{{ comment.pubdate | formatTime('MM-DD HH:mm') }}</span>
          <van-button
          class="reply-btn"
          round size="mini"
          @click="$emit('reply-click', comment)"
          >{{ comment.reply_count }} 回复</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, cancelCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    // 单项的评论数据对象
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 对评论或者评论回复进行点赞
    async onCommentLike () {
      this.$loading()
      try {
        const commentId = this.comment.com_id.toString()
        if (this.comment.is_liking) {
          // 取消点赞
          await cancelCommentLike(commentId)
          this.comment.like_count--
        } else {
          // 点赞
          await addCommentLike(commentId)
          this.comment.like_count++
        }
        // 更新点赞状态
        this.comment.is_liking = !this.comment.is_liking
        this.$toast.success({
          type: 'success',
          message: `${this.comment.is_liking ? '' : '取消'}点赞成功`
        })
      } catch (error) {
        console.log('点赞失败:', error)
        this.$toast.fail('服务器异常,点赞失败!')
      }
      this.$toast.clear()
    }
  }
}
</script>

<style scoped lang="less">
.username-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.avatar {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}

.content-wrap {
  word-break: break-all;
}

.pubdate-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .pubdate {
    margin-right: 15px;
    font-size: 12px;
  }
  .reply-btn {
    width: 52px;
    height: 22px;
  }
}

.like-count-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.liked {
  color: #3296fa;
}
</style>
