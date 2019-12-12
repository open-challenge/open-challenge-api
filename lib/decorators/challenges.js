'use strict';

function decorator(controller) {
    controller.request('put get', function(req, res) {
        res.status(401).json({
            'message': 'not_allowed.',
            'name': 'notAllowed'
        });
        return;
    });
}
module.exports = decorator;
