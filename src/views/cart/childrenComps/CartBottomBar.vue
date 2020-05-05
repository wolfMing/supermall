<template>
    <div class="bottom-bar">
      <div class="check-all">
        <check-button :is-checked="isSelectAll"
                      class="check-button" @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>
      <div class="totle-price">
        <span>合计：{{totlePrice}}</span>
      </div>

      <div class="calculate" @click="clacClick">
        去计算： {{ checkLength }}
      </div>
    </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'

    export default {
      name: "CartBottomBar",
      components: {
          CheckButton
      },
      computed: {
          ...mapGetters(['cartList']),
          totlePrice() {
            return '¥' + this.cartList.filter(item => {
              return item.checked
            }).reduce((preValue, item) => {
              // console.log(preValue + item.price * item.count);
              return preValue + item.price * item.count
            },0).toFixed(2)
          },
        checkLength() {
          // console.log((this.cartList.filter(item => item.checked)).length);
          return this.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if (this.cartList.length === 0) return false
          // return !(this.cartList.filter(item => !item.checked).length)
          return !(this.cartList.find(item => !item.checked))
        }
      },
      methods: {
        checkClick() {
          if (this.isSelectAll) {   //全部选中的情况
            this.cartList.forEach(item => item.checked = false)
          }else {   //有没有选中的情况
            this.cartList.forEach(item => item.checked = true)
          }
        },
        clacClick() {
          if (!this.isSelectAll) {
            // console.log(this.$toast.methods);
            this.$toast.show('请选择要购买的商品')
          }
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    /*line-height: 40px;*/
    height: 40px;
    background-color: #eee;
    align-items: center;
    font-size: 14px;

  }

  .check-all {
    width: 60px;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .totle-price {
    margin-left: 50px;
    flex: 1;
    line-height: 40px
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #ffffff;
    text-align: center;
    line-height: 40px

  }
</style>
