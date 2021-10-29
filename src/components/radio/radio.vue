<template>
  <label>
    <span>
      <input
        type="radio"
        :disabled="disabled"
        :checked="currentValue"
        @change="change"
      />
    </span>
    <slot>{{ label }}</slot>
  </label>
</template>

<script>
import { findComponentUpward } from "../../plugin/util";
import Emitter from "../../mixins/emitter";

export default {
  name: "iRadio",

  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    label: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentValue: this.value,
      parent: findComponentUpward(this, "iRadioGroup"),
    };
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

      /**
       * 是否有父单选
       * */
      if (this.parent) {
        this.parent.change({
          value: this.label,
          checked: this.value,
        });
      } else {
        this.$emit("on-change", value);

        // dispatch form
        // this.dispatch("iFromItem", "on-form-change", value);
      }
    },

    updateValue() {
      this.currentValue = this.value === this.trueValue;
    },
  },

  mounted() {
    if (this.parent) {
      this.parent.updateValue();
    } else {
      this.updateValue();
    }
  },

  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateValue();
      }
    },
  },
};
</script>
