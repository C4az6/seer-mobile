import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    /* 路由懒加载 */
    component: () => import('@/views/login')
  }, {
    path: '/',
    // name: '',    如果有子路由，父路由就没必要有名字了，没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 子路由path为空的情况下会被当作默认子路由
        name: 'home',
        component: () => import('@/views/home')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
