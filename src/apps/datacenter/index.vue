<template>
  <div>
    <div class="headTitle">
      <Head :title="title" :type="datacenter" :color="color"></Head>
    </div>

    <div class="my-content">
      <div class="my-content-area-face face" @click="humanface">
        <p class="number" :class="{blue:truncate.borrowCart=='1'}">01</p>
        <div class="content-a">
          <img src="../../assets/icon-first/sfz.png" />
        </div>
        <div class="content-b">
          <p>身份认证</p>
        </div>
        <div class="content-c" :class="{'content-c-y':truncate.borrowCart=='1'}">
          <span>{{truncate.borrowCart=="1"?"已认证" :'未认证'}}</span>
        </div>
      </div>
      <div class="my-content-area-face personage" @click="personage">
        <p class="number" :class="{blue:truncate.borrowMsg=='1'}">02</p>
        <div class="content-a">
          <img src="../../assets/icon-first/txl.png" />
        </div>
        <div class="content-b">
          <p>个人信息</p>
        </div>
        <div class="content-c" :class="{'content-c-y':truncate.borrowMsg=='1'}">
          <span>{{truncate.borrowMsg=="1"?"已认证" :'未认证'}}</span>
        </div>
      </div>
      <div class="my-content-area-face phone" @click="operator">
        <p class="number" :class="{blue:truncate.operators=='1'}">03</p>
        <div class="content-a">
          <img src="../../assets/icon-first/yys.png" />
        </div>
        <div class="content-b">
          <p>信用认证</p>
        </div>
        <div class="content-c" :class="{'content-c-y':truncate.operators=='1'}">
          <span>{{truncate.operators=="1"?"已认证" :'未认证'}}</span>
        </div>
      </div>
      <div class="my-content-area-face bankcard" @click="bindbankcard">
        <p class="number" :class="{blue:truncate.bindCard=='1'}">04</p>
        <div class="content-a">
          <img src="../../assets/icon-first/yhk.png" />
        </div>
        <div class="content-b">
          <p>银行卡认证</p>
        </div>
        <div class="content-c" :class="{'content-c-y':truncate.bindCard=='1'}">
          <span>{{truncate.bindCard=="1"?"已认证" :'未认证'}}</span>
        </div>
      </div>
    </div>
    <div class="submit" :class="{blueSunmit:this.rz_num>=4}" @click="submit" v-if="way">立即提现</div>
    <div class="pop-up" v-if="Isprop">
      <p class="window">
        <img src="../../assets/card/bag.png" />
        <span class="addbtn" @click="propShow"></span>
      </p>
    </div>
  </div>
</template>
<script>
import Head from "../../components/head";
import {
  getOrderAuth,
  saveBinfo,
  saveAuthInfo,
  getAccount,
  qzIsGetYysData,
  carrier
} from "../../api/app.api";

