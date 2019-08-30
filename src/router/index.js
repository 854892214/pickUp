import vue from "vue"
import Router from "vue-router"
import home from "@/components/Home/Home.vue"
import order from "@/components/order/order.vue"
import NotFound from "@/components/404/NotFound.vue"
import details from "@/components/details/details.vue"
import bill from "@/components/bill/bill.vue"
import paySuccess from  '@/components/success/pay-success.vue'
import OrderHistory from  '@/components/orderHistory/orderHistory'
import register from  '@/components/register/register.vue'
import personHome from  '@/components/tabbar/personHome.vue'
import email from  '@/components/email/email.vue'
vue.use(Router)
export default new Router({
    // base: "/h5/test/food/pick_up/",   //测试服务器测试
  base: "/h5/food/pickup/",         //nginx测试
  // base: "/h5/food/pick_up/",         //线上
    routes: [
        { path: '/home', component: home },
        { path: '/order', component: order  },
        { path: '/details', component: details  },
        { path: '/bill', component: bill, name: 'bill' },
        { path: '/paySuccess', component: paySuccess },
        { path: '/OrderHistory', component: OrderHistory},
        { path: '/register', component: register},
        { path: '/personHome', component: personHome},
        { path: '/email', component: email},
        { path: '*', component: NotFound},
    ],
    scrollBehavior(to, from, savedPosition) {
      if(savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
})
