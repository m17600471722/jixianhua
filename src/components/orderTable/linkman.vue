<template>
  <div class="linkmanData">
    <div class="linkman">
      <p class="period">有效期至2019-3-19</p>
      <div class="direct_line">
        <p class="weight">直系联系人</p>
        <div class="contacts">
          <p>{{figure[0].name}}</p>
          <p class="phone">
            <input disabled type="text" v-model="figure[0].phone" placeholder="请从通讯录选择联系人">
            <img src="../../assets/right.png">
          </p>
        </div>
        <div class="contacts">
          <p>关系</p>
          <p class="phone">
            <cube-select v-model="figure[0].value" :options="contacts_Options"></cube-select>
            <img src="../../assets/right.png">
          </p>
        </div>
      </div>
      <div class="direct_line significance">
        <p class="weight">重要联系人</p>
        <div class="direct_bottom">
          <div class="contacts">
            <p>{{figure[1].name}}</p>
            <p class="phone">
              <input disabled type="text" v-model="figure[1].phone" placeholder="请从通讯录选择联系人">
              <img src="../../assets/right.png">
            </p>
          </div>
          <div class="contacts">
            <p>关系</p>
            <p class="phone">
              <cube-select v-model="figure[1].value" :options="contacts_Options"></cube-select>
              <img src="../../assets/right.png">
            </p>
          </div>
          <p class="hint" v-if="0">*请不要选择相同的联系人</p>
        </div>
        <div class="direct_bottom">
          <div class="contacts">
            <p>{{figure[2].name}}</p>
            <p class="phone">
              <input disabled type="text" v-model="figure[2].phone" placeholder="请从通讯录选择联系人">
              <img src="../../assets/right.png">
            </p>
          </div>
          <div class="contacts">
            <p>关系</p>
            <p class="phone">
              <cube-select v-model="figure[2].value" :options="contacts_Options"></cube-select>
              <img src="../../assets/right.png">
            </p>
          </div>
          <p class="hint" v-if="0">*请不要选择相同的联系人</p>
        </div>
        <div>
          <div class="contacts">
            <p>{{figure[3].name}}</p>
            <p class="phone">
              <input disabled type="text" v-model="figure[3].phone" placeholder="请从通讯录选择联系人">
              <img src="../../assets/right.png">
            </p>
          </div>
          <div class="contacts">
            <p>关系</p>
            <p class="phone">
              <cube-select v-model="figure[3].value" :options="contacts_Options"></cube-select>
              <img src="../../assets/right.png">
            </p>
          </div>
          <p class="hint" v-if="0">*请不要选择相同的联系人</p>
        </div>
      </div>
    </div>
    <cube-button type="submit" class="applyFo" @click="submit">立即申请</cube-button>
  </div>
</template>

<script>
export default {
  name: "linkmanData",
  props: {},
  data() {
    return {
      inputVal: "1852556452",
      contacts_Options: [
        { text: "父女", value: "0" },
        { text: "母女", value: "1" },
        { text: "父子", value: "2" }
      ],
      figure: [
        { name: "玛丽亚", phone: "18501230987", value: "" },
        { name: "马里奥", phone: "19988556737", value: "" },
        { name: "夏目贵志", phone: "18501230987", value: "" },
        { name: "夏目贵志", phone: "19988556737", value: "" }
      ]
    };
  },
  methods: {
    submit() {}
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped>
.linkmanData {
  padding: 0 10px;
}
.linkman {
  .period {
    font-size: 12px;
    color: #a8acb6;
    text-align: right;
  }
}
.direct_line {
  .weight {
    font-size: 15px;
    color: #34373f;
    font-weight: 600;
  }
  .contacts {
    display: flex;
    justify-content: space-between;
    line-height: (80/75) + rem;
    font-size: 14px;

    .phone {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: (25/75) + rem;
        height: (25/75) + rem;
        margin-left: 3px;
      }
    }
  }
}
.hint {
  font-size: 10px;
  color: #ff4e32;
  text-align: right;
}
.direct_bottom {
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 10px;
}
</style>
