const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validateQuestionChild } = require("../models/questionChild");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,question_id,answer,serial_no,isRihgtAnswer FROM question_chld ORDER BY id DESC",(err, questionChilds)=>{
        if (err) throw err;
        res.send(questionChilds);
    });
});
router.post("/", (req, res) => {
    const { error } = validateQuestionChild(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let question_id = req.body.question_id;
    let answer = req.body.answer;
    let serial_no = req.body.serial_no;
    let isRihgtAnswer = req.body.isRihgtAnswer;
    var sql = "INSERT INTO question_chld (question_id,answer,serial_no,isRihgtAnswer) VALUES (?,?,?,?)";
    getCon().query(sql,[question_id,answer,serial_no,isRihgtAnswer],function(err, result){
        if (err) throw err;
        getCon().query("SELECT * FROM question_chld WHERE id=?",[result.insertId], function (err, result, fields) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","question_id", "answer","serial_no","isRihgtAnswer"]));
        });
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validateQuestionChild(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let question_child_id=req.params.id;
    let question_id = req.body.question_id;
    let answer = req.body.answer;
    let serial_no = req.body.serial_no;
    let isRihgtAnswer = req.body.isRihgtAnswer;
    let findSql='SELECT * FROM question_chld WHERE id = ?';
    getCon().query(findSql,[question_child_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question chld with the given ID was not found.');
        } 
        getCon().query("UPDATE question_chld SET question_id = ? ,answer = ?,isRihgtAnswer=? WHERE id = ?",[question_id,answer,isRihgtAnswer,question_child_id],function (err, result) {
            if (err) throw err;
            getCon().query("SELECT * FROM question_chld WHERE id=?",[question_child_id], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id","question_id", "answer","serial_no","isRihgtAnswer"]));
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
            return res.send(_.pick(result[0], ["id","question_id", "answer","serial_no","isRihgtAnswer"]));
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
        return res.send(_.pick(result[0], ["id","question_id", "answer","serial_no","isRihgtAnswer"]));
    })
  });  
module.exports = router;