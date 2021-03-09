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
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      >

      </div>
      <!-- 文章详细内容 end -->

      <!-- 文章标题 end' -->
    </div>
    <!-- 文章内容 end -->
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import { ImagePreview } from 'vant'

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
    this.loadArticleDetail()
  },
  mounted () {
  },
  methods: {
    // 获取文章详情
    async loadArticleDetail () {
      try {
        const { data: response } = await getArticleDetail(this.articleId)
        this.article = response.data

        /*
          Vue中数据改变会影响视图(DOM数据)更新，但是不是立即的。

          所以如果需要在修改数据之后马上操作被该数据影响的视图 DOM，
          需要把这个代码放到$nextTick方法的回调函数中。

          this.$nextTick是 Vue 提供的一个方法。

        */
        this.$nextTick(_ => {
          this.handlePreviewImage()
        })
      } catch (error) {
        console.log('error: ', error)
      }
    },
    // 图片预览函数
    // 1. 获取文章内容 DOM 容器
    // 2. 得到所有的img标签
    // 3. 循环img标签，给 img 注册点击事件
    // 4. 在事件处理函数中调用 ImagePreview() 预览
    handlePreviewImage () {
      const articleContent = this.$refs['article-content']
      console.log(articleContent)
      const imgs = articleContent.querySelectorAll('img')
      console.log('imgs: ', imgs)
      const imgPaths = [] // 收集所有的图片路径
      imgs.forEach((item, index) => {
        imgPaths.push(item.src)
        item.onclick = function () {
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 起始位置
          })
        }
      })
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
