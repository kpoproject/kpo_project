import express from "express";
import { AppController } from "./search_controller.js";
import { DatabaseController } from "./db/db_controller.js";
import { Pool } from "pg";
import { DB_CONFIG } from "./db/db_config.js";
import { LoginManager } from "./login_manager.js";
import { assert } from "./assert.js";

const pool = new Pool(DB_CONFIG);
const dbController = new DatabaseController(pool);
const appController = new AppController(dbController);
const loginManager = new LoginManager(dbController);

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

const try_catch_next_wrapper = async (body, req, res, next) => {
  try {
    assert(req.body, "Bad request body");
    await body(req, res);
  } catch (err) {
    res.json({ success: false });
    next(err);
  }
};

app.post("/search", async (req, res, next) => {
  const body = async (req, res) => {
    const { api, query } = req.body;
    assert(api && query !== undefined, "Wrong api in request on search/");

    let queryString = "";
    if (query) {
      queryString = "?q=" + query.trim().replaceAll(" ", "+");
    }
    const response = await appController.getNewBooks(api + queryString, {});

    res.json({ api_response: response, success: response ? true : false });
  };

  await try_catch_next_wrapper(body, req, res, next);
});

app.post("/login", async (req, res, next) => {
  const body = async (req, res) => {
    const { username, password } = req.body;
    assert(username && password, "Wrong auth token in request on login/");

    let id = await loginManager.login(username, password);
    res.json({
      username: username,
      password: password,
      userid: id,
      success: id === undefined ? false : true,
    });
  };

  await try_catch_next_wrapper(body, req, res, next);
});

app.post("/register", async (req, res, next) => {
  const body = async (req, res) => {
    const { username, password } = req.body;
    assert(username && password, "Wrong auth token in request on register/");

    let id = await loginManager.register(username, password);
    res.json({
      username: username,
      password: password,
      userid: id,
      success: id === undefined ? false : true,
    });
  };
  await try_catch_next_wrapper(body, req, res, next);
});

app.post("/deleteuser", async (req, res, next) => {
  const body = async (req, res) => {
    const { userid, username, password } = req.body;
    assert(
      userid && username && password,
      "Wrong auth token in request on deleteuser/",
    );

    let succ = await loginManager.deleteUser(userid, username, password);
    res.json({
      success: succ ? false : true,
    });
  };
  await try_catch_next_wrapper(body, req, res, next);
});

app.post("/lib/addbook", async (req, res, next) => {
  const body = async (req, res) => {
    const { userid, bookid, password } = req.body;
    assert(
      userid && bookid && password,
      "Wrong token in request on lib/addbook/",
    );

    let response = await appController.saveBook(userid, password, bookid);
    res.json({ success: true });
  };
  await try_catch_next_wrapper(body, req, res, next);
});

app.post("/lib/removebook", async (req, res, next) => {
  const body = async (req, res) => {
    const { userid, password, bookid } = req.body;
    assert(
      userid && bookid && password,
      "Wrong token in request on lib/removebook/",
    );

    let response = await appController.deleteBook(userid, password, bookid);
    res.json({ success: true });
  };
  await try_catch_next_wrapper(body, req, res, next);
});

app.post("/lib", async (req, res, next) => {
  const body = async (req, res) => {
    const { userid, password } = req.body;
    assert(userid && password, "Wrong auth token in request on /lib");

    let response = await appController.getSavedBooks(userid, password);
    res.json({ books: response, success: response ? true : false });
  };
  await try_catch_next_wrapper(body, req, res, next);
});

app.listen(PORT, () => {
  console.log("Success! Port: " + PORT);
});
