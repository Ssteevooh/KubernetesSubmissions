const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const LOG_FILE = "/usr/src/app/files/log.txt";
const INFORMATION_FILE = "/usr/src/app/config/information.txt";

function getPings(callback) {
  http.get("http://ping-pong-svc/pings", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      callback(data);
    });
  });
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }

  if (req.url === "/logoutput") {
    getPings((pings) => {
      const log = fs.readFileSync(LOG_FILE, "utf8");
      const information = fs.readFileSync(INFORMATION_FILE, "utf8").trim();
      const message = process.env.MESSAGE;

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(
        `file content: ${information}\nenv variable: MESSAGE=${message}\n${log}\nPing / Pongs: ${pings}`,
      );
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 - Not found");
});

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
