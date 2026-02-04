const express = require("express")
const store = require("../data/store")

const router = express.Router()

router.get("/", (req, res) => {
  const priorityRank = { High: 3, Medium: 2, Low: 1 }

  const tasks = store.getAll().slice().sort((a, b) => {
    const pr = (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0)
    if (pr !== 0) return pr
    return (b.createdAt || 0) - (a.createdAt || 0)
  })

  res.render("index", { tasks })
})

router.post("/", (req, res) => {
  store.create(req.body)
  res.redirect("/tasks")
})

router.get("/:id/edit", (req, res) => {
  const task = store.getById(req.params.id)
  if (!task) return res.status(404).send("Task not found")
  res.render("edit", { task })
})

router.put("/:id", (req, res) => {
  store.update(req.params.id, req.body)
  res.redirect("/tasks")
})

router.patch("/:id/toggle", (req, res) => {
  store.toggle(req.params.id)
  res.redirect("/tasks")
})

router.delete("/:id", (req, res) => {
  store.remove(req.params.id)
  res.redirect("/tasks")
})

module.exports = router
