'use strict';
const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment');
const BASE_CODE = `
function test(args) {
    //complete this function
    console.log(args);
    return args;
}
`;

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
    if (this.isNew && !this.code) {
        this.code = BASE_CODE;
    }
});

module.exports = mongoose.model('Challenges', ChallengesSchema);
