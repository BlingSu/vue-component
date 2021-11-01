<template>
  <div>
    <h3>动态渲染.vue组件 -- display</h3>

    <i-display :code="code"></i-display>
  </div>
</template>

<script>
import iDisplay from "../components/display/index";
import defaultCode from "../plugin/default-code";

export default {
  components: {
    iDisplay,
  },
  data() {
    return {
      code: defaultCode,
    };
  },
};
</script>
