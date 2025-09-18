import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/HomeView.vue'),
      children: [
        {
          path: '/',
          component: () => import('./tabs/MainTab.vue'),
          meta: {
            tabIndex: 0,
          },
        },
        {
          path: '/showcase',
          component: () => import('./tabs/ShowcaseTab.vue'),
          meta: {
            tabIndex: 2,
          },
        },
      ],
    },
    {
      path: '/showcase/:index',
      component: () => import('./views/ShowcaseView.vue'),
    },
    {
      path: '/home',
      redirect: '/',
    },
  ],
});

router.afterEach((to, from) => {
  if (to.meta.animation) {
    to.meta.transition = to.meta.animation;
    from.meta.transition = to.meta.animation;
    return;
  }
  if ('tabIndex' in to.meta && 'tabIndex' in from.meta) {
    const toIndex = to.meta.tabIndex!;
    const fromIndex = from.meta.tabIndex!;
    const transition = toIndex == fromIndex ? 'fade' : toIndex < fromIndex ? 'slide-right' : 'slide-left';
    from.meta.transition = transition;
    to.meta.transition = transition;
  } else {
    from.meta.transition = 'fade';
    to.meta.transition = 'fade';
  }
});

export default router;
