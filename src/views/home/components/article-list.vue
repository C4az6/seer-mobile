<template>
  <div class="article-list">
    <!-- 文章列表 start -->

    <van-pull-refresh
     v-model="isRefreshLoading"
     @refresh="onRefresh"
     :success-text="refreshSuccessText"
     :success-duration="1500"
     >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <article-item
        :article="item"
        v-for="(item, index) in articles"
        :key="index"
        ></article-item>
      </van-list>
    </van-pull-refresh>
    <!-- 文章列表 end -->
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import articleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    articleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      refreshSuccessText: '',
      isRefreshLoading: false,
      loading: false,
      finished: false,
      preTimeStamp: null,
      articles: [] // 文章列表数据
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 下拉刷新
    async onRefresh () {
      const { data: res } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: +new Date(), // 当前时间戳
        with_top: 1 // 1：包含置顶，0：不包含
      })
      this.isRefreshLoading = false
      this.articles.unshift(...res.data.results)
      this.refreshSuccessText = `已刷新${res.data.results.length}条数据`
    },
    // 上拉加载
    onLoad () {
      console.log('onLoad...')
      this.loadArticles()
    },
    // 加载新闻文章列表
    async loadArticles () {
      try {
        const { data: response } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.preTimeStamp || +new Date(), // 当前时间戳
          with_top: 1 // 1：包含置顶，0：不包含
        })
        this.loading = false
        this.articles.push(...response.data.results)
        this.preTimeStamp = response.data.pre_timestamp
        if (!response.data.results.length) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
  }
</style>
