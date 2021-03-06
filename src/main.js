import Vue from 'vue';
import axios from 'axios';
import NProgress from 'nprogress';
import { mapState } from 'vuex';

import Spinner from './components/share/Spinner.vue';
import Toast from './components/share/Toast.vue';
import MyCanvas from './components/share/MyCanvas.vue';

import store from './store';
import router from './router';

import './style/index.scss';
import 'nprogress/nprogress.css';

Vue.prototype.$http = axios;

//请求的拦截器
axios.interceptors.request.use(config => {
    if (store.state.token || localStorage.getItem("token")) {
        config.headers.Authorization = `Bearer ${store.state.token || localStorage.getItem("token")}`;
    }
    return config;
}, err => {
    return Promise.reject(err);
});



Vue.filter('toDate', date => {
    const d = new Date(date);
    return d.getFullYear() + '年' +
        (d.getMonth() + 1) + '月' +
        d.getDate() + '日'
});

NProgress.configure({ easing: 'ease', speed: 800, minimum: 0.1 });

router.beforeEach((to, from, next) => {

    NProgress.start();
    if (to.matched.some(record => record.meta.requireAuth)) { //判断该路由是否需要登录
        if (store.state.token || localStorage.getItem("token")) { // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    } else {
        next();
    }

});

router.afterEach(transition => {
    NProgress.done();
});

new Vue({
    router,
    store,
    components: { Spinner, Toast, MyCanvas },
    computed: mapState(['isLoading', 'isToasting'])
}).$mount('#CMS2');