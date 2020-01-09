<template>
  <div class="order_table">
    <!-- <cube-tab-bar v-model="selectedLabel" :inline="inline" showSlider @change="clickHandler">
      <cube-tab v-for="(item, index) in items" :label="item.label" :key="item.label">{{item.text}}</cube-tab>
    </cube-tab-bar>-->

    <cube-tab-panels v-model="selectedLabel">
      <Linkman v-on:childByValue="childByValue"></Linkman>
      <!-- <cube-tab-panel :label="items[0].label" :key="items[0].label" v-if="initialIndex=='0'">
        <Basic v-on:childByValue="childByValue"></Basic>
      </cube-tab-panel>
      <cube-tab-panel :label="items[1].label" :key="items[1].label" v-if="initialIndex=='1'">
        <Linkman v-on:childByValue="childByValue"></Linkman>
      </cube-tab-panel>
       <cube-tab-panel :label="items[2].label" :key="items[2].label" v-if="initialIndex=='2'">
        <keylog></keylog>
      </cube-tab-panel>-->
    </cube-tab-panels>
  </div>
</template>

<script type="text/ecmascript-6">
import Linkman from "./Quicklogin";

import { oneClickLogin } from "./../../api/app.api.js";

export default {
  components: {
    Linkman
  },
  data() {
    return {
      inline: false,
      selectedLabel: "Quicklogin",
      appCode: this.common.wholesituation.appCode,
      items: [
        // {
        //   label: "Passwordlogin",
        //   id: 0,
        //   text: "密码登录"
        // },
        {
          label: "Quicklogin",
          id: 0,
          text: "快捷登录"
        }
        // {
        //   label: "Quicklogin",
        //   id: 1,
        //   text: "快捷登录"
        // }
        // ,
        // {
        //   label: "keylog",
        //   id: 2,
        //   text: "一键登录"
        // }
      ],
      intrada: false,
      initialIndex: 1
    };
  },
  methods: {
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: "txt",
        time: 1000,
        onTimeout: () => {
          if (this.intrada) {
            this.$router.push({ name: "home" });
          }
        }
      });
      this.toast.show();
    },
    clickHandler(label) {
      this.items.map(item => {
        if (item.label == label) {
          if (item.id == 2) {
            let _this = this;

            //一键登录异步调用
            dsBridge.call("oneKeyLogin", "oneKeyLogin", function(v) {
              v = JSON.parse(v);
              if (v.code == "200") {
                oneClickLogin({
                  token: v.msg,
                  appCode: _this.appCode
                })
                  .then(res => {
                    if (res.data.success) {
                      _this.intrada = true;
                      _this.utils.save(
                        "message",
                        JSON.stringify(res.data.data)
                      );
                      _this.text = "登录成功";
                      _this.Totas();
                    } else {
                      _this.childByValue(1);
                      _this.text = "登录失败";
                      _this.Totas();
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                _this.text = "一键登录暂不可用";
                _this.Totas();
                _this.childByValue(1);
              }
            });
          } else {
            this.initialIndex = item.id;
          }
        }
      });
    },
    childByValue: function(childValue) {
      $(".cube-tab")[childValue].click();
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.order_table {
  margin-top: 10px;
  .cube-Img {
    width: 1rem;
    margin: 0 auto;
  }
  .tab-slide-container {
    padding: 0 10px;
  }
  .from_box {
    display: flex;
    justify-content: space-between;
  }
  .from_lable {
    width: (200/75) + rem;
  }
  .cube-form .cube-form-item .cube-btn {
    padding-left: 0;
    text-align: right;
    color: inherit;
    background: none;
    font-size: 14px;
    margin: 0;
  }
  .cube-form {
    font-size: 14px;
  }
  .cube-picker-wheel-wrapper > div {
    font-size: 16px !important;
  }
  .cube-form_standard .cube-textarea-wrapper {
    padding: 0;
  }
  .cube-tab {
    position: relative;
    color: #2ba6ff;
    font-size: 12px;
  }
  .cube-tab_active {
    font-size: 14px;
  }
  .cube-tab-bar-slider {
    background: #2ba6ff;
  }
  .cube-form-group-legend {
    background: 0;
  }
  .dividing {
    height: 8px;
    background: #f6f6f6;
  }
  .common {
    position: absolute;
    top: 10px;
    right: 6px;
    font-size: 12px;
  }
  .green {
    color: #49da6d;
  }
  .yello {
    color: #f4802c;
  }
  .red {
    color: #ff4e32;
  }

  .cube-validator .cube-select {
    text-align: left;
  }
  .cube-select::after {
    border: none;
  }
  .significance {
    margin-top: 15px;
  }
  input {
    text-align: left;
  }
  .applyFo {
    /*width: 85%;*/
    background-image: linear-gradient(90deg, #508cff 0%, #83c0ff 100%);
    font-size: 16px;
    color: #ffffff;
    margin: (50/75 + rem) 0;
    text-align: center;
    /*height: (90/75)+rem;
		border-radius: 3px;*/
  }
}
</style>
