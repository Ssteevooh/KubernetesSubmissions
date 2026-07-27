const crypto = require("crypto")

const randomString = crypto.randomBytes(16).toString("hex")

function logWithTimestamp() {
  const timestamp = new Date().toISOString()
  console.log(`${timestamp}: ${randomString}`)
}

logWithTimestamp()
setInterval(logWithTimestamp, 5000)