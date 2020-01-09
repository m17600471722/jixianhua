<template>
  <div class="basic">
    <cube-form :model="basicmodel" @validate="validateHandler" @submit="submitHandler">
      <cube-form-group>
        <cube-form-item :field="basic[0]"></cube-form-item>
        <cube-form-item :field="basic[1]"></cube-form-item>
        <cube-form-item :field="basic[2]"></cube-form-item>
        <cube-form-item :field="basic[3]"></cube-form-item>
        <cube-form-item :field="basic[4]"></cube-form-item>
        <cube-form-item :field="basic[5]"></cube-form-item>
      </cube-form-group>
      <cube-form-group class="main_pad">
        <cube-button class="applyFo" type="submit">立即申请</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
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
    },
    submitHandler(e) {}
  }
};

export default {
  name: "basic",
  props: {},
  data() {
    return {
      immediate: false,
      isValid: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ],
      basicmodel: {
        userName: "",
        identityCard: "",
        address: [],
        textareaValue: "",
        education: [],
        marriage: ""
      }, //基础信息数据
      //基础信息表单
      basic: [
        {
          type: "input",
          modelKey: "userName",
          label: "姓名",
          props: {
            placeholder: "请输入姓名"
          },
          rules: {
            required: true
          }
        },
        {
          type: "input",
          modelKey: "identityCard",
          label: "身份证号",
          props: {
            placeholder: "请输入身份证号"
          },
          rules: {
            required: true
          }
        },
        {
          component: PCA,
          modelKey: "address",
          label: "常住地址",
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
          type: "select",
          modelKey: "dateValue",
          label: "最高学历",
          rules: {
            required: true
          },
          props: {
            options: ["本科", "大专", "高中"]
          }
        },
        {
          type: "select",
          modelKey: "marriage",
          label: "婚姻状况",
          rules: {
            required: true
          },
          props: {
            options: ["未婚", "已婚"]
          }
        }
      ],
      options: {
        // scrollToInvalidField: true,
        // layout: 'classic' // standard fresh
      },
      rules1: {
        required: true
      },
      messages1: {
        pattern: "The E-mail suffix need to be didi.com.",
        custom: "The E-mail need contain at least 12 characters."
      }
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
    submit() {}
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
