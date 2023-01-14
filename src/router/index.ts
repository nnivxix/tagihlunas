import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import useAuthUser from '@/composables/AuthUser';

const { isLoggedIn } = useAuthUser();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@/views/TheIntro.vue'),
    beforeEnter: () => {
      if (isLoggedIn()) {
        return {name: 'users'};
      }
    },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/ListUsers.vue'),
    children: [
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId',
    name: 'detail.user',
    component: () => import('@/views/DetailUser.vue'),
    // props: route => ({id: route.params.id}) ,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/transaction/:userId',
    name: 'add.transaction',
    component: () => import('@/views/AddTransaction.vue'),
    props: route => ({ query: route.query.q }),
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
    component: () => import('@/views/TheLogin.vue'),
    beforeEnter: () => {
      if (isLoggedIn()) {
        return {name: 'users'};
      }
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to) => {
  if ( to.meta.requiresAuth && !isLoggedIn()  && !Object.keys(to.query).includes("fromEmail")) {
    return {name: "login" };
  }
});

export default router;