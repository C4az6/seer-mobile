<template>
  <div class="channel-edit-container">
    <van-cell title="我的频道" center :border="false">
    <van-button type="danger" hairline size="mini" round plain @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <div class="user-channel-wrap">
      <van-grid :gutter="10">
        <van-grid-item
          class="grid-item"
          :class="{active: tabActiveIndex===index}"
          v-for="(item, index) in userChannels"
          :key="index"
          :text="item.name"
          :icon="isEdit && index !== 0 ?'close':''"
          @click="handleUserChannelClick(item, index)"
        />
      </van-grid>
    </div>

    <van-cell title="频道推荐" center class="recommend-wrap" :border="false"> </van-cell>
    <div class="all-channel-wrap">
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(item, index) in recommendChannels"
          :key="index"
          :text="item.name"
          @click="handleRecommendChannelClick(item, index)"
        />
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
    },
    tabActiveIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEdit: false, // 用户频道是否处于编辑状态
      allChannels: [] // 所有频道
    }
  },
  computed: {
    recommendChannels () {
      /*
        使用所有频道减去用户频道就能算出推荐频道的数据;
        思路：从所有频道数据中筛选出不为用户频道的数据;
        只要this.userChannels值或者this.allChannels值改变就会触发计算属性执行
      */
      return this.allChannels.filter(item => {
        return !this.userChannels.find(item2 => {
          return item2.name === item.name
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    // 删除用户频道项
    deleteUserChannel (item, index) {
      console.log(index)
      if (index === 0) {
        return this.$toast('该项无法删除')
      }
      if (index < this.tabActiveIndex || this.tabActiveIndex === this.userChannels.length - 1) {
        this.$emit('onDelete', index)
      }
      this.userChannels.splice(index, 1)
    },

    // 用户频道点击事件
    handleUserChannelClick (item, index) {
      // 编辑状态 ? 将该项删除并追加到推荐列表项 : 关闭弹出层并切换tab
      if (!this.isEdit) {
        this.$emit('onClose', index)
      } else {
        this.deleteUserChannel(item, index)
      }
    },

    handleRecommendChannelClick (item, index) {
      console.log('推荐频道点击!')
    },

    // 获取所有频道列表
    async loadAllChannels () {
      const { data: { data } } = await getAllchannels()
      console.log(data)
      this.allChannels = data.channels
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

/deep/.van-grid-item__icon {
  position: absolute;
  font-size: 20px;
  right: -6px;
  top: -6px;
  color: #666;
}

.recommend-wrap {
  margin-top: 20px;
}

/deep/.van-grid-item__icon+.van-grid-item__text {
  margin-top: 0;
}
</style>
