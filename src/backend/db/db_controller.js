export class DatabaseController {
  constructor(dbPool) {
    if (!dbPool) {
      throw Error("Null or undefined argument in DB controller construction");
    }
    this.db = dbPool;
  }

  async getUser(username, password) {
    return await this.db.query(
      "SELECT id FROM users WHERE username = hash_string($1) AND password = hash_string($2)",
      [username, password],
    );
  }

  async getUserBooks(userid, password) {
    return await this.db.query(
      "SELECT ce.book_id FROM collection_entry ce LEFT JOIN users u ON collection_id = ce.collection_id WHERE ce.collection_id = $1 AND u.password = hash_string($2) ",
      [userid, password],
    );
  }

  async appendBook(userid, password, bookid) {
    const client = await this.db.connect();
    let response;
    try {
      response = client.query("CALL append_book($1, $2, $3)", [
        userid,
        password,
        bookid,
      ]);
    } finally {
      client.release;
    }
    return response;
  }

  async addUser(username, password) {
    return await this.db.query(
      "INSERT INTO users (username, password) values (hash_string($1), hash_string($2)) RETURNING id",
      [username, password],
    );
  }

  async deleteUser(userid, username, password) {
    return await this.db.query(
      "DELETE FROM users WHERE id = $1 AND username = hash_string($2) AND password = hash_string($3)",
      [userid, username, password],
    );
  }

  async deleteBook(userid, password, bookid) {
    const client = await this.db.connect();
    let response;
    try {
      response = client.query("CALL remove_book($1, $2, $3)", [
        userid,
        password,
        bookid,
      ]);
    } finally {
      client.release;
    }
    return response;
  }
}
