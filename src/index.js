let todoArray = []
// Get Elements from DOM
const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const delBtn = document.getElementById("del-btn")
const todoListEl = document.getElementById("todo-list-el")
const todoFromLocalStorage = JSON.parse(localStorage.getItem("todo"))

if (todoFromLocalStorage) {
  todoArray = todoFromLocalStorage
  renderTodos(todoFromLocalStorage)
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
  listTodo.className = `flex justify-between text-center items-center px-5 py-2 my-1 bg-stone-600 
  rounded-lg w-full shadow-inner shadow-stone-900`
  listTodo.innerHTML = `
  <button class="" onclick="toggleTodo(${id})">${completed ? "✅" : "⬜️"}</button>
  <span class="font-semibold mx-7 text-sm${completed ? " line-through" : ""}">${text}</span>
  <button class="text-xs" onclick="deleteTodo(${id})">❌</button>
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
  })

  todoList.forEach((todo) => {
    todo.addEventListener("dragover", dragOver)
    todo.addEventListener("drop", drop)
    todo.addEventListener("dragenter", dragEnter)
    todo.addEventListener("dragleave", dragLeave)
  })
}
let dragStartId
function dragStart() {
  dragStartOrder = +this.closest("li").getAttribute("data-order")
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
}

function dragLeave() {
}

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
    ${todoArray
      .map(
        (todo) => `
    <tr>
      <td class="border-b px-4 py-2 text-center">${todo.completed ? "✅" : "⬜️"}</td>
      <td class="border-b px-4 py-2 text-center">${todo.text}</td>
      <td class="border-b px-4 py-2 text-center">${todo.timeTracked}</td>
      <td class="border-b py-2 text-center">${todo.order}</td>
      </tr>
      `
      )
      .join("")}
  </tbody>
  </table>
  `
}

function renderTable(todoArray) {
  tableEl.innerHTML = getTableHtml(todoArray)
}

const tableEl = document.getElementById("table-el")
if (todoArray.length > 0) {
tableEl.innerHTML = getTableHtml(todoArray)
}

// Stopwatch functions
let isPlaying = false
let secondsTracked = 0
let totalTimeTracked = 0
let interval
let idTodo = 0

const timerEl = document.getElementById("timer-el")
const startStopTimerBtn = document.getElementById("start-stop-timer-btn")
const resetTimerBtn = document.getElementById("reset-timer-btn")
const saveTimerBtn = document.getElementById("save-timer-btn")

startStopTimerBtn.addEventListener("click", () => startStopTimer(todoArray[0].id))
resetTimerBtn.addEventListener("click", () => resetTimer())
saveTimerBtn.addEventListener("click", () => saveTimer())

function getHtmlTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

function renderTimer() {
  timerEl.innerHTML = getHtmlTime(secondsTracked)
}

function stopTimer() {
  clearInterval(interval)
  isPlaying = false
  startStopTimerBtn.innerHTML = "Play"
}

function startStopTimer(id) {
  idTodo = id
  if (isPlaying) {
    stopTimer()
  } else {
    isPlaying = true
    interval = setInterval(() => {
      secondsTracked++
      renderTimer()
    }, 1000)
    startStopTimerBtn.innerHTML = "Stop"
  }
}

function resetTimer() {
  idTodo = 0
  secondsTracked = 0
  if (isPlaying) {
    isPlaying = false
    clearInterval(interval)
    startStopTimerBtn.innerHTML = "Start"
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
