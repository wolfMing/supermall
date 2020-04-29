<template>
    <div class="detail-bottom-bar">
      <div class="bar-item bar-left">
        <div>
          <i class="icon service"></i>
          <span class="text">客服</span>
        </div>
        <div>
          <i class="icon shop"></i>
          <span class="text">店铺</span>
        </div>
        <div>
          <i class="icon select"></i>
          <span class="text">收藏</span>
        </div>
      </div>
      <div class="bar-item bar-right">
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy" @click="buyNow">购买</div>
      </div>
<!--      <sport-ball ref="ball" class="sport-ball"></sport-ball>-->
    </div>
</template>

<script>


    export default {
      name: "DetailBottomBar",
      components: {},
      data() {
        return {}
      },
      methods: {
        addToCart() {
          this.$emit('addToCart')
        },
        buyNow() {}
      }
    }
</script>

<style scoped>
  .detail-bottom-bar {
    height: 49px;
    background-color: #fff;
    position: relative;
    bottom: 49px;
    /*position: fixed;*/
    /*bottom: 0;*/
    /*left: 0;*/

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 4px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 -54px;
  }

  .bar-left .shop {
    background-position: 0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 49px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

  .sport-ball {
    position: absolute;
    left: 225px;
    bottom: 20px;
  }
</style>
