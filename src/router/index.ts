import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import { useAuthStore } from '@/store/auth'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/trucks', component: () => import('../views/Truck.vue'), meta: { requiresAuth: true } },
  {
    path: '/drivers',
    component: () => import('../views/Drivers.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
