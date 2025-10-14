import { DatabaseController } from "../db/db_controller.js";
import { DB_CONFIG } from "../db/db_config.js";
import { Pool } from "pg";

const pool = new Pool(DB_CONFIG);
const db = new DatabaseController(pool);
let response = await db.getUser({});
console.log(response);
