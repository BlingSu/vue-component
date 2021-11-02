<template>
  <div>
    <h3>树形组件 测试</h3>

    <Tree
      :data="data"
      show-checkbox
      @on-toggle-expand="handleToggleExpand"
      @on-check-change="handleCheckChange"
    />
  </div>
</template>

<script>
import Tree from "../components/tree/tree";

export default {
  components: {
    Tree,
  },

  data() {
    return {
      data: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                },
                {
                  title: "leaf 1-1-2",
                },
              ],
            },
            {
              title: "parent 1-2",
              children: [
                {
                  title: "leaf 1-2-1",
                },
                {
                  title: "leaf 1-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleToggleExpand(data) {
      console.log(data);
    },
    handleCheckChange(data) {
      console.log(data);
    },
  },
};
</script>
