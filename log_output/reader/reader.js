const http = require("http")
const fs = require("fs")

const PORT = process.env.PORT || 3000
const filePath = "/usr/src/app/files/log.txt"

const server = http.createServer((req, res) => {
  if (req.url === "/logoutput") {
    res.writeHead(200, { "Content-Type": "text/plain" })

    if (fs.existsSync(filePath)) {
      res.end(fs.readFileSync(filePath, "utf8"))
      return
    }

    res.end("Log file not found yet")
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("404 - Not found")
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})