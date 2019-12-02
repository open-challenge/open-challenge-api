'use strict';
const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment');
const ChallengesSchema = new mongoose.Schema({
    code: String,
    anotations: String,
    datasets:[Object],
    auth: {
        edition: {
            type: String,
            default: shortid.generate

        },
        solve: {
            type: String,
            default: shortid.generate
        },
        ttl: {
            type: Date,
            default: moment().add('1', 'day').toDate()
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Challenges', ChallengesSchema);
