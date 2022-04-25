const mysqli = require('mysql');
var connection=null;
function setCon(){
    connection=mysqli.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"exam_sys",
    });
    connection.connect(function(err){
        if(err) throw err;
        console.log("DB Connected")
    });
}
function getCon(){
    console.log("DB Connected")
    return connection;
}
module.exports.setCon= setCon;
module.exports.getCon= getCon;