const elTodoForm = document.querySelector("[data-todo-form]");
const elTodoItems = document.querySelector("[data-todo-items]");
const elTodoTemplate = document.querySelector("[data-todo-item-template]");

const todos = getTodos();

// const todo = {
//   title: "",
//   dueDate: new Date(),
//   createdAt: new Date(),
//   isDone: false,
// };

renderTodo();
elTodoItems.addEventListener("click", (e) => {
  if (e.target.matches("[data-delete]")) return;
  let elTBtn = e.target.dataset.id;
  deleteTodo(elTBtn);
});

function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === +id);
  todos.splice(index, 1);
  renderTodo();
}

elTodoItems.addEventListener("change", (e) => {
  let elT = e.target.dataset.id;
  toggleTodo(elT);
});

elTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(elTodoForm);

  const todo = {};
  todo.title = formData.get("title");
  todo.dueDate = new Date(formData.get("dueDate"));
  todo.createdAt = new Date(Date.now());
  todo.isDone = false;
  todo.id = todos.length + 1;

  addTodo(todo);
});

function addTodo(todo) {
  todos.push(todo);
  renderTodo();
}

function toggleTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (+id === todo[i].id) {
      todo[i].isDone = !todos[i].isDone;
      break;
    }
  }
  renderTodo();
}

function renderTodo() {
  elTodoItems.innerHTML = "";
  const todoItemsEls = [];
  todos.forEach((todo) => {
    const elTodoItem = elTodoTemplate.content.cloneNode(true);

    elTodoItem.querySelector("[data-is-done]").checked = todo.isDone;
    elTodoItem.querySelector("[data-is-done]").id = `todo-${todo.id}`;
    elTodoItem.querySelector("[data-title]").textContent = todo.title;
    elTodoItem
      .querySelector("[data-title]")
      .setAttribute("for", `todo-${todo.id}`);
    const dueDate = new Date(todo.dueDate);
    const createdAt = new Date(todo.createdAt);
    elTodoItem.querySelector(
      "[data-due-date]"
    ).textContent = `${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString()}`;
    elTodoItem.querySelector(
      "[data-created-at]"
    ).textContent = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;

    elTodoItem.querySelectorAll("[data-id]").forEach((el) => {
      el.dataset.id = todo.id;
    });

    todoItemsEls.push(elTodoItem);
  });
  elTodoItems.append(...todoItemsEls);
  setTodos(todos);
}

function getTodos() {
  const stringTodo = localStorage.getItem("todos") || "[]";
  return JSON.parse(stringTodo);
}

function setTodos() {
  const stringTodos = JSON.stringify(todos);
  localStorage.setItem("todos", stringTodos);
}
