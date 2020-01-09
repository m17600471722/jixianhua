<template>
  <div>
    <Head :title="title" :isBack="isBack"></Head>
    <div class="WordSection1" style="padding:0 .4rem 2rem .4rem;">
      <p
        class="MsoNormal"
        align="center"
        style="text-align:center;
line-height:20.0pt;text-autospace:none"
      >
        <b>
          <span style="
font-family:微软雅黑;font-size:.5rem;">借款协议</span>
        </b>
      </p>

      <p
        class="MsoNormal"
        align="left"
        style="text-align:left;line-height:20.0pt;
text-autospace:none"
      >
        <span style="font-size:.36rem;font-family:微软雅黑">借款申请人（借款人）：{{name}}</span>
      </p>

      <p
        class="MsoNormal"
        align="left"
        style="text-align:left;line-height:20.0pt;
text-autospace:none"
      >
        <span style="font-size:.36rem;font-family:微软雅黑">身份证号码：{{card}}</span>
      </p>

      <p
        class="MsoNormal"
        align="left"
        style="text-align:left;line-height:20.0pt;
text-autospace:none"
      >
        <span style="font-size:.36rem;font-family:微软雅黑">手机号：{{phone}}</span>
      </p>

      <!-- <p class=MsoNormal align=left style='text-align:left;line-height:20.0pt;
      text-autospace:none'><span style='font-size:.36rem;font-family:微软雅黑'>借款申请发起地（借款申请发起人所在地）：北京市</span></p>-->

      <p
        class="MsoNormal"
        align="left"
        style="text-align:left;line-height:20.0pt;
text-autospace:none"
      >
        <span style="font-size:.36rem;font-family:微软雅黑">借款申请发起日期：{{time}}</span>
      </p>

      <p class="MsoNormal" style="text-indent:24.0pt;line-height:20.0pt;text-autospace:
none">
        <span style="font-size:.36rem;font-family:微软雅黑">&nbsp;</span>
      </p>

      <p class="MsoNoSpacing">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >为解决消费购物资金周转问题，本借款申请的借款人示即借款人，发出以下借款申请，本协议采用电子文本形式制成，经借款申请人通过本服务平台在线同意发布后成立，在出信人的出借资金划付至借款申请人账户之日起生效，各方均认可电子文本形式协议效力。</span>
      </p>

      <p class="MsoNoSpacing">
        <span style="font-size:.36rem;font-family:微软雅黑">名词释义：</span>
      </p>

      <p class="MsoNoSpacing">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >1、《借款申请》是指本申请（以下简称“申请”），其全部内容由借款人通过互联网（或移动互联网），使用应用系统软件，包括但不限于手机软件（下称App）等，以点击“确认”按钮的方式视为认可并签署，并严格受其约束行使权利、履行义务。</span>
      </p>

      <p class="MsoNoSpacing">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >2、借款人（借款申请人）是指已在本服务平台注册并符合中华人民共和国法律规定的具有完全民事权利能力和民事行为能力，独立行使和承担本申请项下权利义务的个体。</span>
      </p>

      <p class="MsoNoSpacing">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >3、出信人是指本申请中列明的符合中华人民共和国法律规定的具有完全民事权利能力和民事行为能力，独立行使和承担本协议项下权利义务的个体，出借人可接受本申请，并向借款人出借相应的借款金额，获得本申请项下约定的相关借款的债权权利。</span>
      </p>

      <p class="MsoNoSpacing">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >4、本服务平台是借款人在互联网（或移动互联网）上公开发布本申请所使用的媒介服务系统软件，由符合国家法律规定的，依法有续的有限责任公司所有，并委托独立第三方技术服务公司代为运营，本服务平台的运营方式包括但不限于手机App、PC软件等。</span>
      </p>

      <p class="MsoNoSpacing">
        <span style="font-size:.36rem;font-family:微软雅黑">5、工作日是指除国家法定节假日、公休日以外的任何一日。</span>
      </p>

      <p class="MsoNoSpacing">
        <b>
          <span style="font-size:.48rem; line-height:1rem;height:1rem;font-family:微软雅黑">第一条、借款申请内容</span>
        </b>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >1、借款人确认在本申请中，向可能存在的出借人发出借款申请，借款金额、期限、到期还款总金额、借款用途等详见下表（借款申请信息），并在出借人接受本申请，提供借款使借贷关系成立后，按照本申请的约定行使各项权利义务，并承担己方违反本申请后造成的各种责任。</span>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >2、有意愿接受本申请，并出借相应款项的出借人亦应确认并同意本申请载明的各项约定，并按照申请的约定行使各项权利义务，并承担己方违反本申请造成的各种责任；否则应放弃接受本申请，放弃出借资金给借款人。</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">3、借款期限是指起息日期至还款日之间的期间。</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">4、还款日以实际起息日和借款期限计算得到。</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">借款申请信息</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">借款金额（大写）</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">借款期限（天）</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">起息日还款日</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">到期还款金额（大写）借款人收款银行卡账户</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">借款用途（1）购买本会员服务</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">（2）其他消费购物用途</span>
      </p>

      <p
        class="MsoNormal"
        align="left"
        style="text-align:left;line-height:20.0pt;
