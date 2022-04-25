const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validateQuestionPaper } = require("../models/questionPaper");
const {getCon} = require("../dbCon");;
var url = require('url');
router.get('/',(req, res) => {
    const queryObj = url.parse(req.url, true).query;
    const question_bank_id=queryObj.question_bank_id;
    getCon().query("SELECT id,question_bank_id,name,duration,created_by FROM question_paper where question_bank_id=? ORDER BY id DESC",[question_bank_id],(err, questionBanks)=>{
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
    let question_paper_id=req.params.id;
    let question_bank_id=req.body.question_bank_id;
    let name = req.body.name;
    let duration = req.body.duration;
    let findSql='SELECT * FROM question_paper WHERE id = ?';
    getCon().query(findSql,[question_paper_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question paper with the given ID was not found.');
        }
        getCon().query("UPDATE question_paper SET name = ? ,duration=? WHERE id = ? && question_bank_id = ?",[name,duration,question_paper_id,question_bank_id],function (err, result) {
            if (err) throw err;
            getCon().query("SELECT * FROM question_paper WHERE id=? && question_bank_id = ?",[question_paper_id,question_bank_id], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id","question_bank_id","name","duration","created_by"]));
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
            return res.send(_.pick(result[0], ["id","question_bank_id","name","duration","created_by"]));
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
        return res.send(_.pick(result[0], ["id","question_bank_id","name","duration","created_by"]));
    })
  });  
module.exports = router;