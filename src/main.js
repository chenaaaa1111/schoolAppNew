// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from "vuex"
import store from "./store/store.js"
import App from './App'
import ElementUI from 'element-ui'
import 'lib-flexible'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import router from './router';
import   "babel-polyfill"
import axios from 'axios';
// import axios from 'axios';
import { Tab, Tabs,List,Cell,Icon,Image,Row, Col,Field,Button,CellGroup,Toast,Uploader      } from 'vant';


Vue.config.productionTip = false;
// Vue.use(axios);

Vue.use(ElementUI)
Vue.use(Tab);Vue.use(Tabs);Vue.use(Image);Vue.use(List);Vue.use(Cell);Vue.use(Icon);Vue.use(Row);Vue.use(Col);Vue.use(Field);Vue.use(Button);
Vue.use(Toast);Vue.use(Uploader);
Vue.use(CellGroup)


/* eslint-disable no-new */ 
var vm= new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default vm;