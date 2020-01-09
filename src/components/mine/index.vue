<template>
  <div class="me">
    <div class="menu" v-for="data in item" v-if="!data.hidde" @click="menuLink(data)">
      <p class="icon">
        <img v-if="data.path==1" src="../../assets/record-icon.png" />
        <img v-if="data.path==2" src="../../assets/car-iocn.png" />
        <img v-if="data.path==3" src="../../assets/service-icon.png" />
        <img v-if="data.path==4" src="../../assets/wdyhk.png" />
        <img v-if="data.path==5" src="../../assets/message.png" />
        {{data.name}}
      </p>
      <p class="rightIcon" v-if="data.path!=3">
        <img src="../../assets/right.png" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "me",
  props: ["item", "status"],
  data() {
    return {
      text: "",
      totalType: "",
      intrada: false
    };
  },
  methods: {
    Totas: function() {
      this.toast = this.$createToast({
        txt: this.text,
        type: this.totalType,
        time: 1000,
        onTimeout: () => {
          if (this.intrada) {
            this.$router.push({ name: "Login" });
          }
        }
      });
      this.toast.show();
    },
    menuLink: function(way) {
      var token = (this.token = this.utils.fetch("token"));

      if (token.length == 0) {
        this.intrada = true;
        this.text = "未登录，请登录";
        this.Totas();
      } else {
        if (way.linkName === "aboutM") {
          return
          // var _phone0 = way.phone.substring(0, 3);
          // var _phone1 = way.phone.substring(3, 7);
          // var _phone2 = way.phone.substring(7, 11);
          // var _phone = _phone0 + "-" + _phone1 + "-" + _phone2;
          // var phone = '<a  class="kf_phone">3219549980</a>';
          // // '<a  class="kf_phone" href="tel:' + _phone + '">' + _phone + "</a>";
          // this.$createDialog({
          //   type: "alert",
          //   title: way.name,
          //   class: "sdsd",
          //   content: way.phone,
          //   confirmBtn: {
          //     text: "关闭",
          //     active: true
          //   }
          //   // icon: 'cubeic-alert'
          // }).show();
        } else if (token.length <= 0) {
          this.$router.push({ name: "Login" });
        } else {
          this.$router.push({
            name: way.linkName,
            query: { status: this.status, way: way.linkName }
          });
        }
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.menu {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 0.4rem;
  line-height: 1rem;
  img {
    width: 0.3rem;
  }
  .rightIcon {
    display: flex;
    align-items: center;
  }
}
.icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #6f7275;
  img {
    width: 0.5rem;
    align-items: center;
    margin-right: 0.2rem;
  }
}
</style>
