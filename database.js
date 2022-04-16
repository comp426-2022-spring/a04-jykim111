// Require better-sqlite3
const database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const logdb = new database('log.db');

// Create/Initialize database
const statement = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`);

// Return an object that represents the first row retrieved by query.
const row = statement.get();

// Check if there is a table. If row is undefined, then no table exists.
if (row == undefined) {
    // Displaying what will be happening in the console if table is undefined.
    console.log('Log database appears to be empty. Initializing a log database.');

    // Set a const that will contain SQL commands to initialize the database.
    const sqlInit =
        `
            CREATE TABLE accesslog (
                id INTEGER PRIMARY KEY,
                remoteaddr VARCHAR,
                remoteuser VARCHAR,
                time VARCHAR,
                method VARCHAR,
                url VARCHAR,
                protocol VARCHAR,
                httpversion VARCHAR,
                status VARCHAR,
                referer VARCHAR,
                useragent VARCHAR

            );
        `


    // Execute SQL command above
    logdb.exec(sqlInit);

} else {
    // If database exists, console log.
    console.log("Log database exists.");
}

// Export database connection.
module.exports = logdb;