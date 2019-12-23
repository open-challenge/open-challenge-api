'use strict';

const rateLimiter = require('../middlewares/rate-limiter');

function decorator(controller) {
    controller.request('put get', function(req, res) {
        res.status(401).json({
            'message': 'not_allowed.',
            'name': 'notAllowed'
        });
        return;
    });

    controller.request('post', rateLimiter);

}
module.exports = decorator;
