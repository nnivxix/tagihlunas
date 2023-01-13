/* eslint-disable @typescript-eslint/no-unused-vars */
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import useAuthUser from '@/composables/AuthUser';

const { isLoggedIn } = useAuthUser();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@/views/TheIntro.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/ListUsers.vue'),
    children: [
    ],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/users/:id',
    name: 'detail',
    component: () => import('@/views/ListTrx.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/transaction',
    name: 'add.transaction',
    component: () => import('@/views/TheTransaction.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/adduser',
    name: 'add.user',
    component: () => import('@/views/AddUser.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/TheLogin.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from) => {
  if ( to.meta.requiresAuth && !isLoggedIn()  && !Object.keys(to.query).includes("fromEmail")) {
    return {name: "login" };
  }
  if ( to.name == 'login' || to.name == 'intro' && isLoggedIn()) {
    return {name: "users" };
  }
})



export default router;