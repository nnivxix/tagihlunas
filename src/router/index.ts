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
    path: '/users/:username',
    name: 'detail.user',
    component: () => import('@/views/users/Id.vue'),
    // props: route => ({id: route.params.id}) ,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/adduser',
    name: 'add.user',
    component: () => import('@/views/users/Add.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/transaction/:username',
    name: 'add.transaction',
    component: () => import('@/views/transactions/Add.vue'),
    // props: route => ({ query: route.query.q }),
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
    component: () => import('@/views/Temp/TestPage.vue'),
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