<template>
  <div class="idCard">
    <Head :title="title" :isBack="isBack"></Head>
    <p class="interval"></p>
    <div class="authentication">
      <p class="hide">上传身份证照片</p>
      <span class="only">仅用于公安网核实身份</span>
      <div class="front Identity">
        <div class="left">
          <p class="dracontomclon">人像面</p>
          <p class="updown">点击上传人像面</p>
        </div>
        <div class="right">
          <div class="imgCon">
            <label class="selectButton1" @click="changeImage($event,1)">
              <img :src="zm" alt="添加" />
              <!-- <input id="selectImg1" type="file" multiple="multiple" name="file" accept="image/*" @change="changeImage($event,1)"/> -->
            </label>
          </div>
        </div>
      </div>
      <div class="verso Identity">
        <div class="left">
          <p class="dracontomclon">国徽面</p>
          <p class="updown">点击上传国徽面</p>
        </div>
        <div class="right">
          <div class="imgCon">
            <label class="selectButton2" @click="changeImage($event,2)">
              <img :src="fm" alt="添加" />
              <!-- <input id="selectImg2" type="file" name="file" accept="image/*" @change="changeImage($event,2)"/> -->
            </label>
          </div>
        </div>
      </div>
      <div class="information">
        <p class="verify"><span></span>请核对以下信息，内容有误请重新拍照验证<span></span></p>
        <p class="datum"><span>姓名：</span>{{zmData.name}}</p>
        <p class="datum"><span>身份证号：</span>{{zmData.idCardNo}}</p>
        <p class="datum"><span>出生年月：</span>{{zmData.birthday}}</p>
        <p class="datum"><span>民族：</span>{{zmData.race}}</p>
        <p class="datum"><span>住址：</span><span class="adress">{{zmData.address}}</span></p>
      </div>
    </div>
    <p class="interval"></p>
    <div class="face">
      <div class="human_face" @click="humanFace()">
        <p>人脸识别</p>
        <p>去验证<img src="../../assets/card/jr@2x.png"></p>
      </div>
      <!-- <input id="input_face" type="file" name="file" capture="user" accept="image/*" @change="changeImage($event,3)"/> -->
    </div>

    <!-- <p class="interval"></p>
    <p class="btn" @click="submit()">提交</p> -->
    <!-- 彈框 -->
    <div class="pop-up" v-if="Isprop">
      <p class="window">
        <img src="../../assets/card/bag.png">
        <span class="addbtn" @click="propShow"></span>
      </p>
    </div>
  </div>
</template>
<script>
import Head from "../../components/head";
import { submitIdentityFont,submitIdentityBack,submitIdentityFaceVerify,queryIdentityInfo } from "../../api/app.api";
import { provinceList } from "../../api/area";

