<template>
  <div class="store-tabbar">
    <a class="store-tab-item" :class="item.name == name ? 'tabbar-active' : ''" v-for="(item,i) in tabbarList" :key="i"
       @click="updataStyle(i)">
      <div class="store-tab-item-icon" :class="item.icon"></div>
      <div class="store-tab-item-label">
        <p :class="item.name == name ? 'tabbar-active' : ''">{{item.tabbarName}}</p>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "Tabbar",
    data() {
      return {
        tabbarList: [{
          tabbarName: "店铺首页",
          name: 'home',
          icon: 'mui-icon mui-icon-home-filled',
        }, {
          tabbarName: "历史订单",
          name: 'OrderHistory',
          icon: 'mui-icon-extra mui-icon-extra-dictionary'
        }],
      }
    },
    props: ['name', "path", "orderNum"],
    methods: {
      updataStyle(i) {
        if (this.tabbarList[i].name === "OrderHistory" && this.$store.getters.getIsStoreUser === 'FALSE') {
          this.$router.replace({
            path: "/register",
            query: {
              type: this.path,
              orderNum: this.orderNum
            }
          });
        } else {
          this.$router.replace(this.tabbarList[i].name);
        }
      },
    },
    watch: {},
    mounted: function () {
      this.$nextTick(function () {

      })

    },
    created() {

    }
  }
</script>

<style>
  a {
    color: #8f8f94;
  }

  a:active {
    color: red;
  }

  .store-tab-item {
    display: block;
    padding: 7px 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-decoration: none;
    padding-bottom: 5px;
  }

  .store-tabbar {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #d9d9d9), color-stop(0, transparent));
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    text-align: center;
    border-top: 1px solid #ccc;
    z-index: 9999;
  }

  .store-tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px;
  }

  .store-tab-item-icon > * {
    display: block;
    width: 100%;
    height: 100%;
  }

  .store-tab-item-label {
    color: inherit;
    font-size: 12px;
    line-height: 1;
  }


  .tabbar-active {
    color: red;
  }
</style>
