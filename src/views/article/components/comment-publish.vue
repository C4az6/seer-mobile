<template>
  <div class="comment-publish">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
    size="small"
    class="publish-btn"
    @click="handlePublishComment"
    :disabled="message.length===0"
    >发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'CommentPublish',
  components: {},
  props: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 监听发布评论函数
    handlePublishComment () {
      if (this.message) {
        this.$emit('publish', this.message)
        this.message = ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-publish {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}
.publish-btn {
  width: 50px;
  height: 22px;
}
</style>
