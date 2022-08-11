import fetchTodo from "../js/fetchtodo.js";
function Store() {
  this.listTodo = [
    {
      id: 1,
      content: "Toi muon hut thuoc"
    }
  ];
  return {
    listTodo: this.listTodo,
    addTodo: (form) => {
      const list = this.listTodo;
      list.push({
        id: this.listTodo.length + 1,
        content: `${form.value}`
      });
      form.value = "";
      form.focus();
      fetchTodo(this.listTodo);
    },
    updateTodo: (input, id) => {
      console.log("go here");
      this.listTodo = this.listTodo.map((todo) => {
        if (todo.id === id) {
          todo.content = input.value;
        }
        return todo;
      });

      fetchTodo(this.listTodo);
    },
    deleteTodo: (id) => {
      const todoDeleteIndex = this.listTodo.findIndex((task) => task.id === id);
      this.listTodo.splice(todoDeleteIndex, 1);
      fetchTodo(this.listTodo);
    }
  };
}

export default new Store();
