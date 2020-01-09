<template>
  <div class="syntony">
    
  </div>
</template>

<script>
import { successCallback } from "../../api/app.api.js";

export default {
  name: "Mine",
  components: {
    
  },
  created() {
    
  },
  data() {
    return {
      token:"",
    };
  },
  methods: {
    showToastMask () {
      const toast = this.$createToast({
        txt: 'Loading...',
        mask: true,
        time: 3000,
      })
      toast.show()
    },
    ToastMask (type) {
      const toast = this.$createToast({
        txt: 'Loading...',
        mask: true,
        time: 0,
      })
      if(type==0){
        toast.hide()
      }else{
        toast.show()
      }
    },
    successCallback(){
      successCallback({
        riskNo:this.$route.query.riskNo,
        source:this.$route.query.source
      },{
        token:this.token
      }).then(
        res => {
          if (res.code=="200") {
            this.ToastMask(0)
            this.$router.push({ name: "datacenter" });
          }  
        },
        error => {
          
        }
      )
    }   
  },
  mounted() {
    this.token = this.utils.fetch("token");
    if(this.$route.query.alreayAuth==1){
      this.showToastMask();
      var that = this;
      setTimeout(function(){
        that.ToastMask(1)
        that.successCallback();
      },3000)
    }else{
      this.ToastMask(1)
      this.successCallback();
    }
  },
  computed: {
    
  }
};
</script>

<style scoped lang="scss">
// @import "./index.scss";
  .cube-loading-spinners{
    margin-top: 0px;
  }
</style>
