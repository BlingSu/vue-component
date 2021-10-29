/**
 * @description 模拟实现 vue1.x 的跨组件通信问题，通过匹配 name 的方式递归
 * @function dispatch
 * @function broadcast
 * */

function broadcast(componentName, eventName, data) {
  this.$children.forEach((child) => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(data));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([data]));
    }
  });
}

export default {
  methods: {
    dispatch(componentName, eventName, data) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      // 不断向上遍历更新当前组件的父组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(data));
      }
    },
    broadcast(componentName, eventName, data) {
      broadcast.call(this, componentName, eventName, data);
    },
  },
};
