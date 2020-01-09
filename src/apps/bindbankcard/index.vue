<template>
  <div>
    <Head :title="title" :isBack="isBack"></Head>
    <div class="bankcard-page">
      <div class="bankcard-content">
        <div class="content-area">
          <div class="text">姓名</div>
          <div class="input">
            <cube-input
              v-model="name"
              placeholder="请输入姓名"
              :type="directline.type"
              :maxlength="directline.maxlength"
              :disabled="directline.disabled"
            ></cube-input>
          </div>
        </div>
        <div class="content-area">
          <div class="text">身份证</div>
          <div class="input">
            <cube-input
              v-model="card"
              placeholder="请输入身份证号"
              :type="directline.type"
              :maxlength="directline.maxlength"
              :disabled="directline.disabled"
            ></cube-input>
          </div>
        </div>
        <div class="content-area">
          <div class="text">储蓄卡</div>
          <div class="input">
            <cube-input
              v-model="depositcard"
              placeholder="请输入卡号"
              :type="directline.type"
              :maxlength="directline.maxlength"
            ></cube-input>
          </div>
        </div>
        <div class="content-area">
          <div class="text">手机号</div>
          <div class="input">
            <cube-input
              v-model="phone"
              placeholder="请输入手机号"
              :type="directline.type"
              :maxlength="directline.maxlength"
            ></cube-input>
          </div>
        </div>
        <div class="content-area">
          <div class="text">验证码</div>
          <div class="input">
            <cube-input
              v-model="code"
              placeholder="请输入验证码"
              :type="directline.type"
              :maxlength="directline.maxlength2"
            ></cube-input>
          </div>
          <div class="verificationcode verificationcode2">
            <span @click="getVerification">{{verificationText}}</span>
          </div>
        </div>
      </div>
      <cube-button @click="showDrawer" class="support_btn">
        支持的银行
        <i class="cubeic-question"></i>
      </cube-button>

      <div class>
        <cube-drawer ref="drawer" title="支持银行" :data="data" @cancel="cancelHandler"></cube-drawer>
      </div>

      <div class="submit" @click="submit">点击保存</div>
    </div>
  </div>
</template>
<script>
import Head from "../../components/head";
import { getCardSms, saveCard, getCardInfo, getBank } from "../../api/app.api";
import { provinceList } from "../../api/area";

export default {
  name: "bindbankcard",
  components: {
    Head
  },
  data() {
    return {
      token:"",
      type: "bindbankcard",
      title: "绑定银行卡",
      isBack: "",
      verificationText: "获取验证码",
      verificationTrue: false, // 验证码按钮是否可点击
      name: "",
      card: "", //身份证号
      depositcard: "", //银行卡号
      phone: "", //手机号码
      code: "", //验证码
      isCode: true, //验证码是否可点击状态
      userinfo: "",
      orderId: "",
      maxlength2: "6",
      directline: {
        relation: "",
        type: "text",
        maxlength: 100,
        maxlength2: 6,
        disabled: true
      },
      selectedIndex: [],
      data: [[]]
    };
  },
  methods: {
    showDrawer() {
      this.$refs.drawer.show();
    },

    cancelHandler() {},

    submit: function() {
      var md = this.$route.query.md;
      saveCard({
        validCode: this.code,
        phone: this.phone,
      },{
        token:this.token
      })
        .then(res => {
          if (res.code == "200") {
            if (md=="add") {
              this.$router.push({ name: "bankcard" });
            } else if(md=="home"){
              this.$router.push({ name: "home" });
            } else{
              this.$router.push({ name: "datacenter" });
            }
          }
          if (res.code == "111") {
            this.text = "请填写完整的资料";
            this.Totas();
            return false;
          }
          if (res.code == "106") {
            this.text = "信息填写错误或银行卡不支持";
            this.Totas();
            return false;
          }
          this.text = res.msg;
          this.Totas();
        })
        .catch(error => {
          console.log(error);
        });
    },
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: "txt",
        time: 1000,
        onTimeout: () => {
          if (this.intrada) {
            this.$router.push({ name: "setPassword" });
          }
        }
      });
      this.toast.show();
    },
    //获取验证码
    getVerification: function() {
      if (!this.verificationTrue) {
        this.text = "请输入正确的手机号！";
        this.Totas();
        return;
      }
      if (!this.isCode) {
        return;
      }

      getCardSms({
        bankCardNo: this.depositcard,
        phone: this.phone,
      },{
        token:this.token
      })
        .then(res => {
          if (res.code == "200") {
            this.countTime();
          } else {
            this.text = res.msg;
            this.Totas();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //校验电话号码，决定是否可点击获取验证码
    verificationPhone: function() {
      var reg = /^1[0-9]{10}$/;
      if (reg.test(this.phone)) {
        this.verificationTrue = true;
      } else {
        this.verificationTrue = false;
      }
    },
    //验证码的倒计时
    countTime: function() {
      let i = 59;
      this.isCode = false;
      this.verificationText = "59s";
      this.time = setInterval(() => {
        i--;
        this.verificationText = i + "s";
        if (i == 0) {
          this.verificationText = "获取验证码";
          this.Sms = "";
          this.verificationPhone();
          this.isCode = true;
          clearInterval(this.time);
        }
      }, 1000);
    },
    getCardInfo: function() {
      getCardInfo({
        // bwId: this.userinfo.id
      },{
        token:this.token
      })
        .then(res => {
          if (res.code == "200") {
            this.name = res.data.name;
            this.card = res.data.idCard;
            let name = this.$route.query.md;
            if(name=="home"){
              this.depositcard = this.$route.query.cardNo;
              this.phone = this.$route.query.phone;
            }
          } else {
            this.text = res.msg;
            this.Totas();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getBank: function() {
      var _self = this;
      getBank({},{
        token:this.token
      })
        .then(res => {
          if (res.code == "200") {
            res.data.forEach(function(item) {
              var a = {};
              a.text = item;
              _self.data[0].push(a);
            });
          } else {
            this.text = res.msg;
            this.Totas();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.utils.save("type", this.type);
    this.orderId = this.$route.query.orderId;
    this.token = this.utils.fetch("token");
    this.userinfo = this.utils.fetch("userInfo");
    this.getCardInfo();
    this.getBank();
    // var msg = this.utils.fetch("message");
    // if (msg.length == 0) {
    //   this.user = true;
    //   this.$router.push({ name: "Login" });
    // } else {
    //   this.user = false;
    //   this.message = JSON.parse(this.utils.fetch("message"));
    //   this.phone =
    //     this.message.userMobile.substr(0, 3) +
    //     "****" +
    //     this.message.userMobile.substr(7);
    // }
  },
  watch: {
    phone: function(v) {
      this.verificationPhone();
    }
  }
};
</script>
<style scoped lang="scss">
.bankcard-page {
  .verificationcode2 {
    width: 2.7rem;
    span {
      display: inline-block;
      height: 0.8rem;
      line-height: 0.8rem;
      width: 2.7rem;
      text-align: center;
      padding: 0 0.2666666667rem !important;
    }
  }
}
</style>