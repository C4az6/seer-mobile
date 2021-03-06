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
        @search="onSearch(searchValue)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索框 end -->

    <!-- 搜索结果组件 start -->
    <search-result
      v-if="isResultShow"
      :search-value="searchValue"
     />
    <!-- 搜索结果组件 end -->

    <!-- 搜索联想建议组件 start -->
    <search-suggestion
      v-else-if="searchValue"
      :search-value="searchValue"
      @search="onSearch"
       />
    <!-- 搜索联想建议组件 end -->

    <!-- 搜索历史组件 start -->
    <search-history v-else :searchHistory="searchHistory"/>
    <!-- 搜索历史组件 end -->

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
      searchHistory: [], // 搜索历史记录
      isResultShow: false, // 是否有搜索结果
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
    onSearch (searchValue) {
      this.searchValue = searchValue
      this.isResultShow = true
      // 保存历史记录
      const index = this.searchHistory.indexOf(searchValue)
      if (index !== -1) {
        // 有重复历史记录，去重
        this.searchHistory.splice(index, 1)
      }
      // 把最新搜索历史记录放到顶部
      this.searchHistory.unshift(searchValue)
    }
  }
}
</script>

<style scoped lang="less"></style>
