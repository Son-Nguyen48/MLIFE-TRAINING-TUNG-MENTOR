import fetchTodo from "../js/fetchtodo.js";
function Store() {
  const listAPI = "https://62f9ae303c4f110faa8b741e.mockapi.io/todoList";

  fetch(listAPI)
    .then((response) => response.json())
    .then((result) => {
      this.listTodo = result;
    });

  return {
    listTodo: this.listTodo,
    addTodo: (data, todo) => {
      fetch(listAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((response) => {
          return response.json();
        })
        .then((posts) => {
          todo.innerHTML = `<div class="view">
          <input type="checkbox" class="toggle"/>
          <input type="text" readonly class="content" value="${posts.content}"/>
          <button class="delete">X</button>
      </div>`;
          todo.id = "id_" + posts.id;
        });
    },
    updateTodo: (data, id, todoContent) => {
      fetch(listAPI + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          todoContent.value = result.content;
          console.log(todoContent.value);
          const readonlyAttribute = document.createAttribute("readonly");
          todoContent.setAttributeNode(readonlyAttribute);
        });
    },
    deleteTodo: (id, todo) => {
      console.log(id);
      fetch(listAPI + `/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => response.json())
        .then(() => {
          todo.remove();
        });
    }
  };
}

export default new Store();
