<!--巡检运维列表标签组件-->
<template>
    <list style="margin-top:0px">
        <list-item v-if="routeName==='/routeWarn'" v-for="item in lists" :key="" :title="item.WATUSER_NAME"
                   :href="item.href">
            <!--<img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt="">-->
            <span slot="subTitle">
                <span class="list-label label-new">{{item.ERROR_TIME}}</span>
                <span class="list-label label-error">{{item.ERROR_NUM}}</span>
                <span class="list-label label-error">{{item.PATROL_STATE}}</span>
            </span>
            <i v-if="item.PATROL_STATE === '未加入巡检计划'" class="icons-e60c" slot="after" @click="addPlan(item)"></i>
        </list-item>
        <list-item v-if="routeName==='/routePlan'" v-for="item in lists" :key="item.ID" :title="item.PATROL_TITLE"
                   :href="item.href">
            <!--<img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt="">-->
            <span slot="subTitle">
                <span class="list-label label-new">{{item.PATROL_TIME}}</span>
                <span class="list-label label-error">{{item.PATROL_ADDRESS}}</span>
                <span class="list-label label-error">{{item.PATROL_STATE}}</span>
            </span>
            <i v-if="item.PATROL_STATE === '0'" class="icons-e60c" slot="after" @click="startPlan(item)"></i>
        </list-item>
        <list-item v-if="routeName==='/routeRecord'" v-for="item in lists" :key="item.ID" :title="item.PATROL_TITLE"
                   :href="item.href">
            <!--<img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt="">-->
            <span slot="subTitle">
                <span class="list-label label-new">{{item.PATROL_TIME}}</span>
                <span class="list-label label-error">{{item.PATROL_ADDRESS}}</span>
                <span class="list-label label-error">{{item.PATROL_STATE}}</span>
            </span>
            <i v-if="item.PATROL_STATE === '0'" class="icons-e60c" slot="after" @click="startPlan(item)"></i>
        </list-item>

        <modal role="confirm" title="提示信息" :isOpen="open2" @Confirm="confirm(patrolState, type)"
               @Close="modalOutFun('open2')">{{alertText}}
        </modal>
    </list>

</template>

<script>
    import * as util from '../libs/utils'
    import * as API from '../store/api/api'

    export default {
        components: {},
        props: ['lists'],
        data() {
            return {
                // id: this.item.id
                open2: false,
                patrolState: [],
                alertText: '',
                routeName: '',
                type: ''
            }
        }, mounted() {
            this.routeName = this.$route.path;
        },
        methods: {
            addPlan(val) {
                this.type = 'addPlan';
                this.patrolState = val;
                this.open2 = true;
                this.alertText = "是否确认加入巡检计划";
                return;
            },
            //开始巡检
            startPlan(val) {
                this.type = 'startPlan';
                this.patrolState = val;
                this.open2 = true;
                this.alertText = "是否确认开始巡检";
                return;
            },
            // 隐藏提示框
            modalOutFun(value) {
                this[value] = false
            },
            // 显示提示框
            modalOpFun(value) {
                this[value] = true
            },
            //弹框确认事件
            confirm(val, type) {
                console.log(type);
                switch (type) {
                    case 'addPlan':
                        let paramDataAdd = {
                            type: 'addPlan',
                            val: val
                        }
                        paramDataAdd = encodeURI(encodeURI(JSON.stringify(paramDataAdd)));
                        this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramDataAdd).then(
                            response => {
                                console.log(response.data.data);
                                // this.lists = response.data.data;
                            }, response => {
                                console.log("error");
                            });

                        break;
                    case 'startPlan':
                        let paramDataStart = {
                            type: 'startPlan',
                            val: val
                        }
                        paramDataStart = encodeURI(encodeURI(JSON.stringify(paramDataStart)));
                        this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramDataStart).then(
                            response => {
                                console.log(response.data.data);
                                // this.lists = response.data.data;
                            }, response => {
                                console.log("error");
                            });
                        break;
                }
                this.modalOutFun('open2');
            }
        }
    }
</script>

<style>
    /*新消息提醒*/
    .label-new {
        border: 1px solid red;
        color: red;
    }

    .label-error {
        border: 1px solid #ee8934;
        color: #ee8934;
    }

    .progress {
        height: 0.2rem;
        margin-left: 0.2rem;
        display: inline-block;
        line-height: 0.2rem;
        margin-top: 0.625rem;
    }
</style>
