import express from "express";
import { AppController } from "./search_controller.js";
import { DatabaseController } from "./db/db_controller.js";
import { assert } from "./assert.js";

const appController = new AppController(new DatabaseController({}));

const PORT = 8080;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/search", async (req, res, next) => {
  try {
    assert(req.body, "Bad request body");
    const { api, query } = req.body;
    assert(api && query !== undefined, "Wrong api in request on search/");

    let queryString = "";
    if (query) {
      queryString = "?q=" + query.trim().replaceAll(" ", "+");
    }
    const response = await appController.getNewBooks(api + queryString, {});

    res.json(response);
  } catch (err) {
    res.json({});
    next(err);
  }
});

app.listen(PORT, () => {
  console.log("Success! Port: " + PORT);
});
