<template>
  <div>
    <Head :title="title" :isBack="isBack"></Head>
    <div class="bankcard-page">
      <h2>联系地址</h2>
      <div class="bankcard-content">
        <div class="content-area">
          <div class="text">所在城市</div>
          <div class="input" @click="showAddressPicker">{{city}}</div>
        </div>
        <div class="content-area">
          <div class="text">地址</div>
          <div class="input">
            <cube-input type="text" v-model="site" placeholder="请输入详细地址"></cube-input>
          </div>
        </div>
      </div>
      <h2>直系亲属</h2>
      <div class="bankcard-content">
        <div class="content-area">
          <div class="text">关系</div>
          <div class="input">
            <cube-input v-model="relation" placeholder="请输入你们之间的关系" type="text"></cube-input>
          </div>
        </div>
        <div class="content-area">
          <div class="text">姓名</div>
          <div class="input">
            <cube-input v-model="name" placeholder="请输入姓名" type="text"></cube-input>
          </div>
        </div>
        <div class="content-area">
          <div class="text">手机号</div>
          <div class="input">
            <cube-input v-model="phone" placeholder="请输入手机号" type="text"></cube-input>
          </div>
        </div>
      </div>
      <h2>重要联系人</h2>
      <div class="bankcard-content">
        <div class="content-area">
          <div class="text">关系</div>
          <div class="input">
            <cube-input type="text" v-model="relationt" placeholder="请输入你们之间的关系"></cube-input>
          </div>
        </div>
        <div class="content-area">
          <div class="text">姓名</div>
          <div class="input">
            <cube-input type="text" v-model="namet" placeholder="请输入姓名"></cube-input>
          </div>
        </div>
        <div class="content-area">
          <div class="text">手机号</div>
          <div class="input">
            <cube-input type="text" v-model="phonet" placeholder="请输入手机号"></cube-input>
          </div>
        </div>
      </div>
    </div>
    <div class="submit" @click="submit">点击保存</div>
  </div>
</template>
<script>
import { provinceList, cityList, areaList } from "../../api/area";

const addressData = provinceList;
addressData.forEach(province => {
  province.children = cityList[province.value];
  province.children.forEach(city => {
    city.children = areaList[city.value];
  });
});

import Head from "../../components/head";
import { savePInfo } from "../../api/app.api";
export default {
  name: "bindbankcard",
  components: {
    Head
  },
  data() {
    return {
      type: "bindbankcard",
      title: "个人信息",
      isBack: "",
      city: "请选择地区",
      site: "", //详细地址

      relation: "",
      name: "",
      phone: "",
      relationt: "",
      namet: "",
      phonet: ""
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
    showAddressPicker() {
      this.addressPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.city = selectedText.join("");
      // this.$createDialog({
      //   type: "warn",
      //   content: `Selected Item: <br/> - value: ${selectedVal.join(
      //     ", "
      //   )} <br/> - index: ${selectedIndex.join(
      //     ", "
      //   )} <br/> - text: ${selectedText.join(" ")}`,
      //   icon: "cubeic-alert"
      // }).show();
    },
    cancelHandle() {
      // this.$createToast({
      //   type: "correct",
      //   txt: "Picker canceled",
      //   time: 1000
      // }).show();
    },
    submit: function() {
      var myreg = /^1(3|4|5|7|8|9)\d{9}$/;
      if (
        this.city == "" ||
        this.city == null ||
        this.city == undefined ||
        this.city == "请选择地区"
      ) {
        this.text = "地区不能为空";
        this.Totas();
      } else if (
        this.site == "" ||
        this.site == null ||
        this.site == undefined
      ) {
        this.text = "详细地址不能为空";
        this.Totas();
      } else if (
        this.relation == "" ||
        this.relation == null ||
        this.relation == undefined
      ) {
        this.text = "关系不能为空";
        this.Totas();
      } else if (
        this.name == "" ||
        this.name == null ||
        this.name == undefined
      ) {
        this.text = "姓名不能为空";
        this.Totas();
      } else if (
        this.phone == "" ||
        this.phone == null ||
        this.phone == undefined ||
        !myreg.test(this.phone)
      ) {
        this.text = "手机号码有误请重新填写";
        this.Totas();
      } else if (
        this.relationt == "" ||
        this.relationt == null ||
        this.relationt == undefined
      ) {
        this.text = "重要关系不能为空";
        this.Totas();
      } else if (
        this.namet == "" ||
        this.namet == null ||
        this.namet == undefined
      ) {
        this.text = "重要姓名不能为空";
        this.Totas();
      } else if (
        this.phonet == "" ||
        this.phonet == null ||
        this.phonet == undefined ||
        !myreg.test(this.phonet)
      ) {
        this.text = "重要联系人手机号码有误";
        this.Totas();
      } else if (
        this.name == this.namet ||
        this.phone == this.phonet
      ) {
        this.text = "直系亲属和重要联系人姓名、手机号不能相同";
        this.Totas();
      }else {
        savePInfo({
          // orderId: this.$route.query.orderId, //工单id(必传)
          cityName: this.city, //城市名(必传)
          address: this.site, //详细地址
          relationName: this.name, //直系联系人姓名(必传)
          relationPhone: this.phone, //直系联系人电话(必传)
          unrelationName: this.namet, //非直系联系人姓名(必传)
          unrelationPhone: this.phonet, //非直系联系人电话(必传)
          // authChannel: 2,
          purpose: "个人消费" //借款目的(必传)
        },{
          token:this.token
        })
          .then(res => {
            if (res.code=="200") {
              this.text = res.msg;
              this.Totas();
              this.intervalid2 = setInterval(() => {
                this.$router.push({
                  name: "datacenter"
                });
              }, 1500);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    this.userinfo = this.utils.fetch("userInfo");
    this.token = this.utils.fetch("token");
    let upDataContact = {
      bwId: "121",
      token: this.token
    };
    var str = dsBridge.call("upDataContact", upDataContact);

    this.utils.save("type", this.type);

    this.addressPicker = this.$createCascadePicker({
      title: "选择地区",
      data: addressData,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    });
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
  destroyed() {
    clearInterval(this.intervalid2);
  }
};
</script>