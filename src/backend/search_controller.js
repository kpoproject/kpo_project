import { assert } from "./assert.js";

const fetchData = (endpoint, method, body) => {
  return fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" ? undefined : JSON.stringify(body),
  })
    .then((response) => {
      assert(response.ok, "Error fetching url: " + endpoint);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export class AppController {
  constructor(dbController) {
    if (!dbController) {
      throw Error("Null or undefined argument in AppContoller construction");
    }
    this.db = dbController;
  }

  async getNewBooks(endpoint, options) {
    assert(endpoint, "Wrong endpoint to get new books");
    let response = fetchData(endpoint, "GET", options);
    return response;
  }

  async getSavedBooks(userid, password) {
    let dbResponse = await this.db.getUserBooks(userid, password);
    return dbResponse.rows;
  }

  async saveBook(userid, password, cover, fyp, key, lang, title) {
    await this.db.appendBook(userid, password, cover, fyp, key, lang, title);
  }

  async deleteBook(userid, password, key) {
    await this.db.deleteBook(userid, password, key);
  }
}
