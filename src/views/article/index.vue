<template>
  <div class="article-container">
    <!-- nav-bar部分 start -->
    <div class="nav-bar-wrap">
      <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    </div>
    <!-- nav-bar部分 end -->

    <!-- 文章内容 start -->
    <div class="article-content">
      <!-- 文章标题 start -->
      <h1 class="title">
        {{article.title}}
      </h1>

      <!-- 用户信息 start -->
      <van-cell center class="user-info-wrap">
        <div class="username" slot="title">{{article.aut_name}}</div>
        <div class="pubdate" slot="label">{{article.pubdate | relativeTime}}</div>
        <van-image
          slot="icon"
          class="avatar"
          :src="article.aut_photo"
          round
          fit="cover"
        />
        <van-button
          class="attention-btn"
          :icon="article.is_followed?'':'plus'"
          :type="article.is_followed?'default':'info'"
          size="small"
          round
          >{{article.is_followed?'已关注':'关注'}}</van-button
        >
      </van-cell>
      <!-- 用户信息 end -->

      <!-- 文章详细内容 start -->
      <div class="markdown-body" v-html="article.content">

      </div>
      <!-- 文章详细内容 end -->

      <!-- 文章标题 end' -->
    </div>
    <!-- 文章内容 end -->
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
/*
  在组件中获取动态路由参数：
    方式一：this.$route.params.articleId
    方式二：props 传参，推荐
*/
export default {
  name: 'ArticleDetail',
  components: {},
  props: {
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      article: {} // 文章详情内容
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log('article id ', this.articleId)
    this.loadArticleDetail()
  },
  mounted () {},
  methods: {
    // 获取文章详情
    async loadArticleDetail () {
      const { data: response } = await getArticleDetail(this.articleId)
      console.log('get artilce response: ', response)
      this.article = response.data
    }
  }
}
</script>

<style scoped lang="less">
@import url('./github-markdown.css');

.article-content {
  .title {
    font-size: 20px;
    color: #3a3a3a;
    margin: 0;
    background-color: #fff;
    padding: 14px;
  }

  .user-info-wrap {
    .attention-btn {
      width: 85px;
      height: 29px;
    }
    .avatar {
      margin-right: 8px;
      width: 35px;
      height: 35px;
    }
    .username,.pubdate {
      font-size: 12px;
    }
  }
}
.markdown-body {
  background-color: #fff;
  padding: 14px;
}
</style>
