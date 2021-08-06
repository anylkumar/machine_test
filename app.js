const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const methodOverride = require('method-override');
const Condidate = require('./models/condidate');
const Testscore = require('./models/testscore');

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/condidateDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.get('/', (req, res) => {
    res.render('condidates/home')
})

// condidate routes
app.get('/condidates', async (req, res) => {
    const condidates = await Condidate.find({})
    res.render('condidates/index', { condidates })
})

app.get('/condidates/new', (req, res) => {
    res.render('condidates/new')
});

app.get('/condidates/:id/testscore/add', async (req, res) => {
    const { id } = req.params;
    const condidate = await Condidate.findById(id);
    res.render('testscore/add', { id, condidate })
})

app.post('/condidates', async (req, res) => {
    const newCondidate = new Condidate({
        username: req.body.username,
        email: req.body.email
    })
    await newCondidate.save()
    res.redirect(`/condidates/${newCondidate._id}`)
})

app.get('/condidates/highestScorers', async (req, res) => {
    const allScores = await Testscore.find({ "total": { "$gt": 18 } }).populate('condidate')
    res.render('condidates/highestscore', { allScores })
})

app.get('/condidates/avgScore', async (req, res) => {
    const scores = await Testscore.find({})
    res.render('condidates/avgScore', { scores })
})



app.post('/condidates/:id/testscores', async (req, res) => {
    const { id } = req.params;
    const condidate = await Condidate.findById(id);
    const { test_score1, test_score2, test_score3 } = req.body;
    const total = parseInt(test_score1) + parseInt(test_score2) + parseInt(test_score3)
    const testscore = new Testscore({ test_score1, test_score2, test_score3, total })
    condidate.testscores.push(testscore);
    testscore.condidate = condidate;
    await condidate.save()
    await testscore.save()
    res.redirect(`/condidates/${id}`)
})


app.get('/condidates/:id', async (req, res) => {
    const { id } = req.params;
    const condidate = await Condidate.findById(id).populate('testscores');
    const lenValue = condidate.testscores.length
    res.render('condidates/details', { condidate, lenValue })
});

app.get('*', (req, res) => {
    res.send("404! Page not found!")
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})





// test score routes
// app.get('/testscores', async (req, res) => {
//     const testscores = await Testscore.find({})
//     res.render('testscore/show', { testscores })
// });

// app.get('/addscore', (req, res) => {
//     res.render('testscore/score')
// });

// app.post('/testscore', async (req, res) => {
//     const newScore = new Testscore({
//         test_score1: req.body.test_score1,
//         test_score2: req.body.test_score2,
//         test_score3: req.body.test_score3,
//     })
//     await newScore.save()
//     res.redirect('/testscores')
// })

// app.get('/testscores/:id', async (req, res) => {
//     const { id } = req.params;
//     const testscore = await Testscore.findById(id);
//     res.render('testscore/show', { testscore })
// });