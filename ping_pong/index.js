const http = require("http")
const fs = require("fs")

const PORT = process.env.PORT || 3000
const PING_FILE = "/usr/src/app/files/pingpong.txt"

let counter = 0

const server = http.createServer((req, res) => {
  if (req.url === "/pingpong") {
    res.writeHead(200, { "Content-Type": "text/plain" })

    res.end(`pong ${counter}`)
    fs.writeFileSync(PING_FILE, String(counter))

    counter += 1
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("404 - Not found")
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})