import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TDesign from 'tdesign-vue';
// 引入组件库全局样式资源
import 'tdesign-vue/es/style/index.css';
import 'normalize.css';

Vue.config.productionTip = false;

document.documentElement.setAttribute('theme-mode', 'dark');

Vue.use(TDesign);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
