const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soa_explore_caravan_parks'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// CREATE user (POST)
router.post('/users', (req, res) => {
    const { user_id, username, email, password_hash } = req.body;

    const sql = `INSERT INTO users (user_id, username, email, password_hash) VALUES (?, ?, ?, ?)`;

    db.query(sql, [user_id, username, email, password_hash], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(201).send({
            user_id: user_id, username: username, email: email, password_hash: password_hash
        });
    });
});

// GET all user (GET)
router.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(200).send(results);
    });
});

// GET specific user (GET)
router.get('/users/:user_id', (req, res) => {
    const sql = `SELECT * FROM users WHERE user_id = ?`;

    db.query(sql, [req.params.user_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'users not found' });
        }

        res.status(200).send(result[0]);
    });
});

// UPDATE user by user_id (PUT)
router.put('/users/:user_id', (req, res) => {
    const { username, email, password_hash } = req.body;
    const sql = `UPDATE users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?`;

    db.query(sql, [username, email, password_hash, req.params.user_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'users not found' });
        }

        res.status(200).send({
            username: username, email: email, password_hash: password_hash
        });
    });
});

// DELETE user by NIM (DELETE)
router.delete('/users/:user_id', (req, res) => {
    const sql = `DELETE FROM users WHERE user_id = ?`;
    db.query(sql, [req.params.user_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'users not found' });
        }

        res.status(200).send({ message: 'users deleted successfully' });
    });
});

module.exports = router;