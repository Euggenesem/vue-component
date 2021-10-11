import Vue from 'vue'
import App from './App.vue'
import AxiosVue from "vue-axios";
import {http} from "./axios.config";

Vue.config.productionTip = false
Vue.use(AxiosVue, {
  http
})

new Vue({
  render: h => h(App),
}).$mount('#app')
