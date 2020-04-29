<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childrenComps/CartList'

  import {mapGetters} from 'vuex'

  import BetterScroll from 'components/common/betterscroll/BetterScroll'
  import store from 'store/store'

  export default {
    name: "cart",
    data() {
      return {}
    },
    store,
    components: {
      NavBar,
      CartList,
      BetterScroll,
    },
    computed: {
      //两种语法
      // ...mapGetters(['cartListLength'])
      ...mapGetters({
        cartLength: 'cartListLength',
      }),
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
