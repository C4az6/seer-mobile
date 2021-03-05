<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in searchSuggestionList"
      :key="index"
      >
      <div slot="title">
        <span v-html="highlight(item)"></span>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
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
    // debounce 函数
    // 参数1：函数
    // 参数2：防抖时间
    // 返回值：防抖之后的函数，和参数1功能是一样的
    loadSearchSuggestion: debounce(async function () {
      try {
        const { data: response } = await getSearchSuggestion(this.searchValue)
        this.searchSuggestionList = response.data.options
      } catch (error) {
        console.log(error)
      }
    }, 200),

    // 对返回的联想建议进行高亮处理
    highlight (str) {
      // /gi是全局匹配并且不区分大小写
      /*
        正则表达式 /中间的内容/ 都会当作正则匹配模式字符串来处理
        错误的写法：/this.searchValue/gi
        RegExp 是正则表达式的构造函数
          参数1：字符串
          参数2：匹配模式
          返回值：正则对象
      */
      return str.replace(
        new RegExp(this.searchValue, 'gi'),
        `<span style="color: red">${this.searchValue}</span>`
      )
    }
  }
}
</script>

<style scoped lang="less"></style>
