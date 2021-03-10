<template>
  <div class="article-container" v-if="article">
    <!-- nav-bar部分 start -->
    <div class="nav-bar-wrap">
      <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    </div>
    <!-- nav-bar部分 end -->

    <!-- 文章内容 start -->
    <div class="article-content">
      <!-- 文章标题 start -->
      <h1 class="title">
        {{ article.title }}
      </h1>
      <!-- 文章标题 end -->

      <!-- 用户信息 start -->
      <van-cell center class="user-info-wrap">
        <div class="username" slot="title">{{ article.aut_name }}</div>
        <div class="pubdate" slot="label">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-image
          slot="icon"
          class="avatar"
          :src="article.aut_photo"
          round
          fit="cover"
        />
        <van-button
          class="attention-btn"
          :icon="article.is_followed ? '' : 'plus'"
          :type="article.is_followed ? 'default' : 'info'"
          size="small"
          round
          :loading="isFollowLoading"
          @click="handleFollowBtnClick"
          >{{ article.is_followed ? "已关注" : "关注" }}</van-button
        >
      </van-cell>
      <!-- 用户信息 end -->

      <!-- 文章详细内容 start -->
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>
      <!-- 文章详细内容 end -->

      <!-- 文章评论部分 start -->
      <comment-list :source="article.art_id.toString()" />
      <!-- 文章评论部分 end -->
    </div>
    <!-- 文章内容 end -->

    <!-- 文章底部内容 start -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round> 写评论 </van-button>

      <van-icon name="comment-o" badge="2" />

      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? '#ffa500' : ''"
        @click="handleCollectArticle"
      />

      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? '#3296fa' : ''"
        @click="handleLikeClick"
      />

      <van-icon name="share" />
    </div>
    <!-- 文章底部内容 end -->
  </div>
</template>

<script>
import {
  getArticleDetail,
  collectArticle,
  cancelCollectArticle,
  likings,
  cancelLike
} from '@/api/article'
import { cancelFollowUser, followUser } from '@/api/user'
import { ImagePreview } from 'vant'
import commentList from './components/comment-list'

/*
  在组件中获取动态路由参数：
    方式一：this.$route.params.articleId
    方式二：props 传参，推荐
*/
export default {
  name: 'ArticleDetail',
  components: {
    commentList
  },
  props: {
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      isFollowLoading: false, // 关注用户loading
      article: null // 文章详情内容
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleDetail()
  },
  mounted () {},
  methods: {
    // 给文章点赞或者取消点赞操作
    async handleLikeClick () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      if (this.article.attitude === 1) {
        // 取消点赞
        await cancelLike(this.article.art_id)
        this.article.attitude = 0
      } else {
        // 点赞
        await likings({ target: this.article.art_id })
        this.article.attitude = 1
      }
      this.$toast.success(
        (this.article.attitude === 1 ? '' : '取消') + '点赞成功'
      )
    },

    // 收藏或取消收藏文章函数
    async handleCollectArticle () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      if (this.article.is_collected) {
        // 取消收藏
        await cancelCollectArticle(this.article.art_id)
      } else {
        // 收藏
        await collectArticle({ target: this.article.art_id })
      }
      this.$toast.success(
        (this.article.is_collected ? '取消' : '') + '收藏成功'
      )
      this.article.is_collected = !this.article.is_collected
    },

    // 监听关注用户按钮点击
    async handleFollowBtnClick () {
      this.isFollowLoading = true
      const { aut_id: autId } = this.article
      if (this.article.is_followed) {
        // 已经关注了就取消关注
        await cancelFollowUser(autId)
      } else {
        // 没有关注就关注
        await followUser({ target: autId })
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },

    // 获取文章详情
    async loadArticleDetail () {
      try {
        const { data: response } = await getArticleDetail(this.articleId.toString())
        this.article = response.data
        this.$nextTick((_) => {
          this.handlePreviewImage()
        })
      } catch (error) {
        console.log('error: ', error)
      }
    },
    handlePreviewImage () {
      try {
        const articleContent = this.$refs['article-content']
        const imgs = articleContent.querySelectorAll('img')
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
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import url("./github-markdown.css");

.article-content {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow-y: auto;
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
    .username,
    .pubdate {
      font-size: 12px;
    }
  }
}
.markdown-body {
  background-color: #fff;
  padding: 14px;
}

.article-bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 44px;
  border-top: 1px solid #cecece;
  background-color: #fff;
  .comment-btn {
    width: 142px;
    height: 23px;
    font-size: 15px;
    color: #848684;
  }
  .van-icon {
    font-size: 20px;
    color: #848684;
  }
}
</style>
