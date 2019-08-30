<template>
  <div>
    <!--头部-->
    <div class="person-header">
      <div class="user-logo-box">
        <div class="user-logo">

        </div>
      </div>
      <div class="user-info">
        <p class="info-padding">鲜果优鲜果冻妹</p>
        <div class="info-padding">
          <p class="mobile-icon"></p>
          <p>13890987698</p>
        </div>
        <div class="info-padding">
          <p class="vip-icon"></p>
          <p>高级会员卡</p>
        </div>
      </div>
      <div class="mannage-stroe">
        <div>管理店铺</div>
      </div>
    </div>
    <!--Tabbar图标-->
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item" @click="jumpTab(1)" :class="this.$store.getters.getTabbarStatus==1?'mui-active':''">
        <svg class="mui-icon icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>
        <span class="mui-tab-label">首页</span>
      </a>
      <a class="mui-tab-item" @click="jumpTab(2)" :class="this.$store.getters.getTabbarStatus==2?'mui-active':''">
        <svg class="mui-icon icon" aria-hidden="true">
          <use xlink:href="#icon-wode"></use>
        </svg>
        <span class="mui-tab-label">我的</span>
      </a>
    </nav>
  </div>
</template>

<style>
  p{
    margin: 0;
  }
  .info-padding{
    padding-top: 5px;
  }
.person-header{
  display: flex;
  flex-flow: row nowrap;
  height: 150px;
  background: linear-gradient(to right, #4f4f4f,#4e4e4e,#343434, #222222);
  justify-content: center;
}
  .user-logo-box{
    display: flex;
    flex-flow: row nowrap;
    width: 30%;
    align-items: center;
  }
  .user-logo{
    background-image: url("../../assets/img/img_logo_36@2x.png");
    background-repeat: no-repeat;
    width: 90px;
    height: 90px;
    background-size: 100%;
    margin: 0 auto;
    border-radius: 50%;
  }
  .user-info{
    display: flex;
    flex-flow: column nowrap;
    width: 40%;
    justify-content: center;
  }
  .user-info p:nth-child(1){
    font-size: 18px;
    color: white;
  }
  .user-info div:nth-child(2){
    display: flex;
    align-items: center;
    color: #aea7a8;
  }
  .user-info div:nth-child(3){
    display: flex;
    align-items: center;
    height: 27px;
  }
  .user-info div:nth-child(3) p:nth-child(2){
    color: #efd72b;
    padding: 0 5px;
  }
  .mobile-icon{
    background-image: url("../../assets/img/mobile-icon.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 15px;
    height: 15px;
  }
  .vip-icon{
    background-image: url("../../assets/img/info-vip.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 20px;
    height: 20px;
  }
</style>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      jumpTab(item) {
        this.$store.commit('tabbarStatus', item)
        if (this.$store.getters.getTabbarStatus == 1) {
          this.$router.push('/order')
        } else if (this.$store.getters.getTabbarStatus == 2) {
          this.$router.push('/personHome')
        }
      }
    },
    created() {

    }
  }
</script>
