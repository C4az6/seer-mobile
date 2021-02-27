<template>
  <div class="home-container">
    <!-- 导航栏 start -->
    <div class="nav-bar-wrap">
      <van-nav-bar>
        <van-button
          slot="title"
          class="search-btn"
          icon="search"
          type="info"
          round
          size="small"
        >
        搜索
        </van-button>
    </van-nav-bar>
    </div>
    <!-- 导航栏 end -->

    <!-- 频道列表部分 start -->
    <van-tabs v-model="active">
      <van-tab
      v-for="item in channels"
      :title="item.name"
      :key="item.id">
      <!-- 文章列表组件 -->
      <article-list :channel="item"></article-list>
      </van-tab>
    </van-tabs>
    <!-- 频道列表部分 end -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      channels: [], // 用户频道列表
      active: 0 // tab标签页默认激活项
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    // 获取用户频道列表
    async loadUserChannels () {
      try {
        const { data: res } = await getUserChannels()
        this.channels = res.data.channels
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .home-container {
    /deep/ .van-nav-bar__title {
      max-width: none;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      .van-icon {
        font-size: 16px;
      }
    }

    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }

    /deep/ .van-tabs__line {
      width: 15px;
      height: 4px;
      bottom: 20px;
      background-color: #3296fa;
    }
  }
</style>
