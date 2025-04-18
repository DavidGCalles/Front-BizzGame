import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminMenuView from '../views/AdminMenuView.vue'
import CitiesView from '../views/CitiesView.vue'
import StreetsView from '../views/StreetsView.vue'
import CustomersView from '../views/CustomersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/api',
      name: 'api',
      component: () => import('../views/ApiView.vue')
    },
    {
      path: '/admin-menu',
      name: 'adminMenu',
      component: AdminMenuView,
      children: [
        {
          path: 'cities',
          name: 'cities',
          component: CitiesView
        },
        {
          path: 'streets',
          name: 'streets',
          component: StreetsView
        },
        {
          path: 'customers',
          name: 'customers',
          component: CustomersView
        }
      ]
    }
  ]
})

export default router
