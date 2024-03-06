import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main_layout',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/DashboradView.vue'),
          meta: {
            requiredAuth: true
          }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
          meta: {
            requiredAuth: true
          }
        },
        {
          path: '/edit-profile',
          name: 'edit-profile',
          component: () => import('@/views/EditProfileView.vue'),
          meta: {
            requiredAuth: true
          }
        },
        {
          path: '/product-detail/:id',
          name: 'product-detail',
          props: true,
          component: () => import('@/views/ProductDetailView.vue'),
          meta: {
            requiredAuth: true
          }
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('@/views/ProductsView.vue'),
          children: [
            {
              path: 'categories',
              name: 'categories',
              component: () => import('@/components/CategoryData.vue'),
            }
          ],
          meta: {
            requiredAuth: true
          }
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('@/views/OrdersView.vue'),
          meta: {
            requiredAuth: true
          }
        },
        {
          path: '/receipts',
          name: 'receipts',
          component: () => import('@/views/ReceiptsView.vue'),
          meta: {
            requiredAuth: true
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/UsersView.vue'),
          meta: {
            requiredAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'authentication_layout',
      component: () => import('@/layouts/AuthenticationLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
          meta: {
            requiredAuth: false
          }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
          meta: {
            requiredAuth: false
          }
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiredAuth = to.matched.some((record) => record.meta.requiredAuth)
  if (requiredAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (!requiredAuth && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})
export default router
