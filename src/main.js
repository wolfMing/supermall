import Vue from 'vue'
import App from './App.vue'
import router from './router'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//事件总线
Vue.prototype.$bus = new Vue()
Vue.use(toast)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
