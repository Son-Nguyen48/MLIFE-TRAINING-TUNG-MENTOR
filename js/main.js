import renderTodoList from "../js/renderTodoList.js";
import Store from "../js/store.js";

const list = document.querySelector(".todo-list");
const listAPI = "https://62f9ae303c4f110faa8b741e.mockapi.io/todoList";

fetch(listAPI)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("api false");
  })
  .then((posts) => {
    renderTodoList(posts);
    console.log(posts);
    //Add new task without re-render the list
    const newTodoInput = document.querySelector(".new-todo");
    newTodoInput.addEventListener("keydown", async (e) => {
      if (e.code === "Enter") {
        if (newTodoInput.value) {
          let todo = document.createElement("li");
          todo.classList.add("todo");

          todo = await Store.addTodo({ content: newTodoInput.value }, todo);

          list.appendChild(todo);
          newTodoInput.value = "";
          newTodoInput.focus();
          console.log(todo);

          // Update task without re-render the list
          todo.addEventListener("dblclick", () => {
            console.log(todo);
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
          
          todo.querySelector(".delete").addEventListener("click", () => {
            const idTodo = todo.id;
            const idAPI = Number(idTodo.split("_")[1]);
            console.log(todo);
            Store.deleteTodo(idAPI, todo);
          });
        } else {
          alert("Moi nhap task muon lam!");
        }
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
