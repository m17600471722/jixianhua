<template>
  <div class="advices">
    <div class="logIn-loading" v-if="loading">
      <cube-loading :size="30"></cube-loading>
    </div>
    <Head :title="title" :isBack="isBack"></Head>
    <div class="main">
     <div v-if="dataList.length>0">
        <div class="issue" v-for="(item,index) in dataList" :key="index">
          <p>{{item.feedBack}}？</p>
          <span>{{item.replyContent == null ? "暂无回复" : item.replyContent}}</span>
        </div>
      </div>
      <p class="center" v-else>暂无消息</p>
    </div>
  </div>
</template>
<script>
import Head from "../../components/head";

import { queryfeedBack } from "../../api/app.api";

export default {
  name: "advices",
  components: {
    Head
  },
  data() {
    return {
      title: "消息回复",
      isBack: "",
      token:"",
      text:"",
      intrada:false,
      loading:false,
      dataList:[]
    };
  },
  created() {
    
    
  },
  methods: {
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: "text",
        time: 1000,
        onTimeout: () => {
          if (this.intrada) {
            this.$router.push({ name: "Mine" });
          }
        }
      });
      this.toast.show();
    },
    referqueryfeedBack(){
      queryfeedBack({}, 
        { token: this.token })
        .then(res => {
          this.loading = false
          if (res.code == "200") {
            this.dataList = res.data
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
    this.token = this.utils.fetch("token");
    this.loading = true
    this.referqueryfeedBack()
  }
};
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>