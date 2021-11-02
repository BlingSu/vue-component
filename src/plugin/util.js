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
  }, []);
}

/**
 * @param len 长度
 * @description 随机字符串
 * */
function randomStr(len = 12) {
  const $chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const maxPos = $chars.length;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  return map[toString.call(obj)];
}

/**
 * @function deepCopy
 * */

function deepCopy(data) {
  const t = typeOf(data);
  let o;
  if (t === "array") {
    o = [];
  } else if (t === "object") {
    o = {};
  } else {
    return data;
  }

  if (t === "array") {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === "object") {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

export { findComponentUpward, findComponentsDownward, randomStr, deepCopy };
