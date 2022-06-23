let todoArray = []
// Get Elements from DOM
const todoFromLocalStorage = JSON.parse(localStorage.getItem("todo"))
const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const delBtn = document.getElementById("del-btn")
const todoListEl = document.getElementById("todo-list-el")
const tableEl = document.getElementById("table-el")
const uiPlayerEl = document.getElementById("ui-player-el")

let isPlaying = false
let secondsTracked = 0
let interval
let idTodo = 0

const classNameTodoList = `flex justify-between text-center items-center px-5 py-2 my-1 bg-stone-600 
rounded-lg w-full shadow-inner shadow-stone-900 cursor-grab`

// Grab data from local storage and render todo list
if (todoFromLocalStorage) {
  todoArray = todoFromLocalStorage
  renderTodos(todoArray)
  renderTable(todoArray)
}

// Event Listeners for DOM elements
inputEl.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // if enter key is pressed
    if (inputEl.value) {
      addTodo()
    }
  }
})

addBtn.addEventListener("click", () => {
  if (inputEl.value) {
    addTodo()
  }
})

delBtn.addEventListener("click", () => {
  if (todoArray.length) {
    getConfirm("Are you sure you want to delete all todos?", deleteAllTodo)
  }
})

// Miscellaneous functions
function getConfirm(question, callback) {
  if (confirm(question)) {
    callback()
  } else {
    return false
  }
}

function getUID() {
  return Date.now() + Math.random()
}

// Copy to clipboard functions
function copyToClipboard(value) {
  const copyText = value
  navigator.clipboard.writeText(copyText)
  setTimeout(() => {
    renderNotifications("🔔 Copied to clipboard")
  }, 1)
}


// Todo functions
function addTodo() {
  const id = getUID()
  const todo = { id, text: inputEl.value, completed: false, timeTracked: 0, order: todoArray.length }
  todoArray.push(todo)
  renderTodos(todoArray)
  renderTable(todoArray)
  renderNotifications("🔔 Added todo")
  inputEl.value = ""
  localStorage.setItem("todo", JSON.stringify(todoArray))
}

function getTodoHtml(todo) {
  const { id, text, completed, order } = todo
  const listTodo = document.createElement("li")
  listTodo.setAttribute("data-order", order)
  listTodo.id = "todo"
  listTodo.draggable = true
  listTodo.className = classNameTodoList
  listTodo.innerHTML = `
  <button class="" onclick="toggleTodo(${id})">${completed ? "✅" : "⬜️"}</button>
  <span class="font-semibold mx-7 text-sm${completed ? " line-through" : ""}">${text}</span>
  <div class="flex">
    <button class="w-4 h-4 bg-green-400 rounded-full mr-5 shadow-inner shadow-lime-400 transition ease-in-out duration-300 delay-100 hover:scale-110 hover:bg-red-500 hover:shadow-inner" onclick="startStopTimer(id)"></button>
    <button class="text-xs transition ease-in-out duration-300 delay-100 hover:scale-125 hover:shadow" onclick="deleteTodo(${id})">❌</button>
  </div>
  `
  return listTodo.outerHTML
}

function getTodosHtml(todoArray) {
  return todoArray.map((todo) => getTodoHtml(todo)).join("")
}

// function renderTodo(todo) {
//   const todoEl = document.getElementById(todo.id)
//   todoEl.innerHTML = getTodoHtml(todo)
// }

function renderTodos(todoArray) {
  sortedTodoArray()
  todoListEl.innerHTML = getTodosHtml(todoArray)
  addEventListenerToTodos()
}

function toggleTodo(id) {
  todoArray.forEach((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }
    renderTodos(todoArray)
    renderNotifications('🔔 Todo "' + todo.text + '" ' + (todo.completed ? "completed" : "uncompleted"))
  })
  localStorage.setItem("todo", JSON.stringify(todoArray))
}

function deleteTodo(id) {
  todoArray = todoArray.filter((todo) => todo.id !== id)
  renderTodos(todoArray)
  renderNotifications("🔔 Todo deleted")
  localStorage.setItem("todo", JSON.stringify(todoArray))
}

function deleteAllTodo() {
  alert("Are you sure you want to delete all todos?")
  todoArray = []
  renderTodos(todoArray)
  renderNotifications("🔔 All todos deleted")
  localStorage.removeItem("todo")
}

function sortedTodoArray() {
  todoArray.sort((a, b) => a.order - b.order)
}

// Drag and drop functions
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
  // this.className += " border-b-2 border-green-500"
  this.className += " cursor-grabbing"
  setTimeout(() => (this.className = classNameTodoList + " cursor-grabbing"), 0)
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
  this.className += " border-2 border-green-200 animate-pulse"
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

