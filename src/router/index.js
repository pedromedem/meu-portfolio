import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectView.vue'),
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () => import('../views/ProjectDetailView.vue'),
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('../views/ResumeView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.path === from.path && to.hash === from.hash) return false
    if (to.hash) return { el: to.hash, top: 96 }
    return { top: 0 }
  }
})

export default router
