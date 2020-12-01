var todolist = [];
var todoIdCounter = Number(localStorage.getItem('schetchik'));


var elTodoForm = $_('.js-todo-form');
var elTodoInput = $_('.js-todo-form__input', elTodoForm);

var elTodos = $_('.todos');

var elTodoTemplate = $_('#todo-template').content;


var updateLocalCounter = function () {
  localStorage.setItem('schetchik', todoIdCounter);
};

var addTodo = function (todoText) {
  todolist.push({
    text: todoText,
    completed: false,
    id: ++todoIdCounter
  });
};

var createTodoElement = function (todo) {
  var elNewTodo = elTodoTemplate.cloneNode(true);

  $_('.js-todo__checkbox', elNewTodo).checked = todo.completed;
  $_('.js-todo__checkbox', elNewTodo).id = `todo${todo.id}`;
  $_('.js-todo__checkbox', elNewTodo).dataset.todoId = todo.id;
  $_('.todo__label', elNewTodo).setAttribute('for', `todo${todo.id}`);
  $_('.todo__text', elNewTodo).textContent = todo.text;
  $_('.todo__delete-btn', elNewTodo).dataset.todoId = todo.id;

  if (todo.completed) {
    $_('.todo', elNewTodo).classList.add('todo--completed');
  }

  return elNewTodo;
};

var renderTodoList = function (todos) {
  elTodos.innerHTML = '';
  var elTodosFragment = document.createDocumentFragment();

  todos.forEach(function (todo) {
    elTodosFragment.appendChild(createTodoElement(todo));
  });

  elTodos.appendChild(elTodosFragment);
};

var clearTodoInput = function () {
  elTodoInput.value = '';
};


var onElFormSubmit = function (evt) {
  evt.preventDefault();

  var todoText = elTodoInput.value.trim();

  if (!todoText) {
    alert('Iltimos, vazifa matnini kiriting.');
    return;
  }

  addTodo(todoText);
  clearTodoInput();
  renderTodoList(todolist);
  updateLocalCounter();
};

elTodoForm.addEventListener('submit', onElFormSubmit);
