<template>
  <div>
    <home-header v-show="!isGetData"></home-header>
    <div v-if="isGetData">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-back" style="color:red" @click="jump"
           v-if="this.$route.query.source === 'orderList'"></a>
        <h1 class="mui-title">{{this.$route.query.source === 'orderList' ? '订单详情' : '结账单'}}</h1>
      </header>
      <div class="mui-content">
        <div class="info">
          <!--<div class="total-amount">${{goodsOrderInfo.amount.toFixed(2)}}</div>-->
          <div class="total-amount" :style="goodsOrderInfo.paystatus!==0?'':'padding:1rem 0 0 0'">${{totalAmount}}</div>
          <div class="order-status">({{goodsOrderInfo.paystatus == 0 ? '待付款':goodsOrderInfo.paystatus == 1 ? '已支付' :
            goodsOrderInfo.paystatus == 2 ? '已退款' : goodsOrderInfo.paystatus == 4 ? '已完成' : ''}})
          </div>
          <div class="desk-no" v-show="goodsOrderInfo.paystatus!==0">取餐号:{{goodsOrderInfo.pick_no}}</div>
          <div class="goods-header">
            <div class="name">菜名</div>
            <div class="count">数量</div>
            <div class="price">价格</div>
          </div>
          <div class="goods-item" v-for="goods of goodsList">
            <div class="group-name">
              <p class="name">{{goods.name}}</p>
              <p class="spec-list">
                <span v-for="(itemSpec,i) of goods.specificationInfoList"
                      :key="i"> {{(i==0?'':'/')+itemSpec.name}}</span>
              </p>
            </div>
            <div class="group-count">x{{goods.quantity}}</div>
            <div class="group-amount">${{goods.amount.toFixed(2)}}</div>
          </div>
          <div class="cost-info">
            <div class="item">
              <p>小计</p>
              <p class="subtotal">${{goodsOrderInfo.goods_total_amount.toFixed(2)}}</p>
            </div>
            <div class="item" v-if="goodsOrderInfo.discount_amount > 0">
              <p>折扣金额({{this.$store.getters.getDiscount * 10}}折)</p>
              <p>-${{goodsOrderInfo.discount_amount.toFixed(2)}}</p>
            </div>
            <div class="item" v-if="goodsOrderInfo.is_tax === 'TRUE'">
              <p>税费</p>
              <p class="">${{goodsOrderInfo.tax.toFixed(2)}}</p>
            </div>
            <div class="item" v-if="goodsOrderInfo.is_tip === 'TRUE'">
              <p>小费</p>
              <p class="">${{goodsOrderInfo.tip.toFixed(2)}}</p>
            </div>
            <div class="item" v-if="goodsOrderInfo.integral_deduction_amount > 0">
              <p>积分抵扣金额</p>
              <p>-${{goodsOrderInfo.integral_deduction_amount.toFixed(2)}}</p>
            </div>
          </div>
          <!--<div class="total">合计：<span class="price">${{goodsOrderInfo.amount.toFixed(2)}}</span></div>-->
          <div class="total">合计：<span class="price">${{totalAmount}}</span></div>
        </div>

        <div class="order-info">
          <div class="title">订单信息</div>
          <div class="info-cell">
            <div class="info-item">
              <p>下单时间</p>
              <p>{{common.toTimeZone(goodsOrderInfo.createtime,'UTC',this.$store.getters.getTimeZone)}}</p>
            </div>
            <div class="info-item" v-if="goodsOrderInfo.paytime!==undefined">
              <p>支付时间</p>
              <p>{{common.toTimeZone(goodsOrderInfo.paytime,'UTC',this.$store .getters.getTimeZone)}}</p>
            </div>
            <div class="info-item">
              <p>客户姓名</p>
              <p>{{goodsOrderInfo.customer_name}}</p>
            </div>
            <div class="info-item">
              <p>客户电话</p>
              <p>{{goodsOrderInfo.customer_mobile}}</p>
            </div>
            <div class="info-item">
              <p>自提时间</p>
              <p>{{showTimeText}}</p>
            </div>
          </div>
          <div class="cancel-order-box">
            <div class="cancel-order pay-btn" @click.stop="payment()" v-if="goodsOrderInfo.paystatus==0">立即支付</div>
            <div class="cancel-order" @click.stop="cancelOrder()" v-if="goodsOrderInfo.paystatus==0"
                 style="margin:0 1rem;">取消订单
            </div>
            <div class="cancel-order"
                 v-if="goodsOrderInfo.paystatus==1||goodsOrderInfo.paystatus==2||goodsOrderInfo.paystatus==4"
                 @click.stop="showReceipt">查看收据
            </div>
          </div>
        </div>
      </div>
      <!--<mt-popup v-model="receipt" popup-transition="popup-fade" style="width: 90%;">-->
      <!--<div>-->
      <!--<mt-radio align="right" title="选择收据" v-model="radioVal" :options="options"></mt-radio>-->
      <!--</div>-->
      <!--</mt-popup>-->
      <mt-popup class="mintui-popup" popup-transition="popup-fade" v-model="messageBoxEmail">
        <div class="mint-msgbox" style="">
          <div class="mint-msgbox-header">
            <div class="mint-msgbox-title">提示</div>
          </div>
          <div class="mint-msgbox-content">
            <div class="mint-msgbox-message">请输入您的邮箱</div>
            <div class="mint-msgbox-input" style="">
              <input placeholder="" type="text" class="email-text" v-fixedInput>
              <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
            </div>
          </div>
          <div class="mint-msgbox-btns">
            <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="emailConfirm('cancel')">取消</button>
            <button class="mint-msgbox-btn mint-msgbox-confirm" @click="emailConfirm('confirm')">确定</button>
          </div>
        </div>
      </mt-popup>
      <mt-popup v-model="receipt" popup-transition="popup-fade" class="mintui-popup">
        <p class="receipt-title">选择收据</p>
        <div class="receipt-box">
          <div class="receipt-item" @click="chooseReceipt('NO')">
            <div class="no-receipt-icon icon"></div>
            <p class="receipt-desc">无收据</p>
          </div>
          <div class="receipt-item" @click="chooseReceipt('PAPER')">
            <div class="paper-receipt-icon icon"></div>
            <p class="receipt-desc">纸质收据</p>
          </div>
          <div class="receipt-item" @click="chooseReceipt('EMAIL')">
            <div class="email-receipt-icon icon"></div>
            <p class="receipt-desc">邮件</p>
          </div>
          <div class="receipt-item" @click="chooseReceipt('TEXT')">
            <div class="text-receipt-icon icon"></div>
            <p class="receipt-desc">发送文本</p>
          </div>
        </div>
      </mt-popup>
      <mt-popup v-model="messageBoxPhone" popup-transition="popup-fade" class="mintui-popup">
        <div class="mint-msgbox" style="">
          <div class="mint-msgbox-header">
            <div class="mint-msgbox-title">提示</div>
          </div>
          <div class="mint-msgbox-content">
            <div class="mint-msgbox-message">请输入您的电话</div>
            <div class="mint-msgbox-input">
              <div class="drop-down-icon"></div>
              <select class="select-wrapper" v-model="countryCode">
                <option value="1">1+</option>
                <option value="86">86+</option>
              </select>
              <input type="number" class="mui-input-clear phone-input" @blur="blurInput" v-model="phone" v-fixedInput
                     placeholder="请填写您的手机号" oninput="if(value.length>11)value=value.slice(0,11)">
              <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
            </div>
          </div>
          <div class="mint-msgbox-btns">
            <button class="mint-msgbox-btn mint-msgbox-cancel " @click="phoneConfirm('cancel')">取消</button>
            <button class="mint-msgbox-btn mint-msgbox-confirm " @click="phoneConfirm('confirm')">确定</button>
          </div>
        </div>
      </mt-popup>
      <tabbar :name="name" path="paySuccess" :orderNum="this.$route.query.orderNum"
              v-if="this.$route.query.source != 'orderList'"></tabbar>
    </div>
  </div>
