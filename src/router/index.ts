import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@p/404.vue'),
    meta: { title: '404 - Page not found' },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@p/Home.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@p/SignIn.vue'),
    meta: { title: 'Sign In' },
    children: [
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@p/ForgotPassword.vue'),
        meta: { title: 'Sign In' },
      },
      {
        path: 'recovery-emailed',
        name: 'RecoveryEmailed',
        component: () => import('@p/RecoveryEmailed.vue'),
        meta: { title: 'Sign In' },
      },
    ],
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@p/Register.vue'),
    meta: { title: 'Register' },
  },
  {
    path: '/users',
    name: 'UserProfile',
    component: () => import('@p/UserProfile.vue'),
    meta: { title: 'Profile' },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (typeof to.meta.title === 'string') {
    document.title = `${to.meta.title} | FGL Insights`;
  }
  next();
});

export default router;
