 <template>
  <div>
    <div class="verify">
      <p>
        <cube-input v-model="phone" placeholder="请输入手机号码" type="text" :maxlength="maxlength"></cube-input>
      </p>
      <p class="pasword">
        <cube-input v-model="passNumbe" placeholder="请输入密码(6~10位字母数字组合)" type="password" :eye="eye"></cube-input>
      </p>
      <p class="forget">
        <span @click="codeLogin('2')">忘记密码</span>
        <!-- <span @click="codeLogin('1')">验证码登录/未注册账号点这里</span> -->
      </p>
    </div>
    <div class="protocol">
      <p class="check" @click="isImg">
        <img v-if="imgFalg" src="../../assets/face.png">
      </p>我已阅读并同意
      <span>
        <router-link :to="{ path: '/agreement' }">《用户服务协议》</router-link>
      </span>
    </div>
    <div class="btn" @click="immediately">立即登录</div>
  </div>
</template>




<script>
import { login } from "../../api/app.api";
export default {
  components: {},
  data() {
    return {
      phone: "",
      passNumbe: "",
      encrypt: "", //加密手机号码
      imgFalg: true,
      maxlength: 11,
      appCode: this.common.wholesituation.appCode,
      eye: {
        open: false,
        reverse: false
      },
      text: "",
      intrada: false,
      strData: {}
    };
  },
  methods: {
    isImg: function() {
      // this.imgFalg = !this.imgFalg;
    },
    codeLogin: function(id) {
      this.$emit("childByValue", "1");
      // this.$router.push({ name: "Register", query: { id: id } });
    },
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
    immediately: function() {
      var myreg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      var pasVal = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$";
      var re = new RegExp(pasVal);
      if (!myreg.test(this.phone)) {
        this.text = "请输入正确的手机号！";
        this.Totas();
        return;
      }
      if (!re.test(this.passNumbe)) {
        this.text = "密码为6~10位字母数字组合";
        this.Totas();
        return;
      }
      if (!this.imgFalg) {
        this.text = "请先同意服务协议";
        this.Totas();
        return;
      }
      this.getSchoolList();
      //			this.$store.dispatch('changePhone', this.encrypt);
    },

    getSchoolList: function() {
      login({
        userMobile: this.phone,
        userPassword: this.passNumbe,
        eCode: this.strData.eCode,
        deviceCode: this.strData.deviceCode,
        longitude: this.strData.longitude,
        latitude: this.strData.latitude,
        appCode: this.appCode
      })
        .then(res => {
          if (res.data.success) {
            this.intrada = true;
            this.utils.save("message", JSON.stringify(res.data.data));
          }
          this.text = res.data.message;
          this.Totas();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    var str = dsBridge.call("loginSyn", "loginSyn");
    if (str != undefined) {
      this.strData = JSON.parse(str.replace("/", ""));
    }
    const self = this;
    dsBridge.register("Returnso", function() {
      self.$router.push("/");
    });
  }
};
</script>

<style scoped lang="scss">
img {
  display: block;
  width: 100%;
}
.main {
  padding: 0.8rem 0.5rem 0 0.5rem;
  font-size: 0.2rem;
}
.topLogo {
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto;
}
.verify {
  margin-top: 1rem;
  .cube-input {
    position: relative;
    border-bottom: 1px solid #eee;
  }
}
.pasword {
  margin-top: 0.2rem;
}
.forget {
  display: flex;
  justify-content: space-between;
  color: #a2b2c6;
  font-size: 0.35rem;
  padding-top: 0.5rem;
}
.check {
  width: 0.3rem;
  height: 0.3rem;
  border: 1px solid #538fff;
  background: #538fff;
  margin-right: 0.1rem;
}
.protocol {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1.5rem;
  font-size: 0.35rem;
  span {
    color: #538fff;
    a {
      color: #538fff;
    }
  }
}
.btn {
  line-height: 1.2rem;
  background: linear-gradient(to right, #83c0ff, #508cff);
  font-size: 0.45rem;
  color: #fff;
  text-align: center;
  margin-top: 0.5rem;
  box-shadow: 0px 7px 44px #a8acb6;
}
.cube-input {
  font-size: 16px;
  line-height: 1.8;
}
</style>
