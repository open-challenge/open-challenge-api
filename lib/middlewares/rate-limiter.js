'use strict';

const rateLimit = require('express-rate-limit');
const MAX_RATE_IP = process.env.MAX_RATE_IP;

const createLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: MAX_RATE_IP,
    message: {
        message: 'Too many requests, please try again later.',
        name: 'manyChallengeCreated'
    }
});

module.exports = createLimiter;
