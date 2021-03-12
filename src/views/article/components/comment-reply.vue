<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count+'条回复'" @click-left="$emit('close')">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>

    <!-- 当前评论项 start -->
    <van-cell>
      <comment-item :comment="comment" />
    </van-cell>
    <!-- 当前评论项 end -->

    <comment-list
    :source="comment.com_id"
    type="c"
    :comment="commentItem"
    />

    <!-- 底部内容 start -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        @click="pubCommentShow = !pubCommentShow"
      >
        写评论
      </van-button>
    </div>
    <!-- 底部内容 end -->

    <!-- 发布评论弹出层组件 start -->
    <van-popup
      v-model="pubCommentShow"
      position="bottom"
      >
      <comment-publish @publish="handlePublishComment" />
    </van-popup>
    <!-- 发布评论弹出层组件 end -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPublish from './comment-publish'
import { addComment } from '@/api/comment'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPublish
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    target: {
      type: [Number, String, Object],
      required: true
    },
    art_id: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      commentItem: {},
      pubCommentShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log(this.comment)
  },
  mounted () {},
  methods: {
    // 发布评论
    async handlePublishComment (content) {
      this.$loading()
      try {
        const { data: response } = await addComment({
          target: this.comment.com_id,
          content,
          art_id: null
        })
        this.$toast.success('评论发布成功!')
        this.pubCommentShow = false
        this.commentItem = response.data.new_obj
        this.comment.reply_count++
      } catch (error) {
        console.log('评论失败!', error)
        this.$toast.clear()
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-reply {
  padding-bottom: 44px;
}

.article-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 44px;
  border-top: 1px solid #cecece;
  background-color: #fff;
  .comment-btn {
    width: 200px;
    height: 30px;
    font-size: 15px;
    color: #848684;
  }
  .van-icon {
    font-size: 20px;
    color: #848684;
  }
}
</style>
