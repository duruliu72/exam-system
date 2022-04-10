const express = require('express');
const app=express();

const {setCon}=require("./dbCon")
require("./startup/routes")(app);
app.listen(8080,() => {
    console.log('listening on port 8080');
    setCon();
});