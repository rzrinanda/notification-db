import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home'
// import About from '../views/About'

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "AdminHome" */ "../views/admin/Layout"),
    children: [
      {
        path: "/",
        name:"admin_home",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Home")
      },
      {
        path: "post",
        name: "post_di_admin",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Post")
      },
      {
        path: "users",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Users")
      },
      {
        path: "setting",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "../views/admin/Setting")
      }
    ]
  },
  {
    path: "*",
    component: () => import(/*webpackChunkName: "404" */ "../views/404")
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login')
  },
  {
    path: "/",
    name: "home",
    // component: Home          //normal
    component: () => import("../views/Home")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    const auth = Cookies.get('auth')

    if (!auth) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
