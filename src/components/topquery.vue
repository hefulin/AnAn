<template>
    <div>
        <div class="filterWrap">
            <ul class="topquery">
                <li class="q-item" :class="{cur:isActive == index}" v-for="(item,index) in items"
                    @click="itemClick(item,index)">
                    <a href="javascript:void(0)">
                    <span>
                        {{item.title}}
                        <i></i>
                    </span>
                    </a>
                </li>
            </ul>
            <div class="filter-panel" v-show="isActive != -1">
                <ul>
                    <li v-if="queryDetail.type == 'checkbox'" class="filter-panel-item"
                        v-for="item in queryDetail.children" :key="item.index" @click="queryClickCheck(item)">
                        <em :class="{'wt-dblue':item.checked == true}">{{item.title}}</em>
                        <div :class="['checkbox',{'checkbox-active':item.checked == true} ]">
                            <i class="checked-icon icons-ea4c"></i>
                        </div>
                    </li>
                    <li v-if="queryDetail.type == 'radio'" class="filter-panel-item"
                        v-for="item in queryDetail.children" :key="item.index" @click="queryClickRadio(item)">
                        <em :class="{'wt-dblue':item.checked == true}">{{item.title}}</em>
                    </li>
                </ul>
            </div>
            <!-- <offcanvas silde="bottom" :open="offcanvas4" @Close="close('offcanvas4')">
                <p>向下显示 OffCanvas 内容</p>
            </offcanvas> -->
        </div>
        <div v-show="isActive != -1" class="modal-backdrop" @click="offcanvasClose" @touchmove.stop></div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        props: ['items'],
        data() {
            return {
                isActive: -1,
                queryDetail: {}
            }
        },
        watch: {
            selected: function (val, oldval) {
                console.log("------ 监听变化 -----");
                this.$emit('menuQuery', val);
            }
        },
        computed: {
            selected: function () {
                // 循环最外层的数据
                var ret = {};
                this.items.forEach(element => {
                    ret[element.key] = [];
                    element.children.forEach(ele => {
                        if (ele.checked == true)
                            ret[element.key].push(ele.key);
                    });
                });

                return ret;
            }
        },
        methods: {
            itemClick(item, index) {
                this.isActive = index;
                this.queryDetail = item;
                //  console.log(this.$children[index]);
            },
            offcanvasClose() {
                this.isActive = -1
            },
            queryClickCheck(item) { // 多选
                console.log(item.key);
                Vue.set(item, 'checked', !item.checked);
                // 对 “不限” 特殊处理
                if (item.key == '-1') {
                    this.queryDetail.children.forEach(element => {
                        if (element.key != -1)
                            Vue.set(element, 'checked', false);
                    });
                } else {
                    this.queryDetail.children.forEach(element => {
                        if (element.key == -1)
                            Vue.set(element, 'checked', false);
                    });
                }
            },
            queryClickRadio(item) { // 单选
                Vue.set(item, 'checked', !item.checked);
                this.queryDetail.children.forEach(element => {
                    if (element.key != item.key)
                        Vue.set(element, 'checked', false);
                });
            }
        }
    }
</script>

<style>
    .filter-panel {
        background: #fff;
    }

    .filter-panel ul {
        padding: 0;
        margin: 0;
    }

    .filter-panel-item em {
        display: block;
        -webkit-box-flex: 1;
    }

    .filter-panel-item {
        position: relative;
        border-top: 1px solid #e6e6e6;
        overflow: hidden;
        padding: 10px;
        display: -webkit-box;
        -webkit-box-align: center;
        box-sizing: border-box;
    }

    .checkbox .checked-icon {
        display: none;
    }

    .checkbox {
        width: 15px;
        height: 15px;
        position: relative;
        margin-right: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }

    .checkbox input {
        display: none;
    }

    .checkbox-active {
        border: 1px solid #5d85ff;
    }

    .checkbox-active .checked-icon {
        display: block;
        position: absolute;
        top: -10px;
        left: -1px;
        font-size: 12px;
        color: #5d85ff;
    }

    .icons-ea4c:before {
        content: "\e992"
    }

    .filterWrap {
        height: 45px;
        position: relative;
        z-index: 1010;
        background-color: #fff;
    }

    .item_options {
        margin-top: -1px;
        position: relative;
        width: 100%;
        color: #333;
        background-color: #fff;
        overflow: hidden;
        overflow-y: auto;
        z-index: 1;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
    }

    .topquery {
        box-sizing: border-box;
        position: relative;
        padding: 10px 5px 10px 15px;
        height: 45px;
        text-align: center;
    }

    .q-item {
        float: left;
        width: 25%;
        font-size: 12px;
        padding-right: 10px;
    }

    .q-item a {
        display: block;
        position: relative;
        padding: 0 5px;
        height: 25px;
        line-height: 25px;
        color: #666;
        background-color: #f2f2f7;
        border-radius: 2px;
    }

    .q-item.cur a {
        height: 35px;
        background-color: #fff;
    }

    .q-item.cur a::before {
        content: "";
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: #e5e5e5;
        border: 1px solid #ddd;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: none;
        border-color: #e5e5e5;
        border-radius: 2px 2px 0 0;
    }

    .q-item.cur a::after {
        content: "";
        position: absolute;
        left: 1px;
        right: 1px;
        bottom: 0;
        height: 4px;
        background: #ffffff;
        z-index: 2;
    }

    .q-item span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        max-width: 100%;
        padding-right: 13px;
    }

    .q-item span i {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -2px;
        width: 8px;
        height: 5px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKBAMAAABPkMOvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURUdwTMzMzMzMzMzMzMzMzM3NzdLS0svLy6qqqszMzMzMzMzMzGC86tIAAAALdFJOUwDl9UGdJhG9A2jOR0lNjwAAAEdJREFUCNdj8N4NBlsYVkMYuxgCIQxRBmZtEL3JgIFhNoixk4GBgQXEcAAyOKp3797eAGQwJO7eLQaiGVi1NwWAGQyGwkACAKGfIfA79uAMAAAAAElFTkSuQmCC) no-repeat;
        background-size: 8px auto;
    }

    em, i {
        font-style: normal;
    }

    .barTab {
        min-height: 45px;
        font-size: 12px;
        overflow: auto;
        background-color: #fff;
    }
</style>
