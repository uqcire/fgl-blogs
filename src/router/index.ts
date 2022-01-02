import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: '404',
  //   component: () => import('@p/404.vue'),
  //   meta: { title: '404 - Page not found | FGL - Design System' },
  // },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('@p/Home.vue'),
  //   meta: { title: 'Home | FGL - XXXXX' },
  // },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title;
  }
  next();
});

export default router;
