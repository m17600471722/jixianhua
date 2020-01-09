<template>
  <div class="logIn">
    <div class="logIn-loading" v-if="loading">
      <cube-loading :size="30"></cube-loading>
    </div>
    <!-- <Head :title="title" :isBack="isBack" :type="type"></Head> -->
    <div class="head_top">
      <p class="title">快捷登录</p>
      <p>
        <img src="../../assets/logo.png" />
      </p>
    </div>

    <div class="main">
      <!-- <div class="topLogo">
        <img src="../../assets/logo.png" />
      </div>-->

      <tab-items></tab-items>
      <div class="hint">借贷有风险，入市需谨慎</div>
    </div>
  </div>
</template>
<script>
import TabItems from "../../components/TabItems";
import Head from "../../components/head";

import store from "../../store/session";
export default {
  name: "logIn",
  components: {
    Head,
    TabItems
  },
  data() {
    return {
      title: "登录",
      isBack: "",
      loading: true,
      count: 0,
      setInter: "",
      type: "",
      appCode: this.common.wholesituation.appCode,
      session: store.session
    };
  },
  created: function() {
    this.type = this.utils.fetch("type");

    let session = this.utils.fetch("session");
    if (session.length == 0) {
      this.utils.save("session", this.session);
      session = this.session;
    }

    this.setInter = setInterval(this.timer, 200);
    // statisticLogin({
    //   session: session,
    //   appCode: this.appCode
    // })
    //   .then(res => {
    //     if (res && res.data) {
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
  methods: {
    timer: function() {
      if (this.count <= 0) {
        this.count++;
      } else {
        this.loading = false;
        clearInterval(this.setInter);
      }
    }
  }
};
</script>
  <style scoped lang="scss">
.head_top {
  height: (606/75) + rem;
  background: url("../../assets/loginbag.png");
  background-size: 100% 100%;
  .title {
    font-size: (32/75) + rem;
    color: #fff;
    text-align: center;
    padding: (20/75) + rem 0;
  }
  img {
    width: (226/75) + rem;
    height: (226/75) + rem;
    margin: 0 auto;
    margin-top: (65/75) + rem;
  }
}
.logIn-loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 99999999;
}
img {
  display: block;
  width: 100%;
}
.main {
  padding: 0.8rem 0.7rem 0 0.7rem;
  font-size: 0.2rem;
  .hint {
    font-size: 0.3rem;
    color: #d8d8d8;
    text-align: center;
    margin-top: 1rem;
  }
  .topLogo {
    width: 3.5rem;
    height: 3.5rem;
    margin: 0 auto;
  }
}
</style>
