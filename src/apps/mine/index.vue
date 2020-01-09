<template>
  <div class="logIn">
    <div class="personal">
      <div class="home_hade">我的</div>
      <div class="person_r">
        <img src="../../assets/head.png" />
      </div>
      <div class="person_l" v-if="!user">
        <p class="perPhone">{{phone}}</p>
      </div>
    </div>
    <div class="main">
      <div class="classify">
        <div class="listify" v-for="item in listBox">
          <Me :item="item" :status="orderStatus"></Me>
        </div>
      </div>
      <p class="out_login" @click="immediately" v-if="!user">退出登录</p>
    </div>
  </div>
</template>

<script>
import Head from "../../components/head";
import Me from "../../components/mine";
import Footer from "../../components/footer";
import {
  loginOut,
  information,
  configInfo,
  getContact
} from "../../api/app.api.js";

export default {
  name: "Mine",
  components: {
    Head,
    Me,
    Footer
  },
  created() {},
  data() {
    return {
      type: "Mine",
      title: "个人中心",
      phone: "",
      listBox: [
        [
          {
            name: "我的资料",
            path: "1",
            token: "",
            linkName: "datacenter",
            hidde: false
          },
          {
            name: "我的银行卡",
            path: "2",
            token: "",
            linkName: "bankcard",
            hidde: false
          },
          {
            name: "客户反馈",
            path: "4",
            token: "",
            linkName: "service",
            hidde: false
          },
          {
            name: "消息回复",
            path: "5",
            token: "",
            linkName: "advices",
            hidde: false
          }
        ]
      ],
      user: true,
      message: "",
      text: "",
      totalType: "",
      intrada: false,
      token: "",
      confg: "",
      orderStatus: "",
      kfArr0: ""
    };
  },
  methods: {
    imely() {
      dsBridge.call("clearWebCache", "111", function(v) {
        // alert(JSON.parse(v));
      });
    },
    goback() {
      this.$router.goBack();
    },
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: this.totalType,
        time: 300,
        onTimeout: () => {
          if (this.intrada) {
            this.$router.push({ name: "Login" });
          }
        }
      });
      this.toast.show();
    },
    registerLogin: function() {
      this.$router.push({ name: "Login" });
    },
    //获取配置信息
    configStatus: function() {
      var _self = this;
      configInfo({}).then(res => {
        if (res.code == "200") {
          this.confg = res.result;
          if (this.confg.contect == 0) {
            // this.listBox[0][1].hidde=true;
          } else {
            //客服内容
            this.kfArr0 = this.confg.contect.split("，");
            //获取默认个数
            let _listBoxlength = this.listBox[0].length;
            this.kfArr0.forEach(function(data, index) {
              var _json = {
                name: "",
                path: "2",
                linkName: "aboutM",
                token: _self.token,
                phone: "",
                hidde: false
              };
              _listBoxlength = _listBoxlength + 1;
              var _conent = data.split("：");
              if (_conent != "") {
                _json.name = _conent[0];
                _json.phone = _conent[1];
                _json.path = index + _listBoxlength;
                _self.listBox[0].push(_json);
              }
            });
          }
        }
      });
    },
    immediately: function() {
      loginOut({}, { token: this.token })
        .then(res => {
          if (res.code == "200") {
            this.intrada = true;
            this.text = res.msg;
            localStorage.clear();
          } else {
            this.text = res.msg;
          }
          this.Totas();
        })
        .catch(error => {
          console.log(error);
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
              this.result = res.data;
              // this.orderStatus = this.result.orderInfo.orderStatus;
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
    //获取联系客服
    getContact() {
      getContact(
        {},
        {
          token: this.token
        }
      )
        .then(res => {
          if (res.code == "200") {
            if (res.data) {
              let data = res.data;
              console.log(this.listBox);
              data.map(item => {
                let obj = {};
                obj.name = item;
                obj.path = 3;
                obj.linkName = "aboutM";
                this.listBox[0].push(obj);
              });
              console.log(this.listBox);
            }
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
    var userInfo = this.utils.fetch("userInfo");
    this.token = this.utils.fetch("token");
    if (userInfo.length != "") {
      this.user = false;
      this.phone = userInfo.phone;
      this.getContact();
    }
    this.Checkthestatus();
    this.listBox[0][0].token = this.token;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./index.scss";
</style>
