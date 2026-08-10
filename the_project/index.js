const http = require("http")

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === "/theproject") {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end("<h1>Hello from the project</h1>")
    return
  }

  res.writeHead(404, { "Content-Type": "text/html" })
  res.end("<h1>404 - Not found</h1>")
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})