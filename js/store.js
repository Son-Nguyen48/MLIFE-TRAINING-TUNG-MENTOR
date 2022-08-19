function Store() {
  const listAPI = "https://62f9ae303c4f110faa8b741e.mockapi.io/todoList";

  fetch(listAPI)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("api false");
    })
    .then((result) => {
      this.listTodo = result;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    listTodo: this.listTodo,
    addTodo: async (data, todo) => {
      await fetch(listAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("api fasle");
        })
        .then((posts) => {
          todo.innerHTML = `<div class="view">
          <input type="checkbox" class="toggle"/>
          <input type="text" readonly class="content" value="${posts.content}"/>
          <button class="delete">X</button>
      </div>`;
          todo.id = "id_" + posts.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTodo: async (data, id, todoContent) => {
      await fetch(listAPI + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("api false");
        })
        .then((result) => {
          todoContent.value = result.content;
          const readonlyAttribute = document.createAttribute("readonly");
          todoContent.setAttributeNode(readonlyAttribute);
          todoContent.style.border = "none";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteTodo: async (id, todo) => {
      console.log(id);
      await fetch(listAPI + `/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("api false");
        })
        .then(() => {
          todo.remove();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
}

export default new Store();
