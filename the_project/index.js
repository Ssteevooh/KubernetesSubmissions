const http = require("http");
const https = require("https");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const IMAGE_FILE = "/usr/src/app/files/image.jpg";
const HTML_FILE = "index.html";
const TEN_MINUTES = 10 * 60 * 1000;

function imageIsOld() {
  if (!fs.existsSync(IMAGE_FILE)) {
    return true;
  }

  const image = fs.statSync(IMAGE_FILE);
  return Date.now() - image.mtimeMs > TEN_MINUTES;
}

function downloadImage(url, callback) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400) {
      downloadImage(res.headers.location, callback);
      return;
    }

    const file = fs.createWriteStream(IMAGE_FILE);
    res.pipe(file);

    file.on("finish", () => {
      file.close();
      callback();
    });
  });
}

function updateImage(callback) {
  if (imageIsOld()) {
    downloadImage("https://picsum.photos/1200", callback);
    return;
  }

  callback();
}

function getTodos(callback) {
  http.get("http://todo-backend-svc:2345/todos", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      callback(JSON.parse(data));
    });
  });
}

function createTodo(body, callback) {
  const options = {
    hostname: "todo-backend-svc",
    port: 2345,
    path: "/todos",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const request = http.request(options, () => {
    callback();
  });

  request.write(body);
  request.end();
}

function createPage(todos) {
  const html = fs.readFileSync(HTML_FILE, "utf8");
  const todoItems = todos.map((todo) => `<li>${todo}</li>`).join("");

  return html.replace("{{todos}}", todoItems);
}

const server = http.createServer((req, res) => {
  if (req.url === "/theproject" && req.method === "GET") {
    updateImage(() => {
      getTodos((todos) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(createPage(todos));
      });
    });
    return;
  }

  if (req.url === "/theproject/todos" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      createTodo(body, () => {
        res.writeHead(302, { Location: "/theproject" });
        res.end();
      });
    });

    return;
  }

  if (req.url === "/theproject/image") {
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    fs.createReadStream(IMAGE_FILE).pipe(res);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 - Not found");
});

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
