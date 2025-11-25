export class DatabaseController {
  constructor(dbPool) {
    if (!dbPool) {
      throw Error("Null or undefined argument in DB controller construction");
    }
    this.db = dbPool;
  }

  async validateUser({ username, password }) {
    return await this.db.query(
      "SELECT true as present FROM users WHERE username = $1 AND password = $2",
      [username, password],
    );
  }
  async getUser({ username, password }) {
    return await this.db.query(
      "SELECT id FROM users WHERE username = $1 AND password = $2",
      [username, password],
    );
  }

  async getUserBooks(userId) {
    return await this.db.query(
      "SELECT ce.book_id FROM collection_entry ce WHERE ce.collection_id = $1",
      [userId],
    );
  }

  async appendBook(userId, bookId) {
    const client = await this.db.connect();
    let response;
    try {
      response = client.query("CALL append_book($1, $2)", [userId, bookId]);
    } finally {
      client.release;
    }
    return response;
  }

  async addUser({ username, password }) {
    return await this.db.query(
      "INSERT INTO users (username, password) values ($1, $2) RETURNING id",
      [username, password],
    );
  }
  async deleteUser(userId) {
    return await this.db.query("DELETE FROM users WHERE id = $1", [userId]);
  }

  async deleteBook(userId, bookId) {
    const client = await this.db.connect();
    let response;
    try {
      response = client.query("CALL remove_book($1, $2)", [userId, bookId]);
    } finally {
      client.release;
    }
    return response;
  }
}
