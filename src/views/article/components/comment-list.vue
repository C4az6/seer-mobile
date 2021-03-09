<template>
  <div class="comment-list">
    <van-cell title="全部评论" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <van-cell v-for="(item, index) in commentList" :key="index" :title="item.aut_name" />
    </van-list>
  </div>
</template>

<script>
import { getCommentlist } from '@/api/comment'
export default {
  name: 'CommentList',
  components: {},
  props: {
    source: { // 评论ID或者文章ID
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      commentList: [], // 评论列表
      loading: false,
      finished: false,
      params: { // 获取评论列表参数
        offset: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data: response } = await getCommentlist({
          type: 'a', // a：对文章进行评论，c：对评论进行回复
          source: this.source, // 文章ID或者评论ID
          offset: this.params.offset,
          limit: 10
        })
        console.log('comment list response : ', response)
        const comments = response.data.results.map(item => {
          // join用于连接数组中的字符串，默认用逗号连接
          // return item.pubdate = item.pubdate.split('T').join(' ')
          item.pubdate = item.pubdate.replace('T', ' ')
          return item
        })
        console.log('comments: ', comments)
        this.commentList = [...this.commentList, ...comments]
        this.loading = false
        if (!response.data.results.length) {
          this.finished = true
        } else {
          this.params.offset = response.data.last_id
        }
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
