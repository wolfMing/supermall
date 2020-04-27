<template>
  <div id="detial">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <better-scroll class="content" ref="betterScorll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info :imagesInfo="imagesInfo" @imageLoad="imageLoad"></detail-images-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
    </better-scroll>
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

  import BetterScroll from 'components/common/betterscroll/BetterScroll'

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      BetterScroll,
      DetailImagesInfo,
      DetailParamInfo,
      DetailCommentInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        res: null,
        goods: {},
        shop: {},
        imagesInfo: {},
        paramInfo: {},
        commentInfo: {},
      }
    },
    created() {
      //保存传入的商品id
      this.iid = this.$route.params.iid

      getDetail(this.iid).then((res) => {
        //1.获取顶部的图片轮播图片
        const data = res.result
        this.topImages = res.result.itemInfo.topImages
        console.log(data);
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.获取商家信息
        this.shop = new Shop(data.shopInfo)
        //4.保存商品详情数据
        this.imagesInfo = data.detailInfo
        //5.保存商品的参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6.保存评论信息
        this.commentInfo = data.rate.list[0]
      })
    },
    methods: {
      imageLoad() {
        this.$refs.betterScorll.refresh()
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
