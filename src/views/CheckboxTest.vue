<template>
  <div>
    <i-checkbox v-model="checkbox" @on-change="handleChange" />
  </div>
</template>

<script>
import iCheckbox from "../components/checkbox/checkbox";
export default {
  components: {
    iCheckbox
  },

  data() {
    return {
      checkbox: false
    }
  },

  methods: {
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>
