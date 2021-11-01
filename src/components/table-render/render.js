export default {
  functional: true,
  /**
   * row: 当前行数据
   * column: 当前列出局
   * index: 当前第几行
   * render: 具体的render函数内容
   * */
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function,
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index,
    };

    return ctx.props.render(h, params);
  },
};
