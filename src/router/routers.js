// router/routes.js
import Login from '../pages/Login';


export default [
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    // {
    //     name: 'Register',
    //     path: '/register',
    //     component: Register
    // },
    // {
    //     name: 'Home',
    //     path: '/home',
    //     component: Home
    // },
    // {
    //     name: 'Background',
    //     path: '/background',
    //     component: Background
    // },
    // {
    //     name: 'Socket',
    //     path: '/socket',
    //     component: Socket
    // },
    {
        // 没写就是任意路由都是定向这个
        path: '*',
        // 重定向
        redirect: '/index'
    }
];