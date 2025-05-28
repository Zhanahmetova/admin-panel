import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/trucks',
      name: 'trucks',
      component: () => import('@/views/Trucks.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: () => import('@/views/Drivers.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !useAuth().isAuthorised) {
    // this route requires auth, check if logged in
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router
