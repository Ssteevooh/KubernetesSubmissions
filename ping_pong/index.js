const http = require("http");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

async function createTable() {
  await pool.query("CREATE TABLE IF NOT EXISTS pingpong (counter INTEGER)");
  await pool.query(
    "INSERT INTO pingpong (counter) SELECT 0 WHERE NOT EXISTS (SELECT * FROM pingpong)",
  );
}

async function getCounter() {
  const result = await pool.query("SELECT counter FROM pingpong LIMIT 1");
  return result.rows[0].counter;
}

async function increaseCounter() {
  const result = await pool.query(
    "UPDATE pingpong SET counter = counter + 1 RETURNING counter",
  );
  return result.rows[0].counter;
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    const counter = await increaseCounter();

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`pong ${counter}`);
    return;
  }

  if (req.url === "/pings") {
    const counter = await getCounter();

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(String(counter));
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
