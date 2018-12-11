<template>
   <vue-view style="background-color:#f5f5f5">
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
          用户管理
        </navbar>
        <group noPadded class="group-clear">
            <!--上方的登录信息-->
            <div>
                <router-link :to="userInfo? '/home' : '/login'" class="wt-login-link wt-linear-blue">
                  <span class="privateImage">
                    <svg class="privateImage-svg">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default">
                          <svg viewBox="0 0 122 122" id="avatar-default" width="100%" height="100%"><path fill="#DCDCDC" fill-rule="evenodd" d="M61 121.5c33.413 0 60.5-27.087 60.5-60.5S94.413.5 61 .5.5 27.587.5 61s27.087 60.5 60.5 60.5zm12.526-45.806c-.019 3.316-.108 6.052.237 9.825 3.286 8.749 18.816 9.407 28.468 17.891-1.833 1.998-6.768 6.788-15 10.848-7.02 3.463-16.838 6.416-24.831 6.416-17.366 0-32.764-7.149-42.919-17.264 9.713-8.407 25.49-9.173 28.769-17.891.345-3.773.258-6.509.24-9.825l-.004-.002c-1.903-.985-5.438-7.268-6.01-12.571-1.492-.12-3.843-1.561-4.534-7.247-.37-3.053 1.107-4.77 2.004-5.31-5.046-19.212 1.507-33.16 20.749-34.406 5.753 0 10.18 1.52 11.909 4.523 15.35 2.702 11.756 22.658 9.328 29.882.899.54 2.376 2.258 2.004 5.31-.689 5.687-3.042 7.127-4.534 7.248-.575 5.305-3.25 10.82-5.873 12.57l-.003.003zM61 120.5C28.14 120.5 1.5 93.86 1.5 61S28.14 1.5 61 1.5s59.5 26.64 59.5 59.5-26.64 59.5-59.5 59.5z"></path></svg>
                        </use>
                    </svg>
                  </span>
                  <div class="user-info">
                      <p>{{username}}</p>
                  </div>
                </router-link>
            </div>
        </group>
        <group noPadded class="group-clear group-top-10">            
             <list style="margin-top:0px">
                 <list-item title="帮助中心" href="/help">
                     <i slot="img" width="32" class="wt-bar-i-24 wt-help"></i>
                 </list-item>
                 <list-item title="个人信息" href="/person">
                     <i slot="img" width="32" class="wt-bar-i-24 wt-person"></i>
                 </list-item>
             </list>
        </group>
        <group noPadded>
           <vue-button v-show="userInfo" block orange @buttonClick="outLogin()"> 退出登录 </vue-button>
        </group>
         <modal role="confirm" title="提示" :isOpen="show" @Close="modalOutFun('show')" @Confirm="modalConfirm()">确定退出么？</modal>
    </vue-view>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import * as util from '../libs/utils'
export default {
    data(){
        return {
            username:'登录',
            timer:'',
            show:false,
            // userInfo:[]
        }
    },
    mounted(){
        this.initData();
        this.getUserInfo();
    },
    computed:{
         ...mapState({
            userInfo: state => state.login.userInfo
        })
    },
    methods:{
        initData(){
            if (this.userInfo && this.userInfo.user_id) {
                this.username = this.userInfo.user_id;
            }else{
                this.username = '登录';
            }
        },
        waitingThing(){
                //取消推出
                clearTimeout(this.timer)
                // this.isEnter=false;
                // this.isLeave=true;
                this.timer = setTimeout(() =>{
                    clearTimeout(this.timer)
                    this.show=false;
                },200)
        },
        // 隐藏提示框
       modalOutFun(value) {
         this[value] = false
       },
        outLogin(){
                // this.OUT_LOGIN();
                // this.waitingThing();
                this.show = true;
                // await signout();
        },
        async modalConfirm(){
            this.waitingThing();            
            util.removeStore('userInfo');
            // 这里只是为了触发set方法
            this.getUserInfo();
        },
         ...mapActions([
            'getUserInfo'
        ]),
    },
    watch: {
        userInfo: function (value){
            this.initData()
        }
    }

}
</script>

<style>
 .wt-help{
    background: url("../../statics/images/help-40.png") no-repeat;
    background-size:cover;
 }
 .wt-person{
    background: url("../../statics/images/person-40.png") no-repeat;
    background-size:cover;
 }
 .wt-login-link{
     display: flex;
     align-item:center;
     /* background: #3190e8; */
     padding:.666667rem .6rem;
 }
 .privateImage{
     display: inline-block;
     width:2.5rem;
     height: 2.5rem;border-radius:50%;
     vertical-align: center;
 }
 .user-info{
     margin-left:0.48rem;
     -webkit-box-flex:1;
     flex-grow: 1;
 }
  .user-info p{
      font-weight:700;
      font-size:1.4rem;
      color:#fff;
  }
  .privateImage-svg{
      background: #ffffff;
      border-radius:50%;
      width:2.5rem;
      height:2.5rem;
  }
</style>



