import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import UserSearch from '@/components/UserSearch'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/userSearch',
      name: 'User Search',
      component: UserSearch
    },
    {
      path: '/user/:username',
      name: 'User',
      component: User
    }
  ]
})
