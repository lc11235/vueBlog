import Vue from 'vue';

import axios from 'axios';

const beginLoading = commit => {
    commit('LOADING_TOGGLE', true);
    return Date.now();
};

const stopLoading = (commit, start, timeAllowed = 400) => {
    const spareTime = timeAllowed - (Date.now() - start);
    setTimeout(commit, spareTime > 0 ? spareTime : 0, 'LOADING_TOGGLE', false);
};

const doToast = (state, commit, payload) => {
    commit('SET_TOAST', payload);
    commit('TOASTING_TOGGLE', true);
    return state.toast.promise;
};

Promise.prototype.finally = function(callback){
    return this.then(
        value => Promise.resolve(callback()).then(() => value),
        reason => Promise.resolve(callback()).then(() => {
            throw reason;
        })
    );
};

export default {
    getArticles: ({commit}) => {
        //const start = beginLoading(commit);
        return axios.get('/api/getArticles')
            //.then(response => console.log(reponse))
            .then(articles => {
                //stopLoading(commit, start);
                commit('SET_ARTICLES', articles.data);
            });
    },
    getArticle({commit}, id){
        //const start = beginLoading(commit);
        return axios.get('/api/getArticle', {params: {id}})
            .then(response => {
                //stopLoading(commit, start);
                commit('SET_ARTICLE', response.data);
            });
    },
    saveArticle({state, commit}){
        return axios.post('/api/saveArticle', state.article)
            .then(
                () => doToast(state, commit, {info: '保存成功，是否返回', btnNum: 2}),
                () => doToast(state, commit, {info: '保存失败', btnNum: 1})
            )
            .finally(() => commit('TOASTING_TOGGLE', false));
    },
    deleteArticle({state, commit, dispatch}, id){
        return doToast(state, commit, {info: '确定要删除吗？', btnNum: 2})
            .then(() => axios.post('/api/deleteArticle', {id}))
            .finally(() => commit('TOASTING_TOGGLE', false))
            .then(() => dispatch('getArticles'))
            .catch(() => {

            });
    },
    getLinks({commit}){
        return axios.post('/api/getLinks')
            .then(response => {
                commit('SET_LINKS', response.data);
            });
    },
    saveLinks({state, commit}){
        return axios.post('/api/saveLinks', state.links)
            .then(
                () => doToast(state, commit, {info: '保存成功', btnNum: 1}),
                () => doToast(state, commit, {info: '保存失败', btnNum: 1})
            )
            .finally(() => commit('TOASTING_TOGGLE', false));
    },
    savePwd({state, commit}, pwd){
        return axios.post('/api/savePwd', {name: state.user.name, pwd})
            .then(
                () => doToast(state, commit, {info: '保存成功', btnNum: 1}),
                () => doToast(state, commit, {info: '保存失败', btnNum: 1})
            )
            .finally(() => commit('TOASTING_TOGGLE', false));
    },
    login({commit}, payload){
        return axios.post('/api/login', payload)
            .then(response => {
                if(response.data.state === 1){
                    commit('SET_USER', payload);
                    commit('SET_TOKEN', response.data.token);
                } else {
                    
                    return Promise.reject(response.data.msg);
                }
            });
    }
}

