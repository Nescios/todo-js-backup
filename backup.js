// function renderTodos(todoArray) {
//   sortedTodoArray()
//   todoListEl.innerHTML = ""
//   todoArray.forEach(todo => {
//     const todoEl = document.createElement("li")
//     todoEl.id = todo.id
//     todoEl.className = "flex justify-between text-center items-center px-5 py-2 my-1 bg-stone-600 rounded-lg w-full shadow-lg shadow-inner shadow-stone-900 animate-fade-in-down"
//     todoEl.innerHTML = `
//     <button class="" onclick="toggleTodo(${todo.id})">
//     ${todo.completed ? "✅" : "⬜️"}</button>
//     <span class="font-semibold mx-7 text-sm${todo.completed ? " line-through" : ""}">${todo.text}</span>
//     <button class="text-xs" onclick="deleteTodo(${todo.id})">❌</button>
//     `
//     todoListEl.appendChild(todoEl)
//   })
//   console.log(todoArray)
// }

function addEventListenerToTodos() {
  const todos = document.querySelectorAll("#todo")
  const todoList = document.querySelectorAll("#todo-list-el li")

  todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart)
    todo.addEventListener("dragend", dragEnd)
  })

  todoList.forEach((todo) => {
    todo.addEventListener("dragover", dragOver)
    todo.addEventListener("drop", drop)
    todo.addEventListener("dragenter", dragEnter)
    todo.addEventListener("dragleave", dragLeave)
  })
}

function dragStart() {
  this.className += "opacity-10 animate-bounce"
  setTimeout(() => (this.className = classNameTodoList), 0)
  dragStartOrder = +this.closest("li").getAttribute("data-order")
}

function dragEnd() {
  this.className = classNameTodoList
}

function dragOver(e) {
  e.preventDefault()
}

function drop() {
  const dragEndOrder = +this.getAttribute("data-order")
  swapOrder(dragStartOrder, dragEndOrder)
}

function dragEnter(e) {
  e.preventDefault()
  this.className += " border-2 border-stone-200 animate-pulse"
}

function dragLeave() {
  this.className = classNameTodoList
}

// Swapping order of todos
function swapOrder(dragStartOrder, dragEndOrder) {
  todoArray.forEach((todo) => {
    if (todo.order === dragStartOrder) {
      todo.order = dragEndOrder
    } else if (todo.order === dragEndOrder) {
      todo.order = dragStartOrder
    }
  })
  renderTodos(todoArray)
  localStorage.setItem("todo", JSON.stringify(todoArray))
}
//     todoEl.id = todo.id
//     todoEl.className = "flex justify-between text-center items-center px-5 py-2 my-1 bg-stone-600 rounded-lg w-full shadow-lg shadow-inner shadow-stone-900 animate-fade-in-down"
//     todoEl.innerHTML = `
//     <button class="" onclick="toggleTodo(${todo.id})">
//     ${todo.completed ? "✅" : "⬜️"}</button>
//     <span class="font-semibold mx-7 text-sm${todo.completed ? " line-through" : ""}">${todo.text}</span>
//     <button class="text-xs" onclick="deleteTodo(${todo.id})">❌</button>
//     `
//     todoListEl.appendChild(todoEl)
//   })
//   console.log(todoArray)
// }

function addEventListenerToTodos() {
  const todos = document.querySelectorAll("#todo")
  const todoList = document.querySelectorAll("#todo-list-el li")

  todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart)
    todo.addEventListener("dragend", dragEnd)
  })

  todoList.forEach((todo) => {
    todo.addEventListener("dragover", dragOver)
    todo.addEventListener("drop", drop)
    todo.addEventListener("dragenter", dragEnter)
    todo.addEventListener("dragleave", dragLeave)
  })
}

function dragStart() {
  this.className += "opacity-10 animate-bounce"
  setTimeout(() => (this.className = classNameTodoList), 0)
  dragStartOrder = +this.closest("li").getAttribute("data-order")
}

function dragEnd() {
  this.className = classNameTodoList
}

function dragOver(e) {
  e.preventDefault()
}

function drop() {
  const dragEndOrder = +this.getAttribute("data-order")
  swapOrder(dragStartOrder, dragEndOrder)
}

function dragEnter(e) {
  e.preventDefault()
  this.className += " border-2 border-stone-200 animate-pulse"
}

function dragLeave() {
  this.className = classNameTodoList
}

