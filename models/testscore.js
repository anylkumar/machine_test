const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestscoreSchema = new Schema({
    test_score1: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    test_score2: {
        type: Number,
        requires: true,
        min: 0,
        max: 10
    },
    test_score3: {
        type: Number,
        requires: true,
        min: 0,
        max: 10
    },
    total: {
        type: Number
    },
    condidate: {
        type: Schema.Types.ObjectId,
        ref: 'Condidate'
    }
})

module.exports = mongoose.model('Testscore', TestscoreSchema);