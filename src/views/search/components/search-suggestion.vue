<template>
  <div class="search-suggestion">
    <van-cell :title="item" icon="search" v-for="(item, index) in searchSuggestionList" :key="index"/>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    // 搜索框文本
    searchValue: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      searchSuggestionList: [] // 搜索联想建议列表
    }
  },
  computed: {},
  watch: {
    // Vue官网对watch的介绍：
    // 属性名：要监视的数据的名称，这种写法的缺点是第一次不会触发。
    /* searchValue () {
      console.log(123)
    } */

    // 监听的完整写法
    searchValue: {
      // 当数据发生变化则会执行 handler 处理函数
      handler (value, oldValue) {
        this.loadSearchSuggestion()
      },
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 加载搜索联想建议
    async loadSearchSuggestion () {
      try {
        const { data: response } = await getSearchSuggestion(this.searchValue)
        this.searchSuggestionList = response.data.options
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
