const mysql=require("mysql2");
require("dotenv").config();
const db=mysql.createConnection({
    host:process.env.dbhost,
    user:process.env.dbuser,
    password:process.env.dbpassword,
    database:process.env.dbname,
    port:process.env.dbport
})
db.connect((err)=>{
    if(err){
        console.log("unable to connect");
    }
    console.log("connected");
})
module.exports=db;

