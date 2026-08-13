const mysql = require("mysql2");
const express = require("express");
const bcrypt=require("bcrypt");
const app=express();
const db=require("./db/db.js");
require("dotenv").config();
app.use(express.json());
app.use(express.static("public"));
app.use("/data",express.static("data"));
app.use("/checkadmin",require("./routes/admin.js"));
app.use("/userdata",require("./routes/userdata.js"));
app.listen(3000,()=>{
    console.log("running server at http://localhost:3000/");
});