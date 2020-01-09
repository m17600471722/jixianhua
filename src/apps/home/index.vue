<template>
  <div class="home_box">
    <div class="logIn-loading" v-if="loading">
      <cube-loading :size="30"></cube-loading>
    </div>
    <div class="home_head">
      <p class="head_title">
        <img src="../../assets/home/title.png" />
      </p>
      <div class="home_post">
        <div class="home_tu" v-if="orderStatus!=4 && orderStatus!=6">
          <img src="../../assets/home/首页-圆@2x.png" alt />
          <div class="home_content">
            <h2>{{maxPayment}}</h2>
            <p>借款金额（元）</p>
          </div>
        </div>
        <div class="home_tu" v-if="orderStatus==4||orderStatus==6">
          <img src="../../assets/home/首页-圆@2x.png" alt />
          <div class="home_content">
            <h2>{{borrowLimit}}</h2>
            <p>待还金额（元）</p>
          </div>
        </div>
      </div>

      <!-- <div class="home_post no_pay" v-if="orderStatus==3">放款中</div>
      <div class="home_post no_pay" v-if="orderStatus==2">审核中</div>
      <div class="home_post no_pay" v-if="orderStatus==5">很遗憾，未通过</div>
      <div class="home_post no_pay" v-if="orderStatus==6">已逾期</div>-->
    </div>
    <!-- 逾期 -->
    <div class="home_main" v-if="orderStatus==6">
      <div class="top">
        <div>
          <span>{{pTerm}}</span>
          <span>期限(天)</span>
        </div>
        <i></i>
        <div>
          <span>{{borrowLimit}}元</span>
          <span>待还金额</span>
        </div>
      </div>
      <div class="buttom" @click="clickRepayment">
        <button>立即还款</button>
      </div>
    </div>
    <!-- 立即借款 -->
    <div class="home_main" v-if="orderStatus==1">
      <div class="top">
        <div>
          <span>{{pTerm}}</span>
          <span>期限(天)</span>
        </div>
        <i></i>
        <div>
          <span>{{minPayment}}元</span>
          <span>起借金额</span>
        </div>
      </div>
      <div class="buttom">
        <button @click="goTo" v-if="orderStatus==1">立即提现</button>
      </div>
    </div>
    <!-- 审核中 -->
    <div class="home_main" v-if="orderStatus==2">
      <div class="top">
        <div>
          <span>{{pTerm}}</span>
          <span>期限(天)</span>
        </div>
        <i></i>
        <div>
          <span>{{minPayment}}元</span>
          <span>起借金额</span>
        </div>
      </div>
      <div class="buttom">
        <button>审核中</button>
      </div>
    </div>

    <!--放款中-->
    <div class="home_main" v-if="orderStatus == 3">
      <div class="top">
        <div>
          <span>{{pTerm}}</span>
          <span>期限(天)</span>
        </div>
        <i></i>
        <div>
          <span>{{minPayment}}元</span>
          <span>起借金额</span>
        </div>
      </div>
      <div class="buttom">
        <button>放款中</button>
      </div>
    </div>
    <!--未通过-->
    <div class="home_main" v-if="orderStatus == 5">
      <div class="top">
        <div>
          <span>{{pTerm}}</span>
          <span>期限(天)</span>
        </div>
        <i></i>
        <div>
          <span>{{minPayment}}元</span>
          <span>起借金额</span>
        </div>
      </div>
      <div class="buttom">
        <button>未通过</button>
      </div>
    </div>
    <!-- 待还款 -->
    <div class="home_main" v-if="orderStatus==4">
      <div class="top">
        <div>
          <span>{{borrowLimit}}元</span>
          <span>待还金额</span>
        </div>
        <i></i>
        <div>
          <span>{{repayTime}}</span>
          <span>待还款日</span>
        </div>
      </div>
      <div class="buttom" @click="clickRepayment">
        <button>立即还款</button>
      </div>
      <div v-if="isExtensionstatus" class="extension">
        <p @click="clickExtensionMeth" class="extension_btn">我要展期</p>
      </div>
    </div>
    <div class="befo_body" v-if="bodyTk">
      <h3>{{jumpMsg}}</h3>
      <p>恭喜您获得未激活额度(限时提额)</p>
      <button @click="gotoLink()">立即领取</button>
      <em @click="closeTk()">残忍放弃</em>
    </div>
    <div class="i_bg" v-if="bodyTk"></div>
  </div>
</template>
<script>
import {
  information,
  repayment,
  isExtension,
  repaymentSendSms
} from "../../api/app.api";

