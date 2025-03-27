import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Acceleration from '../views/Acceleration.vue'

import { useUserStore } from '@/stores/user'

const isLoggedIn = () => {
  const store = useUserStore()

  return store.isLoggedIn
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => {
        if (isLoggedIn()) {
          return '/acceleration/quiz'
        } else {
          return '/login'
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/acceleration/:type?',
      name: 'acceleration',
      component: Acceleration,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(to => {
  // BLOCK LOGIN FOR LOGGED IN USERS
  if (to.name === 'login' && isLoggedIn()) {
    return '/acceleration/quiz'
  }

  // REDIRECT TO LOGIN IF NOT LOGGED IN AND PAGE AUTH REQUIRED
  if (to.meta?.requiresAuth && !isLoggedIn()) {
    return '/login'
  }
})

export default router
