<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">首页</h1>
        <span class="float-right nav-bar-btn">自取</span>
        <!--<span class="float-right">{{this.$store.getters.getmenuType == "0" ? "自取" : this.$store.getters.getmenuType == "1" ? "堂食" : "预点单"}}</span>-->
    </header>
    <div class="mui-content" id="home" >
      <div class="content">
        <img src="../.././assets/img/bg.png">
        <!--<div class="content-title">-->
        <!--<p>扫码点餐</p>-->
        <!--<p>立享优惠</p>-->
        <!--<p>便捷支付</p>-->
        <!--</div>-->
        <div class="last-order" @click="getOrderInfo">
          <div>历史订单</div>
        </div>
      </div>
      <div class="list" id="footer">
        <!--图片颜色#ea0a0a-->
        <div class="list-item" @click="jump('GOPAY')">
          <img src="../../.././static/img/GoPlay.png" alt="点餐">
          <div class="btn">去点单</div>
        </div>
        <div  class="list-item" @click="jump('GOREGISTER')" v-if="this.$store.getters.getIsStoreUser === 'FALSE'">
          <img src="../../../static/img/register.png" class="payment-icon">
          <div class="btn">会员注册</div>
        </div>
      </div>
      <!--<div class="list" id="footer">-->
        <!--<div @click="jump('GOPAY')" style=" padding-bottom: 1rem;">-->
          <!--<img src="../../.././static/img/GoPlay.png" alt="点餐">-->
          <!--<div class="btn">去点单</div>-->
        <!--</div>-->
        <!--<div @click="jump('GOREGISTER')" style="padding-bottom: 1rem;" v-if="this.$store.getters.getIsStoreUser=='FALSE'">-->
          <!--<img src="../../.././static/img/register.png" alt="注册">-->
          <!--<div class="btn">去注册</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
</div>
</template>

<script>
export default {
    name: "HomeDetails",
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        jump(value) {
          if(value=="GOPAY"){
            document.body.className="";
            this.$store.commit("goodsOrderNum", ""); //订单号
            this.$store.commit("goodsOrderId","")
            this.$store.commit("shopCartList", JSON.stringify([]))
            this.$store.commit("pickUpUserName","")
            this.$store.commit("pickUpUserPhone","")
            this.$store.commit("pickUpUserRemark","")
            this.$router.replace("/order");
          }else if(value=="GOREGISTER"){
            document.body.className="";
            this.$router.replace("/register");
          }
        },
        getOrderInfo(){
          document.body.className="";
          if (this.$store.getters.getIsStoreUser === 'TRUE') {
            this.$router.replace("OrderHistory");
          }else{
            this.$router.replace({
                path : "/register",
                query : {
                    type : "home"
                }
            });
          }
        },
        init() {

        }
    },
    created() {

    }
}
</script>

<style lang="less">

  #home{
    .content{
      text-align: center;
      overflow: hidden;
      position: absolute;
      height: calc(100% - 44px);
      width: 100%;
      background-image: linear-gradient(0deg, #efeff4, #efeff4 25%, hsla(0, 0%, 96%, 0.3) 75%, hsla(0, 0%, 96%, 0)), linear-gradient(270deg, #e8a4a4, #f38181);
      img{
        width: 65vw;
        padding-top: 30px;
      }
      .content-title{
        position: absolute;
        bottom: 150px;
        display: flex;
        p{
          width: 33vw;
          text-align: center;
          font-size: 16px;
          color: #4e4d4d;
        }
      }
      .last-order {
        position: absolute;
        top: 20px;
        right: 10px;
        background: #fff;
        height: 80px;
        border-radius: 100%;
        width: 80px;
        box-shadow: #f9879b 0px 0px 10px 4px;
        text-align: center;
        line-height: 80px;
        font-size: 14px;
        color: red;
      }
    }
    .list{
      text-align: center;
      position: fixed;
      bottom: 20px;
      width: 100%;
      display: flex;
      height: 90px;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      .list-item{
        padding-right: 3rem;
        img{
          width: 50px;
          height:50px;
        }
      }:last-child{
         padding-right: 0;
       }

    }
  }
</style>
