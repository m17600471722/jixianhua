<template>
  <div class="bankcardBox">
    <Head :title="title" :isBack="isBack"></Head>
    <div class="cardlist" v-if="isBindCard">
      <div
        v-for="(item,index) in cardlist"
        v-on:click="carBindClick(item,index)"
        class="cardli"
        v-bind:class="item.status==1?'select':''"
      >
        <p>{{item.bankName}}</p>
        <p class="cardType">储蓄卡</p>
        <p class="cardNumber">{{item.bankCardNo}}</p>
      </div>
    </div>
    <div class="cardTitle" v-if="!isBindCard">您还没有绑定过银行卡!</div>
    <div class="subBox" v-if="isBindCard">
      <div class="cardBtn" @click="addCard">添加银行卡</div>
      <p class="Cardtext">银行卡仅用于提现和还款，不会产生任何费用</p>
    </div>
  </div>
</template>
<script>
import Head from "../../components/head";

import { getBCard, enableBankCard } from "../../api/app.api";

export default {
  name: "bankcard",
  components: {
    Head
  },
  data() {
    return {
      type: "bankcard",
      title: "我的银行卡",
      isBack: "",
      token: "",
      userInfo: "",
      isBindCard: false,
      orderId: "",
      cardlist: [],
      select: 0
    };
  },
  created() {
    this.userInfo = this.utils.fetch("userInfo");
    
  },
  methods: {
    addCard: function() {
      this.$router.push({
        name: "bindbankcard",
        query: {md: "add"}
      });
    },
    ////启用银行卡
    clickBankCard: function(bankId) {
      enableBankCard({
        id: bankId
      },{
        token:this.token
      }).then(res => {
        this.getList();
      });
    },
    //银行卡中间变成星号
    numberToString: function(str) {
      var reg = /^(\d{4})(\d*)(\d{4})$/;
      str = str.replace(reg, function(a, b, c, d) {
        return b + c.replace(/\d/g, "*") + d;
      });
      return str;
    },
    getList: function() {
      getBCard({},{
        token:this.token
      }).then(res => {
        this.cardlist = res.data;
        if (res.code == "605") {
          this.isBindCard = false;
        } else {
          this.isBindCard = true;
        }
      });
    },
    //点击选中银行卡
    carBindClick: function(item, index) {
      if (item.status == 1) {
        return;
      }
      this.$createDialog({
        type: "confirm",
        // icon: 'cubeic-alert',
        title: "是否启用该银行卡",
        // content: '我是内容',
        confirmBtn: {
          text: "确定",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          //点击确定
          this.clickBankCard(item.id);
        },
        onCancel: () => {
          //点击取消
        }
      }).show();
    },
    goTo: function() {
      if (this.token.length <= 0) {
        this.$router.push({ name: "Login" });
      } else {
        this.$router.push({ name: "datacenter" });
      }
    }
  },
  mounted() {
    this.utils.save("type", this.type);
    this.token = this.utils.fetch("token");
    this.userInfo = this.utils.fetch("userInfo");
    this.orderId = this.utils.fetch("orderID");
    this.getList();
  }
};
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>