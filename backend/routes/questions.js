const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validateQuestion } = require("../models/question");
const {getCon} = require("../dbCon");
router.get('/',(req, res) => {
    getCon().query("SELECT id,question_bank_id,question_name,answer_take_time,question_type FROM question_mst ORDER BY id DESC",(err, questions)=>{
        if (err) throw err;
        res.send(questions);
    });
});
router.post("/", (req, res) => {
    const { error } = validateQuestion(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let question_bank_id = req.body.question_bank_id;
    let question_name = req.body.question_name;
    let answer_take_time = req.body.answer_take_time;
    let question_type = req.body.question_type;
    let createdAt=new Date();
    var sql = "INSERT INTO question_mst (question_bank_id,question_name,answer_take_time,question_type,createdAt) VALUES (?,?,?,?,?)";
    getCon().query(sql,[question_bank_id,question_name,answer_take_time,question_type,createdAt],function(err, result){
        if (err) throw err;
        getCon().query("SELECT * FROM question_mst WHERE id=?",[result.insertId], function (err, result, fields) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id", "question_bank_id","question_name","answer_take_time","question_type"]));
        });
    })
})
router.put('/:id', async (req, res) => {
    const { error } = validateQuestion(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let question_id=req.params.id;
    let question_bank_id = req.body.question_bank_id;
    let question_name = req.body.question_name;
    let answer_take_time = req.body.answer_take_time;
    let question_type = req.body.question_type;
    let findSql='SELECT * FROM question_mst WHERE id = ?';
    getCon().query(findSql,[question_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The queston with the given ID was not found.');
        } 
        getCon().query("UPDATE question_mst SET question_bank_id = ? ,question_name = ?,answer_take_time=?,question_type=? WHERE id = ?",[question_bank_id,question_name,answer_take_time,question_type,question_id],function (err, result) {
            if (err) throw err;
            getCon().query("SELECT * FROM question_mst WHERE id=?",[question_id], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id", "question_bank_id","question_name","answer_take_time","question_type"]));
            });
        });
    
    })
  });
  router.delete('/:id', async (req, res) => {
    let question_id=req.params.id;
    let findSql='SELECT * FROM question_mst WHERE id = ?';
    getCon().query(findSql,[question_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question with the given ID was not found.');
        }
        getCon().query("DELETE FROM question_mst WHERE id = ?",[question_id],function(err, delres) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id", "question_bank_id","question_name","answer_take_time","question_type"]));
        })
    })
  });
  router.get('/:id', async (req, res) => {
    let question_id=req.params.id;
    let findSql='SELECT * FROM question_mst WHERE id = ?';
    getCon().query(findSql,[question_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question with the given ID was not found.');
        }
        return res.send(_.pick(result[0], ["id", "question_bank_id","question_name","answer_take_time","question_type"]));
    })
  });  
module.exports = router;