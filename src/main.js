import Vue from "vue"
import App from "./App.vue"
import router from "@/router/index.js"
import store from "@/store/index.js"
//1:引入mint-ui 样式文件
// import "mint-ui/lib/style.min.css"
//1:引入mui 样式文件
import "./lib/mui/css/mui.css"
import "./lib/mui/css/iconfont.css"
import moment from "moment-timezone";
import "./lib/mui/css/icons-extra.css"
import OrderHistory from "@/components/orderHistory/orderHistory";
import tabbars from "@/components/tabbar/tabbar"
import { Popup, MessageBox, Spinner, Progress,Picker,TabContainer, TabContainerItem,Cell,Lazyload,Swipe, SwipeItem,Tabbar, Navbar, TabItem,Loadmore, Radio } from 'mint-ui';
//阻止启动生产消息
Vue.config.productionTip = false
Vue.use(store);
Vue.component(OrderHistory.name,OrderHistory);
Vue.component(tabbars.name, tabbars);
import qs from "qs"
import axios from "axios"
import common from "../commonFunction/common.js"
// import $ from 'jquery'
Vue.prototype.moment = moment;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.common = common
//配置跨域保存Session
axios.defaults.withCredentials = true;
Vue.component(Popup.name, Popup);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Spinner.name, Spinner);
Vue.component(Progress.name, Progress);
Vue.component(Picker.name, Picker);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Cell.name, Cell);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Navbar.name, Navbar);
Vue.component(Radio.name, Radio);

Vue.filter("datetimeFilter", function (val) {
  var date = new Date(val);
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDay();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  m < 10 && (m = "0" + m);
  d < 10 && (d = "0" + d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})
Vue.component('remote-script', {
  render: function (createElement) {
  var self = this;
  return createElement('script', {
      attrs: {
          type: 'text/javascript',
          src: this.src
      },
      on: {
          load: function (event) {
              self.$emit('load', event);
          },
          error: function (event) {
              self.$emit('error', event);
          },
          readystatechange: function (event) {
              if (this.readyState == 'complete') {
                  self.$emit('load', event);
              }
          }
      }
  });
},
props: {
  src: {
      type: String,
      required: true
  }
}
});
const windowHeight = window.innerHeight
Vue.directive('fixedInput', function (el, binding) {
  el.addEventListener('blur', function () {
    let windowFocusHeight = window.innerHeight
    if (windowHeight == windowFocusHeight) {
      return
    }
    // console.log(windowHeight + '--' + windowFocusHeight);
    // console.log('修复');
    let currentPosition;
    let speed = 1; //页面滚动距离
    currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    window.scrollTo(0, currentPosition); //页面向上滚动
    currentPosition += speed; //speed变量
    window.scrollTo(0, currentPosition); //页面向下滚动
  })
})
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app');