import { futimes } from "fs";
// import { futimes } from "fs";
export default {
  name: "home",
  data() {
    return {
      bodyTk: false,
      isOverStatus: "",
      isJumpOrther: "",
      jumpUrl: "",
      pTerm: "6",
      type: "home",
      title: "首页",
      borrowLimit: "5000.00", //待还
      borrowingDate: "7/14",
      maxPayment: "5000.00",
      minAmount: "2000.00",
      token: "",
      loading: false,
      condition: false,
      result: "",
      minPayment: "2200",
      orderStatus: 5,
      isExtensionstatus: false, //是否展期
      if: false,
      repayTime: "",
      isShow: 1,
      extensionStatus: "", //是否展期 1展期，0不展期
      items: [
        {
          price: "2000"
        },
        {
          price: "3000"
        },
        {
          price: "5000"
        }
      ],
      falg: false, //确定还款
      validCode: "",
      jumpMsg: "借款成功"
    };
  },
  methods: {
    closeTk() {
      this.bodyTk = false;
    },
    gotoLink() {
      let generalize = {
        url: this.jumpUrl,
        loanName: "邀请注册"
      };
      var str = dsBridge.call("generalize", generalize);
    },
    //点击跳转展期
    clickExtensionMeth: function() {
      this.$router.push({
        name: "extension",
        query: {
          hasSendValidCode: this.result.orderInfo.hasSendValidCode
        }
      });
    },
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: "txt",
        time: 2000,
        onTimeout: () => {
          if (this.if) {
            this.Checkthestatus();
          }
        }
      });
      this.toast.show();
    },
    //确认还款弹框
    clickRepayment() {
      this.$router.push({
        name: "borrowingDetails",
        query: {
          hasSendValidCode: this.result.orderInfo.hasSendValidCode
        }
      });
    },
    //获取借款
    Checkthestatus: function() {
      var msg = this.token;
      if (msg.length != 0) {
        information(
          {},
          {
            token: this.token
          }
        )
          .then(res => {
            if (res.code == "200") {
              this.condition = true;
              this.result = res.data;
              if (this.result.cardInfo != null && this.result.cardInfo != "") {
                this.text = "请重新绑卡";
                this.Totas();
                let _that = this;
                setTimeout(function() {
                  _that.$router.push({
                    name: "bindbankcard",
                    query: {
                      md: "home",
                      cardNo: _that.result.cardInfo.cardNo,
                      phone: _that.result.cardInfo.phone
                    }
                  });
                }, 3000);
              }
              // console.log(this.result)
              this.jumpUrl = this.result.jumpUrl;
              if (
                this.result.jumpMsg != undefined &&
                this.result.jumpMsg != null &&
                this.result.jumpMsg != ""
              ) {
                this.jumpMsg = this.result.jumpMsg;
              }
              this.minPayment = this.result.productInfo.borrow_min;
              this.maxPayment = this.result.productInfo.borrow_max;
              this.pTerm = this.result.productInfo.pterm;
              this.utils.save("ptermType", this.result.productInfo.productType);
              if (this.result.orderInfo == null) {
                this.orderStatus = 1;
              } else {
                this.orderStatus = this.result.orderInfo.orderStatus;
                this.borrowLimit = this.result.orderInfo.repayTotalAmount;
                this.repayTime = this.result.orderInfo.shouldRepayDate;
                this.isOverStatus = this.result.orderInfo.isOverdue;
                this.extensionStatus = this.result.orderInfo.extensionStatus;
              }
              this.isShow = 0;
              // // orderStatus等于1.2.3是正常借款状态，4还款状态，5放贷状态，6被拒绝
              this.isJumpOrther = this.result.isJumpOrther;

              if (this.isJumpOrther == "1") {
                this.bodyTk = true;
              }

              this.checkExtension();
            } else if (res.code == "301") {
              this.text = res.msg;
              this.Totas();
              this.$router.push({ name: "Login" });
            } else {
              this.text = res.msg;
              this.Totas();
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // this.condition = true;
        this.$router.push({ name: "Login" });
      }
    },
    //是否显示展期
    checkExtension: function() {
      if (this.orderStatus == 4 && this.extensionStatus != "") {
        if (this.extensionStatus == 1) {
          this.isExtensionstatus = true;
        } else {
          this.isExtensionstatus = false;
        }
      } else {
        this.isExtensionstatus = false;
      }
    },
    goTo: function() {
      if (this.token.length <= 0) {
        this.$router.push({ name: "Login" });
      } else {
        this.$router.push({ name: "datacenter" });
      }
    },
    //选择金额
    changePage(current) {
      console.log("当前轮播图序号为:" + current);
    }
  },
  mounted() {
    this.utils.save("type", this.type);
    this.token = this.utils.fetch("token");
    this.userInfo = this.utils.fetch("userInfo");
    this.Checkthestatus();
  }
};
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>
