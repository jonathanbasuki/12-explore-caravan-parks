const express = require('express');
const router = express.Router();

const db = require('../config/db.conf');

// CREATE booking (POST)
router.post('/bookings', (req, res) => {
    const { booking_id, user_id, check_in, check_out } = req.body;

    const sql = `INSERT INTO bookings (booking_id, user_id, check_in, check_out) VALUES (?, ?, ?, ?)`;

    db.query(sql, [booking_id, user_id, check_in, check_out], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(201).send({
            booking_id: booking_id, user_id: user_id, check_in: check_in, check_out: check_out
        });
    });
});

// GET all bookings (GET)
router.get('/bookings', (req, res) => {
    const sql = `SELECT * FROM bookings`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(200).send(results);
    });
});

// GET specific booking (GET)
router.get('/bookings/:booking_id', (req, res) => {
    const sql = `SELECT * FROM bookings WHERE booking_id = ?`;

    db.query(sql, [req.params.booking_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'booking info not found' });
        }

        res.status(200).send(result[0]);
    });
});

// UPDATE booking by booking_id (PUT)
router.put('/bookings/:booking_id', (req, res) => {
    const { check_in, check_out, status } = req.body;
    const sql = `UPDATE bookings SET check_in = ?, check_out = ?, status = ? WHERE booking_id = ?`;

    db.query(sql, [check_in, check_out, status, req.params.booking_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'booking info not found' });
        }

        res.status(200).send({
            check_in: check_in, check_out: check_out, status: status
        });
    });
});

// SOFT DELETE booking by booking_id (PUT)
router.put('/bookings/:booking_id/delete', (req, res) => {
    const { deleted_at } = req.body;
    const sql = `UPDATE bookings SET deleted_at = ? WHERE booking_id = ?`;

    db.query(sql, [deleted_at, req.params.booking_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'booking info not found' });
        }

        res.status(200).send({
            deleted_at: deleted_at,
            message: 'booking info deleted successfully'
        });
    });
});

module.exports = router;