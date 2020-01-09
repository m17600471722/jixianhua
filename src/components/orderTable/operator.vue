<template>
  <div class="operatorList">
    <div class="operator">
      <p class="period">有效期至2019-3-19</p>
      <div class="approve">
        <div class="approve_left">
          <img src="../../assets/order_datail/YYS.png">
          <div>
            <p>运营商</p>
            <p>手机认证</p>
          </div>
        </div>
        <div class="approve_right">
          <div class="unverified" v-if="0">
            <img src="../../assets/right.png">
          </div>
          <div class="verified">
            <p>已认证</p>
            <img src="../../assets/order_datail/RZ.png">
          </div>
        </div>
      </div>
      <div class="consent">
        <p :class="{'blue':checked,'check_ver':true}" @click="changeCheck()">
          <img src="../../assets/face.png">
        </p>
        <p>
          我已阅读并同意
          <a>《个人征信系统查询授权委托书》</a>、
          <a>《反欺诈评估服务协议》</a>、
          <a>《电子签章授权委托书》</a>
        </p>
      </div>
    </div>
    <cube-button type="submit" class="applyFo">立即申请</cube-button>
  </div>
</template>

<script>
export default {
  name: "operatorList",
  props: {},
  data() {
    return {
      checked: false
    };
  },
  methods: {
    changeCheck() {
      this.checked = !this.checked;
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped>
.operatorList {
  padding: 0 10px;
}
.operator {
  padding: (20/75) + rem 0;
  .period {
    font-size: 12px;
    text-align: right;
    color: #a8acb6;
  }
  .approve {
    padding: (20/75) + rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .approve_left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: (100/75) + rem;
        height: (100/75) + rem;
        margin-right: 10px;
      }
      p:first-child {
        font-size: 16px;
        color: #34373f;
      }
      p:last-child {
        font-size: 14px;
        color: #bdc0c9;
        margin-top: 5px;
      }
    }
    .approve_right {
      .unverified {
        img {
          width: (30/75) + rem;
        }
      }
      .verified {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;
        color: #63666d;
        img {
          width: (60/75) + rem;
          height: (60/75) + rem;
        }
      }
    }
  }
  .consent {
    font-size: 12px;
    color: #34373f;
    .check_ver {
      width: (25/75) + rem;
      height: (25/75) + rem;
      border: 1px solid #bdc0c9;
      float: left;
      margin: 5px 5px 0 0;
      img {
        width: 100%;
      }
    }
    a {
      color: #2ba6ff;
    }
    .blue {
      background: #2ba6ff;
    }
  }
}
</style>
