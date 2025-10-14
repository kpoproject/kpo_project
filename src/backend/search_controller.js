import { assert } from "./assert.js";

const fetchData = async (endpoint, method, body) => {
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
  async getSavedBooks(userId) {}
  async saveBook(userId) {}
  async deleteBook(userId) {}
  async deleteUser(userId) {}
  // async deleteAllBooks(userId) {}
}
