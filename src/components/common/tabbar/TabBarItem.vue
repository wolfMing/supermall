<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
      <!--<slot name="item-icon"></slot>-->
      <!--<slot name="item-icon-active"></slot>-->
      <!--<slot name="item-text"></slot>-->
      <!--<img src="../../assets/img/08-tabbar/home.png" alt="">-->
      <!--<div>首页</div>-->
    </div>
    <!--<div class="tab-bar-item">-->
      <!--<img src="" alt="">-->
      <!--<div>分类</div>-->
    <!--</div>-->
    <!--<div class="tab-bar-item">-->
      <!--<img src="" alt="">-->
      <!--<div>购物车</div>-->
    <!--</div>-->
    <!--<div class="tab-bar-item">-->
      <!--<img src="" alt="">-->
      <!--<div>我的</div>-->
    <!--</div>-->
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return({
        // isActive:true
      })
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) != -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 1px;
    /*去除图片下面的默认空间*/
    vertical-align: middle;
  }
</style>
