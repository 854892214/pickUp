import Vue from "vue"
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    storeName: sessionStorage.getItem('storeName'),
    storeAddress: sessionStorage.getItem('storeAddress'),
    storeMobile: sessionStorage.getItem('storeMobile'),
    isStoreUser: sessionStorage.getItem('isStoreUser'),
    storeScanGoodsUser: sessionStorage.getItem('storeScanGoodsUser'),
    isTax: sessionStorage.getItem('isTax'),
    isTip: sessionStorage.getItem('isTip'),
    storeId: sessionStorage.getItem('storeId'),
    taxRate: sessionStorage.getItem('taxRate'),
    tipVal: sessionStorage.getItem('tipVal'),
    tipType: sessionStorage.getItem('tipType'),
    userId: sessionStorage.getItem('userId'),
    qrCode: sessionStorage.getItem('qrCode'),
    discount : sessionStorage.getItem('discount'),
    timeZone : sessionStorage.getItem('timeZone'),
    shopCartList : sessionStorage.getItem('shopCartList'),
    userName : sessionStorage.getItem('userName'),
    userTel : sessionStorage.getItem('userTel'),
    userRemark : sessionStorage.getItem('userRemark'),
    isNoTip : sessionStorage.getItem('isNoTip'),
    isCustomTip : sessionStorage.getItem('isCustomTip'),
    goodsOrderNum : sessionStorage.getItem('goodsOrderNum'),
    menuId : sessionStorage.getItem('menuId'),
    tabbarStatus:sessionStorage.getItem('tabbarStatus'),
    fromIntegralConvertRatio:sessionStorage.getItem('fromIntegralConvertRatio')||0,
    toIntegralConvertRatio:sessionStorage.getItem('toIntegralConvertRatio')||0,
    openMembershipSystem:sessionStorage.getItem('openMembershipSystem')||0,
    deductionIntegral:sessionStorage.getItem('deductionIntegral')||0,
    nowIntegralNumber:sessionStorage.getItem('nowIntegralNumber')||0,
    goodsOrderId:sessionStorage.getItem('goodsOrderId')||0,
    // isNullDiscount:sessionStorage.getItem('isNullDiscount')||0,
    afterOrdersToTime:sessionStorage.getItem('afterOrdersToTime'),
    toTime:sessionStorage.getItem('toTime'),
    businessTimeSlot:sessionStorage.getItem('businessTimeSlot'),
    isAfterDiscountTip:sessionStorage.getItem('isAfterDiscountTip'),
    isAfterDiscountTax:sessionStorage.getItem('isAfterDiscountTax'),
    pickUpUserName:sessionStorage.getItem('pickUpUserName'),
    pickUpUserPhone:sessionStorage.getItem('pickUpUserPhone'),
    pickUpUserRemark:sessionStorage.getItem('pickUpUserRemark'),
  },
  mutations: {
    isTax(state,isTax){
      state.isTax = isTax;
      sessionStorage.setItem('isTax', isTax)
    },
    isTip(state,isTip){
      state.isTip = isTip;
      sessionStorage.setItem('isTip', isTip)
    },
    storeId(state,storeId){
      state.storeId = storeId;
      sessionStorage.setItem('storeId', storeId)
    },
    taxRate(state,taxRate){
      state.taxRate = taxRate;
      sessionStorage.setItem('taxRate', taxRate)
    },
    tipVal(state,tipVal){
      state.tipVal = tipVal;
      sessionStorage.setItem('tipVal', tipVal)
    },
    tipType(state,tipType){
      state.tipType = tipType;
      sessionStorage.setItem('tipType', tipType)
    },
    userId(state,userId){
      state.userId = userId;
      sessionStorage.setItem('userId', userId)
    },
    qrCode(state,qrCode){
      state.qrCode = qrCode;
      sessionStorage.setItem('qrCode', qrCode)
    },
    discount(state,discount){
      state.discount = discount;
      sessionStorage.setItem('discount', discount)
    },
    timeZone(state,timeZone){
      state.timeZone = timeZone;
      sessionStorage.setItem('timeZone', timeZone)
    },
    shopCartList(state,shopCartList){
      state.shopCartList = shopCartList;
      sessionStorage.setItem('shopCartList', shopCartList)
    },
    userName(state,userName){
      state.userName = userName;
      sessionStorage.setItem('userName', userName)
    },
    userTel(state,userTel){
      state.userTel = userTel;
      sessionStorage.setItem('userTel', userTel)
    },
    userRemark(state,userRemark){
      state.userRemark = userRemark;
      sessionStorage.setItem('userRemark', userRemark)
    },
    storeName(state,storeName){
      state.storeName = storeName;
      sessionStorage.setItem('storeName', storeName)
    },
    storeAddress(state,storeAddress){
      state.storeAddress = storeAddress;
      sessionStorage.setItem('storeAddress', storeAddress)
    },
    storeMobile(state,storeMobile){
      state.storeMobile = storeMobile;
      sessionStorage.setItem('storeMobile', storeMobile)
    },
    isStoreUser(state,isStoreUser){
      state.isStoreUser = isStoreUser;
      sessionStorage.setItem('isStoreUser', isStoreUser)
    },
    storeScanGoodsUser(state,storeScanGoodsUser){
      state.storeScanGoodsUser = storeScanGoodsUser;
      sessionStorage.setItem('storeScanGoodsUser', storeScanGoodsUser)
    },
    isNoTip(state,isNoTip){
      state.isNoTip = isNoTip;
      sessionStorage.setItem('isNoTip', isNoTip)
    },
    isCustomTip(state,isCustomTip){
      state.isCustomTip = isCustomTip;
      sessionStorage.setItem('isCustomTip', isCustomTip)
    },
    goodsOrderNum(state,goodsOrderNum){
      state.goodsOrderNum = goodsOrderNum;
      sessionStorage.setItem('goodsOrderNum', goodsOrderNum)
    },
    menuId(state,menuId){
      state.menuId = menuId;
      sessionStorage.setItem('menuId', menuId)
    },
    tabbarStatus(state,tabbarStatus){
      state.tabbarStatus = tabbarStatus;
      sessionStorage.setItem('tabbarStatus', tabbarStatus)
    },
    fromIntegralConvertRatio(state,fromIntegralConvertRatio){
      state.fromIntegralConvertRatio = fromIntegralConvertRatio;
      sessionStorage.setItem('fromIntegralConvertRatio', fromIntegralConvertRatio)
    },
    toIntegralConvertRatio(state,toIntegralConvertRatio){
      state.toIntegralConvertRatio = toIntegralConvertRatio;
      sessionStorage.setItem('toIntegralConvertRatio', toIntegralConvertRatio)
    },
    openMembershipSystem(state,openMembershipSystem){
      state.openMembershipSystem = openMembershipSystem;
      sessionStorage.setItem('openMembershipSystem', openMembershipSystem)
    },
    deductionIntegral(state,deductionIntegral){
      state.deductionIntegral = deductionIntegral;
      sessionStorage.setItem('deductionIntegral', deductionIntegral)
    },
    nowIntegralNumber(state,nowIntegralNumber){
      state.nowIntegralNumber = nowIntegralNumber;
      sessionStorage.setItem('nowIntegralNumber', nowIntegralNumber)
    },
    goodsOrderId(state,goodsOrderId){
      state.goodsOrderId = goodsOrderId;
      sessionStorage.setItem('goodsOrderId', goodsOrderId)
    },
    // isNullDiscount(state,isNullDiscount){
    //   state.isNullDiscount = isNullDiscount;
    //   sessionStorage.setItem('isNullDiscount', isNullDiscount)
    // },
    afterOrdersToTime(state,afterOrdersToTime){
      state.afterOrdersToTime = afterOrdersToTime;
      sessionStorage.setItem('afterOrdersToTime', afterOrdersToTime)
    },
    toTime(state,toTime){
      state.toTime = toTime;
      sessionStorage.setItem('toTime', toTime)
    },
    businessTimeSlot(state,businessTimeSlot){
      state.businessTimeSlot = businessTimeSlot;
      sessionStorage.setItem('businessTimeSlot', businessTimeSlot)
    },
    isAfterDiscountTip(state,isAfterDiscountTip){
      state.isAfterDiscountTip = isAfterDiscountTip;
      sessionStorage.setItem('isAfterDiscountTip', isAfterDiscountTip)
    },
    isAfterDiscountTax(state,isAfterDiscountTax){
      state.isAfterDiscountTax = isAfterDiscountTax;
      sessionStorage.setItem('isAfterDiscountTax', isAfterDiscountTax)
    },
    pickUpUserName(state,pickUpUserName){
      state.pickUpUserName = pickUpUserName;
      sessionStorage.setItem('pickUpUserName', pickUpUserName)
    },
    pickUpUserPhone(state,pickUpUserPhone){
      state.pickUpUserPhone = pickUpUserPhone;
      sessionStorage.setItem('pickUpUserPhone', pickUpUserPhone)
    },
    pickUpUserRemark(state,pickUpUserRemark){
      state.pickUpUserRemark = pickUpUserRemark;
      sessionStorage.setItem('pickUpUserRemark', pickUpUserRemark)
    }
  },
  getters: {
    getIsOrder:function(state){
      return state.isOrder;
    },
    getIsTax:function(state){
      return state.isTax;
    },
    getIsTip:function(state){
      return state.isTip;
    },
    getStoreId:function(state){
      return state.storeId;
    },
    getTaxRate:function(state){
      return state.taxRate;
    },
    getTipVal:function(state){
      return state.tipVal;
    },
    getTipType:function(state){
      return state.tipType;
    },
    getUserId:function(state){
      return state.userId;
    },
    getQrCode:function(state){
      return state.qrCode;
    },
    getDiscount:function(state){
      return state.discount ;
    } ,
    getTimeZone:function(state){
      return state.timeZone ;
    } ,
    getShopCartList:function(state){
      if(state.shopCartList!==null){
        return JSON.parse(state.shopCartList) ;
      }
    } ,
    getUserName:function(state){
      return state.userName ;
    } ,
    getUserTel:function(state){
      return state.userTel ;
    } ,
    getUserRemark:function(state){
      return state.userRemark ;
    },
    getStoreName:function(state){
      return state.storeName ;
    },
    getStoreAddress:function(state){
      return state.storeAddress ;
    },
    getStoreMobile:function(state){
      return state.storeMobile ;
    },
    getIsStoreUser:function(state){
      return state.isStoreUser ;
    },
    getStoreScanGoodsUser:function(state){
      return JSON.parse(state.storeScanGoodsUser) ;
    },
    getIsNoTip:function(state){
      return state.isNoTip ;
    },
    getIsCustomTip:function(state){
      return state.isCustomTip ;
    },
    getGoodsOrderNum:function(state){
      return state.goodsOrderNum ;
    },
    getMenuId:function(state){
      return state.menuId ;
    },
    getTabbarStatus:function(state){
      return state.tabbarStatus ;
    },
    getFromIntegralConvertRatio:function(state){
      return state.fromIntegralConvertRatio ;
    },
    getToIntegralConvertRatio:function(state){
      return state.toIntegralConvertRatio ;
    },
    getOpenMembershipSystem:function(state){
      return state.openMembershipSystem ;
    },
    getDeductionIntegral:function(state){
      return state.deductionIntegral ;
    },
    getNowIntegralNumber:function(state){
      return state.nowIntegralNumber ;
    },
    getGoodsOrderId:function(state){
      return state.goodsOrderId ;
    },
    // getIsNullDiscount:function(state){
    //   return state.isNullDiscount ;
    // },
    getAfterOrdersToTime:function(state){
      return state.afterOrdersToTime ;
    },
    getToTime:function(state){
      return state.toTime ;
    },
    getBusinessTimeSlot:function(state){
      return state.businessTimeSlot ;
    },
    getIsAfterDiscountTip:function(state){
      return state.isAfterDiscountTip ;
    },
    getIsAfterDiscountTax:function(state){
      return state.isAfterDiscountTax ;
    },
    getPickUpUserName:function(state){
      return state.pickUpUserName ;
    },
    getPickUpUserPhone:function(state){
      return state.pickUpUserPhone ;
    },
    getPickUpUserRemark:function(state){
      return state.pickUpUserRemark ;
    }
  }
});
export default store;
