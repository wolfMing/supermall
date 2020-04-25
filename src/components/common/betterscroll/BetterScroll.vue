<template>
<!--  ref:如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象-->
<!--  ref:如果是绑定在普通元素的，那么通过this.$refs.refname获取到的是元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

    export default {
      name: "betterScroll",
      props: {
        probeType: {
          type: Number,
          default: 0
        },
        pullUpLoad: {
          type: Boolean,
          default: false
        }
      },
      data(){
        return {
          scroll :null
        }
      },
      mounted() {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper,{
            /**
             * prototype: 0,1 没啥效果
             * 为2时，只能监听到手指在屏幕上移动时的位置，松手后的惯性位移无法监听
             * 为3时，只要发生位移就会监听到位置
             */
            probeType: this.probeType,
            pullUpLoad: true
          })

          this.scroll.on('scroll',position => {
            // console.log(position);
          })

          this.scroll.on('pullUpLoad', () => {
            console.log('加载更多');

            setTimeout(() => {
              this.scroll.finishPullDown()
            },3000)
          })
        })
      },
      methods: {
        scrollTo(x, y, time=500) {
          this.scroll.scrollTo(x, y, time)
        }
      }
    }
</script>

<style scoped>
  .wrapper {
    /*height: 300px;*/
    background-color: pink;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
