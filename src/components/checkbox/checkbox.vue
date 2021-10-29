<template>
  <label>
    <span>
      <input
          type="checkbox"
          :disabled="disabled"
          :checked="currentValue"
          @change="change">
    </span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "iCheckbox",

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },

  data() {
    return {
      currentValue: this.value
    }
  },

  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw "value fail..."
      }
    }
  },

  methods: {
    change(event) {
      if (this.disabled) {
        return false;
      }

      const checked = event.target.checked;
      this.currentValue = checked;

      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);
      this.$emit("on-change", value);

      // 给from派发事件，用于验证
      // this.dispatch("iFormItem", "on-form-change", value);
    },

    updateModel() {
      this.currentValue = this.value === this.trueValue;
    }
  }
}
</script>
