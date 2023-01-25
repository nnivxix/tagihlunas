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
    beforeEnter() {
      // eslint-disable-next-line no-console
      console.log('before enter');
      
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
    path: '/users/add',
    name: 'add.user',
    component: () => import('@/views/users/Add.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/transactions/add/:username',
    name: 'add.transaction',
    component: () => import('@/views/transactions/Add.vue'),
    // props: route => ({ query: route.query.q }),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/transactions/:id',
    name: 'detail.transaction',
    component: () => import('@/views/transactions/Id.vue'),
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