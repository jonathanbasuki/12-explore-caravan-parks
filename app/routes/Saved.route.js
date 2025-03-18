const express = require('express');
const router = express.Router();

const db = require('../config/db.conf');

// CREATE save campsite (POST)
router.post('/saved', (req, res) => {
    const { saved_id, user_id, campsite_uri } = req.body;

    const sql = `INSERT INTO saved_campsites (saved_id, user_id, campsite_uri) VALUES (?, ?, ?)`;

    db.query(sql, [saved_id, user_id, campsite_uri], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(201).send({
            saved_id: saved_id, user_id: user_id, campsite_uri: campsite_uri
        });
    });
});

// GET all saved campsite (GET)
router.get('/saved', (req, res) => {
    const sql = `SELECT * FROM saved_campsites`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(200).send(results);
    });
});

// GET specific saved campsite (GET)
router.get('/saved/:saved_id', (req, res) => {
    const sql = `SELECT * FROM saved_campsites WHERE saved_id = ?`;

    db.query(sql, [req.params.saved_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'saved campsite not found' });
        }

        res.status(200).send(result[0]);
    });
});

// DELETE saved campsite by saved_id (DELETE)
router.delete('/saved/:saved_id', (req, res) => {
    const sql = `DELETE FROM saved_campsites WHERE saved_id = ?`;

    db.query(sql, [req.params.saved_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'saved campsite not found' });
        }

        res.status(200).send({ message: 'saved campsite deleted successfully' });
    });
});

module.exports = router;