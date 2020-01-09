<template>
  <div class="Global-color">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <Footer :type="type" v-if="!$route.meta.keepAlive"></Footer>
  </div>
</template>

<script>
import Footer from "../../components/footer";

export default {
  components: {
    Footer
  },
  data() {
    return {
      type: "",
      transitionName: "slide-left",
      userinfo: ""
    };
  },
  created: function() {
    this.type = this.utils.fetch("type");
    if (this.type.length == "0") {
      this.type = this.$route.name;
    }
  },
  mounted: function() {},
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "slide-left";
    }
    this.$router.isBack = false;
    next();
  }
};
</script>

<style scoped>
.child-view {
  position: absolute;
  width: 100%;
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(250px, 0);
  transform: translate(250px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-250px, 0);
  transform: translate(-250px, 0);
}
.header {
  position: absolute;
  height: 44px;
  background: #0058f1;
  width: 100%;
}
</style>