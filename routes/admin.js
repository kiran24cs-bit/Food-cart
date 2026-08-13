const express=require("express");
const bcrypt=require("bcrypt");
const router=express.Router();
const db=require("../db/db.js");
router.post("/admin", async (req,res)=>{
        let {adminid , password } =req.body;
    db.query("select admin_password from admin where id=?",[adminid],async (err,result)=>{
        if(result[0])
    {
        const ismatch=await bcrypt.compare(password,result[0].admin_password);
        if(ismatch){
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
    });
    });
});
module.exports=router;