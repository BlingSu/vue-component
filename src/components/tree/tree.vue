<template>
  <div>
    <tree-node
      v-for="(item, index) in cloneData"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
    ></tree-node>
  </div>
</template>

<script>
/**
 * param 入口
 * props: data 不破坏数据对接的数据
 * */
import TreeNode from "./node.vue";
import { deepCopy } from "../../plugin/util";

export default {
  name: "Tree",
  components: {
    TreeNode,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      cloneData: [],
    };
  },

  created() {
    this.rebuildData();
  },

  watch: {
    data() {
      this.rebuildData();
    },
  },

  methods: {
    rebuildData() {
      this.cloneData = deepCopy(this.data);
    },
    emitEvent(eventName, data) {
      this.$emit(eventName, data, this.cloneData);
    },
  },
};
</script>
