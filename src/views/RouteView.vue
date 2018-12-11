<template>
    <vue-view class="container1">
        <!--页面头部区域-->
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            运维巡检
            <icon name="more-vertical" slot="left"></icon>
            <!-- <icon name="person" slot="right" href="/home"></icon> -->
        </navbar>
        <div>
            <div class="route-fixed">
            <div class="route-tabs">
                <a :class="{cur:menu1 === 1}" @click="menu1Click(1)">常规巡检</a>
                <a :class="{cur:menu1 === 2}" @click="menu1Click(2)">派单巡检</a>
            </div>
            <div class="route-subtabs">
                <div class="sub">
                    <span :class="{cur:menu2 === 1}" @click="menu2Click(1)">取水户</span>
                    <span :class="{cur:menu2 === 2}" @click="menu2Click(2)">大用水户</span>
                    <span :class="{cur:menu2 === 3}" @click="menu2Click(3)">水源地</span>
                    <span :class="{cur:menu2 === 4}" @click="menu2Click(4)">水功能区</span>
                </div>
                <div class="selectTime">
                    <input type="text" readonly="readonly" @click="openCal" v-model="time.selectedDate">
                </div>
            </div>
            </div>
            <div class="route-lists">
                <div style="background:#fff;margin-bottom:10px" v-for="list in ywLists" :key="list.index" href="/routeReback1/111" @click="listClick(list)">
                    <div class="route-header clearfix">
                        <span class="l">编号：{{list.id}}</span>
                        <span class="r">{{list.dwname}}</span>
                    </div>
                    <div class="route-body clearfix">
                        <div class="route-body-message">
                            <div class="route-body-img">
                            <img :src="list.img">
                            </div>
                            <div class="route-body-content">
                                <p class="route-body-content-title">
                                    {{list.ywdate}}
                                </p>
                                <p class="route-body-content-title">
                                    {{list.ywdesc}} 
                                </p>                       
                            </div>
                        </div>
                        <div class="route-body-option">
                            <span v-if="list.ywtype === 1" class="done">已处理</span>
                            <span v-else class="undone">待处理</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <calendar
            v-model="time.calendarShow"
            :defaultDate="time.defaultDate"
            @change="handelChange">
        </calendar>
    </vue-view>
</template>

<script>
    import calendar from '../components/calendar'
    export default {
        components: {
            calendar
        },
        data() {
            return {
                menu1:1,
                menu2:1,
                time: {
                    calendarShow: false,
                    defaultDate:new Date(),
                    selectedDate: dateFormat(new Date(), "yyyy-MM")
                },
                ywLists:[
                    {"id":"SH20180001","dwname":"上海城投-站点1","img":"https://dimg04.c-ctrip.com/images/300o0b0000005a6rh3D5A_C_300_200.jpg"
                     ,"ywdate":" 2018-01-01至2019-10-11","ywdesc":"已巡检 无异常","ywtype":1}
                    ,{"id":"SH20180002","dwname":"上海城投-站点2","img":"https://dimg04.c-ctrip.com/images/300o0b0000005a6rh3D5A_C_300_200.jpg"
                     ,"ywdate":" 2018-01-01至2019-10-11","ywdesc":"未开始","ywtype":0}
                   
                ]
            }
        },
        methods: {
            handelChange: function(date,formatDate) {
                this.time.selectedDate = dateFormat(date, "yyyy-MM");
                // 这里查询数据库
            },
            openCal:function(){
                this.time.calendarShow = true;
            },
            menu1Click:function(index){
                this.menu1 = index;
                if(index == 1){// 加载常规巡检列表

                } 
                if(index == 2){// 加载派单巡检列表

                } 
            },
            menu2Click:function(index){
                this.menu2 = index;
                if(index == 1){// 取水户

                } 
                if(index == 2){// 大用水户

                }  
                if(index == 3){// 水源地

                }  
                if(index == 4){// 水功能区

                } 
            },
            listClick:function(data){
                if(this.menu1 == 1)
                this.$router.push({name:'routeReback1',params:{id:'',t:''}});
                if(this.menu1 == 2 && data.ywtype == 1)
                this.$router.push({name:'routeView',params:{id:data.id,t:'pd'}});
                if(this.menu1 == 2 && data.ywtype == 0)
                this.$router.push({name:'routeReback2',params:{id:data.id,t:'pd'}});

            }
        }
    }

    function dateFormat(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate()
        };
        if(/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
</script>

<style>
    .route-fixed{
        position:fixed;
        z-index: 1200;
    }
    .route-body{
        margin:10px;        
    }
    .route-body-message{
        float:left;
    }
    .route-body-option{
        float:right;
        height:76px;
        line-height: 76px;
    }
    .route-body-option span{
        border-radius:40px;
        padding:2px 5px;
    }
    .route-body-option .undone{
        border: 1px solid rgb(228, 89, 89);
        color:rgb(228, 89, 89);
    }
    .route-body-option .done{
         border: 1px solid rgb(82, 223, 77);
        color:rgb(82, 223, 77);
    }
    .route-body-content{
        display: inline-block;
        vertical-align:top;
        color:rgb(141, 140, 140);
    }
    .route-body-content p{
        margin-bottom:10px !important;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    .route-body-img{
        width:100px;
        margin:0px !important;
        display: inline-block;
    }
    .route-body-img img{
        width:100%;
        display: block;
        border-radius: 6px;
    }
    .selectTime input{
        color:#666;
        border:1px solid #e5e5e5;
        background:#f2f2f2;
        padding:0 28px 0 12px;
        height:28px;
        margin:0;
    }

    .route-lists{
        -webkit-overflow-scrolling: touch; 
        top:93px;
        position: relative;
    }
    .route-tabs{
        line-height: 45px;
        text-align: center;
        border-bottom: 1px solid #f1ecec;
        background: #fff;
        display:block;
    }
    .route-tabs a{
        font-size:18px;
        display: inline-block;
        text-align: center;
        width:49.2%;
        color:rgb(141, 140, 140);
    }
    .route-tabs a.cur{
        color:#000;
        border-bottom: 2px solid #ff9d1f;
    }
    .route-subtabs{
        overflow:hidden;
        background: #fff;
        border-bottom:1px solid #e5e5e5;
    }
    .sub{
        float:left;
        background: #fff;
        margin:5px 5px;
    }
    .selectTime{
        float:right;
        width:30%;
        margin:5px 5px;
    }
    .sub span.cur{
        border-radius:50px;
        background:#ffe2d7;
        color:#f66e3c;
    }
    .sub span{
        width:48px;
        line-height: 28px;
        font-size:12px;
        color:#333;
        margin-right:5px;
        text-align: center;
        height:28px;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        display: inline-block;
    }
    .route-header{
        border-bottom:1px solid #e5e5e5;
        height:45px;
        line-height: 35px;
    }
    .route-header span{
        padding:6px;
    }
    .route-header .l{
        float:left;
    }
    .route-header .r{
        float:right;
    }
    .clearfix{
        zoom:1;
        overflow: hidden;
    }
    .clearfix:after{
        height:0;
        clear:both;
        overflow:hidden;
        visibility:hidden;
        display: block;
    }
</style>



