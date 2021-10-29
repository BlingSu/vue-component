<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "iForm",

  provide() {
    return {
      form: this,
    };
  },

  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },

  data() {
    return {
      fields: [],
    };
  },

  methods: {
    /**
     * public 全部重置
     * */
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField();
      });
    },

    validate(callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          field.validate("", (errors) => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },

  created() {
    /**
     * 获取form-item的实例
     * 添加就push到队列中
     * 如果删除就splice掉
     * */

    this.$on("on-form-item-add", (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on("on-form-item-remove", (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
};
</script>