text-autospace:none"
      >
        <b>
          <span style="font-size:.48rem; line-height:1rem;height:1rem;font-family:微软雅黑">第二条、正常还款</span>
        </b>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >1、本申请中各项协议约定在出借人的出借资金划付至借款申请人账户之日起生效，借款人承诺将按本申请所载的到期还款金额（借款金额本金与每日利息之和），于还款日24时之前通过本服务平台App（或PC软件）支付还款。</span>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >2、借款人承诺按时足额将到期还款金额支付至借款人还款账户（即借款人收款银行卡账户），并通过本服务平台App（或PC软件）点击“还款”（或类似“还款”意思表示的按钮）的方式进行还款操作，由本服务平台将借款人的还款指令提交到合作机构，合作机构根据借款人的授权将相应款项由借款人的账户划转到对应出借人的账户。由于余额不足、账户问题、借款人操作失误等原因导致划款失败的由借款人承担相应责任。</span>
      </p>

      <p class="MsoNormal">
        <b>
          <span style="font-size:.48rem; line-height:1rem;height:1rem;font-family:微软雅黑">第三条、逾期还款</span>
        </b>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">1、出借人未能在还款日当天24时前收到借款人还款的，视作逾期还款，还款日次日起收取罚息。</span>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >2、如借款人逾期还款，应向出借人支付一次性逾期管理费元。逾期每日按本金的收取逾期违约金。逾期违约金总和不超过本金及利息总和的两倍。</span>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >3、借款人确认并承诺，如发生逾期逐款，出借人有权委托本服务平台或其合作银行或第三方支付机构从借款人账户中代扣并偿还其应付款项，还款偿付优先顺序如下：</span>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >（1）应承担出借人（或该笔申请对应的债权的受让人）因此产生的费用和损失以及维权费用，包括但不限于公证费、调查费、诉讼费、公告费、律师费、鉴定费、差旅费等；</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">（2）借款人应付的违约金；</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">（3）借款人应付的逾期管理费；</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">（4）借款人应付的到期还款金额。</span>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >4、借款人确认且同意，如借款人逾期还款，出借人可立即向本服务平台主张权利，并要求本服务平台对借款人在其平台开立的账户采取冻结账户、停止借款的限制措施，并有权要求本服务平台将借款人个人信息列入合作的信用征信系统，由此产生的后果由借款人承担。</span>
      </p>

      <p class="MsoNormal">
        <b>
          <span style="font-size:.48rem; line-height:1rem;height:1rem;font-family:微软雅黑">第四条、提前结清</span>
        </b>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">1、借款人有权在本服务平台发起提前结清服务申请。</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">2、借款人选择提前结清的，应一次性全额偿还全部到期还款金额</span>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >3、借款人通过本服务平台就本申请项下借款发起提前结清服务申请，并完成提前结清后，对应出借人不享有结清日后各期利息。</span>
      </p>n
      <p class="MsoNormal">
        <b>
          <span style="font-size:.48rem; line-height:1rem;height:1rem;font-family:微软雅黑">第五条、债权、债务的转让</span>
        </b>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >未经出借人或出借人委托的第三方代理人事先书面（包括但不限于电子邮件等方式）同意，借款人不得将本申请项下的任何权利义务转让给任何第三方。</span>
      </p>

      <p class="MsoNormal">
        <b>
          <span style="font-size:.48rem; line-height:1rem;height:1rem;font-family:微软雅黑">第六条、合同效力</span>
        </b>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >1、本申请自到达有意向的出借人时立即生效，但本申请中所约定的借贷关系仅在经过出借人或出借人委托的第三方代理人将本申请中约定的借款金额划入《借款申请信息》中列明的借款人收款银行卡账户时，始之成立。</span>
      </p>

      <p class="MsoNormal">
        <span style="font-size:.36rem;font-family:微软雅黑">2、本合同效力至借款人应付款项全部清偿之日止。</span>
      </p>

      <p class="MsoNormal">
        <b>
          <span style="font-size:.48rem; line-height:1rem;height:1rem;font-family:微软雅黑">第七条争议解决</span>
        </b>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >1、因本申请合同引起的或与本申请合同有关的争议，借贷双方均应同意由任意网络仲裁委员会，按照申请仲裁时该会先行有效的网络仲裁规则进行网络仲裁并进行书面审理。仲裁裁决是终局的，对双方有约束力。</span>
      </p>

      <p class="MsoNormal">
        <span
          style="font-size:.36rem;font-family:微软雅黑"
        >2、借款人确认以本申请中预留的或在本服务平台提交的地址、电子邮箱或手机号码，作为往来及仲裁时仲裁机构送达相关材料的送达地址；并以预留的手机号码，为短信通知号码，接受本申请并有意愿出借款项的出借人应确认以其在本服务平台注册认证时预留的地址、电子邮箱或手机号码作为往来及仲裁时仲裁机构送达相关材料的送达地址。借贷双方任何一方向对方及仲裁机构向双方发出的任何通知，以信件、电子邮件或者短信等形式发出，送至约定地址、电子邮箱或者手机号码，即视为送达。如一方需要变更联络邮箱或者手机号码的，应当与对方协商一致，并提交本服务平台确认。</span>
      </p>
    </div>
    <div class="submit" @click="submit">立即申请借款</div>
  </div>
