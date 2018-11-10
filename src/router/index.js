import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  base: '/airInsurance/',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '航空延误险'
      },
      component: () => import('@/views/Home')
    },
    {
      path: '/insureConfirm',
      name: 'InsureConfirm',
      meta: {
        title: '保单确认'
      },
      component: () => import('@/views/InsureConfirm')
    },
    {
      path: '/insureHistorySearch',
      name: 'InsureHistorySearch',
      meta: {
        title: '历史保单'
      },
      component: () => import('@/views/InsureHistorySearch')
    },
    {
      path: '/insureHistory',
      name: 'InsureHistory',
      meta: {
        title: '历史保单'
      },
      component: () => import('@/views/InsureHistory')
    },
    {
      path: '/insureStatusInfo',
      name: 'insureStatusInfo',
      meta: {
        title: '投保状态',
        background: '#8bf1c93b'
      },
      component: () => import('@/views/OrderListDisplay')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.background) {
    document.body.style.background = to.meta.background
  }
  next()
})

export default router
