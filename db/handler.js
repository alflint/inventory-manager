const seedAll = require("../seeds/index")

class DatabaseHandler {
    constructor() {
        this.host = process.env.DB_HOST
        this.user = process.env.DB_USER
        this.password = process.env.DB_PASSWORD
        this.database = process.env.DB_NAME
    }

    async init() {
        const db_setup = require("./setup")
        var db = new db_setup(this.database)
        await db.init(this.host, this.user, this.password);
        await seedAll()
    }
}

module.exports = DatabaseHandler