/**
 *  扩展 router 的方法
 */

 import * as util from '../libs/utils'

 export  function _beforeEnter(to, from, next){
     var roleMeta = to.meta.role;
     if(to.matched.some(m => m.meta.auth)){
         console.log("需要验证登录");
         
        if(util.getJStore('userInfo') == null || util.getJStore('userInfo') == ""){
            console.log("需要登录");
            next({name:'login',params:{next:to.fullPath}});
        }else{
            if(roleMeta.indexOf(util.getStore('userRole'))< 0){
                next('/error404');
            }
            else
              next();
        }
         // 跳转至 forbidden 界面
        //  next('/forbidden')
     }else{
        next();
     }
     
 }   