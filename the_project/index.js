const http = require("http")
const https = require("https")
const fs = require("fs")

const PORT = process.env.PORT || 3000

const IMAGE_FILE = "/usr/src/app/files/image.jpg"
const TEN_MINUTES = 10 * 60 * 1000

function imageIsOld() {
  if (!fs.existsSync(IMAGE_FILE)) {
    return true
  }

  const image = fs.statSync(IMAGE_FILE)
  return Date.now() - image.mtimeMs > TEN_MINUTES
}

function downloadImage(url, callback) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400) {
      downloadImage(res.headers.location, callback)
      return
    }

    const file = fs.createWriteStream(IMAGE_FILE)
    res.pipe(file)

    file.on("finish", () => {
      file.close()
      callback()
    })
  })
}

function updateImage(callback) {
  if (imageIsOld()) {
    downloadImage("https://picsum.photos/1200", callback)
    return
  }

  callback()
}

const server = http.createServer((req, res) => {
  if (req.url === "/theproject") {
    updateImage(() => {
      res.writeHead(200, { "Content-Type": "text/html" })
      res.end(`
        <div style="text-align: center; font-family: Arial;">
          <h1>Todo App</h1>
          <img src="/theproject/image" style="width: 600px;">
          <p>DevOps with Kubernetes 2026</p>
        </div>
      `)
    })
    return
  }

  if (req.url === "/theproject/image") {
    res.writeHead(200, { "Content-Type": "image/jpeg" })
    fs.createReadStream(IMAGE_FILE).pipe(res)
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("404 - Not found")
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})