<template>
  <div style="margin-top: 1%">
    <div style="width: 100%;background: #4786ff;display: flex;flex-flow: row wrap;padding: .5rem 0rem;">
      <div class="info-first-row" style="width: 100%;border-bottom: 1px solid #548fff;padding: 1rem 0;text-align: center;">
        <p class="info-item-title" style="color: #c4d8ff;line-height:23px;margin-bottom: 0;margin-top: 10px;">Receipt for</p>
        <p style="color: #e7efff;font-size: 18px;line-height: 28px;margin-bottom: 0;margin-top: 10px;">Twice.Tools</p>
      </div>
      <div class="info-item" style="width: 45%;padding: 1rem 0px;border-bottom: 1px solid #548fff;display: flex;flex-flow: row nowrap;justify-content: center;">
        <div class="amount-icon iconIndex" style="background-image: url(./img/dollar.png);width: 22px;height: 52px;background-size: 100%;background-repeat: no-repeat;background-position: center;"></div>
        <div style="padding: 0rem 1.2rem;">
          <p class="info-item-title" style="color: #c4d8ff;line-height: 23px;margin-bottom: 0;margin-top: 10px;">Amount</p>
          <p style="color: #e7efff;font-size: 16px;line-height: 28px;margin-bottom: 0;margin-top: 10px;">$99.99</p>
        </div>
      </div>
      <div class="info-item" style="width: 45%;padding: 1rem 0px;border-bottom: 1px solid #548fff;display: flex;flex-flow: row nowrap;justify-content: center;">
        <div class="date-icon iconIndex" style="background-image: url(./img/date.png);width: 22px;height: 52px;background-size: 100%;background-repeat: no-repeat;background-position: center;"></div>
        <div style="padding: 0rem 1.2rem;">
          <p class="info-item-title" style="color: #c4d8ff;line-height: 23px;margin-bottom: 0;margin-top: 10px;">Date</p>
          <p style="color: #e7efff;font-size: 16px;line-height: 28px;margin-bottom: 0;margin-top: 10px;">August 06</p>
        </div>
      </div>
      <div class="info-item" style="width: 45%;padding: 1rem 0px;border-bottom: 1px solid #548fff;display: flex;flex-flow: row nowrap;justify-content:center;position: relative;left: .8rem;">
        <div class="order-icon iconIndex" style="background-image: url(./img/order.png);width: 22px;height: 52px;background-size: 100%;background-repeat: no-repeat;background-position: center;"></div>
        <div style="padding: 0rem 1.2rem;">
          <p class="info-item-title" style="color: #c4d8ff;line-height: 23px;margin-bottom: 0;margin-top: 10px;">Order No:</p>
          <p style="color: #e7efff;font-size: 16px;line-height: 28px;margin-bottom: 0;margin-top: 10px;">1234-5453</p>
        </div>
      </div>
      <div class="info-item" style="width: 45%;padding: 1rem 0px;border-bottom: 1px solid #548fff;display: flex;flex-flow: row nowrap;justify-content: center;position: relative;left: .7rem;">
        <div class="phone-icon iconIndex" style="background-image: url(./img/mobile.png);width: 22px;height: 52px;background-size: 100%;background-repeat: no-repeat;background-position: center;"></div>
        <div style="padding: 0rem 1.2rem;">
          <p class="info-item-title" style="color: #c4d8ff;line-height: 23px;margin-bottom: 0;margin-top: 10px;">Reference#:</p>
          <p style="color: #e7efff;font-size: 16px;line-height: 28px;margin-bottom: 0;margin-top: 10px;">170806-1426</p>
        </div>
      </div>
    </div>
    <div style="width: 90%;background: #ffffff;padding: 2rem 1rem;margin: auto;">
      <p style="color: black;padding: 1.2rem 0;font-size: 20px;letter-spacing: 1px;border-bottom: 1px solid #e4e3e3;margin-bottom: 0;margin-top: 10px;">Store</p>
      <div style="display: flex;flex-flow: row wrap;justify-content: space-between;">
        <div style="width:45%;padding:1rem 0;">
          <p style="padding-bottom: .5rem;font-size: 12px;color: #bebec5;margin-bottom: 0;">COMPANY/NAME</p>
          <p style="font-size: 15px;margin-bottom: 0;margin-top: 10px;">Acme Widgets Inc,</p>
        </div>
        <div style="width: 45%;padding: 1rem 0;">
          <p style="padding-bottom: .5rem;font-size: 12px;color: #bebec5;">STATE/PROVINCE</p>
          <p style="font-size: 15px;margin-bottom: 0;margin-top: 10px;">California</p>
        </div>
        <div style="padding-top: 0;width: 45%;padding: 1rem 0;">
          <p style="padding-bottom: .5rem;font-size: 12px;color: #bebec5;margin-bottom: 0;margin-top: 10px;">ADDRESS</p>
          <p style="font-size: 15px;margin-bottom: 0;margin-top: 10px;">211 Main St.#23</p>
        </div>
        <div style="padding-top: 0;width: 45%;padding: 1rem 0;">
          <p style="padding-bottom: .5rem;font-size: 12px;color: #bebec5;margin-bottom: 0;margin-top: 10px;">ZIP / POSTAL CODE</p>
          <p style="font-size: 15px;margin-bottom: 0;margin-top: 10px;">94114</p>
        </div>
      </div>
      <div style="display: flex;flex-flow: column wrap;">
        <p style="color: black;padding: 1.2rem 0;font-size: 20px;letter-spacing: 1px;border-bottom: 1px solid #e4e3e3;">Order</p>
        <div style="color: black;margin: 1.2rem 0;font-size: 14px;letter-spacing: 1px;border-bottom: 1px solid #e4e3e3;position: relative;flex: 1;display: flex;align-items: center;">
          <span>Bill To:</span>
          <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;margin: 1.2rem 0;font-size: 12px;font-weight: 600;padding: 0 10px;width: 70%;">Email ContentEmail ContentEmail Content</p>
        </div>
      </div>
      <div>
        <div style="display: flex;padding: 1.2rem 5px;padding-bottom: 0;">
          <div style="flex: .5;width: 50%;padding-bottom: .7rem;font-size: 12px;color: #bebec5;">Item</div>
          <div style="flex: .3;width: 30%;padding-bottom: .7rem;font-size: 12px;color: #bebec5;">Qty</div>
          <div style="flex: .2;width: 20%;padding-bottom: .7rem;font-size: 12px;color: #bebec5;">Price</div>
        </div>
        <div style="display: flex;padding: 0 5px">
          <div style="flex: .5;width: 50%;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;">NootBook</div>
          <div style="flex: .3;width: 30%;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;">1</div>
          <div style="flex: .2;width: 20%;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;">$99.99</div>
        </div>
        <div style="display: flex;padding: 0 5px">
          <div style="flex: .5;width: 50%;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;">MickCheek</div>
          <div style="flex: .3;width: 30%;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;">3</div>
          <div style="flex: .2;width: 20%;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;">$186.99</div>
        </div>
        <div style="text-align: right;display: flex;justify-content: flex-end;margin-top: 3rem;">
          <div style="text-align: left;flex: .267;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;display: flex;align-items: center;position: relative;
    right: 7%;">
            <p style="margin: 0;width: 200px;margin: 0;text-align: right;position: relative;right: 1.1rem;">Order Total:</p>
            <span style="font-weight: 600;font-size: 15px;color: #8f8f94;">$88.99</span>
          </div>
        </div>
        <div style="text-align: right;display: flex;justify-content: flex-end;">
          <div style="text-align: left;flex: .267;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;display: flex;align-items: center;position: relative;
    right: 7%;">
            <p style="margin: 0;width: 200px;margin: 0;text-align: right;position: relative;right: 1.1rem;">Order Tax:</p>
            <span style="font-size: 15px;color: #8f8f94;font-weight: 600;">$5.99</span>
          </div>
        </div>
        <div style="text-align: right;display: flex;justify-content: flex-end;">
          <div style="text-align: left;flex: .267;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;display: flex;align-items: center;position: relative;
    right: 7%;">
            <p style="margin: 0;width: 200px;margin: 0;text-align: right;position: relative;right: 1.1rem;">Order Discount:</p>
            <span style="font-size: 15px;color: #8f8f94;font-weight: 600;">$3.99</span>
          </div>
        </div>
        <div style="text-align: right;display: flex;justify-content: flex-end;">
          <div style="text-align: left;flex: .267;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;display: flex;align-items: center;position: relative;
    right: 7%;">
            <p style="margin: 0;width: 200px;margin: 0;text-align: right;position: relative;right: 1.1rem;">Order Tip:</p>
            <span style="font-size: 15px;color: #8f8f94;font-weight: 600;">$8.99</span>
          </div>
        </div>
        <div style="text-align: right;display: flex;justify-content: flex-end;">
          <div style="text-align: left;flex: .267;padding-bottom: .7rem;font-size: 15px !important;color: #8f8f94 !important;display: flex;align-items: center;position: relative;
    right: 7%;">
            <p style="margin: 0;width: 200px;margin: 0;text-align: right;position: relative;right: 1.1rem;">Order Combined:</p>
            <span style="font-size: 21px;color: black;font-weight: 600;">$99.99</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  };