export default {
  name: "idCard",
  components: {
    Head
  },
  data() {
    return {
      type: "idCard",
      title: "身份认证",
      isBack: "",
      text:"",
      token: "",
      zm:require("../../assets/card/sfzm@2x.png"),
      fm:require("../../assets/card/sffm@2x.png"),
      form:{
        zm:"",
        fm:"",
        el:""
      },
      Isprop:false,
      zmData:{},
      intrada:false,
      firImg:"",
    };
  },
  methods: {
    // 提示框
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: "txt",
        time: 1000,
        onTimeout: () => {
          if (this.intrada) {
            this.$router.push({ name: "datacenter" });
          }
        }
      });
      this.toast.show();
    },
    propShow(){
      this.Isprop = false;
    },
    // 加载框
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
    
    //人脸
    humanFace(){
      console.log("66")
      if(this.form.zm==""){
        this.text = "请先上传身份证正面";
        this.Totas();
        return;
      }
      if(this.form.fm==""){
        this.text = "请先上传身份证反面";
        this.Totas();
        return;
      }
      let payWay = {
        token:this.token
      }
      // setTimeout(function(){
        
      // },800)
      this.ToastMask(1)
      dsBridge.call("toSTLiveness", payWay, function(v) {});
    },
    uploadImg (imgcode,type) {
      let aa
      let sfData = {}
      if(type==1){
        aa = submitIdentityFont
        sfData.ocrIDCard_front_image_base64 = encodeURIComponent(imgcode)
      }else if(type==2){
        aa = submitIdentityBack
        sfData.ocrIDCard_back_image_base64 = encodeURIComponent(imgcode)          
      }else{
        aa = submitIdentityFaceVerify
        sfData.ocrIDCard_living_image_base64 = encodeURIComponent(imgcode)
      }
      aa(sfData,{
        token:this.token
      }).then(
        res => {
          if (res) {
            this.ToastMask(0)
            if(res.code=="200"){
              if(type==1){
                this.zmData = res.result
                this.form.zm = res.result.ocrIDCardFrontImagePath;
                this.zm = res.result.ocrIDCardFrontImagePath;
              }else if(type==2){
                this.form.fm = res.result.ocrIDCardBackImagePath;
                this.fm = res.result.ocrIDCardBackImagePath;
              }else if(type==3){
                this.intrada = true;
                this.text = "认证完成";
                this.Totas();
              }
            }else{
              if(type!=3){
                this.Isprop = true
              }else{
                this.text = "请进行人脸识别";
                this.Totas();
              }
            }
          }  
        },
        error => {
          
        }
      )
    },
    //身份证上传
    changeImage(e,type){
      let payWay = {
        token:this.token,
        type:type
      }
      console.log(payWay)
      this.ToastMask(1)
      dsBridge.call("identityCard", payWay, function(v) {});
      // var file = e.target.files[0]
      // var reader = new FileReader()
      // var that = this
      // reader.readAsDataURL(file)
      // reader.onload = function(e) {
      //   var imgcode
      //   let img = new Image()
      //   img.src = e.target.result;
      //   if (file.size > 1024 * 1024 * 1) {
      //     that.ToastMask(1)
      //     that.compress(img,that.uploadImg,type)
      //   }else{
      //     imgcode = e.target.result;
      //     that.uploadImg(imgcode,type)
      //   }
      //   var form = new FormData();
      //   form.append("file", file);
      // }
    },
    //图片压缩
    compress(img, callback,type) {
      img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.setAttribute('width', this.width)
        canvas.setAttribute('height', this.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // 转成base64 文件
        let base64 = canvas.toDataURL('image/jpeg')
        let scale  = 0.6
        let num = 0.01
        if(base64.length > 1024*1024*3){
          num = 0.02
        }
        if(base64.length > 1024*1024*6){
          num = 0.03
        }
        while(base64.length > 1024*1024  ) {
          scale -= num
          if(scale<=0) break;
          base64 = canvas.toDataURL('image/jpeg', scale)
        }
        callback(base64,type)
      }
    },
    //身份证查询
    queryIdentityInfo(){
      this.ToastMask(1)
      queryIdentityInfo({},{
        token:this.token
      })
      .then(res => {
        this.ToastMask(0)
        if (res.code == "200") {
          if(res.data!=null){
            //身份证图片和用户信息赋值
            this.zmData = res.data
            if(res.data.ocrIDCardFrontImagePath != null&&res.data.ocrIDCardFrontImagePath != ""){
              this.zm = res.data.ocrIDCardFrontImagePath
              this.form.zm = res.data.ocrIDCardFrontImagePath
            }
            if(res.data.ocrIDCardBackImagePath != null&&res.data.ocrIDCardBackImagePath != ""){
              this.form.fm = res.data.ocrIDCardBackImagePath
            this.fm = res.data.ocrIDCardBackImagePath
            }
          }
        }else if(res.code=="605"){

        }else{
          this.text = res.msg;
          this.Totas();
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.utils.save("type", this.type);
    this.token = this.utils.fetch("token");
    this.queryIdentityInfo();
    let _this = this;
    //人脸回调
    dsBridge.register("livenesscallback", function(l) {
      let router = window.router
      var l = JSON.parse(l);
      _this.ToastMask(0)
      if(l==1){
        _this.text = "认证完成";
        _this.Totas();
        router.push({
          name: 'datacenter'
        })
      }else if(l==0){
        _this.text = "上传失败";
        _this.Totas();
      }else if(l==2){
        _this.text = "人脸认证失败";
        _this.Totas();
      }else if(l==3){
         _this.ToastMask(0)
        _this.text = "人脸认证取消";
        _this.Totas();
      }
    });
    //身份证回调
    dsBridge.register("identityCardCallback", function(v,l) {
      _this.ToastMask(0)
      if(l==0){
        _this.Isprop = true
      }else{
        var l = JSON.parse(l);
        if(v=="1"){
          _this.zmData = l
          _this.form.zm = l.ocrIDCardFrontImagePath;
          _this.zm = l.ocrIDCardFrontImagePath;
        }else if(v=="2"){
          _this.form.fm = l.ocrIDCardBackImagePath;
          _this.fm = l.ocrIDCardBackImagePath;
        }else if(v=="3"){
          _this.ToastMask(0)
        }
      }
    });
  },
  watch: {
    
  }
};
</script>
<style scoped lang="scss">
  @import "./index.scss";
</style>