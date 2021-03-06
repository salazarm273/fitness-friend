import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('./views/Join.vue')
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('./views/Activities.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import(/* webpackChunkName: "friends" */ './views/Friends.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('./views/News.vue')
    },
    {
      path: '/cals',
      name: 'cals',
      component: () => import('./views/Calories.vue')
    },
    {
      path: '/challenges',
      name: 'challenges',
      component: () => import('./views/Challenges.vue')
    },
    {
      path: '/foodlog',
      name: 'foodlog',
      component: () => import('./views/FoodLog.vue')
    },
    {
      path: '/weight',
      name: 'weight',
      component: () => import('./views/Weight.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue')
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('./views/Notifications.vue')
    }

  ]
})