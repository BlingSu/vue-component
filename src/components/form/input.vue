<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from "../../mixins/emitter";

export default {
  name: "iInput",

  mixins: [Emitter],

  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },
  },

  methods: {
    handleInput(event) {
      const value = event.target.value;

      this.currentValue = value;
      this.$emit("input", value);
      // 给父组件派发一个自定义事件
      this.dispatch("iFormItem", "on-form-change", value);
    },
    handleBlur() {
      this.dispatch("iFormItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>
