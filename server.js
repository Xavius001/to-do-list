const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Create a database (or connect to an existing one)
const db = new sqlite3.Database('./users.db');

// Create a users table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )
`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (row) {
            res.status(400).send('Username is already taken. Please choose another.');
        } else {
            // Insert the user into the database
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], err => {
                if (err) {
                    console.error(err.message);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                res.status(201).send('Signup successful! You can now login.');
            });
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password is correct
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (row) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Invalid username or password. Please try again.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
