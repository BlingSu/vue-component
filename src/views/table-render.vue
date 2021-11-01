<template>
  <div>
    <table-render :columns="columns" :data="data" />
  </div>
</template>

<script>
import TableRender from "../components/table-render/table";

export default {
  components: {
    TableRender,
  },

  data() {
    return {
      editName: "",
      editAge: "",
      editBirthday: "",
      editIndex: -1,
      columns: [
        {
          title: "姓名",
          key: "name",
          render: (h, { row, index }) => {
            let edit;
            if (this.editIndex === index) {
              edit = [
                h("input", {
                  domProps: {
                    value: row.name,
                  },
                  on: {
                    input: (event) => {
                      this.editName = event.target.value;
                    },
                  },
                }),
              ];
            } else {
              edit = row.name;
            }

            return h("div", [edit]);
          },
        },
        {
          title: "年龄",
          key: "age",
          render: (h, { row, index }) => {
            let edit;
            if (this.editIndex === index) {
              edit = [
                h("input", {
                  domProps: {
                    value: row.age,
                  },
                  on: {
                    input: (event) => {
                      this.editAge = event.target.value;
                    },
                  },
                }),
              ];
            } else {
              edit = row.age;
            }

            return h("div", [edit]);
          },
        },
        {
          title: "出生日期",
          key: "birthday",
          render: (h, prop) => {
            const { row, index } = prop;
            let edit;
            if (this.editIndex === index) {
              edit = [
                h("input", {
                  domProps: {
                    value: row.birthday,
                  },
                  on: {
                    click: (event) => {
                      this.editBirthday = event.target.value;
                    },
                  },
                }),
              ];
            } else {
              const date = new Date(parseInt(row.birthday));
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              edit = `${year}-${month}-${day}`;
            }
            return h("div", edit);
          },
        },
        {
          title: "操作",
          render: (h, { row, index }) => {
            if (this.editIndex === index) {
              return [
                h(
                  "button",
                  {
                    on: {
                      click: () => {
                        this.data[index].name = this.editName;
                        this.data[index].age = this.editAge;
                        this.data[index].birthday = this.editBirthday;
                        this.editIndex = -1;
                      },
                    },
                  },
                  "保存"
                ),
                h(
                  "button",
                  {
                    style: {
                      marginLeft: "6px",
                    },
                    on: {
                      click: () => {
                        this.editIndex = -1;
                      },
                    },
                  },
                  "取消"
                ),
              ];
            } else {
              return h(
                "button",
                {
                  on: {
                    click: () => {
                      this.editName = row.name;
                      this.editAge = row.age;
                      this.editBirthday = row.birthday;
                      this.editIndex = index;
                    },
                  },
                },
                "修改"
              );
            }
          },
        },
      ],
      data: [
        {
          name: "小明",
          age: 18,
          birthday: "919526400000",
        },
        {
          name: "小红",
          age: 17,
          birthday: "696096000000",
        },
      ],
    };
  },
};
</script>
