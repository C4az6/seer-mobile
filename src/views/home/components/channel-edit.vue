<template>
  <div class="channel-edit-container">
    <van-cell title="我的频道" center :border="false">
    <van-button type="danger" size="mini" round plain>编辑</van-button>
    </van-cell>
    <div class="user-channel-wrap">
      <van-grid :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(item, index) in userChannels"
          :key="index"
          :text="item.name"
        />
      </van-grid>
    </div>

    <van-cell title="频道推荐" center class="recommend-wrap" :border="false"> </van-cell>
    <div class="all-channel-wrap">
      <van-grid :gutter="10">
        <van-grid-item v-for="(item, index) in recommendChannels" :key="index" :text="item.name" />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllchannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      recommendChannels: [], // 推荐频道
      allChannels: [] // 所有频道
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    // 获取所有频道列表
    async loadAllChannels () {
      const { data: { data } } = await getAllchannels()
      console.log(data)
      this.allChannels = data.channels
      // 使用所有频道减去用户频道就能算出推荐频道的数据
      // 思路：从所有频道数据中筛选出不为用户频道的数据
      this.recommendChannels = this.allChannels.filter(item => {
        return !this.userChannels.find(item2 => {
          return item2.name === item.name
        })
      })
    }

  }
}
</script>

<style scoped lang="less">
.channel-edit-container {
  padding: 66px 0;
}

/deep/ .van-cell__title {
  font-size: 16px;
}
/deep/.van-button--mini {
  width: 50px;
}

.grid-item {
  height: 44px;
}
/deep/.van-grid-item__content {
  background-color: #f4f5f6;
}
.active {
  /deep/.van-grid-item__text {
    color: red;
  }
}

.recommend-wrap {
  margin-top: 20px;
}

</style>
