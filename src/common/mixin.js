import {debounce} from "./utils";
import {POSITION_TOP} from "./const";
import BackTop from "components/content/backtop/BackTop";

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

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      backTopIsShow: false,
    }
  },
  methods: {
    backTop() {
      this.$refs.betterScroll.scrollTo(0,0,700)
    },
    listenerShowBackTop(position) {
      this.backTopIsShow = (-position.y) > POSITION_TOP
    }
  }
}
