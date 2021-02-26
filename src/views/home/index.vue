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
    <van-tabs v-model="active" animated>
      <van-tab
      v-for="item in channels"
      :title="item.name"
      :key="item.id">
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
      active: 2 // tab标签页默认激活项
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
        console.log('res: ', res)
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
  }
</style>
