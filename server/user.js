const mysql = require('mysql2');

const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Datuna20033.',
    database: 'projectusers'
});

const username = 'David';
const password = 'Datuna';
const email = 'tavartkiladze@gmail.com'
connection.query(
    'SELECT * FROM users WHERE username = ? and password = ? and email = ?',
    [username, password, email], 
    (err, results) => {
        console.log(err);
        console.log(results)
    }
);