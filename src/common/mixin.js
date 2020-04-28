import {debounce} from "./utils";

export const itemListener = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    //1.图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.betterScroll.refresh, 100)
    //对监听的事件进行保存
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener )
  }
}
