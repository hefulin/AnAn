import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'


import App from './App.vue'
import VueAmazeui from 'vue-amazeui'
import 'vue-amazeui/dist/static/css/vue-amazeui.css'
import '../statics/css/app.css'
import store from './store'
import FastClick from 'fastclick'

import {_beforeEnter} from '../src/libs/router'

import Indicator from 'vue-indicator';


FastClick.attach(document.body);
Vue.use(VueAmazeui)

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(Indicator)

// tab 切换
//首页
// import redv1 from './views/RedView-v1' // 主页面
const redv1 = resolve => {
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/RedView.vue'))
        // Indicator.close()
    }, 'group-home')
}
// 管理考核
// import check from './views/CheckView'
const check = resolve => {
    // console.log(Indicator);
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/CheckView'))
        // Indicator.close()
    }, 'group-check')
}
// 巡检
// import route from './views/RouteView'
const route = resolve => {
    // console.log(Indicator);
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/RouteView.vue'))
        // Indicator.close()
    }, 'group-route')
}
// 页面权限部分
// import home from './views/HomeView'
const home = resolve => {
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/HomeView'))
        // Indicator.close()
    }, 'group-home')
}
// import forbidden from './views/userview/forbidden'
const forbidden = () => import('./views/userview/forbidden')
// import error404 from './views/userview/404'
const error404 = () => import('./views/userview/404')
// import login from './views/userview/login'
const login = () => import('./views/userview/login')
// import loginInfo from './views/userview/loginInfo'
const loginInfo = () => import('./views/userview/loginInfo')
// import help from './views/userview/help'
const help = () => import('./views/userview/help')
// import person from './views/userview/person'
const person = () => import('./views/userview/person')

// 配置相关的路由规则
// 子页面的规则，第一个都为details / home (这个根据当前子页面属于哪个父下面来决定) / 看是否需要参数

// console.log(_beforeEnter);
const router = new VueRouter({
    mode: 'hash',  //不想看到#号则配置这个 (可以用来解决与html本身锚点冲突的问题)
    routes: [
        {path: '/', redirect: '/redv1'},
        {path: '/home', component: home},
        {
            path: '/redv1',
            component: redv1
        },
        {
            path: '/check',
            component: check
        },
        {
            path: '/route',
            name: 'route',
            component: route
        },
        {
            path: '/forbidden',
            name: 'forbidden',
            component: forbidden
        },
        {
            path: '/error404',
            name: 'error404',
            component: error404
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/loginInfo',
            name: 'loginInfo',
            component: loginInfo
        },
        {
            path: '/help',
            name: 'help',
            component: help
        },
        {
            path: '/person',
            name: 'person',
            component: person
        }
    ]
})

// 注册跳转的钩子，判断是否需要等待验证
router.beforeEach((to, from, next) => {
    _beforeEnter(to, from, next);
})

new Vue({
    el: '#app',
    router: router, //使用路由对象实例
    store: store,
    render: h => h(App)
})