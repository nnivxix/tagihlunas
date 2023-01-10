import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/ListUsers.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;