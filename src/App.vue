<template>
   <container fill direction="column">
    <tabbar slot="tabbar" class="am-view-push">
        <tabbar-item active icon="home" title="首页" @tabbarItemClick="tabbarItemClick('redv1')"></tabbar-item>
        <!-- <tabbar-item icon="bars" title="三条红线" href="/redv1"></tabbar-item> -->
        <tabbar-item icon="more" title="管理考核"  @tabbarItemClick="tabbarItemClick('check')"></tabbar-item>
        <tabbar-item icon="gear" title="巡检运维"  @tabbarItemClick="tabbarItemClick('route')"></tabbar-item>
        <tabbar-item icon="person" title="我的" @tabbarItemClick="tabbarItemClick('home')"></tabbar-item>
    </tabbar>
   </container>
</template>

<script>
export default {
    data(){
        return{
           
        }
    },
    methods:{
        tabbarItemClick:function(e){
            this.$router.push(e);
        }
    }
}
</script>

<style>
   .am-view-push {
    transition: transform .5s cubic-bezier(0.23, 1, 0.320, 1);
   }
</style>
