<template>
  <div id="tip-content">
    <div class="title">添加小费</div>
    <div class="tip-cell">
      <div class="tip-item" v-if="this.$store.getters.getIsNoTip === 'TRUE'" @click="selectTip($event,false)"
           :data-price="0">
        无小费
      </div>
      <div class="tip-item" v-for="(tip,i) of tipList" @click="selectTip" :data-price="tip.tipAmount.toFixed(2)"
           :data-i="i">
        小费：{{tip.tipVal * 100}}%(${{tip.tipAmount.toFixed(2)}})
      </div>
      <div class="" style="background: rgba(243,243,243,1);width: 100%;"
           v-if="this.$store.getters.getIsCustomTip === 'TRUE'">
        <div class="input-warp" @click="showKeyBord"><span>$</span><span id="Js_tip_input" class="tip-input-val"
                                                                         style="padding-left: 10px;">{{tipInputVal}}</span>
        </div>
        <div @click="selectTip($event,true)" :data-price="0" class="addInputTip">添加</div>
      </div>
    </div>
    <!--<div class="saveTipBtn" @click="saveTip">确认</div>-->
  </div>
</template>

<script>
  export default {
    name: "hello",
    data() {
      return {
        tipList: [],
        //保存选中小费
        tipAmount: 0,
        //是否小费是输录框
        isTipInput: false,
        //是否显示输了小费按钮
        isInputShow: false,
        isTipNotShow: false,
      };
    },
    methods: {
      selectTip(e, isTipInput) {
        this.$emit("clickSaveTip", parseFloat(e.target.dataset.price), isTipInput, e.target.dataset.i);
      },
      showKeyBord(e) {
        this.isTipInput = true;
        this.$emit("showTipKeyBord", true);
      },
      add(a, b) {
        return (a * 100 + b * 100) / 100;
      },
      sub(a, b) {
        return (a * 100 - b * 100) / 100;
      },
      mul(a, b) {
        return ((a * 100) * (b * 100)) / (100 * 100);
      },
      computeTipList() {
        let tipRateList = this.$store.getters.getTipVal.split(",");
        for (let tipRate of tipRateList) {
          let isTip = this.$store.getters.getIsTip == "TRUE"
          let isDiscountPreTip = this.$store.getters.getIsAfterDiscountTip == "TRUE" ? true : false
          let isPreTaxTip = this.$store.getters.getTipType == "PRE_TAX"
          //小费金额
          let tipAmount = 0;
          if (isTip) {
            if (isDiscountPreTip) {
              // 折前小费
              let tipBase = this.totalAmount;
              if (isPreTaxTip) {
                // 税前小费

                tipAmount = this.mul(tipBase, tipRate); // 100 * 0.01 = 1
              } else {
                // 税后小费
                tipAmount = this.mul(this.add(tipBase, this.taxAmount), tipRate);
                // (100 + 税费)* 0.01 【(100 + 15)* 0.01 =1.15，(100 + 13.5)* 0.01 =1.135】
              }
            } else {
              // 折后小费
              let tipBase =this.sub(this.totalAmount ,this.discountAmount)
              if (isPreTaxTip) {
                // 税前小费
                tipAmount = this.mul(tipBase, tipRate); // 90 * 0.01 = 0.9
                console.log(tipBase)
              } else {
                // 税后小费
                tipAmount = this.mul(this.add(tipBase, this.taxAmount), tipRate);
                // (90 + 税费)* 0.01 【(90 + 15)* 0.01 =1.05，(9 + 13.5)* 0.01 =1.035】
              }
            }
          }
          this.tipList.push({"tipVal": tipRate, "tipAmount": tipAmount});
        }
      }
    },
    props: [
      "afterDiscountTotal",
      "tipInputVal",
      "personNum",
      "taxAmount",
      "discountAmount",
      "totalAmount",
    ],
    created() {
      this.computeTipList();
    },

    computed: {},
    watch: {},
    mounted: function () {

    }
  };
</script>

<style>
  #tip-content {
    margin-bottom: 20px;
    overflow-y: hidden
  }

  #tip-content .title {
    text-align: center;
    padding: 20px 20px 10px 20px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  #tip-content .tip-cell {
    position: relative;
    width: 100%;
    padding: 10px;
  }

  #tip-content .tip-cell .tip-item {
    padding: 15px;
    margin-bottom: 10px;
    /*border-radius: 24px;*/
    border: 1px solid rgba(204, 204, 204, 1);
    padding-left: 1.3rem;
    font-size: 14px;
    color: rgb(62, 61, 61);
    text-align: center;
  }

  #tip-content .tip-cell .tip-item.active {
    background: rgba(237, 91, 91, 0.2) !important;
    border: 1px solid rgba(237, 91, 91, 1) !important;
  }

  #tip-content .saveTipBtn {
    padding: 15px;
    border-radius: 24px;
    background: rgba(237, 91, 91, 1);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(237, 91, 91, 1);
    box-shadow: 0px 0px 10px 0px rgba(237, 91, 91, 1);
    text-align: center;
    margin: 0px 10px 10px 10px;
    color: #fff;
  }

  #tip-content .addInputTip {
    width: 35%;
    float: left;
    margin-left: 5%;
    padding: 13px;
    background: rgba(237, 91, 91, 1);
    text-align: center;
    color: #fff;
  }

  #tip-content .input-warp {
    width: 60%;
    overflow: hidden;
    padding: 12px;
    float: left;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 0px;
  }
</style>
