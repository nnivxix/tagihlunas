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
    component: () => import('@/views/users/Index.vue'),
    children: [
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId',
    name: 'detail.user',
    component: () => import('@/views/users/Id.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId/edit',
    name: 'edit.user',
    component: () => import('@/views/users/Edit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/add',
    name: 'add.user',
    component: () => import('@/views/users/Add.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId/transactions/add/',
    name: 'add.transaction',
    component: () => import('@/views/transactions/Add.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId/transactions/:trxId',
    name: 'detail.transaction',
    component: () => import('@/views/transactions/Id.vue'),
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
    component: () => import('@/views/Temp/TestPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound.page',
    component: () => import('@/views/NotFound.vue'),
  },
  // {
  //   path: '/users/:pathMatch(.*)*',
  //   name: 'notfound.user',
  //   component: () => import('@/views/users/NotFound.vue'),
  // },
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