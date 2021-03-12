<template>
  <div class="comment-reply">
    <van-nav-bar
      title="2条回复"
      @click-left="$emit('close')"
    >
      <van-icon name="cross" slot="left" />
    </van-nav-bar>

    <van-cell>
      <comment-item :comment="comment" />
    </van-cell>

    <van-cell title="所有回复"></van-cell>
    <van-cell title="全部评论"></van-cell>

  <!-- 底部内容 start -->
  <div class="article-bottom">
    <van-button
    class="comment-btn"
    type="default"
    round
    @click="pubCommentShow = !pubCommentShow"
    > 写评论 </van-button>
  </div>
    <!-- 底部内容 end -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
export default {
  name: 'CommentReply',
  components: {
    CommentItem
  },
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
