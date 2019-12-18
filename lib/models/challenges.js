'use strict';
const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment');
const ChallengesSchema = new mongoose.Schema({
    code: String,
    anotations: String,
    datasets:[
        {
            expected: String,
            dataset:Object
        }
    ],
    auth: {
        edition: {
            type: String,
            default: shortid.generate,
            immutable: true
        },
        solve: {
            type: String,
            default: shortid.generate,
            immutable: true
        },
        ttl: {
            type: Date,
            default: moment().add('1', 'day').toDate(),
            immutable: true
        }
    }
}, {
    timestamps: true
});

ChallengesSchema.pre('save', function() {
    if (this.isNew && this.code === '') {
        this.code = 'function test(args) { console.log(args); }';
    }
});

module.exports = mongoose.model('Challenges', ChallengesSchema);
