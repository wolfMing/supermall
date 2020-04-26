<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <better-scroll class="content"
                   ref="betterScroll"
                   :probe-prop="3"
                   :pull-up-load="true"
                   @scroll="contentScroll"
                   @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </better-scroll>

    <!--组件上要监听原生事件，要使用native-->
    <back-top @click.native="backClick" v-show="backTopIsShow"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childrenComps/HomeSwiper'
  import RecommendView from './childrenComps/RecommendView'
  import FeatureView from './childrenComps/FeatureView'

  import BetterScroll from 'components/common/betterscroll/BetterScroll'
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "../../network/home"
  import {debounce} from 'common/utils.js'

  export default {
    name: "home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      BetterScroll,
      GoodsList,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        backTopIsShow: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
    //  1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      const refresh =  debounce(this.$refs.betterScroll.refresh,20)
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      })
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        //ref:如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象
        this.$refs.betterScroll.scrollTo(0,0,700)
      },
      contentScroll(position) {
        this.backTopIsShow = (-position.y) > 1000
        // console.log(position);
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page++
          //完成上拉加载更多
          this.$refs.betterScroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  /*#home {*/
  /*  height: 100vh;*/
  /*}*/
  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    /*当距离顶部的距离为44px时，修改position为fixed*/
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  /*.content {*/
  /*  height: calc(100% - 44px - 49px);*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
