import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';
import titleMixin from './utils/title';
import * as filters from './utils/filters';

// 先混入title的钩子函数
Vue.mixin(titleMixin);

// 注册全局的过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// 构建一个vue的工厂函数，在每次请求来临时新建一个vue的实例，避免实例之间
// 状态出现混淆
export function createApp() {
    // 构建store和router的实例
    const store = createStore();
    const router = createRouter();

    // 从vuex store中同步router
    // 同时注册属性`store.state.route`
    sync(store, router);

    // 创建app的实例 
    // 在这儿我们将router，store和ssr的context上下文注入到所有的子组件中
    // 使得`this.$router`和`this.$store`在每个地方都可用
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    // 导出这个app组件，router和store插件
    // 注意到，我们没有在里面mount这个app，因为app的引导方式
    // 取决于app是在浏览器环境下还是在server环境下
    return { app, router, store };
}