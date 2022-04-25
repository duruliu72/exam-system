const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validateQuestionChild } = require("../models/questionChild");
const {getCon} = require("../dbCon");
var url = require('url');
router.get('/',(req, res) => {
    const queryObj = url.parse(req.url, true).query;
    const question_id=queryObj.question_id;
    getCon().query("SELECT id,question_id,answer,answer_char,isRihgtAnswer FROM question_chld where question_id=? ORDER BY id DESC",[question_id],(err, questionChilds)=>{
        if (err) throw err;
        res.send(questionChilds);
    });
});
router.post("/", (req, res) => {
    const { error } = validateQuestionChild(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let question_id = req.body.question_id;
    let answer = req.body.answer;
    let answer_char = req.body.answer_char;
    let isRihgtAnswer = req.body.isRihgtAnswer;
    var sql = "INSERT INTO question_chld (question_id,answer,answer_char,isRihgtAnswer) VALUES (?,?,?,?)";
    getCon().query(sql,[question_id,answer,answer_char,isRihgtAnswer],function(err, result){
        if (err) throw err;
        getCon().query("SELECT * FROM question_chld WHERE id=?",[result.insertId], function (err, result, fields) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","question_id", "answer","answer_char","isRihgtAnswer"]));
        });
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validateQuestionChild(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let question_child_id=req.params.id;
    let question_id = req.body.question_id;
    let answer = req.body.answer;
    let answer_char = req.body.answer_char;
    let isRihgtAnswer = req.body.isRihgtAnswer;
    let findSql='SELECT * FROM question_chld WHERE id = ?';
    getCon().query(findSql,[question_child_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question chld with the given ID was not found.');
        } 
        getCon().query("UPDATE question_chld SET answer = ?,answer_char=?,isRihgtAnswer=? WHERE id = ?",[answer,answer_char,isRihgtAnswer,question_child_id],function (err, result) {
            if (err) throw err;
            getCon().query("SELECT * FROM question_chld WHERE id=?",[question_child_id], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id","question_id", "answer","answer_char","isRihgtAnswer"]));
            });
        });
    
    })
  });
  router.delete('/:id', async (req, res) => {
    let question_child_id=req.params.id;
    let findSql='SELECT * FROM question_chld WHERE id = ?';
    getCon().query(findSql,[question_child_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question chld with the given ID was not found.');
        }
        getCon().query("DELETE FROM question_chld WHERE id = ?",[question_child_id],function(err, delres) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","question_id", "answer","answer_char","isRihgtAnswer"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let question_child_id=req.params.id;
    let findSql='SELECT * FROM question_chld WHERE id = ?';
    getCon().query(findSql,[question_child_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question chld with the given ID was not found.');
        }
        return res.send(_.pick(result[0], ["id","question_id", "answer","answer_char","isRihgtAnswer"]));
    })
  });  
module.exports = router;