// BoredApp functions
function getBoredActivity() {
  fetch("https://www.boredapi.com/api/activity/")
    .then((response) => response.json())
    .then((data) => {
      const activity = data.activity
      copyToClipboard(activity)
      const btn = document.getElementById("activity-idea-btn")
      btn.className = ""
      btn.innerHTML = `
      <span class="bg-amber-400 text-sm text-stone-700 rounded py-1 px-3 font-semibold
      text-center block z-40 animate-fade-in shadow transition ease-in-out delay-100 hover:scale-110
      hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-400/50"
      >${activity}</span>
      `
    })
}

// Notifications functions
function renderNotifications(message) {
  const notificationEl = document.getElementById("notification-el")
  const notification = document.createElement("div")
  notificationEl.className = ""
  notificationEl.innerHTML = `
    <p class="fixed right-0 bg-cyan-500 text-white text-center py-1 px-3 
    font-semibold text-xs rounded m-3 animate-fade-in-down-fade-out-up">${message}</p>
  `
  setTimeout(() => {
    notificationEl.className = "hidden"
  }, 4000)
}

// Table functions
function getTableHtml(todoArray) {
  return `
  <table class="table-auto w-full my-4">
  <thead>
    <tr>
      <th class="border-b px-4 py-2 text-center">C.</th>
      <th class="border-b px-4 py-2 text-center">Text</th>
      <th class="border-b px-4 py-2 text-center">Time tracked</th>
      <th class="border-b px-4 py-2 text-center">Order</th>
    </tr>
  </thead>
  <tbody>
    ${todoArray.map((todo) => `
    <tr>
      <td class="border-b px-4 py-2 text-center">${todo.completed ? "✅" : "⬜️"}</td>
      <td class="border-b px-4 py-2 text-center">${todo.text}</td>
      <td class="border-b px-4 py-2 text-center">${todo.timeTracked}</td>
      <td class="border-b py-2 text-center">${todo.order}</td>
      </tr>`
    ).join("")}
  </tbody>
  </table>
  `
}

function renderTable(todoArray) {
  tableEl.innerHTML = getTableHtml(todoArray)
}

// Ui Player functions
function getUiPlayerHtmlWithTodo(id) {
  return `
  <div class="fixed bottom-6 m-0 -translate-x-1/2 left-1/2 backdrop-blur-sm w-60 float-none rounded-full">
  <div id="container-ui-timer" class=" bg-opacity-40 bg-rose-200 px-4 pb-2 pt-1 float flex flex-col w-60 items-center rounded-full shadow-lg shadow-stone-900">
    <p id="ui-player-activity-el"
    class="text-sm mb-2 border-b-2 border-amber-300 text-amber-300 py px-2 w-44 truncate overflow-hidden font-semibold">${getTodoText(id)}</p>
    <div class="justify-between inline-flex">
      <div>
        <button id="start-stop-timer-btn" onclick="${startStopTimer(id)}">${isPlaying ? "Pause" : "Play"}</button>
        <button id="reset-timer-btn" class="mx-2" onclick="${resetTimer()}">Reset</button>
        <button id="save-timer-btn" onclick="${saveTimer()}">Save</button>
      </div>
      <div class="w-16">
        <span id="timer-el" class="ml-4 px-2 py-1 text-sm text-right bg-opacity-20 bg-stone-800 font-medium text-stone-200 rounded-full">${getHtmlTime(secondsTracked)}</span>
      </div>
    </div>
  </div>
</div>`
}

function renderUiPlayer(todo) {
  uiPlayerEl.innerHTML = getUiPlayerHtmlWithTodo(todo)
}

// Stopwatch functions
function getHtmlTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

function renderTimer() {
  return getHtmlTime(secondsTracked)
}

function stopTimer() {
  clearInterval(interval)
  isPlaying = false
}

function getTodoById(id) {
  return todoArray.find((todo) => todo.id === id)
}

function getTodoText(id) {
  return getTodoById(id).text
}

function startStopTimer(id) {
  idTodo = id
  if (isPlaying) {
    stopTimer()
  } else {
    isPlaying = true
    renderUiPlayer(idTodo)
    interval = setInterval(() => {
      secondsTracked++
      getHtmlTime(secondsTracked)
    }, 1000)
  }
}

function resetTimer() {
  idTodo = 0
  secondsTracked = 0
  if (isPlaying) {
    isPlaying = false
    clearInterval(interval)
  }
  renderTimer()
}

function saveTimer() {
  if (isPlaying) {
    stopTimer()
  }
  if (idTodo) {
    todoArray.forEach((todo) => {
      if (todo.id === idTodo) {
        todo.timeTracked += secondsTracked
        totalTimeTracked += secondsTracked
      }
    })
    localStorage.setItem("todo", JSON.stringify(todoArray))
  }
  resetTimer()
}


// Track time functions render
const timeTrackedEl = document.getElementById("time-tracked-el")

if (todoArray.length > 0) {
  timeTrackedEl.textContent = todoArray[0].timeTracked
}

function renderTimeTrackedRequest(id) {
  timeTrackedEl.textContent = todoArray[0].timeTracked
}
