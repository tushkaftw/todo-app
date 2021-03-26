"use strict";

// VARIABLES

const todoInput = document.querySelector(".todo-input");
const todoAdd = document.querySelector(".add-btn");
const todoResults = document.querySelector(".app-results");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoAdd.addEventListener("click", addTodo);

// FUNCTIONS
function addTodo() {
  if (todoInput.value) {
    saveLocalTodos(todoInput.value);
    const result = document.createElement("div");
    result.classList.add("result");

    const todo = document.createElement("li");
    todo.innerText = todoInput.value;
    result.appendChild(todo);

    const btns = document.createElement("div");
    btns.classList.add("result-btns");
    result.appendChild(btns);

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn-trash");
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    btns.appendChild(delBtn);

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("btn-check");
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
    btns.appendChild(checkBtn);

    todoResults.appendChild(result);

    todoInput.value = "";
    todoInput.focus();

    result.addEventListener("click", deleteCheckItem);
  }
}

function deleteCheckItem(e) {
  if (e.target.classList.value === "btn-check") {
    e.target.parentNode.parentNode.classList.toggle("checked");
  } else if (e.target.classList.value === "btn-trash") {
    e.target.parentNode.parentNode.remove();
    removeLocalTodos(e.target.parentNode.parentNode);
  }
}

function saveLocalTodos(todo) {
  let todos;
  let localChecked;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (localTodo) {
    const result = document.createElement("div");
    result.classList.add("result");

    const todo = document.createElement("li");
    todo.innerText = localTodo;
    result.appendChild(todo);

    const btns = document.createElement("div");
    btns.classList.add("result-btns");
    result.appendChild(btns);

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn-trash");
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    btns.appendChild(delBtn);

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("btn-check");
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
    btns.appendChild(checkBtn);

    todoResults.appendChild(result);

    result.addEventListener("click", deleteCheckItem);
  });
}

function removeLocalTodos(localTodo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const localTodoIndex = localTodo.children[0].innerText;
  todos.splice(todos.indexOf(localTodoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
