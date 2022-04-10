const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validateQuestionBank } = require("../models/questionBank");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,take_duration,examine_id FROM question_bank ORDER BY id DESC",(err, questionBanks)=>{
        if (err) throw err;
        res.send(questionBanks);
    });
});
router.post("/", (req, res) => {
    const { error } = validateQuestionBank(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let take_duration = req.body.take_duration;
    let examine_id = req.body.examine_id;
    let createdAt=new Date();
    var sql = "INSERT INTO question_bank (take_duration,examine_id,createdAt) VALUES (?,?,?)";
    getCon().query(sql,[take_duration,examine_id,createdAt],function(err, result){
        if (err) throw err;
        getCon().query("SELECT * FROM question_bank WHERE id=?",[result.insertId], function (err, result, fields) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","take_duration","examine_id"]));
        });
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validateQuestionBank(req.body); 
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
                return res.send(_.pick(result[0], ["id","take_duration","examine_id"]));
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
            return res.send(_.pick(result[0], ["id","take_duration","examine_id"]));
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
        return res.send(_.pick(result[0], ["id","take_duration","examine_id"]));
    })
  });  
module.exports = router;