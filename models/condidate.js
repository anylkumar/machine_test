const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CondidateSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    testscores: [{
        type: Schema.Types.ObjectId,
        ref: 'Testscore'
    }]

})

module.exports = mongoose.model('Condidate', CondidateSchema);