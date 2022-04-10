const express = require('express');
const router=express.Router();
const {getCon} = require("../dbCon");
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { generateAuthToken, validate } = require("../models/user");
router.get('/me', auth, async (req, res) => {
    let findUsersql='SELECT * FROM users WHERE id = ?';
    getCon().query(findUsersql,[req.user.id],(err, users) => {
        if (err) throw err;
        var user=_.pick(users[0], ["id", "name", "email"]);
        res.send(user);
    })
});
router.post("/",(req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    let createdAt=new Date();
    let findUsersql='SELECT * FROM users WHERE email = ?';
    getCon().query(findUsersql,[email],async(err, result) => {
        if (err) throw err;
        if(result.length > 0){
            return res.status(400).send("User already registered.");
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        var sql = "INSERT INTO users (name, email,password,role,createdAt) VALUES (?,?,?,?,?)";
        getCon().query(sql,[name,email,password,role,createdAt],function(err, result){
            if (err) throw err;
            getCon().query("SELECT * FROM users WHERE id=?",[result.insertId], function (err, users, fields) {
                if (err) throw err;
                var user=_.pick(users[0], ["id", "name", "email","role"]);
                const token=generateAuthToken(user);
                return res.header("x-auth-token", token)
                .header('Access-Control-Expose-Headers', 'x-auth-token')
                .send(user);
            });
        })
    });
})
module.exports =router;