/* eslint-disable @typescript-eslint/no-unused-vars */
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import useAuthUser from '@/composables/AuthUser';

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


router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuthUser();

  if ( to.meta.requiresAuth && !isLoggedIn()  && !Object.keys(to.query).includes("fromEmail")) {
    next({name: "login" });
  }
  // else if (to.name == 'login' || to.name == 'intro' && isLoggedIn()){
  //   next({ name: 'users'})
  // }

  else {
    next()
  }
})

export default router;