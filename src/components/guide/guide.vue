<template>
  <div class="bgColor" ref="bgColor">
    <p>
      <img src="../../assets/img/toparrow.png" alt>
      <span title="关闭" class="close" @click="hide">×</span>
    </p>
    <div class="box">
      <div class="layer">
        <div class="title">1</div>
        <div style="padding:5px;">点击右上角的</div>
        <div class="oneBtn">┇</div>
        <div style="padding:5px;">按钮</div>
      </div>
      <div class="layer">
        <div class="title">2</div>
        <div style="line-height:3rem">选择</div>
        <div class="oneBtn" style="padding:0 8px;">
          <div class="bgimg"></div>
           在浏览器中打开
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bgimg{
  width: 30px;
  height: 30px;
  display: inline-block;
  background-image: url("../../assets/img/browser.png");
  line-height: 30px;
  position: relative;
  top: 5px;
}
.box{
  margin-top: 30%;
}
.oneBtn {
  background: -webkit-linear-gradient(
    top,
    left bottom,
    left top,
    from(#3a4549),
    color-stop(#282f33),
    to(black)
  );
  background: linear-gradient(to top, #3a4549, #282f33, black);
  /* background: -webkit-linear-gradient(top,#3a4549,#282f33,black); */
  border-radius: 5px;
  font-size: 1.2rem;
  padding: 5px 15px;
  margin: 0 5px;
  box-shadow: 0px -1px 6px #ccc;
}

.title {
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  font: bold;
  font-size: 23px;
  background-color: #fb4700;
  border-radius: 50%;
}

.layer {
  display: flex;
  flex-flow: row wrap;
  font-size: 1.2rem;
  color: white;
  line-height: 24px;
  padding: 0 1rem;
  margin: 10% 0;
  /* margin-left: 15%; */
  justify-content: center;
}

.close {
  color: #fff;
  padding: 35px;
  font-size: 28px;
  font: bold 20px/20px simsun;
  text-shadow: 0 1px 0 #ddd;
  position: absolute;
  top: 0;
  left: 5%;
}

.bgColor {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  filter: alpha(opacity=80);
  width: 100%;
  height: 100%;
  z-index: 100;
  text-align: center;
}

p {
  text-align: center;
  padding: 0 5%;
  position: relative;
}

body {
  width: 100%;
  height: 100%;
}

img {
  max-width: 100%;
  height: auto;
  object-fit: fill;
  float: right;
  padding-right: 1rem;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted: function() {
    document.getElementsByClassName("bgColor")[0].style.height =
      window.screen.height + "px";
    // document.getElementsByClassName("bgColor")[0].style.backgroundColor =
    //   "black";
  },
  methods: {
    hide() {
      this.$refs.bgColor.style.display = "none";
    }
  }
};
</script>
