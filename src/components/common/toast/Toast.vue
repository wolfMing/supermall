<template>
    <div class="toast" v-show="isShow">
      <div class="message">{{message}}</div>
    </div>
</template>

<script>
    export default {
      name: "Toast",
      data() {
        return {
          message: '',
          isShow: false
        }
      },
      methods: {
        show(message='这是toast弹窗', duration=2000) {
          this.isShow = true
          this.message = message

          setTimeout(() => {
            this.isShow = false
            this.message = ''
          },duration)
        }
      }
    }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    z-index: 999;

    background-color: rgba(0,0,0,.7);
  }

  .message {
    color: #fff;
  }
</style>
