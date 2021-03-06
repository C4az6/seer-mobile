<template>
  <div class="search-history-container">
    <van-cell title="搜索历史" >
      <van-icon name="delete-o" v-if="!isDeleteStatus" @click="isDeleteStatus = !isDeleteStatus"/>
      <div v-else>
        <span @click="handleRemoveAllHistory">全部删除</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="isDeleteStatus = false">完成</span>
      </div>
    </van-cell>
    <van-cell v-for="(item, index) in searchHistory" :key="index" :title="item">
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistory: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isDeleteStatus: false // 是否处于删除状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 删除全部历史记录
    handleRemoveAllHistory () {
      console.log('删除全部历史记录...')
    }
  }
}
</script>

<style scoped lang="less"></style>
