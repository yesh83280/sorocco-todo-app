const path = require("path")
const express = require("express")
const cors = require("cors")
const todoRouter = require("./api/todo.router")
const PORT = process.env.PORT || 3001;

const app = express();

const corsOptions = {
  origin: true,
  credentials: true
}

app.use(cors(corsOptions))

app.use(express.json())

app.use((req, res, next) => {
  console.log("Time: ", new Date())
  console.log(`${req.method}: ${req.path}`)
  next()
})

app.use('/todoapp/api', todoRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




