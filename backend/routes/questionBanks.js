const express = require('express');
const router=express.Router();
const _ = require('lodash');
const {validateQuestionBank } = require("../models/questionBank");
const auth = require('../middleware/auth');
const {getCon} = require("../dbCon");
router.get('/',[auth],(req, res) => {
    getCon().query("SELECT id,name,created_by FROM question_bank where created_by=? ORDER BY id DESC",[req.user.id],(err, questionBanks)=>{
        if (err) throw err;
        res.send(questionBanks);
    });
});
router.get('/candidatestest', async (req, res) => {
    let findSql=`SELECT question_bank.id,question_bank.name,users.id AS userid,users.name AS creator FROM question_bank
    INNER JOIN users ON question_bank.created_by=users.id where users.role=2`;
    getCon().query(findSql,function (err, questionBanks) {
        if (err) throw err;
        questionBanks.forEach((item,i) => {
            getCon().query("SELECT * FROM question_paper WHERE question_bank_id=?",[item.id],(err,questionpapers) => {
                questionBanks[i].questionpapers=questionpapers;
                questionpapers.forEach((paperitem,i)=>{
                    getCon().query("SELECT * FROM",[paperitem.id],(err,questions)=>{

                    })
                });
            });
        });
        return res.send(questionBanks);
    })
}); 
router.post("/",[auth], (req, res) => {
    const { error } = validateQuestionBank(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let name = req.body.name;
    let created_by = req.user.id;
    let created_at=new Date();
    var sql = "INSERT INTO question_bank (name,created_by,created_at) VALUES (?,?,?)";
    getCon().query(sql,[name,created_by,created_at],function(err, result){
        if (err) throw err;
        getCon().query("SELECT * FROM question_bank WHERE id=?",[result.insertId], function (err, result, fields) {
            if (err) throw err;
            return res.send(_.pick(result[0], ["id","name","created_by"]));
        });
    })
})
router.put('/:id', [auth], (req, res) => {
    const { error } = validateQuestionBank(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let question_bank_id=req.params.id;
    let name = req.body.name;
    let created_by = req.user.id;
    let findSql='SELECT * FROM question_bank WHERE id = ?';
    getCon().query(findSql,[question_bank_id],function (err, result) {
        if (err) throw err;
        if(result.length == 0){
            return res.status(404).send('The question bank with the given ID was not found.');
        }
        getCon().query("UPDATE question_bank SET name = ? WHERE id = ?",[name,question_bank_id],function (err, result) {
            if (err) throw err;
            getCon().query("SELECT * FROM question_bank WHERE id=?",[question_bank_id], function (err, result, fields) {
                if (err) throw err;
                return res.send(_.pick(result[0], ["id","name","created_by"]));
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
            return res.send(_.pick(result[0], ["id","name","created_by"]));
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
        return res.send(_.pick(result[0], ["id","name","created_by"]));
    })
  });  
  
module.exports = router;