import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      {
        path: 'category/:category',
        component: () => import('pages/CategoryArticlesPage.vue'),
      },
      {
        path: 'article/:article',
        component: () => import('pages/ArticlePage.vue'),
        name: 'article',
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
        name: 'Login',
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AdminPage.vue') },
      {
        path: '/add-article',
        component: () => import('src/pages/AddArticlePage.vue'),
      },
      {
        path: 'articles',
        component: () => import('src/pages/AdminArticlePage.vue'),
      },
      {
        path: 'article/edit/:title',
        component: () => import('src/pages/EditArticlePage.vue'),
      },
      {
        path: 'categories',
        component: () => import('src/pages/AdminCategoryPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    name: 'Error',
  },
];

export default routes;
