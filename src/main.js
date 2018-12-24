import Vue from 'vue'
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';
import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  created() {
    Vue.use(Tooltip);
  }
}).$mount('#app')
