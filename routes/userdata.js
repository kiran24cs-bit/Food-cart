const express=require("express");
const bcrypt=require("bcrypt");
const router=express.Router();
const db=require("../db/db.js");
router.post("/adduser",async (req,res)=>{
    let {number , password } =req.body;
    const hashedpassword= await bcrypt.hash(password,10);
    const query="insert into users(mobile,user_password) values(?,?)";
    db.query(query,[number,hashedpassword],(err,result)=>{
        if(err){
            res.json({
                status:0,
                error:err.code
            });
            return ;
        }
        res.json({
        status:1
    });
    });
});
router.post("/checkuserdata", async (req,res)=>{
    const {number , password}=req.body;
    db.query("select user_password from users where mobile=?",[number],async (error , result)=>{
        if(error){
            return;
        }
        if(result[0]){
            let match=await bcrypt.compare(password,result[0].user_password);
            if(match){
                res.json({
                    access:1
                });
                return;
            }
            else{
                res.json({
                    access:0,
                    text:"wrong password"
                
                });
                return;
            }
        }
        res.json({
            access:0,
            text:"no user found"
        })
    })
});
router.get("/getalluser",(req,res)=>{
    db.query("select * from users",[],(err,result)=>{
        console.log("accessing select * from users");
        res.json(result);
    });
})







module.exports=router;
