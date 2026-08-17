const https = require("https");
const http = require("http");

const TODO_BACKEND_HOST = process.env.TODO_BACKEND_HOST;
const TODO_BACKEND_PORT = process.env.TODO_BACKEND_PORT;
const TODO_BACKEND_PATH = process.env.TODO_BACKEND_PATH;

function getRandomWikipediaUrl(callback) {
  https.get("https://en.wikipedia.org/wiki/Special:Random", (res) => {
    const location = res.headers.location;

    callback(`https:${location}`);
  });
}

function createTodo(url) {
  const todo = `Read ${url}`;
  const body = new URLSearchParams({ todo }).toString();

  const request = http.request(
    {
      hostname: TODO_BACKEND_HOST,
      port: TODO_BACKEND_PORT,
      path: TODO_BACKEND_PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(body),
      },
    },
    () => {
      console.log(`Todo created: ${todo}`);
    },
  );

  request.write(body);
  request.end();
}

getRandomWikipediaUrl((url) => {
  createTodo(url);
});
