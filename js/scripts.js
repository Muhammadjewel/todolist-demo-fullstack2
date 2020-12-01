var todolist = JSON.parse(localStorage.getItem('todolist')) || [];
var todoIdCounter = Number(localStorage.getItem('schetchik'));


var elTodoForm = $_('.js-todo-form');
var elTodoInput = $_('.js-todo-form__input', elTodoForm);

var elTodos = $_('.todos');

var elTodoTemplate = $_('#todo-template').content;


var updateLocalCounter = function () {
  localStorage.setItem('schetchik', todoIdCounter);
};

var updateLocalTodolist = function () {
  localStorage.setItem('todolist', JSON.stringify(todolist));
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

var removeTodo = function (todoId) {
  var todoIndex = todolist.findIndex(function (todo) {
    return todo.id === todoId;
  });

  todolist.splice(todoIndex, 1);
  console.log(todolist);
};

var toggleCompleted = function (todoId) {
  var todo = todolist.find(function (todo) {
    return todo.id === todoId;
  });

  todo.completed = !todo.completed;
  console.log(todolist);
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

  updateLocalTodolist();
  updateLocalCounter();
};

var onElTodosClick = function (evt) {
  if (evt.target.matches('.js-todo__delete-btn')) {
    evt.target.closest('.todo').remove();
    var todoId = Number(evt.target.dataset.todoId);

    removeTodo(todoId);
    updateLocalTodolist();
  } else if (evt.target.matches('.js-todo__checkbox')) {
    var todoId = Number(evt.target.dataset.todoId);

    evt.target.closest('.todo').classList.toggle('todo--completed');

    toggleCompleted(todoId);
    updateLocalTodolist();
  }
};


elTodoForm.addEventListener('submit', onElFormSubmit);
elTodos.addEventListener('click', onElTodosClick);

renderTodoList(todolist);
