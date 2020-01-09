<template>
  <div class="order_table">
    <p class="dividing"></p>
    <cube-tab-bar v-model="selectedLabel" :inline="inline" showSlider @change="clickHandler">
      <cube-tab v-for="(item, index) in items" :label="item.label" :key="item.label">
        <img class="cube-Img" :src="item.icon">
        <i class="cubeic-right green common" v-if="item.type==0"></i>
        <i class="cubeic-warn yello common" v-if="item.type==1"></i>
        <i class="cubeic-wrong red common" v-if="item.type==2"></i>
        {{item.label}}
      </cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel :label="items[0].label" :key="items[0].label" v-if="initialIndex=='0'">
        <Basic></Basic>
      </cube-tab-panel>
      <cube-tab-panel :label="items[1].label" :key="items[1].label" v-if="initialIndex=='1'">
        <Linkman></Linkman>
      </cube-tab-panel>
      <cube-tab-panel :label="items[2].label" :key="items[2].label" v-if="initialIndex=='2'">
        <Card></Card>
      </cube-tab-panel>
      <cube-tab-panel :label="items[3].label" :key="items[3].label" v-if="initialIndex=='3'">
        <Operator></Operator>
      </cube-tab-panel>
      <cube-tab-panel :label="items[4].label" :key="items[4].label" v-if="initialIndex=='4'">
        <Other></Other>
      </cube-tab-panel>
    </cube-tab-panels>
  </div>
</template>

<script type="text/ecmascript-6">
import Basic from "./basicInformation";
import Linkman from "./linkman";
import Card from "./cardAuthentication";
import Operator from "./operator";
import Other from "./otherInformation";
export default {
  components: {
    Basic,
    Linkman,
    Card,
    Operator,
    Other
  },
  data() {
    return {
      inline: false,
      selectedLabel: "基础信息",
      disabled: false,
      items: [
        {
          label: "基础信息",
          id: 0,
          icon: require("../../assets/order_datail/pag1.png"),
          type: "0"
        },
        {
          label: "联系人认证",
          id: 1,
          icon: require("../../assets/order_datail/pag2.png"),
          type: "1"
        },
        {
          label: "身份证认证",
          id: 2,
          icon: require("../../assets/order_datail/pag4.png"),
          type: "2"
        },
        {
          label: "运营商认证",
          id: 3,
          icon: require("../../assets/order_datail/pag5.png"),
          type: "2"
        },
        {
          label: "其他信息",
          id: 4,
          icon: require("../../assets/order_datail/pag1.png"),
          type: "1"
        }
      ],
      loop: false,
      autoPlay: false,
      showDots: false,
      initialIndex: 0,
      scrollOptions: {
        directionLockThreshold: 0
      },
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    };
  },
  methods: {
    clickHandler(label) {
      this.items.map(item => {
        if (item.label == label) {
          this.initialIndex = item.id;
        }
      });
    },
    changePage(current) {
      this.items.map(item => {
        if (item.id == current) {
          this.selectedLabel = item.label;
        }
      });
    },
    scroll(pos) {
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth;
      this.$refs.tabNav.setSliderTransform(deltaX);
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.order_table {
  .cube-Img {
    width: 1rem;
    margin: 0 auto;
  }
  .tab-slide-container {
    padding: 0 10px;
  }
  .from_box {
    display: flex;
    justify-content: space-between;
  }
  .from_lable {
    width: (200/75) + rem;
  }
  .cube-form .cube-form-item .cube-btn {
    padding-left: 0;
    text-align: right;
    color: inherit;
    background: none;
    font-size: 14px;
    margin: 0;
  }
  .cube-form {
    font-size: 14px;
  }
  .cube-picker-wheel-wrapper > div {
    font-size: 16px !important;
  }
  .cube-form_standard .cube-textarea-wrapper {
    padding: 0;
  }
  .cube-tab {
    position: relative;
    color: #2ba6ff;
    font-size: 12px;
  }
  .cube-tab-bar-slider {
    background: #2ba6ff;
  }
  .cube-form-group-legend {
    background: 0;
  }
  .dividing {
    height: 8px;
    background: #f6f6f6;
  }
  .common {
    position: absolute;
    top: 10px;
    right: 6px;
    font-size: 12px;
  }
  .green {
    color: #49da6d;
  }
  .yello {
    color: #f4802c;
  }
  .red {
    color: #ff4e32;
  }

  .cube-validator .cube-select {
    text-align: right;
  }
  .cube-select::after {
    border: none;
  }
  .significance {
    margin-top: 15px;
  }
  input {
    text-align: right;
  }
  .applyFo {
    /*width: 85%;*/
    background-image: linear-gradient(90deg, #508cff 0%, #83c0ff 100%);
    font-size: 16px;
    color: #ffffff;
    margin: (50/75 + rem) 0;
    text-align: center;
    /*height: (90/75)+rem;
		border-radius: 3px;*/
  }
}
</style>
