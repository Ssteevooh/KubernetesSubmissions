const http = require("http")

const PORT = process.env.PORT

let todos = [
  "Learn Kubernetes basics",
  "Deploy application to cluster",
  "Configure persistent volumes"
]

const server = http.createServer((req, res) => {
  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(todos))
    return
  }

  if (req.url === "/todos" && req.method === "POST") {
    let body = ""

    req.on("data", (chunk) => {
      body += chunk
    })

    req.on("end", () => {
      const params = new URLSearchParams(body)
      const todo = params.get("todo")

      if (todo && todo.length <= 140) {
        todos.push(todo)
      }

      res.writeHead(201, { "Content-Type": "text/plain" })
      res.end("Todo created")
    })

    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("404 - Not found")
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})