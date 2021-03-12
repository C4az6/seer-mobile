<template>
  <div class="comment-item">
    <van-cell>
      <div slot="icon">
        <van-image class="avatar" fit="cover" round :src="comment.aut_photo" />
      </div>

      <div slot="title">
        <div class="username-wrap">
          <span>{{ comment.aut_name }}</span>
          <div class="like-count-wrap">
            <van-icon name="good-job-o" />
            <span class="like-count">{{ comment.like_count }}</span>
          </div>
        </div>
        <div class="content-wrap van-multi-ellipsis--l3">
          {{ comment.content }}
        </div>
        <div class="pubdate-wrap">
          <span class="pubdate">{{ comment.pubdate | formatTime('MM-DD HH:mm') }}</span>
          <van-button class="repay-btn" round size="mini"
            >{{ comment.reply_count }} 回复</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  components: {},
  props: {
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
  methods: {}
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
  .repay-btn {
    width: 52px;
    height: 22px;
  }
}

.like-count-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
