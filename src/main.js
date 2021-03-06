import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import { loading } from '@/utils/common'
// 载入动态设置rem基准值的插件
import 'amfe-flexible'
import 'vant/lib/index.css'
// 加载处理相对时间的插件
import './utils/dayjs'
// 加载全局样式
import './style/index.less'
Vue.config.productionTip = false
Vue.prototype.$loading = loading
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
