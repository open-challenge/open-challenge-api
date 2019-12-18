'use strict';

const rateLimit = require('express-rate-limit');

const createChallengeLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        message: 'Too many requests, please try again later.',
        name: 'manyChallengeCreated'
    }
});

module.exports = createChallengeLimiter;
