<template>
  <div class="footer">
    <div class="tabbar">
      <!-- <cube-tab-bar v-model="selectedLabelDefault" :data="tabs" @click="clickHandler"></cube-tab-bar> -->
      <cube-tab-bar v-model="selectedLabelDefault" @click="clickHandler">
        <cube-tab v-for="(item, index) in tabs" :label="item.value" :key="item.value">
          <!-- name为icon的插槽 -->
          <i slot="icon" :class="item.icon"></i>
          <!-- 默认插槽 -->
          {{item.label}}
        </cube-tab>
      </cube-tab-bar>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  props: {
    type: String
  },
  data() {
    return {
      selectedLabelDefault: "home",
      tabs: [
        {
          value: "home",
          label: "首页",
          icon: "x-home"
        },

        {
          value: "Mine",
          label: "我的",
          icon: "x-person"
        }
      ]
    };
  },

  methods: {
    clickHandler(value) {
      this.$router.push({ name: value });
    }
  },
  mounted() {
    if (this.type.length == 0) {
      this.selectedLabelDefault =  this.$route.name;
    } else {
      setTimeout(()=>{
        this.selectedLabelDefault = this.type;
      },30)
    }
  }
  // ,computed: {
  //   tabber: function() {
  //     // this.selectedLabelDefault = this.utils.fetch("type");
  //     console.log(this.type)
  //     this.selectedLabelDefault = this.utils.fetch("type");
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #ccc;
  font-size: 0.35rem;
}

[class^="cubeic-"],
[class*=" cubeic-"] {
  font-family: "cube-icon" !important;
  font-size: 100%;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.6rem;
}
.cube-tab {
  line-height: 0.5rem;
  i {
    margin: 0 auto (10/75) + rem;
    display: block;

    &.x-home {
      width: (44/75) + rem;
      height: (44/75) + rem;
      background: url("../../assets/home-icon-a.png");
      background-size: 100% 100%;
    }
    &.x-person {
      width: (44/75) + rem;
      height: (44/75) + rem;
      background: url("../../assets/my-icon-a.png");
      background-size: 100% 100%;
    }
  }
}
.cube-tab_active {
  i {
    margin: 0 auto (10/75) + rem;
    display: block;

    &.x-home {
      width: (44/75) + rem;
      height: (44/75) + rem;
      background: url("../../assets/home-icon-b.png");
      background-size: 100% 100%;
    }
    &.x-person {
      width: (44/75) + rem;
      height: (44/75) + rem;
      background: url("../../assets/my-icon-b.png");
      background-size: 100% 100%;
    }
  }
}
</style>
