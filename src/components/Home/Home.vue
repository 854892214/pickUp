<template>
  <div>
    <div v-if="isShow">
      <HomeDetails></HomeDetails>
      <!--<tabbar name="home"></tabbar>-->
    </div>
    <home-header v-if="!isShow"></home-header>
  </div>
</template>

<script>
  //引入过渡组件，正常情况该组建应设为全局组件
  import HomeHeader from "@/components/transition/trans";
  import HomeDetails from "@/components/Home/Home-Details";
  import $ from "jquery";
  import {
    MessageBox
  } from "mint-ui";

  export default {
    components: {
      HomeHeader,
      HomeDetails
    },
    data() {
      return {
        isShow: false
      };
    },
    methods: {
      init() {
        let code = "";
        let paytype = "";

        if (process.env.NODE_ENV === "development") {
          console.log("开发环境")
          paytype = "alipay";
          // paytype = "wechat";
          this.$store.commit("userId", "808080");//o7Ybov3nsr46FuDK1XTu55_7SWrQ33333  //o7Ybov0la-BWZvJkWwpfCYvcdiy4
        } else {
          // paytype = "wechat";
          // this.$store.commit("userId", "808080");
          console.log("生产环境")
          // 不是微信也不是支付宝打开
          if (!this.common.is_weixin() && !this.common.is_alipay()) {
            return MessageBox.alert("请使用微信或支付宝客户端").then(action => {
              if (this.common.is_weixin()) {
                this.common.closeWx();
              } else if (this.common.is_alipay()) {
                this.common.closeAli();
              } else {
                history.back();
              }
            });
          }
          // 是微信打开
          if (this.common.is_weixin()) {
            code = this.common.spliceRouter("code");
            paytype = "wechat";
          }
          //支付宝打开
          if (this.common.is_alipay()) {
            code = this.common.spliceRouter("auth_code");
            paytype = "alipay";
          }
        }

        let qrcodenum = "";
        let sikp_home = 'FALSE';
        if (this.common.spliceRouter("state")) {
          var s = this.common.spliceRouter("state").split(",");
          qrcodenum = s[1];
          sikp_home = s[2];
          this.$store.commit("qrCode", qrcodenum);
        }
        if (qrcodenum == "" || qrcodenum == null) {
          qrcodenum = this.$store.getters.getQrCode;
        }
        if (qrcodenum == "" || qrcodenum == null) {
          MessageBox.alert("非法访问").then(action => {
            if (this.common.is_weixin()) {
              this.common.closeWx();
            } else if (this.common.is_alipay()) {
              this.common.closeAli();
            } else {
              history.back();
            }
          });
          return false;
        }
        //请求地址
        var url = this.common.baseURL + "mobi/store/goodsh5Info?qrcode=" + qrcodenum + "&code=" + code +
          "&paytype=" + paytype + "&state=" + this.$store.getters.getUserId;
        this.axios.get(url).then(result => {
          //先判断相应结果是否成功
          let data = result.data;
          console.log(result)
          if (data.result_code == "ok" && data.result_msg == "SUCCESS") {
            //如果用户id为空
            if (data.userid == "" || data.userid == null) {
              MessageBox.alert("授权失败").then(action => {
                if (this.common.is_weixin()) {
                  this.common.closeWx();
                } else if (this.common.is_alipay()) {
                  this.common.closeAli();
                } else {
                  history.back();
                }
              });
              return false;
            }
            document.title = data.stroeName;

            //获取打样时间
            let businessTimeSlot = data.business_time_slot;
            //获取指定时区的当前时间
            let nowTzTime = this.moment().tz(data.timezone).format("HH:mm");
            if (businessTimeSlot) {
              let time = businessTimeSlot.split(",");
              let businessTimeSlotStartTime = time[0];
              let businessTimeSlotEndTime = time[1];
              //当天
              if(businessTimeSlotStartTime < businessTimeSlotEndTime){
                if(nowTzTime < businessTimeSlotStartTime || nowTzTime > businessTimeSlotEndTime){
                  MessageBox.alert("抱歉,本店打烊了!").then(action => {
                    // history.back();
                    if (this.common.is_weixin()) {
                      this.common.closeWx();
                    } else if (this.common.is_alipay()) {
                      this.common.closeAli();
                    } else {
                      history.back();
                    }
                  });
                  return false;
                }
              }else {
                if(nowTzTime < businessTimeSlotStartTime && nowTzTime > businessTimeSlotEndTime){
                  MessageBox.alert("抱歉,本店打烊了!").then(action => {
                    // history.back();
                    if (this.common.is_weixin()) {
                      this.common.closeWx();
                    } else if (this.common.is_alipay()) {
                      this.common.closeAli();
                    } else {
                      history.back();
                    }
                  });
                  return false;
                }
              }
            }


            //数据存储到会话
            this.$store.commit("storeName", data.stroeName); //店铺名称
            this.$store.commit("storeAddress", data.stroeAddress); //店铺地址
            this.$store.commit("storeMobile", data.stroeMobile ? data.stroeMobile : '暂无电话'); //店铺电话
            this.$store.commit("isTax", data.isTax); //是否有税费
            // this.$store.commit("isTax", "TRUE"); //是否有税费
            this.$store.commit("isTip", data.isTip); //是否有小费
            this.$store.commit("storeId", data.store_id); //店铺ID
            this.$store.commit("taxRate", data.taxRate); //税率
            this.$store.commit("tipType", data.tipType); //小费类型
            this.$store.commit("tipVal", data.tipVal); //小费取值范围
            this.$store.commit("userId", data.userid); //用户ID
            this.$store.commit("timeZone", data.timezone); //时区
            this.$store.commit("discount", data.discount); //折扣
            this.$store.commit("isStoreUser", data.isStoreUser); //店铺用户是否存在
            // this.$store.commit("storeScanGoodsUser", data.storeScanGoodsUser ? JSON.stringify(data.storeScanGoodsUser) : {}); //店铺用户信息
            this.$store.commit("menuId", data.menuId); //菜单ID
            this.$store.commit("isNoTip", data.is_no_tip); //是否无小费
            this.$store.commit("isCustomTip", data.is_custom_tip); //是否自定义小费  //data.is_custom_tip
            // this.$store.commit("isNullDiscount", true); //折前还是折后
            this.$store.commit("isAfterDiscountTip", data.is_after_discount_tip); //是折前前小费
            this.$store.commit("isAfterDiscountTax", data.is_after_discount_tax); //是否折前税费
            this.$store.commit("afterOrdersToTime", data.takeOutTimeConf); //自提时间
            this.$store.commit("businessTimeSlot", data.business_time_slot)//打烊时间
            if (data.isStoreUser == "TRUE") {
              this.$store.commit('isStoreUser', data.isStoreUser)//是会员
              this.$store.commit("storeScanGoodsUser", data.isStoreUser == "TRUE" ? JSON.stringify(data.storeScanGoodsUser) : {}); //店铺用户信息
              if (data.storeScanGoodsUser.hasOwnProperty("real_integral_number")) {
                this.$store.commit("nowIntegralNumber", data.storeScanGoodsUser.real_integral_number);//当前用户积分数
              }
            } else if (data.isStoreUser == "FALSE") {
              this.$store.commit('isStoreUser', data.isStoreUser)//不是会员
            }
            if (data.open_membership_system == "TRUE") {
              this.$store.commit("openMembershipSystem", data.open_membership_system)//是否开启会员系统
              if (data.hasOwnProperty("from_integral_convert_ratio")) {
                this.$store.commit("fromIntegralConvertRatio", data.from_integral_convert_ratio)//积分兑换折扣金额的比例
              }
              if (data.hasOwnProperty("to_integral_convert_ratio")) {
                this.$store.commit("toIntegralConvertRatio", data.to_integral_convert_ratio)//积分兑换折扣金额的比例
              }
            } else {
              this.$store.commit("openMembershipSystem", data.open_membership_system)//是否开启会员系统
            }
            if (sikp_home === 'TRUE') {
              this.$store.commit("goodsOrderNum", ""); //订单号
              this.$store.commit("goodsOrderId", "")
              this.$store.commit("shopCartList", JSON.stringify([]))
              this.$store.commit("pickUpUserName", "")
              this.$store.commit("pickUpUserPhone", "")
              this.$store.commit("pickUpUserRemark", "")
              this.$router.replace("/order");
            } else {
              document.body.className += " bg";
              this.isShow = true;
            }
          } else {
            MessageBox.alert("系统错误").then(action => {
              if (this.common.is_weixin()) {
                this.common.closeWx();
              } else if (this.common.is_alipay()) {
                this.common.closeAli();
              } else {
                history.back();
              }
            });
          }
        });
      }
    },
    created() {
      this.init();
    },
    mounted: function () {

    },
    watch: {}
  };
</script>

<style scoped>


</style>