// Swapping order of todos
function swapOrder(dragStartOrder, dragEndOrder) {
  todoArray.forEach((todo) => {
    if (todo.order === dragStartOrder) {
      todo.order = dragEndOrder
    } else if (todo.order === dragEndOrder) {
      todo.order = dragStartOrder
    }
  })
  renderTodos(todoArray)
  localStorage.setItem("todo", JSON.stringify(todoArray))
}
//     todoEl.id = todo.id
//     todoEl.className = "flex justify-between text-center items-center px-5 py-2 my-1 bg-stone-600 rounded-lg w-full shadow-lg shadow-inner shadow-stone-900 animate-fade-in-down"
//     todoEl.innerHTML = `
//     <button class="" onclick="toggleTodo(${todo.id})">
//     ${todo.completed ? "✅" : "⬜️"}</button>
//     <span class="font-semibold mx-7 text-sm${todo.completed ? " line-through" : ""}">${todo.text}</span>
//     <button class="text-xs" onclick="deleteTodo(${todo.id})">❌</button>
//     `
//     todoListEl.appendChild(todoEl)
//   })
//   console.log(todoArray)
// }

function addEventListenerToTodos() {
  const todos = document.querySelectorAll("#todo")
  const todoList = document.querySelectorAll("#todo-list-el li")

  todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart)
    todo.addEventListener("dragend", dragEnd)
  })

  todoList.forEach((todo) => {
    todo.addEventListener("dragover", dragOver)
    todo.addEventListener("drop", drop)
    todo.addEventListener("dragenter", dragEnter)
    todo.addEventListener("dragleave", dragLeave)
  })
}

function dragStart() {
  this.className += "opacity-10 animate-bounce"
  setTimeout(() => (this.className = classNameTodoList), 0)
  dragStartOrder = +this.closest("li").getAttribute("data-order")
}

function dragEnd() {
  this.className = classNameTodoList
}

function dragOver(e) {
  e.preventDefault()
}

function drop() {
  const dragEndOrder = +this.getAttribute("data-order")
  swapOrder(dragStartOrder, dragEndOrder)
}

function dragEnter(e) {
  e.preventDefault()
  this.className += " border-2 border-stone-200 animate-pulse"
}

function dragLeave() {
  this.className = classNameTodoList
}

// Swapping order of todos
function swapOrder(dragStartOrder, dragEndOrder) {
  todoArray.forEach((todo) => {
    if (todo.order === dragStartOrder) {
      todo.order = dragEndOrder
    } else if (todo.order === dragEndOrder) {
      todo.order = dragStartOrder
    }
  })
  renderTodos(todoArray)
  localStorage.setItem("todo", JSON.stringify(todoArray))
}
//     todoEl.id = todo.id
//     todoEl.className = "flex justify-between text-center items-center px-5 py-2 my-1 bg-stone-600 rounded-lg w-full shadow-lg shadow-inner shadow-stone-900 animate-fade-in-down"
//     todoEl.innerHTML = `
//     <button class="" onclick="toggleTodo(${todo.id})">
//     ${todo.completed ? "✅" : "⬜️"}</button>
//     <span class="font-semibold mx-7 text-sm${todo.completed ? " line-through" : ""}">${todo.text}</span>
//     <button class="text-xs" onclick="deleteTodo(${todo.id})">❌</button>
//     `
//     todoListEl.appendChild(todoEl)
//   })
//   console.log(todoArray)
// }

function addEventListenerToTodos() {
  const todos = document.querySelectorAll("#todo")
  const todoList = document.querySelectorAll("#todo-list-el li")

  todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart)
    todo.addEventListener("dragend", dragEnd)
  })

  todoList.forEach((todo) => {
    todo.addEventListener("dragover", dragOver)
    todo.addEventListener("drop", drop)
    todo.addEventListener("dragenter", dragEnter)
    todo.addEventListener("dragleave", dragLeave)
  })
}

function dragStart() {
  this.className += "opacity-10 animate-bounce"
  setTimeout(() => (this.className = classNameTodoList), 0)
  dragStartOrder = +this.closest("li").getAttribute("data-order")
}

function dragEnd() {
  this.className = classNameTodoList
}

function dragOver(e) {
  e.preventDefault()
}

function drop() {
  const dragEndOrder = +this.getAttribute("data-order")
  swapOrder(dragStartOrder, dragEndOrder)
}

function dragEnter(e) {
  e.preventDefault()
  this.className += " border-2 border-stone-200 animate-pulse"
}

function dragLeave() {
  this.className = classNameTodoList
}

// Swapping order of todos
function swapOrder(dragStartOrder, dragEndOrder) {
  todoArray.forEach((todo) => {
    if (todo.order === dragStartOrder) {
      todo.order = dragEndOrder
    } else if (todo.order === dragEndOrder) {
      todo.order = dragStartOrder
    }
  })
  renderTodos(todoArray)
  localStorage.setItem("todo", JSON.stringify(todoArray))
}
