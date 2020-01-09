<template>
  <div class="bankcardBox">
    <Head :title="title" :isBack="isBack"></Head>
    <div class="text_main">
      <cube-textarea 
        v-model="value" 
        :maxlength="120"
        :placeholder="placeholder">
      </cube-textarea>
    </div>
    <div class="submit" >
      <p @click="submit">提交</p>
    </div>
  </div>
</template>
<script>
import Head from "../../components/head";

import { feedBack } from "../../api/app.api";

export default {
  name: "bankcard",
  components: {
    Head
  },
  data() {
    return {
      title: "客户反馈",
      isBack: "",
      value: '',
      placeholder: '请输入内容...',
      token:"",
      text:"",
      intrada:false
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
    submit(){
      if(this.value==""){
        this.text = "请输入内容"
        this.Totas()
        return
      }else{
        feedBack({
          feedBack:this.value
        }, 
          { token: this.token })
        .then(res => {
          if (res.code == "200") {
            this.intrada = true;
            this.text = res.msg;
          } else {
            this.text = res.msg;
          }
          this.Totas();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  },
  mounted() {
    this.utils.save("type", this.type);
    this.token = this.utils.fetch("token");
  }
};
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>