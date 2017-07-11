import Vue          from 'vue';
import axios        from 'axios';
import NProgress    from 'nprogress';
import {mapState}   from 'vuex';

import Spinner      from './components/share/Spinner.vue';
import Toast        from './components/share/Toast.vue';
import MyCanvas     from './components/share/MyCanvas.vue';

import store        from './store';
import router       from './router';

import './style/index.scss';
import 'nprogress/nprogress.css';

Vue.prototype.$http = axios;

Vue.filter('toDate', date => {
    const d = new Date(date);
    return d.getFullYear() + '年' +
        (d.getMonth() + 1) + '月' +
        d.getDate() + '日'
});

NProgress.configure({ easing: 'ease', speed: 800, minimum: 0.1 });

router.beforeEach((to, from, next) => {
    
    NProgress.start();
    next();
});

router.afterEach(transition => {
    NProgress.done();
});

new Vue({
    router,
    store,
    components: {Spinner, Toast, MyCanvas},
    computed: mapState(['isLoading', 'isToasting'])
}).$mount('#CMS2');