const express = require("express");
const app = express();
const path = require("path");
const dbPath = path.join(__dirname, "covid19IndiaPortal.db");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let db = null;
const initalizeAndDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB error is ${e.message}`);
    process.exit(1);
  }
};
initalizeAndDb();

app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const getQuery = `SELECT * FROM user WHERE username = '${username}';`;
  const result = await db.get(getQuery);
  response.send(result);
});
