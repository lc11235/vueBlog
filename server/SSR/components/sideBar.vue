<template>
    <aside class="aside">
        <div class="circle">
            <img src="../../src/assets/img/me.jpg" alt="me">
        </div>
        <menu class="nav">
            <ul>
                <router-link :to="{name:'mainPage'}" tag="li">
                    <i class="fa fa-home fa-fw"></i>
                    <span>主页</span>
                </router-link>
                <router-link :to="{name:'archive'}" tag="li">
                    <i class="fa fa-archive fa-fw"></i>
                    <span>归档</span>
                </router-link>
                <router-link :to="{name:'tags'}" tag="li">
                    <i class="fa fa-tags fa-fw"></i>
                    <span>标签</span>
                </router-link>
                <router-link :to="{name:'myWork'}" tag="li">
                    <i class="fa fa-book fa-fw"></i>
                    <span>作品</span>
                </router-link>
                <router-link :to="{name:'about'}" tag="li">
                    <i class="fa fa-user fa-fw"></i>
                    <span>关于</span>
                </router-link>

            </ul>
            <div class="buttons">
                <a class="inline" rel="nofollow" target="_blank" href="https://github.com/lc11235">
                    <i class="fa fa-github fa-fw" title="GitHub"></i>
                </a>
                <a class="inline" href="/rss.html">
                    <i class="fa fa-rss fa-tw" title="RSS"></i>
                </a>
                <a class="inline" href="javascript:;" ></a>
            </div>
        </menu>
    </aside>
</template>
