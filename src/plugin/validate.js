/**
 * 模拟表单验证
 * */

class FakeValidate {
  test(rules) {
    return new Promise((resolve) => {
      let valid;
      for (let key in rules) {
        for (let i = 0; i < rules[key].length; i++) {
          let ruleName = rules[key][i].rule;
          let value = rules[key][i].value;

          if (!Array.isArray(value)) {
            value = new Array(value);
          }

          let result = this.rules[ruleName].apply(this, value);

          if (!result) {
            valid = {
              errValue: key,
              errMessage: rules[key][i].message,
            };
            break;
          }
        }
        if (valid) {
          break;
        }
      }
      if (valid == undefined) {
        resolve(valid);
      } else {
        return valid.errMessage;
      }
    });
  }

  rules = {
    isMobile: (str) => {},
    isRequired: (str) => {},
  };
}
