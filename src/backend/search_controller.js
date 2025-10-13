export class AppController {
  constructor(dbController) {
    if (!dbController) {
      throw Error("Null or undefined argument in AppContoller construction");
    }
    this.db = dbController;
  }

  async getNewBooks(endpoint, options) {}
  async getSavedBooks() {}
  async saveBook(userId) {}
  async deleteBook(userId) {}
  async deleteUser(userId) {}
  // async deleteAllBooks(userId) {}
}
