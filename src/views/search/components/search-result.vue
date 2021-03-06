<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchValue: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      params: {
        page: 1,
        perPage: 10,
        q: this.searchValue
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 加载搜索结果
    async onLoad () {
      const { data: response } = await getSearchResult(this.params)
      console.log('response: ', response)
      this.list = [...this.list, ...response.data.results]
      this.loading = false
      if (response.data.results.length) {
        // 还有数据,请求下一页
        this.params.page++
      } else {
        // 没有数据了
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
