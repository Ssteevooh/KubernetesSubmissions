const http = require("http")
const crypto = require("crypto")

const PORT = process.env.PORT || 3000
const randomString = crypto.randomBytes(16).toString("hex")

function getTimestamp() {
  const timestamp = new Date().toISOString()
  return `${timestamp}: ${randomString}`
}

function logTimestamp() {
  console.log(getTimestamp())
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end(getTimestamp())
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("404 - Not found")
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
  logTimestamp()
  setInterval(logTimestamp, 5000)
})