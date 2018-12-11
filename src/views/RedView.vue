<!--新的界面样式-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            上海水资源
            <icon name="more-vertical" slot="left"></icon>
            <!-- <icon name="person" slot="right" href="/home"></icon> -->
        </navbar>
        <!--圆形-->
        <group noPadded class="group-clear">
            <div class="wt-header">
                <!-- <div class="wt-text text-center">
                    <span class="wt-h-15">上海水资源</span>
                </div> -->
                <grid avg="4" align="center">
                    <cell :class="text-center" v-for="item in clists" :key="item.id">
                        <div class="wt-text">
                            <router-link :to="item.href">
                                <i :class="item.img"></i>
                                <span class="icon-title">{{item.title}}</span>
                            </router-link>
                        </div>
                    </cell>
                </grid>
            </div>
        </group>
        <!--取水详情-->
        <group noPadded class="group-clear group-top-10">
            <div style="padding:0.625rem 0">
                <h5 class="wt-title">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>取水详情</span>
                    <span class="wt-bar-subtitle">每日更新</span>
                    </div>
                </h5>
                <div class="wt-tab-lists">
                    <grid avg="3" align="center" class="grid-title">
                        <cell class="cell-box wt-font-600">
                            <span>用水类型</span>
                        </cell>
                        <cell class="cell-box wt-font-600">
                            <span>本日</span>
                        </cell>
                        <cell class="cell-box wt-font-600">
                            <span>本年累计</span>
                        </cell>
                    </grid>
                    <grid avg="3" v-for="water in waters" align="center" :key="water.index">
                      <cell class="cell-box">{{water.type}}</cell>
                      <cell class="cell-box wt-dblue">{{water.today}}万m³</cell>
                      <cell class="cell-box wt-orange">{{water.year}}万m³</cell>
                   </grid>
                </div>
            </div>
        </group>
        <!--骨干河道水质-->
        <group noPadded class="group-clear group-top-10">
            <h5 class="wt-title">
                <div class="wt-title-center"><i class="wt-bar-i-16 red-news"></i><span>骨干河道水质信息</span>
                <span class="wt-bar-subtitle">每日更新</span>
                </div>
            </h5>
            <div class="grid-top-border"></div>
            <grid avg="2"  align="center" >
                <cell v-for="river in rivers" :key="river.index">
                   <div class="riverlist">
                       <i v-if="river.type == 1" class="vgood"></i>
                       <i v-if="river.type == 0" class="good"></i>
                       <i v-if="river.type == 2" class="bad"></i>
                       <span>{{river.name}}</span>
                    </div>
                </cell>
            </grid>
        </group>

        <!--<div class="get-more theme-blue">-->
            <!--<a href="javascript:void(0)">更新新闻</a>-->
        <!--</div>-->
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import * as API from '../store/api/api'

    export default {
        data() {
            return {
                clists: [
                    {href: '/qsh', img: 'wt-bar-i-46 wt-bar-1', title: '取水户'},
                    {href: '/qsxkz', img: 'wt-bar-i-46 wt-bar-2', title: '许可证'},
                    {href: '/redsyd', img: 'wt-bar-i-46 wt-bar-7', title: '水源地'},
                    {href: '/dysh', img: 'wt-bar-i-46 wt-bar-3', title: '大用水户'},
                    // {href: '/redsyd', img: 'wt-bar-i-46 wt-bar-5', title: '水源地'},
                    {href: '/redsgnq', img: 'wt-bar-i-46 wt-bar-4', title: '水功能区'},
                    {href: '/redxc', img: 'wt-bar-i-46 wt-bar-5', title: '咸潮'},
                    {href: '/redsgnqjc', img: 'wt-bar-i-46 wt-bar-6', title: '水质监测'},
                    {href: '', img: '', title: ''}

                ],
                waters: [
                    {type: '工业用水', today: '0.1', year: '60.34'},
                    {type: '大用水户', today: '0.1', year: '60.34'},
                    {type: '农业用水', today: '0.1', year: '60.34'},
                    {type: '火力发电', today: '0.1', year: '60.34'}
                ],
                rivers: [
                    {name: '黄浦江', type: '1', typeName: '优'},
                    {name: '黄浦江', type: '0', typeName: '良'},
                    {name: '黄浦江', type: '2', typeName: '差'},
                    {name: '黄浦江', type: '1', typeName: '优'},
                    {name: '黄浦江', type: '1', typeName: '优'},
                    {name: '黄浦江', type: '1', typeName: '优'}
                ]
            }
        },
        computed: {
            // ...mapState({
            //     tablists:state => state.red.tablists,
            //     newlists:state => state.red.newlists
            // })
        },
        mounted() {
            this.$http.jsonp(API.NEWS_LIST).then(
                response => {
                    //循环设置跳转地址 href
                    for (let value of response.data.data) {
                        value.href = "/newDetail/" + value.id;
                        // console.log(value);
                    }
                    this.newlists = response.data.data;
                }, response => {
                    console.log("error");
                });
        },
        created() {

        },
        methods: {
            ...mapActions([
                'getTabLists', 'getNewLists'
            ])
        }
    }
