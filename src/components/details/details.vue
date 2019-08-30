<template>
  <div class="details">
    <div v-if="isShow">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-back" style="color:red" @click="jump"></a>
        <h1 class="mui-title">账单详情</h1>
        <span class="float-right nav-bar-btn">自取</span>
      </header>
      <div class="mui-content">
        <div class="store-info">
          <div class="store-img"><img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTUzODI5Mjg4ODUyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxNDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTAxNC4wNzM3OTIgMzQ1LjcwMTQ4NmMtMC4wNzE2MzEtMC41NTE1NjItMC4xODExMjUtMS4wNjkzNTUtMC4yOTE2NDItMS41MDkzNzctMC40NDYxNjItMi4xNDU4NzMtMS4wMzc2MzItNC4yMTM5NzUtMS44ODI4ODMtNi4yMDIyNTlsLTg2LjUzNDg2NS0yMTUuNDE3MjExQzkxMC40MTM4OTcgNzguMDU2Nzc0IDg2OS4wMjUyNTUgNTAuNDAwOSA4MTYuOTc1ODA4IDUwLjQwMDlMMjA5LjU2ODg3OCA1MC40MDA5Yy01MS4wMiAwLTkwLjY2Njk3NiAyNy4xMzYwMzQtMTA1LjAzMTEyNSA3MC4wMzIwMDZMMTEuNTA1OTE3IDM0MC4yMzkwNzhjLTAuNDM4OTk4IDEuMjk2NTI5LTAuOTI0MDQ1IDMuMjExMTM1LTEuMzI5Mjc1IDUuMTcwNzY2LTYuNzU0ODQ0IDIwLjc0NjUxLTEwLjE1MDE3NCA0Mi4wNDU2MDUtMTAuMTUwMTc0IDYzLjQyMzQ5NSAwLjA3MjY1NSA3NS4yMDE3NDkgNDEuMzQ3NzEgMTQzLjg2NTU5NSAxMDcuNjE1OTk2IDE3OS4xMjM2MSAyNy4yODEzNDMgMTQuNjE4OTUyIDU5LjQzNTY3MSAyMi4wMDIxMDcgOTUuNTM3OTEzIDIyLjAwMjEwN2wwLjExMjU2NCAwYzYwLjU4NDg0My0wLjE0NTMwOSAxMTYuNjk2ODE2LTI2Ljc2MjUyNyAxNTQuOTQ1OTU1LTcyLjMyMzE4OSAzOC4wNTc3ODEgNDUuMTQ4MjY5IDkzLjczMDc1NSA3MS42MTgxMzEgMTU0LjIwMjAxMSA3MS45OTE2MzggNTkuOTkzMzcyLTAuNDQ2MTYyIDExNS40ODAxMDQtMjcuMDIyNDQ3IDE1My4zOTE1NTMtNzIuMTczNzg2IDM4LjI0NzA5MiA0NS41NTY1NjkgOTQuNDMyNzQzIDcyLjEwMTEzMSAxNTUuMzA5MjI4IDcyLjEwMTEzMSAzNi44NDkyNTYtMC4yMjAwMTEgNjkuNTU0MTIyLTcuOTM3Nzg2IDk3LjA5NTM4NS0yMy4wNzQ1MzEgNjUuMjcwNTYzLTM1LjYyNDM1OSAxMDUuNzY2ODgyLTEwNC4wMzM0MDEgMTA1LjczMzExMy0xNzguNDIyNjQ1QzEwMjQuMDA2MDAyIDM4Ni42NDQ5OTEgMTAyMC41MDIyMDEgMzY1LjIzMzMzMiAxMDE0LjA3Mzc5MiAzNDUuNzAxNDg2TDEwMTQuMDczNzkyIDM0NS43MDE0ODZ6TTc5OS4wMzUyMDQgMzgxLjY5OTM1MiAyMDguMzEyMjU4IDM4MS42OTkzNTJjLTIwLjM3NTA1IDAtMzYuOTE0NzQ4LTE2LjUzOTY5OC0zNi45MTQ3NDgtMzYuOTE5ODY0IDAtMjAuMzc0MDI2IDE2LjUzOTY5OC0zNi45MTM3MjQgMzYuOTE0NzQ4LTM2LjkxMzcyNGw1OTAuNzIyOTQ2IDBjMjAuNDEyOTEyIDAgMzYuOTExNjc4IDE2LjUzOTY5OCAzNi45MTE2NzggMzYuOTEzNzI0QzgzNS45NDY4ODIgMzY1LjE1OTY1NCA4MTkuNDQ4MTE2IDM4MS42OTkzNTIgNzk5LjAzNTIwNCAzODEuNjk5MzUyTDc5OS4wMzUyMDQgMzgxLjY5OTM1MnpNNzk5LjAzNTIwNCAzODEuNjk5MzUyIiBwLWlkPSIyMTQyIiBmaWxsPSIjRUQ1QjVCIj48L3BhdGg+PHBhdGggZD0iTTk0Ny40MzgxMzkgNjc3LjA3NTY2M2MwLTIwLjQxNTk4Mi0xNi40OTY3MTktMzYuOTEzNzI0LTM2LjkxODg0MS0zNi45MTM3MjQtMy44MDE1ODMgMC03LjIzMzc1MiAxLjA2OTM1NS0xMC42Njc5NjcgMi4xNzQ1MjZsMCAwYy0yNy4zNTYwNDUgMTAuODIwNDQtNjIuMzU1MTYzIDE2LjY1MDIxNS04OC43NDcyNTMgMTUuMjEyNDctNTguMTgzMTQ0LTMuMTAyNjY0LTEwMi41MjMwMDEtMTQuNjk1Ny0xNDUuMjMzNzU2LTUxLjA1ODg4Ni00Mi4xMjMzNzYgMzUuOTIzMTY0LTk1Ljg3NTYwNCA1Ni4zNzA4NjktMTUzLjA5ODg4NyA1Ni44OTA3MDgtNTguMDMzNzQxLTAuMzcxNDYtMTEyLjA4MjcyOC0xNC45MTc3NTgtMTU0LjQyNjExNS01MC45MDg0Ni00Mi42MDMzMDcgMzYuMzI0My05Ni45Nzk3NTIgNTQuMDA0OTg1LTE1NC45MDYwNDYgNTQuMDA0OTg1bC0wLjIyMTAzNCAwYy0zNS4zNjQ0MzkgMC01NS4yOTk0NjctNi43MTQ5MzUtODcuNDk0NzI3LTE4LjYwNTc1My0wLjg4NDEzNy0wLjQzODk5OC0xLjgwNjEzNS0wLjY2NTE0OS0yLjczMTIwNC0wLjk5MjYwNy0xLjU0OTI4Ni0wLjU5MDQ0OC0yLjczMjIyOC0wLjk5NjctNC4zMjAzOTktMS41ODgxNzEgMCAwLTUuMzEzMDA2LTAuOTIxOTk5LTguMjMwNDUyLTAuOTIxOTk5bC0wLjA3MzY3OCAwYy0yMC4zODAxNjYgMC0zNi44Nzk5NTUgMTYuNTcxNDIxLTM2Ljg0NjE4NiAzNi45OTA0NzJsMC4yNTg4OTYgMTk3LjgzODg1N2MwIDUyLjA1NTU4NiA0Mi40MTgwODkgOTQuMzk4OTczIDk0LjU4MTEyMiA5NC4zOTg5NzNsNjk0LjcxNTQxNS0wLjQ0NjE2MmM1Mi4wODgzMzItMC4xNDUzMDkgOTQuNDcyNjUyLTQyLjYwMzMwNyA5NC40NzI2NTItOTQuNjUyNzUzTDk0Ny40MzgxMzkgNjc3LjA3NTY2MyA5NDcuNDM4MTM5IDY3Ny4wNzU2NjN6TTk0Ny40MzgxMzkgNjc3LjA3NTY2MyIgcC1pZD0iMjE0MyIgZmlsbD0iI0VENUI1QiI+PC9wYXRoPjwvc3ZnPg==">
          </div>
          <div class="store-content">
            <div class="name">{{this.$store.getters.getStoreName}}</div>
            <div class="address">{{this.$store.getters.getStoreAddress}}</div>
            <div class="mobile"><i class="mui-icon mui-icon-phone-filled"></i>{{this.$store.getters.getStoreMobile}}
            </div>
          </div>
        </div>
        <div class="info">
          <div class="title">
            <div class="name">订单详情</div>
          </div>
          <div class="goods-cell">
            <div class="goods-item" v-for="shopCart of shopCartList">
              <div class="group-name">
                <p class="name">{{shopCart.name}}</p>
                <p class="spec-list">
                  <span v-for="(itemSpec,i) of shopCart.specItemList" :key="i"> {{(i==0?'':'/')+itemSpec.name}}</span>
                  <span v-for="(name,k) in shopCart.remarkList"
                        :key="k + (shopCart.specItemList ? shopCart.specItemList.length : 0) ">{{(k + (shopCart.specItemList ? shopCart.specItemList.length : 0)===(shopCart.specItemList ? shopCart.specItemList.length : 0)? ( shopCart.specItemList && shopCart.specItemList.length > 0 ? '/' : '') :'/')+name}}</span>
                </p>
              </div>
              <div class="group-count">x{{shopCart.count}}</div>
              <div class="group-amount">${{shopCart.total_amount.toFixed(2)}}</div>
            </div>

          </div>
          <div class="subtotal">
            <div class="total">小计：<span class="price">${{total.toFixed(2)}}</span></div>
          </div>
        </div>
        <div class="customer mui-input-group">
          <div class="title">客户信息</div>
          <div class="mui-input-row">
            <label>姓名</label>
            <input type="text" id="Js_customer_name" placeholder="请填写您的姓名" v-model="uName" v-fixedInput>
          </div>
          <div class="mui-input-row">
            <label>电话</label>
            <input type="tel" id="Js_customer_mobile" placeholder="请填写您的手机号" v-model="uTel" maxlength="11" v-fixedInput>
          </div>
          <div class="mui-input-row">
            <label>备注</label>
            <input type="text" id="Js_remark" placeholder="请填写您的特殊需求" v-model="uRemark" v-fixedInput>
          </div>
          <div class="mui-input-row since-time-box" @click="showTimer">
            <label>自提时间</label>
            <div>
              <span v-if="toDayOrtoMorRow">{{toMoRowText}}</span>
              <span>{{showTime}}</span>
              <i class="mui-icon mui-icon-forward" style="font-size: 16px"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="text">合计<span class="price">${{total.toFixed(2)}}</span></div>
        <div class="btn">
          <div class="add-order" @click="jump">继续点单</div>
          <div class="check-payment" @click="addGoodsOrder">确认下单</div>
        </div>
      </div>
    </div>
    <home-header v-if="!isShow"></home-header>
    <mt-popup v-model="showPicker" position="bottom" style="width: 100%;height: 40%">
      <!--<mt-picker :slots="slots" @change="onValuesChange" value-key="2"></mt-picker>-->
      <div></div>
      <div class="picker-box">
        <div class="picker-left">
          <div @click="toggleTime('now')" :class="timeList?'active-picker':''">{{toDayText}}</div>
          <div @click="toggleTime('toMoRow')" :class="!timeList?'active-picker':''">{{toMoRowText}}</div>
        </div>
        <div class="list-box">
          <div v-for="(item,i) in toDayRowArray" class="list-today" v-show="timeList" @click="timeItem(i)">
            <div>{{item}}</div>
            <div class="icon"></div>
          </div>
          <div v-for="(item,i) in toMoreRowArray" class="list-tomorow" v-show="!timeList" @click="timeItem(i)">
            <div>{{item}}</div>
            <div class="icon"></div>
          </div>
        </div>
        <div class="popup-bottom">
          <div class="bottom-btn-box">
            <div @click="pickerConfirm('cancel')">取消</div>
            <div @click="pickerConfirm('confirm')">确认</div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import HomeHeader from "@/components/transition/trans";
  import {
    MessageBox
  } from "mint-ui";

  export default {
    name: "details",
    components: {
      HomeHeader
    },
    data() {
      return {
        //商品渲染数组
        shopCartList: [{}],
        //保存小计
        total: 0,
        //保存商品总数量
        totalCount: 0,
        //客户姓名
        uName: this.$store.getters.getPickUpUserName,
        //客户电话
        uTel: this.$store.getters.getPickUpUserPhone,
        //客户备注
        uRemark: this.$store.getters.getPickUpUserRemark == null ? '' : this.$store.getters.getPickUpUserRemark,
        //显示页面
        isShow: false,
        //自提时间
        showTime: "",
        //显示时间选择器
        showPicker: false,
        //今天的时间列表
        toDayRowArray: [],
        //明天的时间列表
        toMoreRowArray: [],
        //时间列表选中今天/明天
        timeList: true,
        //时间选择器上今天显示的文本
        toDayText: "",
        //时间选择器上明天显示的文本
        toMoRowText: "",
        //可选起始时间
        startTime: "",
        //结束时间
        afterTime: "",
        //今天or明天
        toDayOrtoMorRow: false,
      };
    },
    methods: {
      jump() {
        this.$router.replace("/order");
      },
      //点击下单按钮
      addGoodsOrder() {
        let telReg = new RegExp("^[0-9]*$");
        let nameReg = new RegExp(/^[A-z\s\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/);
        if (this.uName === '' || this.uName === null) {
          MessageBox.alert("请填写您的姓名.").then(action => {
          });
          return false;
        }
        if (!nameReg.test(this.uName)) {
          MessageBox.alert("请填写正确姓名.").then(action => {
          });
          return false;
        }
        if (this.uTel === '' || this.uTel === null) {
          MessageBox.alert("请填写您的手机号码.").then(action => {
          });
          return false;
        }
        if (!telReg.test(this.uTel) || this.uTel.length <= 5) {
          MessageBox.alert("请填写正确手机号码.").then(action => {
          });
          return false;
        }
        if (!(this.uRemark === "" || this.uRemark == null) && this.isEmojiCharacter(this.uRemark)) {
          MessageBox.alert("请正确填写备注，请不要包含非法字符.").then(action => {
          });
          return false;
        }
        if (this.showTime == "") {
          MessageBox.alert("请选择自提时间")
          return false;
        }
        if (this.$store.getters.getGoodsOrderNum === '' || this.$store.getters.getGoodsOrderNum == null) {
          this.$store.commit("pickUpUserName", this.uName)
          this.$store.commit("pickUpUserPhone", this.uTel)
          this.$store.commit("pickUpUserRemark", this.uRemark)
          this.$router.replace({
            path: "/bill",
            name: "bill"
          });
        } else if (this.$store.getters.getGoodsOrderNum !== "" || this.$store.getters.getGoodsOrderNum == null) {
          let url = this.common.baseURL + "mobi/goodsorder/one?num=" + this.$store.getters.getGoodsOrderNum
          this.axios.get(url).then(result => {
            console.log(result)
            if (result.data.result_code == "error" && result.data.result_msg == "SYSTEM_ERROR") {
              MessageBox.alert('系统错误')
            }
            if (result.data.goodsOrder.hasOwnProperty('deduction_integral')) {
              this.$store.commit("deductionIntegral", result.data.goodsOrder.deduction_integral)
              this.$router.replace({
                path: "/bill",
                name: "bill"
              });
            }
          })
        }
      },
      isEmojiCharacter(substring) {
        for (var i = 0; i < substring.length; i++) {
          var hs = substring.charCodeAt(i);
          if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
              var ls = substring.charCodeAt(i + 1);
              var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
              if (0x1d000 <= uc && uc <= 0x1f77f) {
                return true;
              }
            }
          } else if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
              return true;
            }
          } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
              return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
              return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
              return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
              return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
              || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
              || hs == 0x2b50) {
              return true;
            }
          }
        }
      },
      //显示时间选择器
      showTimer() {
        // $('.icon-active').removeClass('icon-active')
        // $('.color-active').removeClass("color-active");
        if (this.timeList) {
          if (!$('.list-today').hasClass('color-active')) {
            $('.list-today')[0].lastElementChild.classList.add("icon-active");
            $('.list-today')[0].classList.add("color-active");
          }
        }
        this.showPicker = true;
      },
      returnWeekText(value) {
        if (value == 1) {
          return "(周一)"
        }
        if (value == 2) {
          return "(周二)"
        }
        if (value == 3) {
          return "(周三)"
        }
        if (value == 4) {
          return "(周四)"
        }
        if (value == 5) {
          return "(周五)"
        }
        if (value == 6) {
          return "(周六)"
        }
        if (value == 0) {
          return "(周日)"
        }
      },
      //返回下一天的日期
      DatePicker(timeZone) {
        return this.moment.tz(timeZone).add(1, 'days').format("YYYY-MM-DD")
      },
      //设置今天和明天的文本显示
      setWeekText() {
        let nowDay = this.moment.tz(this.$store.getters.getTimeZone).format('d');
        let Tomorrow = this.moment(this.DatePicker(this.$store.getters.getTimeZone)).format('d')
        // let Tomorrow = this.moment.tz(this.$store.getters.getTimeZone).add(1, 'days').format("d");
        // let nowDay = this.moment(new Date()).format('d')
        // let Tomorrow = this.moment(this.DatePicker(new Date())).format('d')
        this.toDayText = '今天' + this.returnWeekText(nowDay)
        this.toMoRowText = '明天' + this.returnWeekText(Tomorrow)
      },
      //今天和明天的选择项
      setTimeOption() {//America/Los_Angeles
        let nowTime, time1, time2, timeOption = [], toMoreRowOption = [], timeFirstLoad = 0, firstLoadToMorRow = 0
        //America/New_York
        let timeZoneHours = +(moment().tz(this.$store.getters.getTimeZone).format('HH:mm').split(':')[0]); //获取指定时区的当前time
        let timeZoneMinutes = +(moment().tz(this.$store.getters.getTimeZone).format('HH:mm').split(':')[1]);
        // let timeZoneHours = +(moment(new Date("2019-08-15 02:39:21")).format('HH:mm').split(':')[0])
        // let timeZoneMinutes = +(moment(new Date("2019-08-15 02:39:21")).format('HH:mm').split(':')[1])
        let timeConfig = this.generateTimeTools();
        let time = this.$store.getters.getBusinessTimeSlot.split(",");
        let businessTimeSlotStartTime = time[0];
        let businessTimeSlotEndTime = time[1];
        //同天
        if (businessTimeSlotStartTime < businessTimeSlotEndTime) {
          console.log('同天')
          if (timeZoneHours <= timeConfig.startHours) {//小于门店开业时间  选择起始时间为开业时间
            if (timeZoneHours == timeConfig.startHours) {
              if (timeZoneMinutes < timeConfig.startMinutes) {//小于等于门店开业时间,且当前分钟小于门店开业分钟
                nowTime = (timeConfig.afterHours + 1) + ":" + "00:00"
              } else {
                timeConfig.startHours < 10 && (timeConfig.startHours = "0" + timeConfig.startHours);
                timeConfig.startMinutes < 10 && (timeConfig.startMinutes = "0" + timeConfig.startMinutes);
                // let configStartTime = timeConfig.startHours + ":" + timeConfig.startMinutes + ":00"
                // let nowDate = moment(new Date()).format("YYYY-MM-DD " + configStartTime)
                // let tzTime=moment.tz(this.$store.getters.getTimeZone).format("HH:mm")
                let nowDate = moment().tz(this.$store.getters.getTimeZone).format("YYYY-MM-DD HH:mm")
                nowDate = moment(nowDate).add(this.$store.getters.getAfterOrdersToTime, 'minute').format("HH:mm")
                nowTime = nowDate;
              }
            } else {
              nowTime = (timeConfig.afterHours + 1) + ":" + "00:00"
            }
          } else if (timeZoneHours >= (timeConfig.afterHours + 1) && timeZoneMinutes > timeConfig.afterMinutes) {//打烊后
            nowTime = (timeConfig.afterHours + 1) + ":" + "00:00"
          } else {
            // nowTime = moment().add(this.$store.getters.getAfterOrdersToTime, 'minute').format('HH:mm');
            nowTime = moment().tz(this.$store.getters.getTimeZone).add(this.$store.getters.getAfterOrdersToTime, 'minute').format('HH:mm')
          }
          // nowTime =  (timeConfig.afterHours + 1) + ":" + "00:00"
          console.log(nowTime, moment().tz(this.$store.getters.getTimeZone).format("HH:mm"))
          time1 = +(nowTime.split(":")[0])
          time2 = +(nowTime.split(":")[1])
          //今天时间
          for (time1; time1 <= timeConfig.afterHours; time1++) {
            for (let i = 0; i <= 2; i++) {
              if (timeFirstLoad == 0) {
                if (time2 >= 0 && time2 < 20) {
                  timeOption.push(time1 + ":" + 20)
                  timeOption.push(time1 + ":" + 40)
                  timeOption.push((time1 + 1) + ":" + "00")
                  time1++
                }
                if (time2 >= 20 && time2 < 40) {
                  timeOption.push(time1 + ":" + 40)
                  timeOption.push((time1 + 1) + ":" + "00")
                  time1++
                }
                if (time2 >= 40 && time2 < 60) {
                  timeOption.push((time1 + 1) + ":" + "00")
                  time1++
                }
                timeFirstLoad++
              }
              if (time1 == timeConfig.afterHours + 1) {//等于打烊小时
                if (timeConfig.afterMinutes <= 20) {
                  toMoreRowOption.push(i + ":" + "00")
                } else if (timeConfig.afterMinutes > 20 && timeConfig.afterMinutes <= 40) {
                  toMoreRowOption.push(i + ":" + "00")
                  toMoreRowOption.push(i + ":" + "20")
                } else if (timeConfig.afterMinutes > 40 && timeConfig.afterMinutes <= 60) {
                  toMoreRowOption.push(i + ":" + "00")
                  toMoreRowOption.push(i + ":" + "20")
                  toMoreRowOption.push(i + ":" + "40")
                }
              } else {
                if (i == 0) {
                  timeOption.push(time1 + ":" + 20)
                }
                if (i == 1) {
                  timeOption.push(time1 + ":" + 40)
                }
                if (i == 2) {
                  // time1++
                  timeOption.push((time1 + 1) + ":" + "00")
                }
              }
            }
          }
          let startMinutes = +(timeConfig.startMinutes) + (+(this.$store.getters.getAfterOrdersToTime))  //128
          let h, m = 0
          h = parseInt(startMinutes / 60)
          m = startMinutes - h * 60   //2 8
          let firstLoadToMorRow = 0
          //明天时间
          for (let i = +(timeConfig.startHours) + h; i <= (timeConfig.afterHours + 1); i++) {
            if (firstLoadToMorRow == 0) {
              // m = 120
              if (m <= 20) {
                toMoreRowOption.push(i + ":" + "20")
                toMoreRowOption.push(i + ":" + "40")
              }
              if (m > 20 && m <= 40) {
                toMoreRowOption.push(i + ":" + "40")
              }
              if (m > 40 && m <= 60) {
                i++
                toMoreRowOption.push((i + ":" + "00"))
              }
              firstLoadToMorRow++
            } else {
              if (i == (timeConfig.afterHours + 1)) {
                if (timeConfig.afterMinutes <= 20) {
                  toMoreRowOption.push(i + ":" + "00")
                } else if (timeConfig.afterMinutes > 20 && timeConfig.afterMinutes <= 40) {
                  toMoreRowOption.push(i + ":" + "00")
                  toMoreRowOption.push(i + ":" + "20")
                } else if (timeConfig.afterMinutes > 40 && timeConfig.afterMinutes <= 60) {
                  toMoreRowOption.push(i + ":" + "00")
                  toMoreRowOption.push(i + ":" + "20")
                  toMoreRowOption.push(i + ":" + "40")
                }
              } else {
                for (let j = 0; j <= 2; j++) {
                  if (j == 0) {
                    toMoreRowOption.push(i + ":" + "00")
                  }
                  if (j == 1) {
                    toMoreRowOption.push(i + ":" + 20)
                  }
                  if (j == 2) {
                    // i++
                    toMoreRowOption.push(i + ":" + 40)
                  }
                }
              }
            }
          }
          this.toDayRowArray = timeOption
          if (this.toDayRowArray.length == 0) {
            this.toDayRowArray.push('今日已打烊')
          }
          this.toMoreRowArray = toMoreRowOption
        }
        //跨天
        else {
          let nowTzTime = +(moment().tz(this.$store.getters.getTimeZone).format('HH:mm'))
          // let nowTzTime = "08:00"
          let AcrossDayStartHours = +(time[0].split(":")[0])
          let AcrossDayEndHours = +(time[1].split(":")[0])
          console.log('跨天', AcrossDayStartHours, AcrossDayEndHours)
          if (nowTzTime < businessTimeSlotStartTime && nowTzTime > businessTimeSlotEndTime) {
            timeOption.push("今日已打烊")
          } else {
            //跨天的今天时间
            for (AcrossDayStartHours; AcrossDayStartHours < 24; AcrossDayStartHours++) {
              for (let i = 0; i <= 2; i++) {
                if (timeFirstLoad == 0) {
                  // let afterOrdersToTime = moment("2019/08/15 " + time[0]).add(this.$store.getters.getAfterOrdersToTime, "minute").format("HH:mm")
                  let afterOrdersToTime = moment.tz(this.$store.getters.getTimeZone).add(this.$store.getters.getAfterOrdersToTime, "minute").format("HH:mm")
                  let toTimeHours = afterOrdersToTime.split(":")
                  let hours = +(toTimeHours[0])
                  let minute = +(toTimeHours[1])
                  AcrossDayStartHours = hours
                  if (minute >= 0 && minute < 20) {
                    timeOption.push(hours + ":" + 20)
                    timeOption.push(hours + ":" + 40)
                    timeOption.push((hours + 1) + ":" + "00")
                    AcrossDayStartHours++
                  }
                  if (minute >= 20 && minute < 40) {
                    timeOption.push(hours + ":" + 40)
                    timeOption.push((hours + 1) + ":" + "00")
                    AcrossDayStartHours++
                  }
                  if (minute >= 40 && minute < 60) {
                    timeOption.push((hours + 1) + ":" + "00")
                    AcrossDayStartHours++
                  }
                  timeFirstLoad++
                }
                if (i == 0) {
                  timeOption.push(AcrossDayStartHours + ":" + 20)
                }
                if (i == 1) {
                  timeOption.push(AcrossDayStartHours + ":" + 40)
                }
                if (i == 2) {
                  // time1++
                  if ((AcrossDayStartHours + 1) == 24) {
                    timeOption.push("00" + ":" + "00")
                  } else {
                    timeOption.push((AcrossDayStartHours + 1) + ":" + "00")
                  }
                }
              }
            }
          }

          timeOption.push("明天" + moment.tz(this.$store.getters.getTimeZone).add(1, 'days').format("YYYY-MM-DD"))
          this.$nextTick(function () {
            $('.list-today:contains("明天")').css({fontSize: 14 + "px", fontWeight: 600, letterSpacing: 1 + "px"})
          })
          //跨天0点后时间
          for (let i = 0; i <= AcrossDayEndHours; i++) {
            if (firstLoadToMorRow == 0) {
              let m = 0
              if (m <= 20) {
                timeOption.push(i + ":" + "20")
                timeOption.push(i + ":" + "40")
              }
              if (m > 20 && m <= 40) {
                timeOption.push(i + ":" + "40")
              }
              if (m > 40 && m <= 60) {
                i++
                timeOption.push((i + ":" + "00"))
              }
              firstLoadToMorRow++
            } else {
              if (i == AcrossDayEndHours) {
                if (timeConfig.afterMinutes <= 20) {
                  timeOption.push(i + ":" + "00")
                } else if (timeConfig.afterMinutes > 20 && timeConfig.afterMinutes <= 40) {
                  timeOption.push(i + ":" + "00")
                  timeOption.push(i + ":" + "20")
                } else if (timeConfig.afterMinutes > 40 && timeConfig.afterMinutes <= 60) {
                  timeOption.push(i + ":" + "00")
                  timeOption.push(i + ":" + "20")
                  timeOption.push(i + ":" + "40")
                }
              } else {
                for (let j = 0; j <= 2; j++) {
                  if (j == 0) {
                    timeOption.push(i + ":" + "00")
                  }
                  if (j == 1) {
                    timeOption.push(i + ":" + 20)
                  }
                  if (j == 2) {
                    // i++
                    timeOption.push(i + ":" + 40)
                  }
                }
              }
            }
          }
          //跨天的明天的时间
          let acrossDayFirstLoad = 0
          for (let i = timeConfig.startHours; i < 24; i++) {
            if (acrossDayFirstLoad == 0) {
              let Minutes = +(timeConfig.startMinutes) + (+(this.$store.getters.getAfterOrdersToTime))
              if (Minutes < 20) {
                toMoreRowOption.push(i + ":" + "20")
                toMoreRowOption.push(i + ":" + "40")
                toMoreRowOption.push((i + 1) + ":" + "00")
              }
              if (Minutes >= 20 && Minutes < 40) {
                toMoreRowOption.push(i + ":" + "40")
                toMoreRowOption.push((i + 1) + ":" + "00")
              }
              if (Minutes >= 40 && Minutes < 60) {
                toMoreRowOption.push((i + 1) + ":" + "00")
              } else if(Minutes >= 60){
                let hours = parseInt(Minutes / 60)
                let m = Minutes - (hours * 60)
                i += hours
                if (m < 20) {
                  toMoreRowOption.push(i + ":" + "20")
                  toMoreRowOption.push(i + ":" + "40")
                  toMoreRowOption.push((i + 1) + ":" + "00")
                }
                if (m >= 20 && m < 40) {
                  toMoreRowOption.push(i + ":" + "40")
                  toMoreRowOption.push((i + 1) + ":" + "00")
                }
                if (m >= 40 && m < 60) {
                  toMoreRowOption.push((i + 1) + ":" + "00")
                }
              }
              acrossDayFirstLoad++
            } else {
              if(i==23){
                toMoreRowOption.push(i + ":" + "20")
                toMoreRowOption.push(i + ":" + "40")
              }else {
                for (let j = 0; j < 3; j++) {
                  if (j == 0) {
                    toMoreRowOption.push(i + ":" + "20")
                  }
                  if (j == 1) {
                    toMoreRowOption.push(i + ":" + "40")
                  }
                  if (j == 2) {
                    toMoreRowOption.push((i + 1) + ":" + "00")
                  }
                }
              }
            }
          }
          this.toDayRowArray = timeOption

          if (this.toDayRowArray.length == 0) {
            this.toDayRowArray.push('今日已打烊')
          }
          this.toMoreRowArray = toMoreRowOption
        }
      },
      //点击了今天或明天
      toggleTime(value) {
        if (value == "now") {
          this.timeList = true
        } else if (value == "toMoRow") {
          this.timeList = false
        }
      },
      //点击了时间项
      timeItem(item) {
        if (this.timeList) {
          value = $('.list-today')[item].innerText
          if (!/(:)/g.test(value)) {
            return
          }
        } else if (!this.timeList) {
          value = $('.list-tomorow')[item].innerText
          if (!/(:)/g.test(value)) {
            return
          }
        }
        $('.icon-active').removeClass('icon-active')
        $('.color-active').removeClass("color-active");
        let value
        if (this.timeList) {
          $('.list-today')[item].lastElementChild.classList.add("icon-active");
          $('.list-today')[item].classList.add("color-active");
        } else if (!this.timeList) {
          $('.list-tomorow')[item].lastElementChild.classList.add("icon-active");
          $('.list-tomorow')[item].classList.add("color-active");
        }
      },
      //点击了时间选择器确认按钮
      pickerConfirm(value) {
        if (value == "cancel") {
          this.showPicker = false
        } else if (value == "confirm") {
          this.showPicker = false
          this.toDayOrtoMorRow = false
          let activeText = " " + document.getElementsByClassName('color-active')[0].innerText;
          let str1, str2, str3
          if (this.timeList) {//选择今天
            if (!/(:)/g.test(activeText)) {
              this.showTime = ""
              this.$store.commit('toTime', "")
              return false;
            } else {
              if ($('.list-today:contains("明天")').nextAll().hasClass('color-active')) {
                str1 = this.moment.tz(this.$store.getters.getTimeZone).add(1, "days").format('YYYY/MM/DD')
                str2 = str1 + " " + activeText
                str3 = str2
              } else {
                let activeHours = +(activeText.split(":")[0])
                if (activeHours == 0) {//"00:00"的判断
                  str1 = this.moment.tz(this.$store.getters.getTimeZone).add(1, 'days').format('YYYY/MM/DD')
                  str2 = str1 + " " + activeText
                  str3 = str2
                } else {
                  str1 = this.moment.tz(this.$store.getters.getTimeZone).format('YYYY/MM/DD')
                  str2 = str1 + " " + activeText
                  str3 = str2
                }
              }
            }
          } else if (!this.timeList) {
            this.toDayOrtoMorRow = true
            str1 = this.moment.tz(this.$store.getters.getTimeZone).add(1, 'days').format("YYYY/MM/DD")
            // str1 = this.moment(this.DatePicker(new Date())).format('YYYY/MM/DD')
            str2 = str1 + " " + activeText
            str3 = str2
          }
          this.showTime = this.moment(str3).format('HH:mm')
          this.$store.commit('toTime', this.moment(str3).format("YYYY-MM-DD HH:mm:ss"))
        }
      },
      //根据打烊时间,提供时间选择项的配置
      generateTimeTools() {
        let startTime = this.$store.getters.getBusinessTimeSlot.split(',')[0]
        let afterTime = this.$store.getters.getBusinessTimeSlot.split(',')[1]
        let startHours = +(startTime.split(":")[0])
        let startMinutes = +(startTime.split(":")[1])
        let afterHours = +(afterTime.split(":")[0])
        let afterMinutes = +(afterTime.split(":")[1])
        let timeConfig = {
          startHours: startHours,
          startMinutes: startMinutes,
          afterHours: (afterHours - 1),
          afterMinutes: afterMinutes
        }
        return timeConfig
      },
      //默认显示会员信息
      getUserInfo(){
        if(this.$store.getters.getIsStoreUser=="TRUE"){
          let userInfo = this.$store.getters.getStoreScanGoodsUser
          if(this.uName==""){
            this.uName = userInfo.first_name+userInfo.last_name
          }
          if(this.uTel==""){
            this.uTel = userInfo.phone
          }
        }
      }
    },
    created() {
      this.setWeekText()
      this.setTimeOption()
      this.getUserInfo()
      // this.slots[2].values = this.toDayRowArray
      //进入details页面,购物车没有菜品
      if (this.$store.getters.getShopCartList == null || this.$store.getters.getShopCartList == undefined || this.$store.getters.getShopCartList.length == 0) {
        MessageBox.alert("非法访问.").then(action => {
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
      this.shopCartList = this.$store.getters.getShopCartList;
      //计算总价以及商品总数
      for (let item of this.shopCartList) {
        this.total = this.common.round(this.total + item.total_amount, 2);
        this.totalCount = this.totalCount + item.count;
      }
      window.setTimeout((result) => {
        this.isShow = true;
      }, 1000);
    },
    mounted: function () {
      $("input").blur(function () {
        MessageBox.alert(4)
        setTimeout(function () {
          var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      })
    },
    computed: {},
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route: {
        handler: function () {

        }
      },
      showPicker: {//选择时间时,阻止滑动穿透
        handler: function (newVal, oldVal) {
          if (newVal) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
          } else {
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
          }
        }
      }
    }
  };
</script>

<style scoped>
  .bottom-btn-box > div {
    width: 50%;
    padding: 10px 0;
    border-top: 1px solid #babaf1;
    border-right: 1px solid #babaf1;
    font-size: 14px;
  }

  .bottom-btn-box {
    display: flex;
    text-align: center;
    background: #fff;
  }

  .popup-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .active-picker {
    color: #787676 !important;
    font-weight: 600;
  }

  .picker-left > div {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e1e0e0;
    flex: 1;
    color: #cccccc;
    padding: 0px 1rem;
    font-size: 14px;
  }

  .list-box {
    flex: 1;
    height: 200px;
    overflow: auto;
    overflow-x: hidden;
    padding-bottom: 6rem;
  }

  .list-box > div {
    height: 40px;
    line-height: 40px;
    position: relative;
    left: 2rem;
    display: flex;
    justify-content: space-between;
  }

  .icon {
    height: 40px;
    width: 20px;
    background-size: 100%;
    position: relative;
    right: 3rem;

  }

  .icon-active {
    background-image: url("../../../static/img/success-active.png");
  }

  .color-active {
    color: deepskyblue;
  }

  .mui-content {
    position: relative;
    color: #333;
    background-image: linear-gradient(0deg, #efeff4, #efeff4 65%, hsla(0, 0%, 96%, .3) 75%, hsla(0, 0%, 96%, 0)), linear-gradient(270deg, #ed5b5b, #f16f6f);
    padding: 44px 5% 60px 5%;
    font-size: 14px;
  }

  .mui-content .store-info {
    background: #ffffff;
    border-radius: 5px;
    margin-top: 1.5rem;
    padding: 5%;
    display: flex;
    justify-items: center;
    align-items: center;
  }

  .mui-content .store-info .store-img {
    width: 70px;
    height: 70px;
    float: left;

  }

  .mui-content .store-info .store-img img {
    width: 100%;

  }

  .mui-content .store-info .store-content {
    height: 70px;
    padding-left: 10px;
    line-height: 25px;


  }

  .mui-content .store-info .store-content .name {
    font-weight: 600;
  }

  .mui-content .store-info .store-content .address {
    color: #a29c9c;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .mui-content .store-info .store-content .mobile {
    color: #007aff;
  }

  .mui-content .store-info .store-content .mobile .mui-icon {
    color: #007aff;
    font-size: 16px;
    padding-right: 3px;
  }

  .mui-content .info {
    background: #ffffff;
    border-radius: 5px;
    margin-top: 1.5rem;
    padding: 5%;
  }

  .mui-content .info .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    padding-bottom: 1rem;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px dashed #ece4e4;
  }

  .mui-content .info .goods-cell {
    width: 100%;
    position: relative;
    overflow: hidden;
    padding-top: 1rem;
    border-bottom: 1px dashed #ece4e4;

  }

  .mui-content .info .goods-cell .goods-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 1rem;
  }

  .mui-content .info .goods-cell .goods-item .group-name {
    overflow: hidden;
    -webkit-box-flex: 6;
    flex: 6;
  }

  .mui-content .info .goods-cell .goods-item .group-name .name {
    color: rgba(0, 0, 0, 0.87);
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }

  .mui-content .info .goods-cell .goods-item .group-name .spec-list {
    margin: 0;
  }

  .mui-content .info .goods-cell .goods-item .group-name .spec-list span {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  .mui-content .info .goods-cell .goods-item .group-count {
    -webkit-box-flex: 1;
    flex: 1;
    text-align: right;
    color: rgba(0, 0, 0, 0.87);
    font-weight: bold;
  }

  .mui-content .info .goods-cell .goods-item .group-amount {
    -webkit-box-flex: 3;
    flex: 3;
    text-align: right;
    font-weight: bold;
    color: rgba(237, 91, 91, 1);
  }

  .mui-content .info .subtotal {
    text-align: right;
    width: 100%;
    position: relative;
    padding-top: 1rem;
  }

  .mui-content .info .subtotal .total {
    font-weight: bold;
  }

  .mui-content .info .subtotal .total .price {
    color: rgba(237, 91, 91, 1);
    font-size: 18px;
    font-weight: 600;
  }

  .mui-content .customer {
    margin-top: 1.5rem;
    border-radius: 5px;
    padding: 5% 5% 0% 5%;
  }

  .mui-input-group:before {
    position: relative;
    background-color: transparent;
  }

  .mui-input-group:after {
    position: relative;
    background-color: transparent;
  }

  .mui-content .customer .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    padding-bottom: 1rem;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px dashed #ece4e4;
  }

  .mui-content .customer .mui-input-row {
    height: 50px;
  }

  .mui-content .customer .mui-input-row label {
    padding: 16px 0px;
    width: 30%;
    font-size: 14px;
    font-weight: bold;
    color: #565656;
  }

  .mui-content .customer .mui-input-row label ~ input {
    height: 50px;
    text-align: right;
    font-size: 14px;
  }

  .mui-content .customer.mui-input-group .mui-input-row:after {
    position: absolute;
    left: 0;
  }

  .mui-content .customer.mui-input-group .mui-input-row:last-child:after {
    background-color: transparent;
  }

  .footer {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    padding: 0 .8rem;
    font-size: 14px;
  }

  .footer .price {
    font-size: 18px;
    color: rgba(237, 91, 91, 1);
    padding-left: 5px;
  }

  .footer .text {
    width: 40%;
  }

  .footer .btn {
    width: 60%;
  }

  .footer .btn .add-order {
    color: #fff;
    background: rgba(255, 185, 80, 1);
    border-radius: 18px;
    width: 45%;
    height: 36px;
    line-height: 36px;
    box-shadow: 0px 0px 3px 0px rgba(255, 185, 80, 1);
    text-align: center;
    float: left;
    margin-right: 10%;
  }

  .footer .btn .check-payment {
    color: #fff;
    background: #ed5b5b;
    border-radius: 18px;
    width: 45%;
    height: 36px;
    line-height: 36px;
    box-shadow: 0px 0px 3px 0px red;
    text-align: center;
    float: left;
  }

  .since-time-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .picker-box {
    display: flex;
    padding-top: 0rem;
    /*overflow: hidden;*/
    /*height: 100%;*/
  }

  .icon {
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

</style>
