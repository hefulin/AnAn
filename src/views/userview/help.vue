/**
  帮助中心
 */
<template>
  <vue-view style=" background:#fff">
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
          帮助中心
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
       </navbar>
       <div style="padding:5px 15px 0;">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                        <div class="wt-title-center"><span>服务说明</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="wt-list-info">
                        <div class="wt-list-line">
                            <label>服务热线：</label>
                            <p class="g-overflow">
                                <span class="wt-dblue">021-123345</span>
                            </p>
                        </div>
                </div>
                <div class="wt-list-info">
                        <div class="wt-list-line">
                            <label>服务地址：</label>
                            <p class="g-overflow">
                                <span class="wt-dblue">江苏路389号</span>
                            </p>
                        </div>
                </div>
                <div class="wt-list-info">
                        <div class="wt-list-line">
                            <label>账号密码：</label>
                            <p class="g-overflow">
                                <span class="wt-dblue">请联系局内人员索取，不提供在线注册</span>
                            </p>
                        </div>
                </div>
                <div class="wt-title-line"></div>
                <div class="wt-list-info">
                    <div class="wt-list-line">
                        <p class="wt-red">
                          上海宝信软件股份有限公司
                        </p>
                    </div>
                </div>
                
       </div>
  </vue-view>
</template>

<script>
export default {

}
</script>

<style>

</style>
