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
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将动态路由参数映射到组件的 props 中，无论是访问还是维护性都很方便
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
