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