<template>
  <div>
    <h3>radio测试组件</h3>
    <i-radio v-model="radio" @on-change="handleChange">radio测试</i-radio>

    <h3>组合</h3>

    <i-radio-group v-model="group" @on-change="handleGroupChange">
      <i-radio label="1">测试1</i-radio>
      <i-radio label="2">测试2</i-radio>
      <i-radio label="3">测试3</i-radio>
    </i-radio-group>
    {{ group }}
  </div>
</template>

<script>
import iRadioGroup from "../components/radio/radio-group"
import iRadio from "../components/radio/radio";

export default {
  components: {
    iRadioGroup,
    iRadio,
  },

  data() {
    return {
      radio: 0,
      group: "1"
    };
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleGroupChange(val) {
      console.log(val);
    },
  },
};
</script>
