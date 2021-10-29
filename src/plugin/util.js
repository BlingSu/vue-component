/**
 * @description 向上查找组件
 * @param this
 * @param name
 * */

function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }
  return parent;
}


/**
 * @description 向下找到所指定的组件
 * @param this
 * @param name
 * */

function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    const foundChild = findComponentsDownward(child, componentName);
    return components.concat(foundChild);
  }, [])
}

export {
  findComponentUpward,
  findComponentsDownward
}
