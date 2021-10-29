<template>
  <div>
    <h3>表单验证组件</h3>
    <i-form ref="form" :model="form" :rules="rules">
      <i-form-item label="姓名" prop="name">
        <i-input v-model="form.name" />
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model="form.email" />
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>

import iForm from "../components/form/form";
import iFormItem from "../components/form/form-item";
import iInput from "../components/form/input";

export default {
  components: {
    iForm,
    iFormItem,
    iInput
  },

  data() {
    return {
      form: {
        name: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log("提交成功");
        } else {
          console.log("表单验证失败");
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
