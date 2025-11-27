import { DatabaseController } from "../db/db_controller.js";
import { DB_CONFIG } from "../db/db_config.js";
import { Pool } from "pg";

const pool = new Pool(DB_CONFIG);
const db = new DatabaseController(pool);
// let temp = await db.addUser({ username: "a", password: "a" });
// let response = await db.getUser({ username: "a", password: "a" });
// let res1 = await db.appendBook(response.rows[0].id, 3);
// console.log(response.rows[0].id);
// let res2 = await db.deleteBook(response.rows[0].id, 2);
// let res1 = await db.deleteUser(1);
// let res3 = await db.getUserBooks(1);
let res3 = await db.validateUser({ username: "a", password: "a" });
console.log(res3);
