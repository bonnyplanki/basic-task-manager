const express = require("express")
const path = require("path")
const methodOverride = require("method-override")

const tasksRouter = require("./routes/tasks")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

app.get("/", (req, res) => res.redirect("/tasks"))
app.use("/tasks", tasksRouter)

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
