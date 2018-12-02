import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import UserSearch from '@/components/UserSearch'
import User from '@/components/User'
import Admin from '@/components/Admin'
import AdminGames from '@/components/AdminGames'
import AdminReviews from '@/components/AdminReviews'
import AdminUsers from '@/components/AdminUsers'
import GameSearch from '@/components/GameSearch'
import Game from '@/components/Game'


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
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/admin/add/user',
      name: 'Add User',
      component: AdminUsers
    },
    {
      path: '/admin/games',
      name: 'Modify Games',
      component: AdminGames
    },
    {
      path: '/admin/reviews',
      name: 'Modify Reviews',
      component: AdminReviews
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
    }
  ]
})
