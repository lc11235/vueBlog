import Vue      from 'vue';
import Router   from 'vue-router';
import Archive  from '../components/front/Archive.vue';
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
        {path: '/archive', name: 'archive', component: Archive, requireAuth: true},
        {path: '/article', name: 'article', component: Article, requireAuth: true},
        {path: '/', component: Login, requireAuth: false},
        {
            path: '/console',
            component: Console,
            requireAuth: true,
            children: [
                {path: '', component: Articles, requireAuth: true},
                {path: 'articles', name: 'articles', component: Articles, requireAuth: true},
                {path: 'editor', name: 'editor', component: Editor, requireAuth: true},
                {path: 'links', name: 'links', component: Links, requireAuth: true},
                {path: 'account', name: 'account', component: Account, requireAuth: true}
            ]
        }
    ]
});