import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/components/LoginComp";
// import loginComp from '../components/LoginComp'
// import auth from '../middleware/server'
// import Login from '../views/LoginPage.vue'
// import firebaseInstance from '../middleware/firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginPage,
        meta: {authNotRequired: true}
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardPage.vue'),
        // meta: {requiresAuth: false}
        beforeEnter: async (to, from, next) => {
            if (!window.user && to.path !== '/dashboard') {
                await next('/')
            }
            next();
        }
    }
//     {
//         path: '/users/:username',
//         name: 'Users',
//         component: () => import(/* webpackChunkName: "users" */ '../views/UsersPage.vue'),
//         meta: {requiresAuth: true}
//     }
]

const router = new VueRouter({
    routes
})
/* eslint-disable */


// router.beforeEach((to, from, next) => {
//     let user = '';
//     debugger
//     // const user = firebaseInstance.auth.currentUser;
//     user = sessionStorage["name"];
//     console.log('EL USUARIO -> ', user)
//
// // });
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     if (requiresAuth && !user) {
//         debugger
//         const path = '/';
//         next(path);
//     } else if (requiresAuth && user) {
//         next('/dashboard');
//     } else if (!requiresAuth && user) {
//         next('/');
//     } else {
//         next();
//     }
// })

export default router
