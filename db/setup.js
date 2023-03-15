const mysql = require('mysql2/promise');

// Utility class to interact with local database
class DatabaseSetup {
    constructor(DB_NAME) {
        this.connection = null;
        this.DB_NAME = DB_NAME
    }
    
    // Initialize the database and setup/populate tables
    async init(host, user, password) {
        await this.connect(host, user, password);
        await this.setupDB();
    }

    async connect(host, user, password, database) {
        this.connection = await mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: ''
        });
    }

    async setupDB() {
        await this.connection.query(
            `CREATE DATABASE IF NOT EXISTS ${this.DB_NAME};`
        );
        await this.connection.query(
            `USE ${this.DB_NAME};`
        );
    }
}

module.exports = DatabaseSetup