<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <p>参数信息</p>
    <table v-for="(table,index) in paramInfo.sizes"
            class="info-size" :key="index">
      <tr v-for="(tr,trIndex) in table" :key="trIndex">
        <td v-for="(td,tdIndex) in tr" :key="tdIndex">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(item,index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{item.key}}</td>
        <td class="info-param-value">{{item.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    font-size: 14px;
    padding: 20px 10px;
    border-bottom: 5px solid #f2f5f8;
    text-align: center;
  }

  .param-info p {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候，会挤到key，所以给一个固定宽度*/
    width: 70px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.5);
  }

  .info-param-value {
    color: #eb4868;
  }

  .info-img {
    width: 100%;
  }
</style>