</template>

<script>
  import HomeHeader from "@/components/transition/trans";
  import {MessageBox, Indicator, Toast} from "mint-ui";

  export default {
    name: "home",
    components: {
      HomeHeader
    },
    data() {
      return {
        //用于判断数据是否获取到
        isGetData: false,
        //商品数据
        goodsList: [],
        //订单数据
        goodsOrderInfo: {},
        //合计金额
        totalAmount: 0,
        //收据弹窗
        receipt: false,
        //电话弹窗
        messageBoxPhone: false,
        //邮箱弹窗
        messageBoxEmail: false,
        //国家码
        countryCode: "1",
        //三分钟不可重复发送电话
        taskEndTime: 180,
        //无法点击电话弹框确认
        phoneDisable: true,
        //商品订单id
        goodsOrderId: 0,
        //支付按钮禁用
        isPayBtnDisabled: false,
        //计时器
        task: "",
        //showTimeText
        showTimeText: "",
      };
    },
    methods: {
      jump() {
        this.$router.replace("/OrderHistory");
      },
      //初始化数据
      init() {
        if (this.$route.query.orderNum == "" || this.$route.query.orderNum == null) {
          MessageBox.alert("非法访问").then(action => {
            if (this.common.is_weixin()) {
              this.common.closeWx();
            } else if (this.common.is_alipay()) {
              this.common.closeAli();
            } else {
              history.back();
            }
          });
          return;
        }
        this.task = setInterval(() => {
          this.axios.get(this.common.baseURL + "mobi/goodsorder/one?num=" + this.$route.query.orderNum).then(result => {
            console.log(result)
            if (result.data.result_code == "ok" && result.data.result_msg == "SUCCESS") {
              // result.data.goodsOrder.paystatus=1
              let judge = ""
              if (this.$route.query.paystatus == "TRADE_SUCCESS") {//TRADE_SUCCESS
                judge = result.data.goodsOrder.paystatus == 1 || result.data.goodsOrder.paystatus == 2 || result.data.goodsOrder.paystatus == 4
              }else if(this.$route.query.from=="fromOrderHistory"){//fromOrderHistory
                judge = result.data.goodsOrder.paystatus == 0 || result.data.goodsOrder.paystatus == 1 || result.data.goodsOrder.paystatus == 2 || result.data.goodsOrder.paystatus == 4
              }
              else {
                judge = result.data.goodsOrder.paystatus == 0
              }
              console.log(judge)
              if (judge) {
                this.goodsOrderId = result.data.goodsOrder.id
                clearInterval(this.task);
                this.goodsList = [];
                this.goodsOrderInfo = result.data.goodsOrder;
                this.dateComputed();
                this.totalAmount = 0;
                for (let item of result.data.goodsOrder.goodsOrderInfoList) {
                  this.totalAmount += item.total_amount
                  if (item.type == 0) {
                    if (item.reduced_quantity > 0) {
                      let quantity = item.quantity - item.reduced_quantity; //当前商品数量 购买数量 - 减菜数量
                      if (quantity > 0) {
                        let goodsTotalAmount = this.common.round(item.univalent * quantity, 2);
                        if (item.specificationInfoList && item.specificationInfoList.length > 0) {
                          for (let specificationInfo of item.specificationInfoList) {
                            if (specificationInfo.amount != "") {
                              goodsTotalAmount = goodsTotalAmount + this.common.round(specificationInfo.amount * quantity, 2)
                            }
                          }
                        }
                        item.quantity = quantity;
                        item.total_amount = goodsTotalAmount;
                        item.amount = goodsTotalAmount;
                        this.goodsList.push(item)
                      }
                    } else {
                      this.goodsList.push(item);
                    }
                  }
                }
                let tip, tax, integralDeductionAmount, discountAmount;
                if (this.goodsOrderInfo.tip !== undefined) {
                  tip = this.goodsOrderInfo.tip
                } else {
                  tip = 0
                }
                if (this.goodsOrderInfo.integral_deduction_amount !== undefined) {
                  integralDeductionAmount = this.goodsOrderInfo.integral_deduction_amount
                } else {
                  integralDeductionAmount = 0
                }
                if (this.goodsOrderInfo.tax !== undefined) {
                  tax = this.goodsOrderInfo.tax
                } else {
                  tax = 0
                }
                if (this.goodsOrderInfo.discount_amount !== undefined) {
                  discountAmount = this.goodsOrderInfo.discount_amount
                } else {
                  discountAmount = 0
                }
                console.log(this.totalAmount, this.goodsOrderInfo)
                this.deductionIntegral(this.goodsOrderInfo.deduction_integral)
                this.totalAmount = (this.totalAmount + tip + tax - integralDeductionAmount - discountAmount).toFixed(2)
                this.isGetData = true;
              } else if (result.data.goodsOrder.paystatus == 3) {
                MessageBox.alert("当前订单已被取消").then(action => {
                  if (this.common.is_weixin()) {
                    this.common.closeWx();
                  } else if (this.common.is_alipay()) {
                    this.common.closeAli();
                  } else {
                    history.back();
                  }
                });
              } else if (result.data.goodsOrder.paystatus == 1 || result.data.goodsOrder.paystatus == 2 || result.data.goodsOrder.paystatus == 4) {
                this.receipt = true
              }
            } else {
              MessageBox.alert("订单查询失败").then(action => {
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
        }, 3000)

      },
      //取消付款
      cancelOrder() {
        MessageBox.confirm('确定执行此操作?').then(action => {
          if (action == "confirm") {
            Indicator.open('请稍等...');
            if (this.goodsOrderInfo.paystatus == 0) {
              let url = this.common.baseURL + "mobi/goodsorder/update/status?num=" + this.goodsOrderInfo.num + "&type=CANCEL"
              this.axios.post(url, {}).then(result => {
                if (result.data.result_code == "ok" && result.data.result_msg == "SUCCESS") {
                  MessageBox.alert("取消成功!").then(result => {
                    if (result == "confirm") {
                      Indicator.close();
                    }
                    if(this.$store.getters.getIsStoreUser=="TRUE"){
                      this.$router.replace("/orderHistory")
                    }else {
                      this.$router.replace("/home")
                    }
                  })
                } else {
                  MessageBox.alert("订单取消失败!!").then(result => {
                    this.$router.replace('/home')
                  })
                }
              })
            } else {
              MessageBox.alert("订单取消失败,只能取消未付款的订单!!").then(result => {
                Indicator.close();
              })
            }
          }
        });
      },
      //选择票据
      chooseReceipt(value) {
        if (value == "NO") {//无收据
          console.log(value)
          this.receipt = false
        } else if (value == "PAPER") {//纸质收据
          console.log(value)
          MessageBox.alert("请找门店服务员索要收据").then(result => {
            this.receipt = false
          })
        } else if (value == "EMAIL") {
          this.messageBoxEmail = true

          // MessageBox.prompt('请输入您的邮箱').then(({value, action}) => {//邮箱收据
          //   if (action == "confirm") {
          //     Indicator.open('请稍等...');
          //     this.receipt = false
          //     var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          //     if (reg.test(value)) {
          //       let url = this.common.baseURL + "/mobi/goodsorder/send/receipt?goods_order_id=" + this.goodsOrderId + "&send_type=0"
          //       console.log(url)
          //       this.axios.post(url, {//receipt
          //         email: value
          //       }).then(result => {
          //         console.log(result)
          //         Indicator.close();
          //         if (result.data.result_code == "ok" && result.data.result_msg == "SUCCESS") {
          //           MessageBox.alert('发送成功!').then(result => {
          //             Indicator.close();
          //           })
          //         } else {
          //           MessageBox.alert('发送失败,请确认订单是否已支付!').then(result => {
          //             Indicator.close();
          //           })
          //         }
          //       })
          //     } else {
          //       MessageBox.alert('请输入合法的邮箱').then(result => {
          //         Indicator.close();
          //       })
          //     }
          //   }
          // });
        } else if (value == "TEXT") {
          this.messageBoxPhone = true
        }
      },
      //输入电话 Message按钮的按钮事件
      phoneConfirm(value) {
        if (value == "cancel") {
          this.messageBoxPhone = false
        }
        if (value == "confirm") {
          if (this.taskEndTime != 180) {
            MessageBox.alert('不可重复发送,请于' + this.taskEndTime + "后重试")
            return
          }
          let countrycode = $('.select-wrapper').val()
          this.receipt = false
          this.messageBoxPhone = false

          let value = $('.mint-msgbox-input>input').val()
          if (this.phone === "" || this.phone == null) {
            MessageBox.alert("请输入手机号码");
            return false;
          }
          if (this.countryCode === "") {
            MessageBox.alert("请选择国家码")
            return false;
          }
          if (this.phone === "") {
            MessageBox.alert("请输入手机号")
            return false;
          }
          if (!(/^1[34578]\d{9}$/.test(this.phone)) && this.countryCode === "86") {
            MessageBox.alert("请输入正确手机号码");
            return false;
          }
          if (this.countryCode === "1" && this.phone.length <= 5) {
            MessageBox.alert("请输入正确手机号码");
            return false;
          }
          console.log(countrycode, this.phone)
          //this.$store.getters.getGoodsOrderId
          Indicator.open({
            text: '请稍后...',
            spinnerType: 'fading-circle'
          });
          //route/
          let url = this.common.baseURL + "mobi/goodsorder/send/receipt?goods_order_id=" + this.goodsOrderId + "&send_type=1&countrycode=" + countrycode
          this.axios.post(url, {
            mobile: this.phone
          }).then(result => {//待完成...
            console.log(result)
            Indicator.close();
            if (result.data.result_code == "error" && result.data.result_msg == "ORDER_NOT_EXIST") {
              MessageBox.alert("订单不存在,请确认订单已经支付完成!")
              return
            } else {
              MessageBox.alert("发送成功!").then(result => {
                Indicator.close();
                
          if (this.phoneDisable == true) {
            this.phoneDisable = false
            let TaskTime = setInterval(() => {
              this.taskEndTime--
              if (this.taskEndTime <= 0) {
                this.phoneDisable = true
                this.taskEndTime = 180
                // this.phoneDisable = false
                clearInterval(TaskTime)
              }
            }, 1000)
          }
              })
            }
          })
        }
      },
      //显示收据弹框
      showReceipt() {
        this.receipt = true
      },
      //this.payment(this.$store.getters.getGoodsOrderNum, this.tipAmount, paytype);
      //立即支付
      payment() {
        let paytype;
        if (process.env.NODE_ENV === "development") {
          paytype = "wechatpay"
        } else {
          paytype = this.common.is_weixin() ? 'wechatpay' : this.common.is_alipay() ? 'alipay' : '';
          if (paytype === '') {
            MessageBox.alert("请使用微信或支付宝客户端打开").then(action => {
            });
            return false;
          }
        }
        //加载动画
        Indicator.open({text: "正在加载中...", spinnerType: "fading-circle"});
        let integral = this.deductionIntegral(this.goodsOrderInfo.deduction_integral)
        let url, body;
        if (this.goodsOrderInfo.deduction_integral >= 0) {
          if(this.$store.getters.getIsStoreUser=="FALSE"){
            url = this.common.baseURL + "mobi/goodsorder/pay/order/add";
            body = {
              num: this.goodsOrderInfo.num,
              tip: this.goodsOrderInfo.tip
            }
          }else {
            url = this.common.baseURL + "mobi/goodsorder/pay/order/add?store_user_id=" + this.$store.getters.getStoreScanGoodsUser.id + "&store_id=" + this.$store.getters.getStoreId;
            body = {
              deduction_integral: this.goodsOrderInfo.deduction_integral,
              integral_deduction_amount: integral,
              num: this.goodsOrderInfo.num,
              tip: this.goodsOrderInfo.tip
            }
          }
          console.log(this.goodsOrderInfo.deduction_integral, integral)
        } else {
          url = this.common.baseURL + "mobi/goodsorder/pay/order/add";
          body = {
            num: this.goodsOrderInfo.num,
            tip: this.goodsOrderInfo.tip
          }
        }
        console.log(body)
        this.axios.post(url, body).then(result => {
          console.log(result)
          if (result.data.result_code == "ok" && result.data.result_msg == "SUCCESS") {
            let payUrl = this.common.baseURL + "mobi/pay/pay?transaction_id=" + result.data.merchantOrder.id + "&pay_type=" + paytype + "&wx_openid=" + this.$store.getters.getUserId + "&alipay_user_id=" + this.$store.getters.getUserId
            this.axios.get(payUrl, {}).then(payResult => {
              if (payResult.data.result_code == "ok" && payResult.data.result_msg == "SUCCESS") {
                if (this.common.is_weixin()) {
                  this.wxpay(payResult.data.appId, payResult.data.timeStamp, payResult.data.nonceStr, payResult.data.wechatPackage, payResult.data.signType, payResult.data.paySign);
                } else if (this.common.is_alipay()) {
                  this.alipay(payResult.data.trade_no, result.data.merchantOrder.id);
                }
              } else {
                MessageBox.alert("支付失败").then(action => {
                  Indicator.close();
                });
              }
            })
          } else {
            Indicator.close();
            MessageBox.alert('支付失败').then(result => {

            })
          }
        })
      },
      //积分抵扣
      deductionIntegral(value) {
        let proportion = this.$store.getters.getFromIntegralConvertRatio.split('/')
        let str1 = +(proportion[0])
        return value / str1
      },
      //微信支付
      wxpay(appId, timeStamp, nonceStr, wechatPackage, signType, paySign, orderNum) {
        let that = this;

        function onBridgeReady() {
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest", {
              appId: appId, //公众号名称，由商户传入
              timeStamp: timeStamp, //时间戳，自1970年以来的秒数
              nonceStr: nonceStr, //随机串
              package: wechatPackage,
              signType: signType, //微信签名方式：
              paySign: paySign //微信签名
            },
            function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                Indicator.close();
                that.$store.commit("goodsOrderNum", ""); //订单号
                let task = setInterval(() => {
                  that.axios.get(that.common.baseURL + "mobi/goodsorder/one?num=" + that.$route.query.orderNum).then(result => {
                    console.log(that.$route.query.orderNum)

                    if (result.data.goodsOrder.paystatus == 4) {
                      if (that.$store.getters.getIsStoreUser == "TRUE") {
                        that.$router.replace({
                          path: "/OrderHistory"
                        });
                      } else {
                        that.$router.replace({
                          path: "/home"
                        });
                      }
                    }
                  })
                }, 500)
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                //取消支付
                Indicator.close();
                that.isPayBtnDisabled = true;
              } else {
                //错误提示
                MessageBox.alert("支付失败").then(action => {
                });
                Indicator.close();
                that.isPayBtnDisabled = true;
              }
            }
          );
        }

        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
            document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      },
      //支付宝支付
      alipay(tradeNo, transactionId, orderNum) {
        let that = this;
        function ready(callback) {
          if (window.AlipayJSBridge) {
            callback && callback();
          } else {
            document.addEventListener("AlipayJSBridgeReady", callback, false);
          }
        }

        ready(function () {
          AlipayJSBridge.call(
            "tradePay", {
              tradeNO: tradeNo
            },
            function (alipayResult) {
              Indicator.close();
              Indicator.open({text: "正在跳转...", spinnerType: "fading-circle"});
              //查询订单
              that.axios.get(that.common.baseURL + "mobi/pay/resp/alipay/query?transaction_id=" + transactionId, {}).then(queryResult => {
                if (queryResult.data.result_code == "ok" && queryResult.data.result_msg == "SUCCESS") {
                  Indicator.close();
                  //支付成功  //SUCCESS
                  if (queryResult.data.tradeState == "TRADE_SUCCESS") { //跳转到支付成功页面
                    Indicator.close();
                    that.$store.commit("goodsOrderNum", ""); //订单号
                    let task = setInterval(() => {
                      that.axios.get(that.common.baseURL + "mobi/goodsorder/one?num=" + that.$route.query.orderNum).then(result => {
                        console.log(that.$route.query.orderNum)
                        if (result.data.goodsOrder.paystatus == 4) {
                          clearInterval(task);
                          if (that.$store.getters.getIsStoreUser == "TRUE") {
                            that.$router.replace({
                              path: "/OrderHistory"
                            });
                          } else {
                            that.$router.replace({
                              path: "/home"
                            });
                          }
                        }
                      })
                    }, 500)
                    //USERPAYING
                  } else if (queryResult.data.tradeState == "WAIT_BUYER_PAY") { //未支付
                    Indicator.close();
                    that.isPayBtnDisabled = true;
                  } else if (queryResult.data.tradeState == "CLOSED") { //交易关闭
                    MessageBox.alert("当前订单已被关闭，请重新下单.").then(action => {
                      that.common.closeAli();
                    });
                    Indicator.close();
                    that.isPayBtnDisabled = true;
                  } else if (queryResult.data.tradeState == "UNKNOWN") {
                    //结果未知
                    MessageBox.alert("支付结果未知，请查看支付宝账单.").then(action => {
                      that.common.closeAli();
                    });
                    Indicator.close();
                    that.isPayBtnDisabled = true;
                  }
                  that.isPayBtnDisabled = true;
                } else {
                  //支付结果未知
                  MessageBox.alert("支付结果未知，请查看支付宝账单.").then(action => {
                    that.common.closeAli();
                  });
                  Indicator.close();
                  that.isPayBtnDisabled = true;
                }
              });
            }
          );
        });
      },
      //日期计算
      dateComputed() {
        let timeZone = this.$store.getters.getTimeZone;
        let today = moment.tz(timeZone).format("YYYY-MM-DD"); //时区当前时间
        let yesterday = moment.tz(timeZone).subtract(1, "days").format("YYYY-MM-DD"); //时区当前时间的前1天时间
        let tomorrow = moment.tz(timeZone).add(1, 'days').format("YYYY-MM-DD");

        let realDateTime = this.common.toTimeZone(this.goodsOrderInfo.tack_out_time, "UTC", this.$store.getters.getTimeZone);
        this.showTimeText = realDateTime;
        let pickUpDate = moment(realDateTime).format("YYYY-MM-DD");
        let pickUpTime = moment(realDateTime).format("HH:mm"); //自提时间时分
        if (pickUpDate === today) {
          this.showTimeText = "(今天)" + pickUpTime
        }
        if (pickUpDate === yesterday) {
          this.showTimeText = "(昨天)" + pickUpTime
        }
        if (pickUpDate === tomorrow) {
          this.showTimeText = "(明天)" + pickUpTime
        }
      },
      //邮箱按钮事件
      emailConfirm(reslut) {
        this.messageBoxEmail = false;
        if (reslut == "cancel") {
          $('.email-text').val("")
        } else if (reslut == "confirm") {
          this.messageBoxEmail = false;
          this.receipt = false;
          let value = $('.email-text').val()
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if (reg.test(value)) {
            let url = this.common.baseURL + "/mobi/goodsorder/send/receipt?goods_order_id=" + this.goodsOrderId + "&send_type=0"
            console.log(url)
            Indicator.open("请稍等...");
            this.axios.post(url, {//receipt
              email: value
            }).then(result => {
              console.log(result)
              Indicator.close();
              if (result.data.result_code == "ok" && result.data.result_msg == "SUCCESS") {
                MessageBox.alert('发送成功!').then(result => {
                  Indicator.close();
                })
              } else {
                MessageBox.alert('发送失败,请确认订单是否已支付!').then(result => {
                  Indicator.close();
                })
              }
            })
          } else {
            MessageBox.alert('请输入合法的邮箱').then(result => {
              Indicator.close();
            })
          }
        }
      }
    },
    created() {
      this.init()
    },
    mounted: function () {

    },
    beforeDestroy: function () {
      clearInterval(this.task)
    },
    computed: {},
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route: {
        handler: function () {
        }
      },
      countryCode: {
        handler: function (newVal, oldVal) {

        }
      },
      taskEndTime: {
        handler: function (newVal, oldVal) {

        }
      }
    }
  };
