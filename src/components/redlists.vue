<template>
    <list style="margin-top:0px">
        <!--查询搜索列表-->
        <list-item v-if="routeName == '/search'" v-for="item in lists" :key="item.key" :title="item.title" :href="item.href">
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
                <span class="list-label label-orange">{{item.tag1}}</span>
                <span class="list-label label-white">{{item.tag2}}</span>
                <span class="list-label label-blue">{{item.tag3}}</span>
            </span>
        </list-item>
        <!--取水户-->
        <list-item v-if="routeName == '/qsh'" v-for="item in lists" :key="item.watuserId" :title="item.rn + '.' +item.watuserName" :href="item.href">
             <!--<img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt="">-->
             <span slot="subTitle">
                <span class="list-label label-orange">{{item.watuserWatapp}}</span>
                <span class="list-label label-white">{{item.watuserWorktype}}</span>
                <span class="list-label label-blue">{{item.watuserDivname}}</span>
            </span>
        </list-item>
        <!--大用水户-->
        <list-item v-if="routeName == '/dysh'" v-for="item in lists" :key="item.id" :title="item.companyname" :href="item.href">
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
                <span class="list-label label-orange">{{item.szysjqmc}}</span>
                <span class="list-label label-white">{{item.yslx}}</span>
                <span class="list-label label-blue">{{item.jclx}}</span>
            </span>
        </list-item>
        <!--水功能区-->
        <list-item v-if="routeName == '/redsgnq'" v-for="item in lists" :key="item.wfzNb" :title="item.wfzNm" :href="item.href">
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
                <span class="list-label label-orange">{{item.wtType}}</span>
                <span class="list-label label-white">{{item.belRiv}}</span>
                <span class="list-label label-blue">{{item.tgWq}}</span>
            </span>
        </list-item>
        <!--取水许可证信息-->
        <list-item v-if="routeName == '/qsxkz'" v-for="item in lists" :key="item.id" :title="item.qsqrmc" :href="item.href">
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
                <span class="list-label label-orange">{{item.watuserDivname}}</span>
                <span class="list-label label-white">{{item.qsl}}</span>
                <span class="list-label label-blue">{{item.overDate}}</span>
            </span>
        </list-item>
        <!--超许可水量-->
        <list-item v-if="routeName == '/cxksl'" v-for="item in lists" :key="item.watuser_id" :title="item.watuser_name" >
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
               <cell>
                  <small>许可量：{{item.xksl}}</small>
                  </cell>
                  <cell>
                  <small>取水量：{{item.qsl}}</small>
                  </cell>
            </span>
        </list-item>
        <!--咸潮-->
        <list-item v-if="routeName == '/redxc'" v-for="item in lists" :key="item.stcd" :title="item.name" :href="item.href">
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
                <span class="list-label label-orange">{{item.nm_salinity}}</span>
                <span class="list-label label-blue">{{item.state}}</span>
            </span>
        </list-item>

        <!--底部操作栏-->
        <list-item v-show='showMore'>
            <div slot="subTitle" @click="loadMore()" class="wt-desc">
                <span>{{loadText}}</span>
            </div>
            <div slot="desc" class="wt-desc" v-show="back" @click.stop="backTop()">
                <span>返回顶部</span>
            </div>
        </list-item>

    </list>
</template>

<script>
export default {
    props: ['lists','next','total','showMore'],
    data () {
      return {
        // id: this.item.id
         loadText:'点击加载更多~~',
         isLoad:true,
         back:false,
         target:'',
         routeName: ''
      }
    },
    mounted(){
        console.log(this.$refs.viewBox);
        // this.target = this.$el.parentNode
        this.target = this.$el.parentNode.parentNode.parentElement
        this.target.addEventListener('scroll', this.showIcon,true)
        // 如果超过了，那么修正文字
        this.judgePage()
        this.routeName = this.$route.path
    },
    watch:{
        next(val,old){
           this.judgePage();
        }
    },
    beforeDestroy () {
     //  组件销毁的时候，需要删除scroll的监听事件。
      this.target.removeEventListener('scroll', this.showIcon())
    },
    methods:{
        loadMore(){
            let action = "";
            if(this.isLoad)
              this.$emit('loadMore');
            else
              console.log("没有更多了");
        },
        judgePage(){          
          if (this.next*10 >= this.total){
            this.loadText = '没有更多啦~~'
            this.isLoad = false
            this.back = false
          }
          if(this.next*10 >=20){
              this.back = true
          }
        },
        backTop(){
            console.log("返回顶部");
            let timer = setInterval(() => {
                let top = this.target.scrollTop
                let speed = Math.ceil(top / 5)
                this.target.scrollTop = top - speed
                if (top === 0) {
                  clearInterval(timer)
                 }
            }, 20)
        },
        showIcon () {
        //  根据scrollTop的值来判断是否显示返回顶部的icon
            if (this.target.scrollTop > 200) {
                this.back = true
                // this.$el.addEventListener('mouseover', this.addhoverClass)
                // this.$el.addEventListener('mouseout', this.addhoverClass)
            } else if (this.target.scrollTop < 200) {
                this.back = false
            }
        }
    }
}
</script>

<style>
   .list-label{
      margin:0 0.1rem;
      display: inline-block;
      height: 1.125rem;
      line-height: 1.125rem;
      padding:0 0.2rem;
      font-size:0.75rem;
      border-radius:0.2rem;
   }
   .label-blue{
       /* background-color:#f0f4f8; */
       border:solid 1px #6783ae;
       color:#6783ae;
   }
   .label-white{
       border:solid 1px #969696;
       /* background-color:#f0f4f8; */
       color:#969696;
   }
   .label-orange{
       border:solid 1px #e54c00;
       color:#e54c00;
   }
   .wt-desc-box{
       height:80px;
   }
   .wt-desc{
       display: block;
       background:#f3f2f2;
       height: 40px;
       width:100%;
       padding:10px;
       text-align: center;
   }
   .wt-desc span{
       color:#6783ae;
       font-size:0.875rem;
       letter-spacing:0.3125rem;
   }
   .wt-return-top{
       position: absolute;
       bottom:100px;right:10px;
       display: block;
       height:3.125rem;
       width:3.125rem;
       background:#ccc;
       line-height: 3.125rem;
       border-radius: 50%;
       text-align: center;
       z-index:1100;
   }
   .wt-return-top span{
       color:#fff;
       font-weight: 700;
   }
</style>
