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
      <!-- 用于给Tab标签占位 -->
      <div slot="nav-right" class="menu-icon-placeholder"></div>

      <div slot="nav-right" class="menu-icon" @click="channelMenuShow=true">
        <van-icon name="wap-nav"/>
      </div>
    </van-tabs>
    <!-- 频道列表部分 end -->

    <!-- 频道菜单弹出层 start -->
    <van-popup
      v-model="channelMenuShow"
      position="bottom"
      class="channel-popup-wrap"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit :user-channels="channels"></ChannelEdit>
    </van-popup>
    <!-- 频道菜单弹出层 end -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      channelMenuShow: false, // 频道菜单弹出层是否显示
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

    /deep/.van-tabs__nav--complete {
      padding-left: 0;
      padding-right: 0;
    }

    /deep/.van-tabs__wrap--scrollable .van-tab {
      padding: 0;
      flex: 1 0 22%;
    }

    .menu-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 33px;
      height: 43px;
      background-color: #fff;
      opacity: .9;
      &::before {
        content: '';
        position: absolute;
        left: -1px;
        width: 1px;
        height: 43px;
        background-image: linear-gradient(#f1f1f1, #cdcdcd,#cdcdcd, #f1f1f1);
      }
    }

    .channel-popup-wrap {
      height: 100%;
    }

    .menu-icon-placeholder {
      width: 33px;
      height: 43px;
      flex-shrink: 0;
    }
  }
</style>
