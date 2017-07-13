import Vue      from 'vue';
import Router   from 'vue-router';
import Archive  from '../components/back/Archive.vue';
import Article  from '../components/front/Article.vue';
import Console  from '../components/back/Console.vue';
import Login    from '../components/back/Login.vue';
import Articles from '../components/back/Articles.vue';
import Editor   from '../components/back/Editor.vue';
import Links    from '../components/back/Links.vue';
import Account  from '../components/back/Account.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {path: '/login', name: 'login', component: Login, meta: {requireAuth: false}},
        {path: '/article', name: 'article', component: Article, meta: {requireAuth: true}},
        {
            path: '/console',
            component: Console,
            meta: {requireAuth: true},
            children: [
                {path: '', component: Articles, meta: {requireAuth: true}},
                {path: 'archive', name: 'archive', component: Archive, meta: {requireAuth: true}},
                {path: 'articles', name: 'articles', component: Articles, meta: {requireAuth: true}},
                {path: 'editor', name: 'editor', component: Editor, meta: {requireAuth: true}},
                {path: 'links', name: 'links', component: Links, meta: {requireAuth: true}},
                {path: 'account', name: 'account', component: Account, meta: {requireAuth: true}}
            ]
        }
    ]
});