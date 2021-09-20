
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/UsersListPage.vue'),
        name: 'UsersList'
      },
      {
        path: 'user/:userId',
        component: () => import('src/pages/UserDetailsPage.vue'),
        props: true,
        name: 'UserDetails'
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
