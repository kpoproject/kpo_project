const fetchData = async (endpoint, method, body) => {
  return fetch(endpoint, {
    method: method,
    body: method === "GET" ? undefined : JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("Error fetching url: " + endpoint);
      }
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
    // console.assert(endpoint);
    const response = fetchData(
      "https://openlibrary.org/search.json?q=the+lord+of+the+rings",
      "GET",
      {},
    );
    return response;
  }
  async getSavedBooks(userId) {}
  async saveBook(userId) {}
  async deleteBook(userId) {}
  async deleteUser(userId) {}
  // async deleteAllBooks(userId) {}
}
