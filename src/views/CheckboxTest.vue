<template>
  <div>
    <h3>checkbox测试组件</h3>
    <i-checkbox v-model="checkbox" @on-change="handleChange">测试按钮</i-checkbox>

    <div>
      <h4>组合</h4>
<!--      <i-checkbox :value="checkAll" @on-change="handleAllChange">全选</i-checkbox>-->
    </div>

    <i-checkbox-group v-model="group">
      <i-checkbox label="1">测试1</i-checkbox>
      <i-checkbox label="2">测试2</i-checkbox>
      <i-checkbox label="3">测试3</i-checkbox>
      <i-checkbox label="4" disabled>测试4</i-checkbox>
    </i-checkbox-group>
    {{ group }}
  </div>
</template>

<script>
import iCheckboxGroup from "../components/checkbox/checkbox-group"
import iCheckbox from "../components/checkbox/checkbox";

export default {
  components: {
    iCheckboxGroup,
    iCheckbox
  },

  data() {
    return {
      checkbox: false,
      group: ["1"],
      checkAll: false,
    }
  },

  methods: {
    handleChange(val) {
      console.log(val)
    },
    handleAllChange(val) {
      console.log(val)
    }
  }
}
</script>
