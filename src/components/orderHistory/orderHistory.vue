<template>
  <div>
    <div v-if="isShowTrans==false" class="prdListWrap">
      <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">历史订单</h1>
        <span class="float-right nav-bar-btn">自取</span>
      </header>
      <div class="mui-content">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                     ref="loadmore" :bottomDistance="50" @bottom-status-change="handleBottomChange">
          <div class="noText" v-if="isEmpty">暂无数据</div>
          <div class="order-info" v-for="(item,i) in list" :key="i">
            <!--<h4>2017-5-19</h4>-->
            <div class="order-body" @click="jump(item.num)">
              <div class="order-desk order-item">
                <div class="order-desk-font">#{{item.pick_no}}<span class="order-type">自取</span></div>
                <div class="place-order-time">
                  {{common.toTimeZone(item.updatetime,"UTC",timeZone).substring(5,item.updatetime.length)}}
                </div>
              </div>
              <div class="order-item">
                <div>
                  <span class="Take-food-no">取餐号</span>
                  <span class="order-desk-font">{{item.pick_no}}</span>
                </div>
                <div class="order-desk-font">
                  <span style="font-size:24px;">$</span>
                  <span style="font-size:24px;">{{(item.amount).toFixed(2)}}</span>
                </div>
              </div>
              <div class="mui-icon mui-icon-arrowright absoult"></div>
              <div class="order-item">
                <div class="font-specing">共<span class="order-desk-font">{{item.goodsCount}}</span>件商品</div>
                <div class="pay-status-font">{{item.paystatus == 0 ? '待付款':item.paystatus == 1 ? '已支付' : item.paystatus
                  == 2 ? '已退款' : item.paystatus == 4 ? '已完成' : ''}}
                </div>
              </div>
            </div>
          </div>
        </mt-loadmore>
      </div>
      <tabbar name="OrderHistory"></tabbar>
    </div>
    <transfrom v-if="isShowTrans"></transfrom>

  </div>
</template>

<script>
  import transfrom from "@/components/transition/trans.vue"
  import {MessageBox} from "mint-ui"

  export default {
    name: "OrderHistory",
    components: {
      transfrom
    },
    data() {
      return {
        list: [],
        allLoaded: false,
        pon: 0,
        bottomStatus: "", //下拉时的状态,
        isShowTrans: true,
        isEmpty: false,
        timeZone: this.$store.getters.getTimeZone
      }
    },
    methods: {

      //页面下拉事件
      handleBottomChange(status) {
        console.log(status)
      },
      //跳转
      jump(orderNum) {
        this.$router.replace({
          path: "/paySuccess",
          query: {
            orderNum: orderNum,
            source: 'orderList',
            from:'fromOrderHistory',
          }
        });
      },
      //下拉刷新
      loadTop() {
        this.pon = 0;
        this.pageRequest("REFRESH");
        setTimeout(()=>{
          console.log($(".mint-loadmore-top").children(":first").css({"margin":"auto"}))
        },200)
        // $(".mint-loadmore-top").chilrdren().eq(0).css('margin',0)
      },
      //上拉加载
      loadBottom: function () {
        this.pageRequest("LOAD");
      },
      //上拉事件请求
      pageRequest(loadType) {
        let url = this.common.baseURL + "/mobi/goodsorder/list?pageid=" + this.pon + "&store_id=" + this.$store.getters.getStoreId;
        this.axios.post(url, {
          "type": 1,
          "statusList": [0, 1, 2, 4],
          "store_scan_goods_user_id": this.$store.getters.getStoreScanGoodsUser.id
        }, {
          headers: {
            "Content-type": "application/json"
          }
        }).then(result => {
          if (loadType === "REFRESH") {
            this.list = [];
            this.$refs.loadmore.onTopLoaded();
          }
          if (loadType === "LOAD") {
            this.$refs.loadmore.onBottomLoaded();
          }
          this.isShowTrans = false
          let orderInfoList = result.data.goodsOrderPage.content;
          if (orderInfoList.length > 0) {
            for (let orderInfo of orderInfoList) {
              let goodsCount = 0;
              for (let goods of orderInfo.goodsOrderInfoList) {
                if (goods.type == 0) {
                  goodsCount += goods.quantity - goods.reduced_quantity;
                }
              }
              orderInfo.goodsCount = goodsCount;
              if (orderInfo.paystatus == 0) {
                if (orderInfo.is_tip == "TRUE") {
                  orderInfo.amount += orderInfo.tip
                }
                if (orderInfo.integral_deduction_amount >= 0) {
                  orderInfo.amount -= orderInfo.integral_deduction_amount
                }
              }
            }
            this.list = this.list.concat(orderInfoList)
            this.pon++;
            if (result.data.goodsOrderPage.lastPage == true) {
              this.allLoaded = true
            }
          } else {
            this.isEmpty = true;
          }
        })
      },
    },
    created() {
      this.pageRequest("");
    },
    mounted: function () {

    },
    watch: {
      list: function () {
        this.$nextTick(function () {
          if ($(".order-info").hasClass('last-margin')) {
            $(".order-info").removeClass("last-margin")
          }
          $(".order-info:last").addClass('last-margin')
        })
      }
    }
  }
