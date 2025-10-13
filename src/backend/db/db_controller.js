export class DatabaseController {
  constructor(dbPool) {
    if (!dbPool) {
      throw Error("Null or undefined argument in DB controller construction");
    }
    this.db = dbPool;
  }

  async getUser(authorization_token) {
    // return await this.db.query('SELECT * FROM');
    return {};
  }

  async getUserBooks(userId) {
    return {};
  }

  async appendBook(userId) {
    // if (error) {
    //   throw Error("Error appending new book to user's libraty");
    // }
  }

  async addUser(authorization_token) {
    // if (error) {
    //   throw Error("Error adding new user");
    // }
  }
  async deleteUser(userId) {}

  async deleteBook(bookEntry) {}
  // async deleteAllBooks() {}
}
