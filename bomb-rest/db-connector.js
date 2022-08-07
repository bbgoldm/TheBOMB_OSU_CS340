import mysql from 'mysql';

// Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'classmysql.engr.oregonstate.edu',
//     user            : 'cs340_townerc',
//     password        : 'HIDDEN',
//     database        : 'cs340_townerc'
// })

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-06.cleardb.net',
    user            : 'b7921d2176c042',
    password        : 'HIDDEN',
    database        : 'heroku_92a67d62f28d117',
    multipleStatements: true
})

// Export it for use in our application
// module.exports.pool = pool;
export { pool };

// CLEARDB_DATABASE_URL
// mysql://b7921d2176c042:a101d992@us-cdbr-east-06.cleardb.net/heroku_92a67d62f28d117?reconnect=true
