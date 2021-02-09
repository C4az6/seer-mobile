<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航栏 -->
    <van-button type="primary">Hello Vant :)</van-button>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
