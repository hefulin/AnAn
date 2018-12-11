/**
个人信息
*/
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            个人信息
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <group noPadded class="group-clear">
            <list>
                <list-item :title="userInfo.name" class="wt-list-title"></list-item>
                <list-item title="手机号" :after="userInfo.phone"></list-item>
                <list-item title="固定电话" :after="userInfo.phone"></list-item>
                <list-item title="Email" :after="userInfo.mail"></list-item>
                <list-item title="组织机构" after="水务局"></list-item>
                <list-item title="角色" :after="userInfo.roleName"></list-item>
            </list>
        </group>
    </vue-view>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: JSON.parse(localStorage.getItem("userInfo"))
            }
        },
        mounted() {
            console.log(JSON.parse(localStorage.getItem("userInfo")))

        },
        methods: {

        }
    }
</script>

<style>
    .wt-list-title .item-title {
        font-weight: 700;
        text-align: center;
    }
</style>
