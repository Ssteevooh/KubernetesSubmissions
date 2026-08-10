const fs = require("fs")
const crypto = require("crypto")

const filePath = "/usr/src/app/files/log.txt"
const randomString = crypto.randomBytes(16).toString("hex")

function writeLog() {
  const timestamp = new Date().toISOString()
  const output = `${timestamp}: ${randomString}`

  fs.writeFileSync(filePath, output)
  console.log(output)
}

writeLog()
setInterval(writeLog, 5000)