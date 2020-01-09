<template>
  <div>
    <div class="logIn-loading" v-if="loading">
      <cube-loading :size="30"></cube-loading>
    </div>
    <Head :title="title" :isBack="isBack"></Head>
    <div class="box">
      <!-- <p class="interval"></p> -->
      <div class="item-wrapper" v-for="(item,index) in payType" v-on:click="installment(item)">
        <div class="item-left-wrapper betworrn">
          <div style="display: flex;justify-content: start;align-items: center;">
            <img class="icon" :src="item.logo">
            <label class="item-title">{{item.payName}}</label>
          </div>
          <p v-if="itemIndex==item.payType">
            <img class="item-select" src="../../assets/checkmark.png">
          </p>
        </div>
      </div>
    </div>
    <div class="prop" v-if="falg" @click="closeBtn()">
      <div class="window">
        <p>请扫描二维码支付</p>
        <img class="img" :src="url">
      </div>
      <!-- <img class="close" src="../../assets/close.png"> -->
    </div>
    
    <div class="button" @click="Addpurchase">确认支付</div>
  </div>
</template>
<script>
import Head from "../../components/head";
import { getPayTypeList,repayment } from "../../api/app.api";
import { truncate } from 'fs';

export default {
  name: "extension",
  components: {
    Head
  },
  data() {
    return {
      title: "支付方式",
      text:"",
      loading:false,
      isBack: "",
      payType: [],
      valueChoose: 'WXPAY',
      itemIndex:"",
      url:"",
      falg:false,
    };
  },
  methods: {
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: "txt",
        time: 1000,
        onTimeout: () => {
          if (this.repaySuccess) {
            this.$router.push({ name: "home" });
          }
        }
      });
      this.toast.show();
    },
    //获取支付方式
    getPayType(){
      getPayTypeList({
      },{
        token:this.token
      }).then(
        res => {
          this.loading = false
          if (res.code=="200") {
            this.payType = res.data 
            this.itemIndex = this.payType[0].payType
          }else{
            this.text = res.msg;
            this.Totas();
          }  
        },
        error => {
          
        }
      )
    },
    //关闭弹框
    closeBtn(){
      var btn = document.querySelector(".window");
      if(btn){
        if(!btn.contains(event.target)){            
          this.falg = false;
        }
      }
    },
    //选择分期方式
    installment(item) {
      this.itemIndex = item.payType;
    }, 
    //确认支付
    Addpurchase(){
      this.loading = true
      repayment({
        type:this.$route.query.type,
        payType:this.itemIndex
      },{
        token:this.token
      })
      .then(res => {
        this.loading = false;
        if (res.code == "200") {
          
        }else if(res.code == "606"){
          if(this.itemIndex=="wxPay"){
            this.url = "http://jh.chinambpc.com/createQrcode?url=" + res.data
            this.falg = true
          }else if(this.itemIndex=="aliPay"){
            let payUrl = "alipays://platformapi/startApp?appId=10000011&url=" + res.data
            var str = dsBridge.call('generalize', payUrl)
            let strNew = JSON.parse(str);
            if(strNew=="0"){
              this.text = "请安装支付宝";
              this.Totas();
            }
            // callappjs.callAlipay(res.data);
            // if(confirm('是否支付成功')) {
            //   this.$router.push({
            //     name: 'home'
            //   })
            // }
          }else{
            window.location.href = res.data
          }
        } else{
          this.text = res.msg;
          this.Totas();
        }5
      })
      .catch(error => {
        this.loading = false;
      });
    },

  },
  
  mounted() {
    this.hasSendValidCode = this.$route.query.hasSendValidCode;
    this.token = this.utils.fetch("token");
    this.userInfo = this.utils.fetch("userInfo");
    this.loading = true
    this.getPayType()
  },
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>