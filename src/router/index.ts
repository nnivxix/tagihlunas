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
  },
  {
    path: '/users/:id',
    name: 'Detail',
    component: () => import('@/views/ListTrx.vue')
  },
  {
    path: '/transaction',
    name: 'add.transaction',
    component: () => import('@/views/Transaction.vue')
  },
  {
    path: '/user',
    name: 'add.user',
    component: () => import('@/views/User.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;