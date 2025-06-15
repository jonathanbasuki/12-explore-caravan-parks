const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Throttling atau delay setelah 3 permintaan
exports.loginThrottle = slowDown({
    windowMs: 15 * 60 * 1000, // 15 menit
    delayAfter: 3,            // setelah 3 request
    delayMs: () => 5000,      // delay 5 detik setiap request setelah itu
});

// Limit setelah 5 kali percobaan gagal
exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        message: 'Too many login attempts, please try again later.',
    },
    skipSuccessfulRequests: true,
});
