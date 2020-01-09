<template>
  <div class="other">
    <cube-form :model="elsemodel" @validate="validateHandler" @submit="submitHandler">
      <cube-form-group>
        <cube-form-item :field="elsebasic[0]"></cube-form-item>
        <cube-form-item :field="elsebasic[1]"></cube-form-item>
        <cube-form-item :field="elsebasic[2]"></cube-form-item>
        <cube-form-item :field="elsebasic[3]"></cube-form-item>
        <cube-form-item :field="elsebasic[4]"></cube-form-item>
        <cube-form-item :field="elsebasic[5]"></cube-form-item>
        <!--<cube-form-item :field="elsebasic[6]"></cube-form-item>-->
        <div data-v-b15fe4aa class="cube-form-item border-bottom-1px cube-form-item_required">
          <div class="cube-form-label">
            <span>月收入</span>
          </div>
          <div class="cube-validator cube-form-field">
            <div class="cube-validator-content">
              <div class="cube-select" @click="showMincome">
                <span v-if="!Startmonthly" class="cube-select-placeholder">请选择</span>
                <span v-if="Startmonthly" class="cube-select-text">{{Startmonthly}}~{{Endmonthly}}</span>
                <i class="cube-select-icon"></i>
              </div>
            </div>
            <div class="cube-validator-msg">
              <span class="cube-validator-msg-def"></span>
            </div>
          </div>
        </div>
        <cube-form-item :field="elsebasic[6]">
          <cube-button @click="showDatePicker">{{elsemodel.dateValue || '请选择'}}</cube-button>
          <date-picker
            ref="datePicker"
            :min="[2008, 8, 8]"
            :max="[2020, 10, 20]"
            @select="dateSelectHandler"
          ></date-picker>
        </cube-form-item>
      </cube-form-group>
      <cube-form-group class="main_pad">
        <cube-button class="applyFo" type="submit">立即申请</cube-button>
      </cube-form-group>
    </cube-form>
    <!--<p type="submit" class="applyFo">立即申请</p>-->
  </div>
</template>

<script>
import DatePicker from "../data";
import { provinceList, cityList, areaList } from "../../api/area";
const cityData = provinceList;
cityData.forEach(province => {
  province.children = cityList[province.value];
  province.children.forEach(city => {
    city.children = areaList[city.value];
  });
});
const PCA = {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      selected: []
    };
  },
  render(createElement) {
    return createElement(
      "cube-button",
      {
        on: {
          click: this.showPicker
        }
      },
      this.selected.length ? this.selected.join(" ") : "请选择"
    );
  },
  mounted() {
    this.picker = this.$createCascadePicker({
      title: "地址",
      data: cityData,
      selectedIndex: this.value,
      onSelect: this.selectHandler
    });
  },
  methods: {
    showPicker() {
      this.picker.show();
    },
    selectHandler(selectedVal, selectedIndex, selectedTxt) {
      this.selected = selectedTxt;
      this.$emit("input", selectedVal);
    }
  }
};
export default {
  name: "other",
  props: {},
  components: {
    DatePicker
  },
  data() {
    return {
      elsemodel: {
        unitsName: "",
        identityCard: "",
        address: [],
        textareaValue: "",
        profession: [],
        marriage: "",
        unitsPhone: "",
        position: [],
        dateValue: ""
      },
      elsebasic: [
        {
          type: "select",
          modelKey: "profession",
          label: "职业类型",
          rules: {
            required: true
          },
          props: {
            options: ["自由职业"]
          }
        },
        {
          type: "input",
          modelKey: "unitsName",
          label: "单位名称",
          props: {
            placeholder: "上海探禄网络科技有限公司"
          },
          rules: {
            required: true
          }
        },
        {
          component: PCA,
          modelKey: "address",
          label: "单位地址",
          rules: {
            required: true
          },
          messages: {
            required: "请选择"
          }
        },
        {
          type: "textarea",
          modelKey: "textareaValue",
          rules: {
            required: true
          },
          props: {
            placeholder: "详细地址"
          },
          debounce: 100
        },
        {
          type: "input",
          modelKey: "unitsPhone",
          label: "单位电话",
          props: {
            placeholder: "选填"
          }
        },
        {
          type: "select",
          modelKey: "position",
          label: "职位",
          rules: {
            required: true
          },
          props: {
            options: ["总监"]
          }
        },
        //              {
        //                type: 'select',
        //                modelKey: 'income',
        //                label: '月收入',
        //                rules: {
        //                  required: true
        //                },
        //                props: {
        //                  options: [[1000,1500],[3000,3500]]
        //                },
        //              },
        {
          modelKey: "dateValue",
          label: "入职时间",
          rules: {
            required: true
          }
        }
      ],
      options: {
        // scrollToInvalidField: true,
        // layout: 'classic' // standard fresh
      },
      column1: [{ text: 1000 }, { text: 1200 }, { text: 1500 }],
      column2: [{ text: 5000 }, { text: 5400 }, { text: 6500 }],
      Startmonthly: "",
      Endmonthly: ""
    };
  },
  methods: {
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      //	        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    submitHandler(e) {
      e.preventDefault();
    },
    showDatePicker() {
      this.$refs.datePicker.show();
    },
    dateSelectHandler(selectedVal) {
      let year = selectedVal[0];
      let month = selectedVal[1] < 10 ? "0" + selectedVal[1] : selectedVal[1];
      let day = selectedVal[2] < 10 ? "0" + selectedVal[2] : selectedVal[2];
      this.elsemodel.dateValue = year + "-" + month + "-" + day;
    },
    showMincome() {
      if (!this.mutiPicker) {
        this.mutiPicker = this.$createPicker({
          title: "请选择",
          data: [this.column1, this.column2],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.mutiPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.Startmonthly = selectedText[0];
      this.Endmonthly = selectedText[1];
    },
    cancelHandle() {
      this.$createToast({
        type: "correct",
        txt: "Picker canceled",
        time: 1000
      }).show();
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main_pad {
  padding: 0 10px;
}
</style>
