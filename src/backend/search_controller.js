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
  async getSavedBooks(userId) {
    assert(userId, "Bad data for saved books request");
    let dbResponse = await this.db.getUserBooks(userId);
    return dbResponse.rows;
  }
  async saveBook(userId, bookId) {
    assert(userId && bookId, "Bad data for saving book request");
    await this.db.appendBook(userId, bookId);
  }
  async deleteBook(userId, bookId) {
    assert(userId && bookId, "Bad data for book deletion");
    await this.db.deleteBook(userId, bookId);
  }
}
