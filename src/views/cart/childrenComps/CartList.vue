<template>
  <div class="cart-list">
    <better-scroll class="contents" ref="betterScroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index" :item-info="item"></cart-list-item>
    </better-scroll>
  </div>
</template>

<script>
  import BetterScroll from 'components/common/betterscroll/BetterScroll'

  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      BetterScroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.betterScroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px);
  }
  .contents{
   height: 100%;
  }
</style>
