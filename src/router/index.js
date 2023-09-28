import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import FirstTask from "@/views/FirstTask.vue"
import SecondTask from "@/views/SecondTask.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'home',
          component: Home
      },
      {
          path: '/first',
          name: 'FirstTask',
          component: FirstTask
      },
      {
          path: '/second',
          name: 'SecondTask',
          component: SecondTask
      },
  ]
})

export default router
