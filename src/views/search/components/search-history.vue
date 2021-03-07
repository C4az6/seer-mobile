<template>
  <div class="search-history-container">
    <van-cell title="搜索历史">
      <van-icon
        name="delete-o"
        v-if="!isDeleteStatus"
        @click="isDeleteStatus = true"
      />
      <div v-else>
        <span @click="$emit('onDeleteAll', [])">全部删除</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="isDeleteStatus = false">完成</span>
      </div>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistory"
      :key="index"
      :title="item"
      @click="handleDeleteItem(item, index)"
    >
      <van-icon name="close" v-if="isDeleteStatus" />
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
    /*
      prop 数据如果是引用类型 (数组、对象) 可以修改，
      注意这个修改指的是：user.name = 'Jack'、arr.push(123)、arr.splice(0, 1)

      但是任何 prop 数据是不能重新赋值的：xxx = xxx
      如果你想要让 prop 数据 = 新的数据，应该让父组件最修改
    */
    // 删除单个历史记录
    handleDeleteItem (item, index) {
      if (this.isDeleteStatus) {
        // 删除历史记录操作
        this.$emit('onDelete', index)
      } else {
        // 搜索历史记录操作
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
