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
        开发者为 Google 淘汰项目搭建「墓园」，里面可能有你曾用过的产品
      </h1>

      <!-- 用户信息 start -->
      <van-cell center class="user-info-wrap">
        <div class="username" slot="title">教师节快乐</div>
        <div class="pubdate" slot="label">2 年前</div>
        <van-image
          slot="icon"
          class="avatar"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          round
          fit="cover"
        />
        <van-button
          class="attention-btn"
          icon="plus"
          type="info"
          size="small"
          round
          >关注</van-button
        >
      </van-cell>
      <!-- 用户信息 end -->

      <!-- 文章详细内容 start -->
      <div class="markdown-body">
        <h2>标题二</h2>
        <h3>标题三</h3>
        <h3>标题三</h3>
      </div>
      <!-- 文章详细内容 end -->

      <!-- 文章标题 end' -->
    </div>
    <!-- 文章内容 end -->
  </div>
</template>

<script>
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
    return {}
  },
  computed: {},
  watch: {},
  created () {
    console.log('article id ', this.articleId)
  },
  mounted () {},
  methods: {}
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
