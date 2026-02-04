const { v4: uuid } = require("uuid")

let tasks = []

function getAll() {
  return tasks
}

function getById(id) {
  return tasks.find(t => t.id === id)
}

function create(task) {
  const newTask = {
    id: uuid(),
    title: task.title,
    description: task.description || "",
    priority: task.priority || "Medium",
    status: "Pending",
    dueDate: task.dueDate || "",
    createdAt: Date.now()
  }
  tasks.push(newTask)
}


function update(id, data) {
  const task = getById(id)
  if (!task) return
  task.title = data.title
  task.description = data.description
  task.priority = data.priority
  task.dueDate = data.dueDate
}

function remove(id) {
  tasks = tasks.filter(t => t.id !== id)
}

function toggle(id) {
  const task = getById(id)
  if (task) {
    task.status = task.status === "Done" ? "Pending" : "Done"
  }
}

module.exports = { getAll, getById, create, update, remove, toggle }