</script>

<style>
    .list-label {
        border-radius: 1px;
    }

    .wt-header {
        height: 12.3125rem;
        color: #3b3b3b;
    }

    .wt-bar-subtitle{
        font-size:0.75rem;
        color:#8b8b8b;
    }

    .wt-text {
        font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
    }

    .wt-h-15 {
        display: block;
        height: 2.875rem;
        line-height: 2.875rem;
        font-size: 1rem;
        text-align: left;
        padding-left: 1.25rem;
    }

    .wt-bar-i-46 {
        display: block;
        height: 3rem;
        width: 3rem;
        margin: 0 auto;
        /* box-shadow: 0 0 5px rgba(250,0,0,0.5); */
    }

    .riverlist{
        background: url('../../statics/images/icon_28.png');
        background-size:100%;
        height:50px;
        width:100%;
        line-height: 35px;
        padding:10px;
        text-align: left;
    }
    .riverlist span{
        vertical-align:text-bottom;
        padding-left:10px;
    }
    .vgood{
        display: inline-block;
        margin: 0 auto;
        height:32px;
        width:32px;
        background: url('../../statics/images/27.png');
        background-size:100%;
    }
    .good{
        display: inline-block;
        margin: 0 auto;
        height:32px;
        width:32px;
        background: url('../../statics/images/27-11.png');
        background-size:100%;
    }
    .bad{
        display: inline-block;
        margin: 0 auto;
        height:32px;
        width:32px;
        background: url('../../statics/images/27-12.png');
        background-size:100%;
    }

    .wt-bar-1 {
        background: url('../../statics/images/icon_03.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-2 {
        background: url('../../statics/images/icon_05.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-7 {
        background: url('../../statics/images/icon_07.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-3 {
        background: url('../../statics/images/icon_09.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-4 {
        background: url('../../statics/images/icon_16.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-5 {
        background: url('../../statics/images/icon_18.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-6 {
        background: url('../../statics/images/icon_19.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-8 {
        background: url('../../statics/images/8.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .icon-title {
        font-size: .875rem;
        line-height: .3466666667rem;
        color:#3d3d3d;
    }

    .wt-text a {
        /* color:#ffffff; */
    }

    

    .red-news {
        background: url('../../statics/images/article.png') no-repeat;
        background-size: 4px;
    }

    .wt-title-center {
        display: block;
        line-height: 1.125rem;
    }

    .wt-tab-lists {
        white-space: nowrap;
        overflow-x: auto;
    }

    .wt-tab-lists a {
        position: relative;
        display: inline-block;
        width: 10.3125rem;
        line-height: 4.375rem;
        height: 4.375rem;
        margin: 0.125rem 0.5rem;
        padding: 0 0.625rem;
        box-shadow: 0 0 0.2375rem rgba(117, 117, 117, 0.8);
    }

    .wt-linear-red {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #ff935c, #ff6e69);
        background-image: linear-gradient(270deg, #ff935c, #ff6e69);
    }

    .wt-linear-dblue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #4fa1f5, #3d61f5);
        background-image: linear-gradient(90deg, #4fa1f5, #3d61f5);
    }


    .wt-linear-purple {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #8cb4ff, #699eff);
        background-image: linear-gradient(270deg, #8cb4ff, #699eff);
    }

    .wt-linear-lgreen {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #56f1dd, #21e1ce);
        background-image: linear-gradient(90deg, #56f1dd, #21e1ce);
    }

    .wt-linear-yellow {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #fbb24f, #f9a32d);
        background-image: linear-gradient(270deg, #fbb24f, #f9a32d);
    }

    h3 {
        color: #3b3b3b;
        font-size: 0.875rem;
    }

    .get-more {
        text-align: center;
        padding: 10px 0 20px 0;
    }

    .get-more.theme-blue a {
        background-color: #498bf8;
        color: #fff;
    }

    .get-more a {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        padding: 0 20px;
        border: 1px solid #498bf8;
        border-radius: 14px;
        font-size: 12px;
        text-decoration: none;
        box-sizing: content-box;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }
    .wt-font-600 {
        font-weight: 700;
        font-size:0.75rem;
    }
    .grid-title{
        background: #c1b7bc0d;
        border-top:1px solid #e3e3e3;
        border-top:1px solid #e8e7e7;
    }
    .grid-top-border{
        border-top:1px solid #e3e3e3;
    }
</style>
