<template>
    <vue-view class="container-check">
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            管理考核
        </navbar>
        <div class="ckhome">
            <a href="#/check/sjsb1">
                <div class="cr bl">
                    数据上报
                </div>
            </a>
            <div class="crdesc">
                <ul>
                    <li style="display:flex" v-for="(item,index) in sjsbList" :key="index">
                        <div class="arrow bl-arrow"></div>
                        <div class="bl-bottom">{{item.txt}} {{item.value}}，{{item.txt1}} {{item.value1}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div style="border-bottom:1px dotted #e3e3e3;padding-top:10px"></div>
        <div class="ckhome">
            <a href="#/check/sjzl1">
                <div class="cr rd">
                    数据质量
                </div>
            </a>
            <div class="crdesc">
                <ul>
                    <li style="display:flex" v-for="(item,index) in sjzlList" :key="index">
                        <div class="arrow rd-arrow"></div>
                        <div class="rd-bottom">{{item.txt}} {{item.value}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div style="border-bottom:1px dotted #e3e3e3;padding-top:10px"></div>
        <div class="ckhome">
            <a href="#/check/ywkh1">
                <div class="cr gr">
                    运维巡检
                </div>
            </a>
            <div class="crdesc">
                <ul>
                    <li style="display:flex" v-for="(item,index) in ywxjList" :key="index">
                        <div class="arrow gr-arrow"></div>
                        <div class="gr-bottom">{{item.txt}} {{item.value}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div style="border-bottom:1px dotted #e3e3e3;padding-top:10px"></div>
        <div class="ckhome">
            <a href="#/check/jgkh1">
                <div class="cr or">
                    业务监管
                </div>
            </a>
            <div class="crdesc">
                <ul>
                    <li style="display:flex" v-for="(item,index) in ywjgList" :key="index">
                        <div class="arrow or-arrow"></div>
                        <div class="or-bottom">{{item.txt}} {{item.value}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                sjzl: []
            }
        },
        computed: {
            ...mapState({
                sjzlList: state => state.sjzl.sjzlList,
                sjsbList: state => state.sjzl.sjsbList,
                ywxjList: state => state.sjzl.ywxjList,
                ywjgList: state => state.sjzl.ywjgList,
                nowTime: state => state.sjzl.nowDate
            })
        }
    }
</script>

<style>
    .container-check {
        background: #fff;
    }

    .ckhome {
        margin: 10px;
        display: flex;
    }

    .cr {
        border-radius: 100%;
        width: 130px;
        height: 130px;
        line-height: 120px;
        text-align: center;
        font-size: 1.35rem;
        color: #666;
        margin-top: 15px;
    }

    .rd {
        border: 4px solid #de4751;
    }

    .rd-bottom {
        border-bottom: 1px dotted #de4751;
        width: 150px;
    }

    .rd-arrow {
        border: 8px solid transparent;
        border-left-color: #de4751;
    }

    .gr {
        border: 4px solid #62ab00;
    }

    .gr-bottom {
        border-bottom: 1px dotted #62ab00;
        width: 130px;
    }

    .gr-arrow {
        border: 8px solid transparent;
        border-left-color: #62ab00;
    }

    .bl {
        border: 4px solid #0a9fde;
    }

    .bl-bottom {
        border-bottom: 1px dotted #0a9fde;
        width: 180px;
    }

    .bl-arrow {
        border: 8px solid transparent;
        border-left-color: #0a9fde;
    }

    .or {
        border: 4px solid #FFBB00;
    }

    .or-bottom {
        border-bottom: 1px dotted #FFBB00;
        width: 130px;
    }

    .or-arrow {
        border: 8px solid transparent;
        border-left-color: #FFBB00;
    }

    .crdesc {
        margin: 10px 0;
    }

    .crdesc li {
        height: 36px;
        line-height: 36px;
    }

    .arrow {
        width: 0;
        height: 0;
        margin-top: 11px;
    }
</style>