</script>

<style scoped>
  .order-item div{
    font-size: 15px !important;
    color: #8f8f94 !important;
  }
  .order-item{
    padding: 0 5px!important;
  }
  .order-first-row div:nth-child(1){
    flex: .5;
  }
  .order-first-row div:nth-child(2){
    flex: .3;
  }
  .order-first-row div:nth-child(3){
    flex: .2;
  }
  .order-first-row{
    display: flex;
    padding: 1.2rem 5px;
    padding-bottom: 0;
  }
  .order-first-row div{
    padding-bottom: .7rem;
    font-size: 12px;
    color: #bebec5;
  }

  .store-info div:nth-child(3){
    padding-top: 0;
  }
  .store-info div:nth-child(4){
    padding-top: 0;
  }
  .store-info div p:nth-child(2){
    font-size: 15px;
  }
  .store-info div p:nth-child(1){
    padding-bottom: .5rem;
    font-size: 12px;
    color: #bebec5;
  }
  .store-info-title{
    color: black;
    padding: 1.2rem 0;
    font-size: 20px;
    letter-spacing: 1px;
    border-bottom: 1px solid #e4e3e3;
  }
  .store-info div{
    width: 45%;
    padding: 1rem 0;
  }
  .store-info{
    display: flex;
    flex-flow: row wrap;
  }
  .store-info-box{
    width: 65%;
    background: #ffffff;
    padding: 4rem 3rem;
  }
  .info-first-row{
    border-bottom: 1px solid #548fff;
    padding: 1rem 0;
  }
  .info-first-row p:nth-child(2){
    color: #e7efff;
    font-size: 18px;
    line-height: 28px;
  }
  p{
    margin-bottom: 0;
  }
  .iconIndex{
    width: 22px;
    height: 30px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .phone-icon{
    background-image: url("../../../static/img/mobile.png");
  }
  .order-icon{
    background-image: url("../../../static/img/order.png");
  }
  .date-icon{
    background-image: url("../../../static/img/date.png");
  }
  .amount-icon{
    background-image: url("../../../static/img/dollar.png");
  }
  .email-box {
    width: 999px;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
  }

  .receipt-info {
    width: 30%;
    background: #4786ff;
    display: flex;
    flex-flow: column nowrap;
    padding: 2.5rem 2rem;
  }

  .info-item {
    padding: 1rem 0px;
    border-bottom: 1px solid #548fff;
    display: flex;
    flex-flow: row nowrap;
  }

  .info-item-title {
    color: #c4d8ff;
    line-height: 23px;
  }

  .info-item div:nth-child(2) p:nth-child(2) {
    color: #e7efff;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 1px;
  }
  .info-item div:nth-child(2){
    padding: 0rem 1.2rem;
  }
</style>