export default {
  name: "datacenter",
  components: {
    Head
  },
  data() {
    return {
      type: "datacenter",
      title: "认证资料",
      color: "blue",
      isBack: "",
      userInfo: "",
      truncate: "",
      token: "",
      rz_num: 0,
      way: true,
      datacenter: "",
      Isprop: false
    };
  },
  methods: {
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: "txt",

        time: 1000
      });
      this.toast.show();
    },
    //关闭认证弹框
    propShow() {
      this.Isprop = false;
    },
    operator: function() {
      if (this.truncate.borrowMsg == 0) {
        this.text = "请先填写个人信息";
        this.Totas();
        return false;
      } else if (this.truncate.operators == 0) {
        let toOperator = {
          orderId: this.truncate.orderId,
          uid: this.userInfo.id,
          phone: this.truncate.phone,
          token: this.token
        };
        // dsBridge.call("toOperator", toOperator, function(v) {});
        carrier(
          {},
          {
            token: this.token
          }
        )
          .then(res => {
            if (res.code == "200") {
              window.location.href = res.data;
            } else {
              this.text = res.msg;
              this.Totas();
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.text = "已验证";
        this.Totas();
      }
    },
    //获取
    getNum: function() {
      if (this.truncate.borrowCart == 1) {
        this.rz_num++;
      }
      if (this.truncate.borrowMsg == 1) {
        this.rz_num++;
      }
      if (this.truncate.bindCard == 1) {
        this.rz_num++;
      }
      if (this.truncate.operators == 1) {
        this.rz_num++;
      }
      if (this.rz_num >= 4) {
        this.rz_num = 4;
      }
    },
    //实名认证
    humanface: function() {
      if (this.truncate.borrowCart == 0) {
        let Aliobj = {
          loginToken: this.token
        };
        dsBridge.call("aliRealNameVersify", Aliobj, function(v) {});
        // this.$router.push({ name: "idCard" });
      } else {
        this.text = "已验证";
        this.Totas();
      }
    },
    //提交
    submit: function() {
      var status = this.$route.query.status;
      if (this.truncate.borrowCart == 0) {
        //未实名认证;
        this.text = "未实名认证,请先认证";
        this.Totas();
      } else if (this.truncate.borrowMsg == 0) {
        //其他联系人
        this.text = "未填写联系人,请先填写";
        this.Totas();
      } else if (this.truncate.bindCard == 0) {
        //未填写卡号
        this.text = "未填写银行卡号,请先填写";
        this.Totas();
      } else if (this.truncate.operators == 0) {
        //未验证手机运营商
        this.text = "未验证手机运营商,请先填写";
        this.Totas();
      } else if (status == 6) {
        //申请未通过
        this.text = "申请未通过";
        this.Totas();
      } else {
        this.$router.push({ name: "borrowing" });
        return false;
      }
    },

    //运营商验证
    qzIsGetYys: function() {
      qzIsGetYysData({
        orderId: this.truncate.orderId
      })
        .then(res => {
          if (res.code == "000") {
            this.$set(this.truncate, "operators", "1");
            this.getNum();
          } else {
            this.text = "认证失败，请重试";
            this.Totas();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //银行卡认证
    bindbankcard: function() {
      if (this.truncate.operators == 0) {
        this.text = "请先信用认证";
        this.Totas();
      } else if (this.truncate.bindCard == 0) {
        this.$router.push({
          name: "bindbankcard",
          query: { md: "rem" }
        });
      } else {
        this.text = "已验证";
        this.Totas();
      }
    },
    personage: function() {
      if (this.truncate.borrowCart == 0) {
        this.text = "请先实名认证";
        this.Totas();
        return false;
      } else if (this.truncate.borrowMsg == 0) {
        this.$router.push({
          name: "personage",
          query: { orderId: this.truncate.orderId }
        });
      } else {
        this.text = "已验证";
        this.Totas();
      }
    },
    tpageToken: function() {
      saveBinfo(
        {
          productType: this.utils.fetch("ptermType"),
          expectMoney: 3000
        },
        {
          token: this.token
        }
      )
        .then(res => {
          if (res.code == "200") {
            getOrderAuth(
              {},
              {
                token: this.token
              }
            )
              .then(res => {
                if (res.data) {
                  this.truncate = res.data;
                  this.getNum();
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else if (res.code == "301") {
            this.$router.push({ name: "Login" });
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
    this.datacenter = this.$route.query.way;
    if (this.$route.query.way) {
      this.way = false;
    }
    this.userinfo = this.utils.fetch("userInfo");
    this.token = this.utils.fetch("token");

    let _this = this;
    dsBridge.register("humanfacecallback", function(l) {
      var l = JSON.parse(l);
      _this.$set(_this.truncate, "borrowCart", l.type);
      _this.getNum();
    });
    //运营商回调
    dsBridge.register("operatorcallback", function(l) {
      var l = JSON.parse(l);
      _this.qzIsGetYys(l);
      _this.getNum();
    });

    //实名认证回调
    dsBridge.register("aliRealNameCallBck", function(v) {
      var v = JSON.parse(v);
      if (v != 1) {
        _this.Isprop = true;
      } else {
        _this.tpageToken();
      }
    });

    var token = (this.token = this.utils.fetch("token"));
    if (token.length == 0) {
      this.user = true;
      this.$router.push({ name: "Login" });
    } else {
      this.utils.save("type", this.type);
      this.userInfo = this.utils.fetch("userInfo");
      this.tpageToken();
    }
  },
  destroyed() {
    clearInterval(this.intervalid2);
  }
};
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>