</script>

<style scoped>
  .order-status {
    text-align: center;
    font-size: 14px;
    padding: .4rem 0 0rem 0;
    color: #777;
  }

  .phone-input {
    border-radius: 0;
  }

  .mint-msgbox-input {
    display: flex;
    position: relative;
  }

  .select-wrapper {
    width: 30%;
    margin-bottom: 0;
    direction: rtl;
    border: 1px solid #c8c7cc !important;
    border-right: 0px !important;
    padding-right: 10px;
    height: 40px;
    float: left;
    border-radius: 0;
    margin-top: 0;
  }

  .icon {
    width: 35px;
    height: 35px;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .drop-down-icon {
    background-image: url("../../assets/img/dropDown.png");
    width: 15px;
    height: 15px;
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 4%;
    top: 40%;
  }

  @media screen and (max-width: 320px) {
    .drop-down-icon {
      left: 2% !important;
    }
  }

  .no-receipt-icon {
    background-image: url("../../assets/img/ban.png");
  }

  .paper-receipt-icon {
    background-image: url("../../assets/img/paperReceipt.png");
  }

  .email-receipt-icon {
    background-image: url("../../assets/img/email.png");
  }

  .text-receipt-icon {
    background-image: url("../../assets/img/mobile.png");
  }

  .mintui-popup > p {
    text-align: center;
    margin: 0;
    line-height: 35px;
    font-size: 1rem;
    color: black;
    padding: .8rem;
  }

  .mintui-popup {
    width: 90%;
    background-color: #ffffff;
    border-radius: 5px;
  }

  .receipt-box {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  .receipt-item {
    width: 45%;
    height: 80px;
    border: 1px solid white;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 1rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px 1px #ccc;
  }

  .receipt-item > p {
    margin: 0;
    position: relative;
    top: .5rem;
    color: #403f3f;
  }

  .mui-content {
    position: relative;
    color: #333;
    background-image: linear-gradient(0deg, #efeff4, #efeff4 65%, hsla(0, 0%, 96%, .3) 75%, hsla(0, 0%, 96%, 0)), linear-gradient(270deg, #ed5b5b, #f16f6f);
    padding: 44px 5% 80px 5%;
    font-size: 14px;
  }

  .mui-content .info {
    background: #ffffff;
    border-radius: 5px;
    padding: 5%;
    margin-top: 1.5rem;
  }

  .mui-content .info .total-amount {
    font-size: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(237, 91, 91, 1);
    text-align: center;
  }

  .mui-content .info .desk-no {
    text-align: center;
    padding: 1rem;
    padding-top: .2rem;
    font-size: 16px;
    color: #777;
  }

  .mui-content .info .goods-header {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px dotted #ece4e4;
    padding: 15px 0px;
    margin-bottom: 15px;
  }

  .mui-content .info .goods-header .name {
    overflow: hidden;
    -webkit-box-flex: 6;
    flex: 6;
    color: rgba(153, 153, 153, 1) !important;
  }

  .mui-content .info .goods-header .count {
    overflow: hidden;
    -webkit-box-flex: 1.5;
    flex: 1.5;
    text-align: center;
    color: rgba(153, 153, 153, 1) !important;
  }

  .mui-content .info .goods-header .price {
    overflow: hidden;
    -webkit-box-flex: 2.5;
    flex: 3;
    text-align: right;
    color: rgba(153, 153, 153, 1) !important;
  }

  .mui-content .info .goods-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 15px;
  }

  .mui-content .info .goods-item .group-name {
    overflow: hidden;
    -webkit-box-flex: 6;
    flex: 6;
  }

  .mui-content .info .goods-item .group-name .name {
    color: rgba(51, 51, 51, 1);;
    margin: 0;
  }

  .mui-content .info .goods-item .group-name .spec-list {
    margin: 0;
  }

  .mui-content .info .goods-item .group-name .spec-list span {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  .mui-content .info .goods-item .group-count {
    -webkit-box-flex: 1;
    flex: 1;
    text-align: right;
  }

  .mui-content .info .goods-item .group-amount {
    -webkit-box-flex: 3;
    flex: 3;
    text-align: right;
    color: #ED5B5B;
  }

  .mui-content .info .cost-info {
    border-top: 1px dotted #ece4e4;
  }

  .mui-content .info .cost-info .item {
    display: flex;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    padding: 10px 0px;
  }

  .mui-content .info .cost-info .item p {
    color: #000;
    font-size: 14px;
    margin: 0;
  }

  .mui-content .info .total {
    text-align: right;
    font-size: 18px;
    font-weight: 600;
    padding-top: 15px;
    border-top: 1px dotted #ece4e4;
  }

  .mui-content .info .total .price {
    color: rgba(237, 91, 91, 1);
  }

  .mui-content .order-info {
    background: #ffffff;
    border-radius: 5px;
    padding: 5%;
    margin-top: 1.5rem;
  }

  .mui-content .order-info .title {
    border-bottom: 1px dotted #ece4e4;
    padding-bottom: 10px;
    font-weight: bold;
  }

  .mui-content .order-info .info-cell {
    padding-top: .8rem;
  }

  .mui-content .order-info .info-cell .info-item {
    display: flex;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    padding-bottom: .8rem;
  }

  .mui-content .order-info .info-cell .info-item p {
    margin: 0;
    color: rgb(132, 129, 129);
  }

  .cancel-order-box {
    padding-top: .8rem;
    border-top: 1px solid #e2dddd;
    display: flex;
    flex-flow: row-reverse nowrap;
    /*justify-content: space-between;*/
  }

  .cancel-order {
    display: inline-block;
    padding: .3rem;
    box-shadow: 0 0 4px 1px #cccccc;
    border-radius: 5px;
  }

  .pay-btn {
    background: rgb(237, 91, 91, 1);
    color: white;
    box-shadow: 0 0 2px 1px rgb(237, 91, 91, 1);
  }
</style>
