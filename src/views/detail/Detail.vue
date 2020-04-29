<template>
  <div id="detial">
    <detail-nav-bar class="detail-nav" ref="detailnav" @titleClick="titleClick"></detail-nav-bar>
    <better-scroll class="content" ref="betterScroll"
                  :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info :imagesInfo="imagesInfo" @imageLoad="imageLoad"></detail-images-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </better-scroll>
    <!--组件上要监听原生事件，要使用native-->
    <back-top @click.native="backTop" v-show="backTopIsShow"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailImagesInfo from './childComps/DetailImagesInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommenntInfo'
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import BetterScroll from 'components/common/betterscroll/BetterScroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {itemListener, backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";
  import store from 'store/store'

  export default {
    name: "Detail",
    store,
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      BetterScroll,
      DetailImagesInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
    },
    data() {
      return {
        iid: null,          //商品id
        topImages: [],      //轮播的图片
        // res: null,         //
        goodsInfo: {},          //
        shop: {},           //
        imagesInfo: {},     //
        paramInfo: {},      //
        commentInfo: {},    //
        recommends: [],     //
        themeTopYs: [],     //
        getThemeTopY: null, //
        currentIndex: 0      //
        // backTopIsShow: false
      }
    },

    mixins: [itemListener, backTopMixin],
    created() {
      //保存传入的商品id
      this.iid = this.$route.params.iid
      //获取详情数据
      getDetail(this.iid).then((res) => {
        //1.获取顶部的图片轮播图片
        const data = res.result
        this.topImages = res.result.itemInfo.topImages
        // console.log(data);
        //2.获取商品信息
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.获取商家信息
        this.shop = new Shop(data.shopInfo)
        //4.保存商品详情数据
        this.imagesInfo = data.detailInfo
        //5.保存商品的参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6.保存评论信息
        this.commentInfo = data.rate.list[0]
      })
      //获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      //给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      },100)
    },
    mounted(){},
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        //方法1： 图片全加载完后在执行方法
        // this.$refs.betterScroll.refresh()
        //  方法2；每加载完一张图片执行一次方法，最后使用防抖方法
        this.newRefresh()

        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.betterScroll.scrollTo(0,-this.themeTopYs[index]+44,500)
      },
      contentScroll(position) {
        //获取页面滚动的y值
        const positionY = -position.y + 44
      //  positionY和主题中国的值进行对比
        let length = this.themeTopYs.length
        //方法1：直接判断4个标题和滚动的y轴距离 之间的关系，最后一个要特殊判断
        // for (let i = 0; i < length; i++) {
        //   // if (positionY > this.themeTopYs[i]  && positionY < this.themeTopYs[i+1]) {}
        //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <
        //     this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //       this.currentIndex = i;
        //       this.$refs.detailnav.currentIndex = this.currentIndex
        //     console.log(this.currentIndex);
        //   }
        // }
        //方法2：（空间换时间）
        //     在4个标题后再加一个能使用的最大的数字，就可以让4个标题之间对应的关系使用同一个判断
        for (let i = 0; i < length - 1; i++) {
          if ((this.currentIndex !== i) && (i < length -1 && positionY >= this.themeTopYs[i]
          && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.detailnav.currentIndex = this.currentIndex
          }
        }

        this.listenerShowBackTop(position)
      },
      addToCart() {
      //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.newPrice
        product.iid = this.iid

      //2.将商品添加到购物车中
        this.$store.dispatch('addCart',product)
      }
    }
  }
</script>

<style scoped>
  #detial {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
