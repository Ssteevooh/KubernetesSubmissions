const http = require("http");
const { Pool } = require("pg");

const PORT = process.env.PORT;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

async function createTable() {
  await pool.query("CREATE TABLE IF NOT EXISTS todos (todo TEXT)");
  await pool.query(
    "INSERT INTO todos (todo) SELECT 'Learn Kubernetes basics' WHERE NOT EXISTS (SELECT * FROM todos)",
  );
  await pool.query(
    "INSERT INTO todos (todo) SELECT 'Deploy application to cluster' WHERE NOT EXISTS (SELECT * FROM todos WHERE todo = 'Deploy application to cluster')",
  );
  await pool.query(
    "INSERT INTO todos (todo) SELECT 'Configure persistent volumes' WHERE NOT EXISTS (SELECT * FROM todos WHERE todo = 'Configure persistent volumes')",
  );
}

async function getTodos() {
  const result = await pool.query("SELECT todo FROM todos");
  return result.rows.map((row) => row.todo);
}

async function createTodo(todo) {
  await pool.query("INSERT INTO todos (todo) VALUES ($1)", [todo]);
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/todos" && req.method === "GET") {
    const todos = await getTodos();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
    return;
  }

  if (req.url === "/todos" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const params = new URLSearchParams(body);
      const todo = params.get("todo");

      console.log(`Todo received: ${todo}`);

      if (!todo) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Todo missing");
        return;
      }

      if (todo.length > 140) {
        console.log(`Todo too long: ${todo}`);

        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Todo too long");
        return;
      }

      await createTodo(todo);

      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("Todo created");
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 - Not found");
});

createTable().then(() => {
  server.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
  });
});
