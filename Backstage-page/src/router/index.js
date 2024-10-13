import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../../src/view/HomeView.vue'
import AboutView from '../view/AboutView.vue'
import errorView from './404.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registered',
    name: 'registered',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../src/components/login/registered.vue')
  },
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../src/components/login/forgetPwd.vue')
  },
  {
    path:'/:catchAll(.*)',
    component:()=>import('./404.vue')
  },
  {
    path:'/404',
    component:()=>import('./404.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView,
    // redirect:'/about',

    children: [
      {
        name:'aboutDown',
        path: '/about/',
        component: () => import(/* webpackChunkName: "about" */ '../components/right/about.vue')
      },
      {
        path: '/about/user',
        component: () => import(/* webpackChunkName: "about" */ '../components/right/user.vue')
      },
      {
        path: '/about/shopping',
        component: () => import(/* webpackChunkName: "about" */ '../components/right/shopping.vue')
      },
      {
        name: 'shoppingEdit',
        path: '/about/shopping/edit',
        component: () => import(/* webpackChunkName: "about" */ '../components/right/userShopping/shoppingEdit.vue')
      },
      {
        name: 'upDown',
        path: '/about/shopping/upDown',
        component: () => import(/* webpackChunkName: "about" */ '../components/right/userShopping/shoppingUpDown.vue')
      },
      {
        name: 'Order',
        path: '/about/shoppingOrder',
        component: () => import(/* webpackChunkName: "about" */ '../components/right/orderShopping/shoppingOrder.vue')
      },
      {
        path:'/:catchAll(.*)',
        component:()=>import('./404.vue')
      },
    ]
    
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) =>{
  if(to.path === '/'){
    next()
  }else{
    if(localStorage.getItem('token')){
      next()
    }else{
      next('/')
    }
  }
})
export default router
