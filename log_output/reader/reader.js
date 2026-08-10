const http = require("http")
const fs = require("fs")

const PORT = process.env.PORT || 3000

const LOG_FILE = "/usr/src/app/files/log.txt"
const PING_FILE = "/usr/src/app/files/pingpong.txt"

const server = http.createServer((req, res) => {
  if (req.url === "/logoutput") {
    const log = fs.readFileSync(LOG_FILE, "utf8")
    const pings = fs.readFileSync(PING_FILE, "utf8")

    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end(`${log}\nPing / Pongs: ${pings}`)
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("404 - Not found")
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})