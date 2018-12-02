import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import UserSearch from '@/components/UserSearch'
import User from '@/components/User'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import AddGame from '@/components/AddGame'
import ArchiveReviews from '@/components/ArchiveReviews'
import AddUser from '@/components/AddUser'
import UpdateBundle from '@/components/UpdateBundle'
import AddGenre from '@/components/AddGenre'
import GameSearch from '@/components/GameSearch'
import Game from '@/components/Game'
import BundleSearch from '@/components/BundleSearch'
import Bundle from '@/components/Bundle'

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
    },
    {
      path: '/admin/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/admin/add/user',
      name: 'Add User',
      component: AddUser
    },
    {
      path: '/admin/add/item',
      name: 'Modify Games',
      component: AddGame
    },
    {
      path: '/admin/archive/reviews',
      name: 'Modify Reviews',
      component: ArchiveReviews
    },
    {
      path: '/admin/add/genre',
      name: 'Add Game Genre',
      component: AddGenre
    },
    {
      path: '/admin/update/bundle',
      name: 'Update Bundle Price',
      component: UpdateBundle
    },
    {
      path: '/gameSearch',
      name: 'Game Search',
      component: GameSearch
    },
    {
      path: '/game/:itemID',
      name: 'Game',
      component: Game
    },
    {
      path: '/bundleSearch',
      name: 'Bundle Search',
      component: BundleSearch
    },
    {
      path: '/bundle/:itemID',
      name: 'Bundle',
      component: Bundle
    }
  ]
})
