<template>
  <div>
    <label :class="{ 'i-form-item-label-required': isRequired }" v-if="label">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from "../../mixins/emitter";
import AsyncValidator from "async-validator";

export default {
  name: "iFormItem",

  inject: ["form"],

  mixins: [Emitter],

  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },

  data() {
    return {
      isRequired: false, // 是否必填
      validateState: "", // 校验转台
      validateMessage: "", // 校验不通过信息
      initialValue: null,
    };
  },

  computed: {
    // 从form的model中动态获取当前的表单组件数据
    fieldValue() {
      return this.form.model[this.prop];
    },
  },

  mounted() {
    /**
     * 组件渲染时，把form-item的实例缓存到from中
     * 如果没有传入prop，无需校验，也无需缓存
     * 组件销毁时，实例从form缓存中删除
     * */
    if (this.prop) {
      this.dispatch("iForm", "on-form-item-add", this);
      // 设置初始值
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },

  beforeDestroy() {
    this.dispatch("iForm", "on-form-item-remove", this);
  },

  methods: {
    setRules() {
      /**
       * 通过表单域form中定义的props: model，结合form-item定义的props: prop来确定数据
       * form-item中定义了某个数据源的key，要form拿到model中的数据可以用provide/inject传入form的this
       * */

      let rules = this.getRules();
      if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.required;
        });
      }
      this.$on("on-form-change", this.onFieldChange);
      this.$on("on-form-blur", this.onFieldBlur);
    },

    /**
     * 从form的rules属性中，获取当前form-item的校验规则
     * */
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(formRules || []);
    },

    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.form.model[this.prop] = this.initialValue;
    },

    // 过滤出符合要求的rule，比如blur和change
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },

    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback
     * */
    validate(trigger, callback = () => {}) {
      let rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.validateState = "validating";

      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);

      let model = {};
      model[this.prop] = this.fieldValue;

      validator.validate(
        model,
        {
          firstFields: true,
        },
        (errors) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";

          callback(this.validateMessage);
        }
      );
    },
    onFieldChange() {
      this.validate("change");
    },
    onFieldBlur() {
      this.validate("blur");
    },
  },
};
</script>

<style>
.i-form-item-label-required:before {
  content: "*";
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>
