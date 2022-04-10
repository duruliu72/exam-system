const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validateCandidateAnswer } = require("../models/candidateAnswer");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,question_bank_id,question_id,question_child_id,serial_no,candidate_id FROM candidate_answer ORDER BY id DESC",(err, questionChilds)=>{
        if (err) throw err;
        res.send(questionChilds);
    });
});
router.post("/", (req, res) => {
    const { error } = validateCandidateAnswer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let question_bank_id = req.body.question_bank_id;
    let question_id = req.body.question_id;
    let question_child_id = req.body.question_child_id;
    let serial_no = req.body.serial_no;
    let candidate_id = req.body.candidate_id;
    var sql = "INSERT INTO candidate_answer (question_bank_id,question_id,question_child_id,serial_no,candidate_id) VALUES (?,?,?,?,?)";
    getCon().query(sql,[question_bank_id,question_id,question_child_id,serial_no,candidate_id],function(err, result){
        if (err) throw err;
        getCon().query("SELECT * FROM candidate_answer WHERE id=?",[result.insertId], function (err, result, fields) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","question_bank_id","question_id", "question_child_id","serial_no","candidate_id"]));
        });
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validateCandidateAnswer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let candidate_answer_id =req.params.id;
    let question_bank_id = req.body.question_bank_id;
    let question_id = req.body.question_id;
    let question_child_id = req.body.question_child_id;
    let serial_no = req.body.serial_no;
    let candidate_id = req.body.candidate_id;
    let findSql='SELECT * FROM candidate_answer WHERE id = ?';
    getCon().query(findSql,[candidate_answer_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The candidate answer with the given ID was not found.');
        } 
        getCon().query("UPDATE candidate_answer SET question_bank_id =? ,question_id = ? ,question_child_id = ? WHERE id = ?",[question_bank_id,question_id,question_child_id,candidate_answer_id],function (err, result) {
            if (err) throw err;
            getCon().query("SELECT * FROM candidate_answer WHERE id=?",[candidate_answer_id], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id","question_bank_id","question_id", "question_child_id","serial_no","candidate_id"]));
            });
        });
    
    })
  });
  router.delete('/:id', async (req, res) => {
    let question_child_id=req.params.id;
    let findSql='SELECT * FROM candidate_answer WHERE id = ?';
    getCon().query(findSql,[question_child_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The candidate answer with the given ID was not found.');
        }
        getCon().query("DELETE FROM candidate_answer WHERE id = ?",[question_child_id],function(err, delres) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","question_bank_id","question_id", "question_child_id","serial_no","candidate_id"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let question_child_id=req.params.id;
    let findSql='SELECT * FROM candidate_answer WHERE id = ?';
    getCon().query(findSql,[question_child_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The candidate answer with the given ID was not found.');
        }
        return res.send(_.pick(result[0], ["id","question_bank_id","question_id", "question_child_id","serial_no","candidate_id"]));
    })
  });  
module.exports = router;