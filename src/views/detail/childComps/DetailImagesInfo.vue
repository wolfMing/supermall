<template>
  <div class="images-info" v-if="Object.keys(imagesInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ imagesInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item,index) in imagesInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(image,imageIndex) in item.list"
             :src="image" :key="imageIndex" alt="" @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      imagesInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad() {
        //方法1： 图片全加载完后在执行方法
        // if (++this.counter === this.imagesLength) {
        //   this.$emit('imageLoad')
        // }
      //  方法2；每加载完一张图片执行一次方法，最后使用防抖方法
        this.$emit('imageLoad')
      }
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo().detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .images-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start,
  .info-desc .end {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before,
  .info-desc .end::after {
    position: absolute;
    bottom: 0;
    width: 5px;
    height: 5px;
    content: '';
    background-color: #333;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    font-size: 14px;
    padding: 15px 0;
  }

  .info-key {
    font-size: 15px;
    margin: 10px 0 10px 15px;
    color: #333;
  }

  .info-list img {
    width: 100%;
  }
</style>
