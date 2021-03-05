<template>
  <div class="search-container">
    <!-- 搜索框 start -->
    <!--
      在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
     -->
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索框 end -->

    <!-- 搜索历史组件 start -->
    <!-- 搜索文本为空时显示搜索历史组件 -->
    <search-history v-if="!searchValue"/>
    <!-- 搜索历史组件 end -->

    <!-- 搜索联想建议组件 start -->
    <search-suggestion v-else-if="searchValue"/>
    <!-- 搜索联想建议组件 end -->

    <!-- 搜索结果组件 start -->
    <search-result/>
    <!-- 搜索结果组件 end -->
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
export default {
  name: 'SearchIndex',
  components: {
    searchHistory,
    searchSuggestion,
    searchResult
  },
  props: {},
  data () {
    return {
      searchValue: '' // 搜索文本内容
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
  },
  methods: {
    // 监听搜索事件
    onSearch () {
      console.log('onSearch...')
    }
  }
}
</script>

<style scoped lang="less"></style>
