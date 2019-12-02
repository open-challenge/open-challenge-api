'use strict';
const {Challenges} = require('../models');
function decorator(controller) {
    controller.request('put', function(req, res, next) {
        if (!req.params.id) {
            res.status(401).json({
                'message': 'not_allowed.',
                'name': 'notAllowed'
            });
            return;
        }
        Challenges
            .findOne({
                'auth.edition':req.params.id,
                'auth.ttl': {$gt: new Date()}
            })
            .select('_id')
            .then((challenge) => {
                if(!challenge) {
                    const err = new Error('not_found');
                    err.status = 404;
                }
                req.params.id = challenge._id;
                return next();
            })
            .catch((error) => {
                res.status(error.status || 400).json({
                    'message': error.message,
                    'name': 'updateError'
                });
            });
    });
}
module.exports = decorator;
