const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validateQuestionPaper } = require("../models/questionPaper");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,take_duration,created_by FROM question_bank ORDER BY id DESC",(err, questionBanks)=>{
        if (err) throw err;
        res.send(questionBanks);
    });
});
router.post("/", (req, res) => {
    const { error } = validateQuestionPaper(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let question_bank_id = req.body.question_bank_id;
    let name = req.body.name;
    let duration = req.body.duration;
    let created_by = req.body.created_by;
    let created_at=new Date();
    var sql = "INSERT INTO question_paper (question_bank_id,name,duration,created_by,created_at) VALUES (?,?,?,?,?)";
    getCon().query(sql,[question_bank_id,name,duration,created_by,created_at],function(err, result){
        if (err) throw err;
        getCon().query("SELECT * FROM question_paper WHERE id=?",[result.insertId], function (err, result, fields) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","question_bank_id","name","duration","created_by"]));
        });
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validateQuestionPaper(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let question_bank_id=req.params.id;
    let take_duration = req.body.take_duration;
    let findSql='SELECT * FROM question_bank WHERE id = ?';
    getCon().query(findSql,[question_bank_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question bank with the given ID was not found.');
        }
        getCon().query("UPDATE question_bank SET take_duration = ? WHERE id = ?",[take_duration,question_bank_id],function (err, result) {
            if (err) throw err;
            getCon().query("SELECT * FROM question_bank WHERE id=?",[question_bank_id], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id","take_duration","created_by"]));
            });
        });       
    })
  });
  router.delete('/:id', async (req, res) => {
    let question_bank_id=req.params.id;
    let findSql='SELECT * FROM question_bank WHERE id = ?';
    getCon().query(findSql,[question_bank_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question bank with the given ID was not found.');
        }
        getCon().query("DELETE FROM question_bank WHERE id = ?",[question_bank_id],function(err, delres) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","take_duration","created_by"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let question_bank_id=req.params.id;
    let findSql='SELECT * FROM question_bank WHERE id = ?';
    getCon().query(findSql,[question_bank_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question bank with the given ID was not found.');
        }
        return res.send(_.pick(result[0], ["id","take_duration","created_by"]));
    })
  });  
module.exports = router;