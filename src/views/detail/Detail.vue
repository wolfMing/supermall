<template>
  <div>
    <detail-nav-bar>
    </detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from "./childComps/DetailSwiper";

  import {getDetail} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null,
        topImages: [],
        res: null
      }
    },
    created() {
      //保存传入的商品id
      this.iid = this.$route.params.iid

      getDetail(this.iid).then((res) => {
        //获取顶部的图片轮播图片
        this.topImages = res.result.itemInfo.topImages
        // console.log(res.result.itemInfo.topImages);
      })
    }
  }
</script>

<style scoped>

</style>
