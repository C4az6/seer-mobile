<template>
  <div class="comment-list">
    <van-cell title="全部评论" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- 评论项组件 start -->
    <comment-item
    v-for="(item, index) in commentList"
    :key="index"
    :comment="item"
    @reply-click="$emit('reply-click', $event)"
    />
    <!-- 评论项组件 end -->
    </van-list>
  </div>
</template>

<script>
import { getCommentlist } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    comment: { // 评论数据
      type: Object,
      default: () => {}
    },
    source: {
      // 评论ID或者文章ID
      type: [Object, String, Number],
      required: true
    },
    // 获取文章评论，使用字符 a
    // 获取评论回复，使用字符 c
    type: {
      type: String,
      default: 'a' // 不传type默认就是 a
    }
  },
  data () {
    return {
      commentList: [], // 评论列表
      loading: false,
      finished: false,
      params: {
        // 获取评论列表参数
        offset: null
      }
    }
  },
  computed: {},
  watch: {
    comment () {
      this.commentList.unshift(this.comment)
    }
  },
  created () {
    this.onLoad()
  },
  mounted () {},
  methods: {
    // 加载评论列表数据
    async onLoad () {
      try {
        const { data: response } = await getCommentlist({
          type: this.type, // a：获取对文章评论的数据列表，c：对评论进行回复
          source: this.source.toString(), // 文章ID或者评论ID
          offset: this.params.offset,
          limit: 10
        })
        this.commentList = [...this.commentList, ...response.data.results]
        this.loading = false
        this.$emit('loadFinished', response.data.total_count)
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
