import { createRouter, createWebHistory } from 'vue-router'
import AddBook from '@/components/AddBook.vue'
import AppCart from '@/components/AppCart.vue'
import BooksList from '@/components/BooksList.vue'
import AppAbout from '@/components/AppAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'BooksList',
      component: BooksList
    },
    {
      path: '/form/:id?',
      name: 'AddBook',
      component: AddBook
    },
    {
      path: '/cart',
      name: 'AppCart',
      component: AppCart
    },
    {
      path: '/about',
      name: 'AppAbout',
      component: AppAbout
    }

  ],
})

export default router
