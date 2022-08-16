import fetchTodo from "../js/fetchtodo.js";
import Store from "../js/store.js";

const list = document.querySelector(".todo-list");
const listAPI = "https://62f9ae303c4f110faa8b741e.mockapi.io/todoList";

fetch(listAPI)
  .then((response) => response.json())
  .then((posts) => {
    fetchTodo(posts);
    //Add new task without re-render the list
    const newTodoInput = document.querySelector(".new-todo");
    newTodoInput.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        if (newTodoInput.value) {
          const todo = document.createElement("li");
          todo.classList.add("todo");
          list.appendChild(todo);
          Store.addTodo({ content: newTodoInput.value }, todo);
          newTodoInput.value = "";
          newTodoInput.focus();

          //Update task without re-render the list
          todo.addEventListener("dblclick", () => {
            const idTodo = todo.id;
            const idAPI = Number(idTodo.split("_")[1]);
            const todoContent = todo.querySelector(".content");
            todoContent.removeAttribute("readonly");
            todoContent.focus();
            let contentTodoValue = todoContent.value;
            todoContent.value = "";
            todoContent.value = contentTodoValue;
            todoContent.addEventListener("keydown", (e) => {
              if (e.code === "Enter") {
                Store.updateTodo(
                  { content: todoContent.value },
                  idAPI,
                  todoContent
                );
              }
            });
          });
          //Delete the new task added
          setTimeout(() => {
            console.log(todo);
            todo.querySelector(".delete").addEventListener("click", () => {
              const idTodo = todo.id;
              const idAPI = Number(idTodo.split("_")[1]);
              console.log(todo);
              Store.deleteTodo(idAPI, todo);
            });
          }, 1000);
        } else {
          alert("Moi nhap task muon lam!");
        }
      }
    });
  });
