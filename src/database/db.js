import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.name,
});
