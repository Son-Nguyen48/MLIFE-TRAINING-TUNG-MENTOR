import fetchTodo from "../js/fetchtodo.js";
import Store from "../js/store.js";

fetchTodo(Store.listTodo);

//Add todo

const newTodoInput = document.querySelector(".new-todo");
newTodoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    Store.addTodo(newTodoInput);
  }
});
