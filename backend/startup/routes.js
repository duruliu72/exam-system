const express = require('express');
var cors = require("cors");
const users = require('../routes/users');
const auth = require('../routes/auth');
const questionBanks = require('../routes/questionBanks');
const questionPapers = require('../routes/questionPapers');
const questions = require('../routes/questions');
const questionChilds = require('../routes/questionChilds');
const candidateAnswers = require('../routes/candidateAnswers');
module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/questionbanks', questionBanks);
    app.use('/api/questionpapers', questionPapers);
    app.use('/api/questions', questions);
    app.use('/api/questionchilds', questionChilds);
    app.use('/api/candidateanswers', candidateAnswers);
}