</template>
<script>
import Head from "../../components/head";
import { saveAuthInfo, borrowerInfo,getCardInfo } from "../../api/app.api";

export default {
  name: "protocol",
  components: {
    Head
  },
  data() {
    return {
      type: "protocol",
      title: "借款协议",
      userInfo: "",
      token: "",
      isBack: "",
      orderId: "",
      name: "",
      card: "",
      phone: "",
      time: "",
      id: "",
      strData: {},
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
    submit() {
      let saveSmRecordes = {
        token:this.token
      }
      dsBridge.call("saveSmRecordes", saveSmRecordes, function(v) {});
      saveAuthInfo({
        applyAddress:this.strData.addrStr,//详细地址
        longitude: this.strData.longitude,//经度
        latitude: this.strData.latitude,//维度
      },{
        token:this.token
      })
        .then(res => {
          if (res.code == 200) {
            this.text = "借款成功";
            this.Totas();
            this.intervalid2 = setInterval(() => {
              this.$router.push({
                name: "home"
              });
            }, 1500);
          } else {
            this.text = res.msg;
            this.Totas();
            this.intervalid2 = setInterval(() => {
              this.$router.push({
                name: "home"
              });
            }, 1500);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //借款人确认页
    getBorrowerInfo: function() {
      getCardInfo({},{
        token:this.token
      })
        .then(res => {
          if (res.code == "200") {
            this.name = res.data.name,
            this.card = res.data.idCard,
            this.phone = res.data.phone,
            this.time = res.data.applyDate;
            // this.id = res.result.id;
          } else {
            this.text = res.msg;
            this.Totas();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    // getWz(){
    //   function getLocation(){
    //     if (navigator.geolocation){
    //       navigator.geolocation.getCurrentPosition(showPosition,showError);
    //     }else{
    //       alert("浏览器不支持地理定位。");
    //     }
    //   }
    // },
    // showError (error){
    //   switch(error.code) {
    //     case error.PERMISSION_DENIED:
    //       alert("定位失败,用户拒绝请求地理定位");
    //       break;
    //     case error.POSITION_UNAVAILABLE:
    //       alert("定位失败,位置信息是不可用");
    //       break;
    //     case error.TIMEOUT:
    //       alert("定位失败,请求获取用户位置超时");
    //       break;
    //     case error.UNKNOWN_ERROR:
    //       alert("定位失败,定位系统失效");
    //       break;
    //   }
    // },
    // showPosition(position){
    //   var lat = position.coords.latitude; //纬度
    //   var lag = position.coords.longitude; //经度
    //   alert('纬度:'+lat+',经度:'+lag);
    // }
  },
  mounted() {
    // this.getWz();
    // this.showError();
    // this.showPosition();
    this.utils.save("type", this.type);
    var str = dsBridge.call("loginSyn", "loginSyn");
    if (str != undefined) {
      this.strData = JSON.parse(str.replace("/", ""));
    }
    this.orderId = this.utils.fetch("orderID");
    this.token = this.utils.fetch("token");
    this.getBorrowerInfo();
  },
  destroyed() {
    clearInterval(this.intervalid2);
  }
};
</script>
<style scoped lang="scss">
.submit {
  margin-bottom: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
}
.b_div {
  height: 1rem;
  line-height: 1rem;
  padding-top: 0.3rem;
}
</style>