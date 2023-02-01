import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import useAuthUser from '@/composables/useAuthUser';

const { isLoggedIn } = useAuthUser();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@/views/TheIntro.vue'),
    beforeEnter: () => {
      if (isLoggedIn()) {
        return {name: 'users.index'};
      }
    },
  },
  {
    path: '/users',
    name: 'users.index',
    component: () => import('@/views/UsersIndex.vue'),
    children: [
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId',
    name: 'users.show',
    component: () => import('@/views/UsersShow.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId/edit',
    name: 'users.edit',
    component: () => import('@/views/UsersEdit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/add',
    name: 'users.add',
    component: () => import('@/views/UsersAdd.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId/transactions/add/',
    name: 'transactions.add',
    component: () => import('@/views/TransactionsAdd.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:userId/transactions/:trxId',
    name: 'transactions.show',
    component: () => import('@/views/TransactionsShow.vue'),
  },
  {
    path: '/login',
    name: 'login.page',
    component: () => import('@/views/LoginPage.vue'),
    beforeEnter: () => {
      if (isLoggedIn()) {
        return {name: 'users.index'};
      }
    },
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
    return {name: "login.page" };
  }
});

export default router;