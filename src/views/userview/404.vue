/**
   页面不存在
 */
<template>
   <vue-view class="wt-fo-wrap">
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
           信息提醒
          <!-- <icon name="left-nav" slot="left" titleRight="返回" back></icon> -->
        </navbar>
       <div class="wt-fo-back"></div>
       <span class="wt-fo-text">您的权限不能访问该页面</span>
   </vue-view>
</template>

<script>
export default {

}
</script>

<style>
.wt-fo-wrap{
     background-color:#fff;
 }
 .wt-fo-back{
     /* display: block; */
     background: url('../../../statics/images/notfind.png') no-repeat;
     background-size: 100% 100%;
     width:100%;
     height:16.75rem;
     margin-top:3.25rem;
 }
 .wt-fo-text{
     font-size:1.085rem;
     color:#3b3b3b;
     margin-left:1.625rem;
 }
 .wt-fo-wrap a{
    color:#3b3b3b;
    font-size:1.2rem;
 }
</style>
