<template>
  <div class="card">
    <div class="authentication">
      <p class="prompt">身份证信息将通过公安部认证，非本人信息不得通过审核！</p>
      <p class="division">
        <span>身份证认证</span>
        <span class="line"></span>
      </p>
      <div class="card_photo">
        <p @click="cardAuthentication()">
          <img src="../../assets/order_datail/ph.png">
        </p>
      </div>
      <p class="division">
        <span>活体认证</span>
        <span class="line"></span>
      </p>
      <div class="card_photo">
        <img src="../../assets/card/SM.png">
      </div>
      <p class="division">
        <span>扫描注意事项</span>
        <span class="line"></span>
      </p>
      <div class="attention">
        <div v-for="item in cardImg">
          <img :src="item.img">
          <p>
            <i class="cubeic-close"></i>
            {{item.name}}
          </p>
        </div>
      </div>
    </div>
    <cube-button type="submit" class="applyFo">立即申请</cube-button>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {},
  data() {
    return {
      cardImg: [
        { img: require("../../assets/card/card1.png"), name: "边框缺失" },
        { img: require("../../assets/card/card2.png"), name: "照片模糊" },
        { img: require("../../assets/card/card3.png"), name: "闪光强烈" },
        { img: require("../../assets/card/card4.png"), name: "角度倾斜" }
      ]
    };
  },
  methods: {
    //身份证认证
    cardAuthentication() {}
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped>
.card {
  padding: 0 10px;
}
.authentication {
  .prompt {
    font-size: 12px;
    color: #a8acb6;
    text-align: center;
    padding: 10px 0;
  }
}
.division {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  color: #34373f;
  align-items: center;
  span {
    font-weight: 600;
  }
  .line {
    width: 70%;
    height: 1px;
    background: #e2e2e2;
    margin-left: (25/75) + rem;
  }
}
.card_photo {
  padding: (30/75) + rem;
}
.attention {
  display: flex;
  justify-content: space-between;
  margin: (20/75) + rem 0;
  text-align: center;
  font-size: 12px;
  color: #a8acb6;
  i {
    color: #ff4e32;
    font-weight: 600;
    margin-right: 3px;
  }
  div {
    margin-right: (20/75) + rem;
  }
  div:last-child {
    margin-right: 0;
  }
}
</style>
