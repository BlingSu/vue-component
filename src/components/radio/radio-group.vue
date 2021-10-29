<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from "../../plugin/util";

export default {
  name: "iRadioGroup",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  data() {
    return {
      currentValue: this.value,
      children: [],
    };
  },

  mounted() {},

  watch: {},

  methods: {
    change(data) {
      this.currentValue = data.value;
      this.updateValue();
      this.$emit("input", data.value);
      this.$emit("on-change", data.value);
    },
    updateValue() {
      this.children = findComponentsDownward(this, "iRadio");
      if (this.children) {
        this.children.forEach((child) => {
          child.currentValue = this.currentValue === child.label;
        });
      }
    },
  },
};
</script>
