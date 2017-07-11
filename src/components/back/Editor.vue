<template>
    <section class="editor">
        <input class="title" placeholder="标题" v-model="title">
        <div :class="inspected?'inspect':'edit'">
            <textarea v-model="content" spellcheck="false">
            </textarea>
            <button class="toggle" @click="inspected = !inspected">
                <i class="fa fa-chevron-left fa-fw" v-show="!inspected"></i>
                <i class="fa fa-chevron-right fa-fw" v-show="inspected"></i>
            </button>
            <article id="a" v-html="markedContent"></article>
        </div>
        <div class="panel">
            <button class="saveArticle" @click="save">保存</button>
        </div>
    </section>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import marked from '../../assets/js/marked.min.js';
import hljs from '../../assets/js/highlight.pack.js';

export default {
    data() {
        return {
            inspected: false,
            markedContent: ''
        }
    },
    created() {
        const id = this.$route.query.id;
        if (id) return this.getArticle(id);
        this.SET_ARTICLE({ date: new Date() });
    },
    updated() {
        this.highlight();
    },
    methods: {
        save() {
            this.saveArticle()
                .then(() => this.$router.push({ name: 'articles' }))
                .catch(err => console.log(err));
        },
        highlight() {
            setTimeout(() => {
                hljs.initHighlighting.called = false;
                hljs.initHighlighting();
            }, 0);
        },
        ...mapActions(['getArticle', 'saveArticle']),
        ...mapMutations(['SET_ARTICLE'])
    },
    computed: {
        content: {
            get() {
                this.markedContent = marked(
                    this.$store.state.article.content || '',
                    { sanitize: true }
                );
                this.highlight();
                return this.$store.state.article.content;
            },
            set(value) {
                this.$store.commit('UPDATE_CONTENT', value);
            }
        },
        title: {
            get() {
                return this.$store.state.article.articleTitle;
            },
            set(value) {
                this.$store.commit('UPDATE_TITLE', value);
            }
        }
    }
}
</script>
<style lang="sass" rel="stylesheet/scss">
    @import "../../style/mixins.scss";

    section.editor{
        height: 100%;
        .title{
            text-align: center;
            box-sizing: border-box;
            padding: 10px;
            margin: 0 auto;
            height: 50px;
            display: block;
            font-size: 30px;
            color: $black1;
        }
        textarea, button, article{
            box-sizing: border-box;
            border-radius: 6px;
            height: 100%;
            float: left;
            transition: width 0.6s;
            font-size: 16px;
            line-height:  1.8;
            border: 1px solid $green1;
        }
        textarea, article{
            resize: none;
            padding: 20px;
            overflow-y: auto;
        }
        button{
            @include greenButton();
            margin: 0 10px;
            width: 20px;
            text-align: center;
        }
        .edit, .inspect{
            height: 80%;
            margin: 0 50px;
            overflow: hidden;
        }
        .edit{
            textarea{
                width: calc(100% - 40px);
            }
            article{
                width: 0;
            }
        }
        .inspect{
            textarea{
                width: calc(50% - 20px);
            }
            article{
                width: calc(50% - 20px);
            }
        }
        .panel{
            margin: 20px 50px;
            position: relative;
            height: 30px;
            line-height: 30px;
            input{
                text-align: center;
                border-bottom: 1px solid $green1;
            }
            button.saveArticle{
                @include greenButton();
                float: right;
                height: 30px;
                width: 80px;
            }
        }
        article{
            line-height: 1.6;
            padding-bottom: 160px;
            h2, h3, h4, h5, h6{
                position: relative;
                margin: 1em 0;
            }
            h1 {
                font-size: 2em;
            }
            h3 {
                font-size: 1.3em;
            }
            h4, h5 ,h6{
                font-size: 1.1em;
            }
            p{
                margin-bottom: 16px;
            }
            a{
                color: $green1;
                word-break: break-all;
            }
            blockquote{
                margin: 2em 0;
                padding-left: 20px;
                border-left: 4px solid $green1;
            }
            img{
                display: block;
                max-width: 100%;
                margin: 1em auto;
            }
            pre, code{
                overflow: auto;
                font-size: 1em;
                line-height: 1.45;
                background-color: #f6f8fa;
                border-radius: 3px;
                font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
                color: #525252;
            }
            pre{
                margin-bottom: 16px;
            }
            code {
                padding: 16px;
            }
        }
    }
</style>