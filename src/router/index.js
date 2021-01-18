import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      isShowBottomTab: true
    }
  },
  // 主页的地址
  {
    path: '/home/address',
    name: 'Address',
    component: () => import('../views/Home/Address')
  },
  // 主页的制造商
  {
    path: '/home/brandDetail',
    name: 'BrandDetail',
    component: () => import('../views/Home/BrandDetail')
  },
  // 主页的推荐
  {
    path: '/home/recommendProduct',
    name: 'RecommendProduct',
    component: () => import('../views/Home/GetNewAndRecommendProduct')
  },
  // 搜索页
  {
    path: '/home/search',
    name: 'Search',
    component: () => import('../views/Home/Search')
  },
  // 主页的分类
  {
    path: '/categorylist',
    name: 'CategoryList',
    component: () => import('@/views/Home/CategoryList')
  },
  {
    path: '/gooddetail',
    name: 'Gooddetail',
    component: () => import('@/components/conn/GoodDetail')
  },
  // 专题
  {
    path: '/special',
    name: 'Special',
    component: () => import('../views/Special'),
    meta: {
      isShowBottomTab: true
    }
  },
  // 分类
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category'),
    meta: {
      isShowBottomTab: true
    }
  },
  // 购物车
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart'),
    meta: {
      isShowBottomTab: true
    }
  },
  // 我的
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/Mine'),
    meta: {
      isShowBottomTab: true
    }
  },
  // 收藏
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../views/Mine/MyCollect'),
  },
  // 地址收藏
  {
    path: '/addressCollect',
    name: 'AddressCollect',
    component: () => import('../views/Mine/MyAddressCollect'),
  },
  // 地址编辑
  {
    path: '/editAddress',
    name: 'EditAddress',
    component: () => import('@/views/Mine/EditAddress'),
  },
  // 添加地址
  {
    path: '/addAddress',
    name: 'AddAddress',
    component: () => import('@/views/Mine/AddAddress'),
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router