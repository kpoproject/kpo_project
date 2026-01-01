export class LoginManager {
  constructor(dbManager) {
    if (!dbManager) {
      throw Error("Null or undefind arg in Login Manager construction");
    }
    this.db = dbManager;
  }

  async login(username, password) {
    let dbResponse = await this.db.getUser(username, password);
    return dbResponse.rows ? dbResponse.rows[0].id : undefined;
  }

  async register(username, password) {
    let dbResponse = await this.db.addUser(username, password);
    return dbResponse.rows ? dbResponse.rows[0].id : undefined;
  }

  async deleteUser(userid, username, password) {
    let response = await this.db.deleteUser(userid, username, password);
    return true;
  }
}
