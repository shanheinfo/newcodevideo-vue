import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router'; // 导入路由配置文件
import GlobalVariablePlugin from './components/globalVariablePlugin';

Vue.use(Vuetify);

Vue.config.productionTip = false;
// 使用全局变量
Vue.use(GlobalVariablePlugin);

const vuetify = new Vuetify(); // 实例化 Vuetify

new Vue({
  vuetify, // 将 Vuetify 实例传递给 Vue 实例
  render: h => h(App),
  router, // 将路由配置传递给 Vue 实例
}).$mount('#app');
