'use strict';
const express = require('express');
const router = express.Router();
const {Challenges} = require('../models');
const moment = require('moment');

router.get('/c/:id', function(req, res, next) {
    const auth = req.params.id;
    return Challenges
        .findOne({$and:[
            {
                $or:[
                    {'auth.edition':auth},
                    {'auth.solve': auth}
                ]
            },
            {
                'auth.ttl':{$gt:moment().toDate()}
            }
        ]})
        .then((challenge) => {
            if(!challenge) {
                const error = new Error('not_found');
                error.status = 404;
                throw error;
            }
            const resp = challenge.toJSON();
            resp.mode = 'edition';
            if(auth === challenge.auth.solve) {
                resp.mode = 'solve';
                Reflect.deleteProperty(resp, 'auth');
            }
            return res.json(resp);
        })
        .catch(next);
});

router.put('/c/:id', function(req, res, next) {
    const auth = req.params.id;
    const {code, exercise} = req.body;
    return Challenges
        .findOne({$or:[{'auth.edition':auth}, {'auth.solve': auth}]})
        .then((challenge) => {
            const resp = challenge.toJSON();
            Reflect.deleteProperty(resp, 'auth');
            if(auth === challenge.auth.edition && exercise) {
                challenge.exercise = exercise;
            }
            challenge.code = code;
            return challenge.save()
                .then(() => {
                    const currentChallenge = challenge.toJSON();
                    Reflect.deleteProperty(currentChallenge, 'auth');
                    return res.json(currentChallenge);
                });
        })
        .catch(next);
});

module.exports = router;