</script>

<style scoped>
  .mui-content {
    background: #ffffff;
  }

  .have-order {
    box-shadow: 0 0 4px 1px #cccccc;
    border-radius: 5px;
  }

  .authRegesiter {
    background: #48ca48 !important;
    color: white !important;
  }

  .btn-active {
    color: green !important;
    background: antiquewhite;
  }

  .register {
    width: 90%;
    background: #edecec;
    text-align: center;
    margin: auto;
    padding: 10px 15px;
    margin: 1rem 1rem;
    color: #ccc;
  }

  .border-left {
    border-left: 0 !important;
  }

  @media screen and (min-width: 320px) {
    .tel-font {
      max-width: 65%;
    }
  }

  .add_Code {
    width: 40%;
    text-align: center;
    border: 1px solid #ccc;
    height: 43px;
    line-height: 43px;
    font-size: 14px;
    color: #ccc;
    border-radius: 3px;
    position: relative;
    left: 0.4rem;
  }

  .ver-code {
    max-width: 70%;
  }

  .tel-font {
    line-height: 43px !important;
    height: 43px !important;
  }

  .addBtn {
    width: 20%;
  }

  .captcha {
    text-align: justify;
    display: flex;
    padding: 1rem;
  }

  .spec-pop {
    width: 90%;
    border-radius: 10px;
    min-height: 40%;
  }

  .mint-loadmore-top {
    margin: 0 !important;
  }

  .mint-loadmore-bottom {
    position: relative;
    bottom: 4.5rem;
  }

  .mint-spinner-fading-circle {
    margin-top: 0 !important;
  }

  .botom-btn {
    color: #9d8888;
    /* padding: 5px; */
    padding: 5px 3px;
    border: 1px solid #ccc;
    -webkit-box-shadow: 0px 0px 10px 1px #ccc;
    box-shadow: 0px 0px 10px 1px #ccc;
    position: absolute;
    right: 16px;
    bottom: 5px;
  }

  .history-order-font {
    font-weight: 600;
    position: relative;
    bottom: 2px;
  }

  .icon-delete {
    color: #51a0fc;
    font-size: 36px;
  }

  .header-nav {
    padding: 8px;
    font-size: 20px;
    background: #ffffff;
    border-bottom: .5px solid #e3dede;
    position: fixed;
    width: 100%;
    z-index: 1;
  }

  .font-specing {
    letter-spacing: 3px;
  }

  .place-order-time {
    font-size: 18px;
  }

  .Take-food-no {
    font-size: 18px;
    font-weight: 500;
  }

  .pay-status-font {
    color: #9d8888;
    /* padding: 5px; */
    padding: 5px 3px;
  }

  .prdListWrap {
    overflow: scroll;
    background: #fff;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }

  .last-margin {
    margin-bottom: 66px;
  }

  .absoult {
    position: absolute;
    right: 0;
    top: 5.3rem;
  }

  .type {
    font-size: 16px;
    font-weight: 600;
  }

  .order-item {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    line-height: 20px;
  }

  .list-scroll {
    overflow: scroll;
    position: relative;
    bottom: 6rem;
  }

  .order-type {
    background: pink;
    border-radius: 5px;
    font-size: 12px;
    color: #ed6666;
    padding: 5px 10px;
    vertical-align: middle;
    position: relative;
    left: .7rem;
  }

  .order-body {
    padding: 1rem;
    position: relative;
    border: .5px solid #f0ebeb;
    border-radius: 8px;
    box-shadow: 0px 0px 12px -1px #ccc;
    padding-right: 2rem;
  }

  .order-desk-font {
    font-size: 22px;
    font-weight: 600;
  }
  .mint-spinner-double-bounce, .mint-spinner-fading-circle, .mint-spinner-snake{
    margin: 0 !important;
  }
  .order-header {
    /* padding: 8px 1rem;
    padding: 10px 1rem;
    background: pink;
    border-radius: 30px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    box-shadow: 0px 0px 7px -1px red;
    margin-bottom: 5px;
    margin-top: 2px; */
    background: #ffffff;
    padding: 8px 1rem;
    color: #8c8585;
  }

  .order-info {
    overflow: scroll;
    padding: 1rem;
    background: #ffffff;
    padding-bottom: 1.1rem;
  }

  .noText {
    text-align: center;
    padding-top: 200px;
  }
</style>
