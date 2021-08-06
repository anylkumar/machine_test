const mongoose = require('mongoose');
const Condidate = require('./models/condidate');

mongoose.connect('mongodb://localhost:27017/condidateDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const seedCondidates = [
    {
        username: 'TOM',
        email: 'tom@gmail.com'
    },
    {
        username: 'JERRY',
        email: 'jerry@gmail.com'
    },
    {
        username: 'BROWNY',
        email: 'browny@gmail.com'
    }
]


Condidate.insertMany(seedCondidates)
    .then(res => {
        console.log(res)
    })
    .catch(res => {
        console.log(err)
    })