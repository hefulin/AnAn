/**
  照片预览
  
 */
<template>
 <vue-view v-show="imgpreshow">
     <div class="wt-media-large" >
        <div class="wt-media-header">
            <i class="icons-e621" @click="closeImg()"></i>
            <span>{{currentSlide+1}}/{{imgLists.length}}</span>
        </div>
        <div class="wt-media-box">
            <div v-for="(item,index) in imgLists" :key="imgLists.index" @touchstart.stop="s($event)" @touchmove.stop="m($event)" @touchend="e(1,$event)" @mousedown="s($event)" @mousemove="m($event)" @mouseup="e($event)"
              class="wt-media-unit" :style="{'margin-left':(tranX+360*index)+'px','transition-duration': tranDuration+'ms','transform': 'translate3d('+((tranX+360*index))+'px,'+tranY+'px,0)'}">
                <div class="wt-media-img">
                <img :src="item.url">
                </div>
            </div>
        </div>
     </div>
 </vue-view>
  
</template>

<script>
function toArray(arraylike) {
	    return Array.prototype.slice.call(arraylike);
}
export default {
   props: ['imgLists','imgpreshow'],
   data(){
       return{
            slidesNumber: 0,
            swiperWidth: 0,
            currentSlide: 0,
            tranX: 0,
            tranY: 0,
            tranDuration: 0,
            pos: {
					startX: 0,
					moveX: 0,
					endX: 0, 
					local: 0,
					distance: 0
            },
            unlock: false,
            moving:false,
            currentEle:[]
       }
   },
   methods:{
       closeImg(){
           this.$emit('closeImg');
       },
       imgHandle(){
           this.tranDuration = 40;
           this.tranX = -360;
           this.tranY = 0;
       },
       transitionDuration(v){
           this.tranDuration = v;
       },
    //    transitionend () {
    //         this.transitionDuration(0);	
    //         /*
    //             一次滑动结束之后, 通过计算, 实际上我们可以拿到当前处于内部索引的第几个 slide
    //             拿到这个 currentSlide 我们就知道当前是不是滚动到最后一个了
    //         */
    //         let currentSlide = Math.round(Math.abs(this.left())/this.swiperWidth);
    //         this.currentSlide = currentSlide - 1;
    //         /* 如果滚动到最后一个, 那么就要瞬间跳转一下, 到外部看起来的第一个, 内部的*/
    //         if (currentSlide == this.slidesNumber - 1) {
                
    //             this.translateX(-this.swiperWidth);
    //             this.currentSlide = 0;
                
    //         }
    //         if (currentSlide == 0) {	
    //             this.translateX(-this.swiperWidth * (this.slidesNumber - 2))
    //             this.currentSlide = this.slidesNumber - 3;
    //         }
    //         this.$emit('transitionend', this.currentSlide);
    //         /*
    //             防止极限操作, 用户在滑动结束之后事件还没发送出去又滑动导致计算
    //             结果错误, 所以等事件发出去之后再解开 
    //         */
    //         this.moving = false;				
    //     },
        /*toushstart handler*/
        s (e) {
            if (e.type === 'mousedown' && !this.moving) {
                this.mousedown = true;
                this.pos.startX = e.pageX;
                this.pos.local = this.left();
                // clearTimeout(this.timer);
                this.transitionDuration(0);
            } else{
                this.activeId = toArray(e.changedTouches)[0].identifier;
                if (!this.moving) {
                    let active = e.touches.length - 1;
                    // clearTimeout(this.timer);
                    this.transitionDuration(0);
                    this.unlock = true;
                    this.pos.startX = e.touches[active].clientX;
                    /* 一次 touch 的 起始local 点, 是固定的 */
                    this.pos.local = this.left();
                }
            }
        },
        /*响应用户滚动行为*/
        recover () {
            // this.transitionDuration(this.userDuration);
            let distance = Math.abs(this.left()) % this.swiperWidth;
            let direction = ''
            /*
                主要是为了拿到当前状态下面, swiper 距离正常状态的, 左右移动的距离分别是多少. 
            */
            if (this.pos.distance > 0) {
                direction = 'to-right';
            } else if (this.pos.distance < 0) {
                direction = 'to-left';
            } else {
                direction = 'none';
            }

            if (direction === 'to-right') {
                // this.moving = true;
                /*说明需要向右边移动*/
                // 小于 0 说明是第一个了
                this.currentSlide -=1;
                if(this.currentSlide < 0 ){
                    this.currentSlide = this.imgLists.length-1;
                }                
                this.translateX(-360*this.currentSlide);
           

            } 
            if (direction === 'to-left') {
                // this.moving = true;
                this.currentSlide +=1;
                if(this.currentSlide > this.imgLists.length-1){
                    this.currentSlide = 0;
                }
                this.translateX(-360*this.currentSlide);
            }
        },
        m (e) {
            if (e.type === 'mousemove' && this.mousedown && !this.moving) {
                this.pos.moveX = e.pageX;
                this.pos.distance = this.pos.moveX - this.pos.startX;
                this.translateX(this.pos.local + this.pos.distance);
            } else {
                if (!this.moving && this.unlock) {
                    let active = e.touches.length - 1;
                    this.pos.moveX = e.touches[active].clientX;
                    this.pos.distance = this.pos.moveX - this.pos.startX;
                    this.translateX(this.pos.local + this.pos.distance);
                }					
            }
        },
        /*toushend handler*/
        e (index,e) {
            this.currentEle = index;
            // if (e.type === 'mouseup' && this.mousedown && !this.moving) {
            //     this.mousedown = false;
            //     this.pos.endX = e.pageX;
            //     this.pos.distance = this.pos.endX - this.pos.startX;
            //     this.recover();					
            // } else {
                // let curId = toArray(e.changedTouches)[0].identifier;
                if (!this.moving && this.unlock) {
                    this.unlock = false;
                    this.pos.endX = e.changedTouches[0].clientX;
                    this.pos.distance = this.pos.endX - this.pos.startX;
                    this.recover();
                }					
            // }
        },
        translateX(v){
            this.tranX =  v;
        },
        left () {
			return document.querySelector('.wt-media-unit').getBoundingClientRect().left;
		}
        
   }
}
</script>

<style>
 .wt-media-img{
     /* width:auto;    
     height:auto; */
     display:block;
 }
 .wt-media-unit{
     width:100%;    
     height:100%; 
     -webkit-box-align: center;
     float:left;
     display: flex;
     justify-content:center;
     align-items:Center; 
 }
 .wt-media-unit img{
     width:100%;
 }
 .wt-media-header i{
     display: block;
     position: absolute;
     left: 10px;
 }
 .wt-media-header span{
     font-size:1rem;
 }
 .wt-media-large{
     z-index:  1010;
     position: fixed;
     top:0;
     left: 0;
     width:100%;
     height: 100%;
     background: #000000;
     flex-direction: column;
     color:#fff;
 }
 .wt-media-header{
     position: absolute;
     left: 0;
     top:0;
     width:100%;
     height: 40px;
     line-height:40px;
     text-align:center;
     background:rgba(0, 0, 0, 0.5);
     z-index:1;
     font-size:1.7rem;
 }
 .wt-media-box{
     position: relative;
     overflow: hidden;
     height:100%;
     flex:1;
     width:100%;
 }
</style>
