const { Pool, Client } = require("pg");
require("dotenv").config();
const connectionString = process.env.DATABASE_URL;

const db = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

db.connect((err) => {
  if (err) {
    console.error("There was an error connecting to Postgress DB", err.stack);
  }
});

db.query(`
    CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL,
        "userId" BIGINT NOT NULL,
        "userTag" VARCHAR(50) NOT NULL,
        "userScore" BIGINT NOT NULL DEFAULT 0,
        PRIMARY KEY ("id")
    );
`);

module.exports = db;
