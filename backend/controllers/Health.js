const Health = require("../models/Health");

exports.createHealth=async(req,res)=>{
    const {BP,spO2,heartrate,stepcount,sleep}=req.body;
    const health=await Health.create({
        BP:BP,
        spO2:spO2,
        heartrate:heartrate,
        stepcount:stepcount,
        sleep:sleep,

    });

    res.json({
        health,
        msg:"Health data created successfully"
    })
}

exports.getHealth=async(req,res)=>{
    const health=await Health.find({});
    res.json({
        health
    })
}