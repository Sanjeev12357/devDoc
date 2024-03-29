const mailSender = require("../mailer");

const Score = require("../models/Score");

exports.createScore = async (req, res) => {

    const { score } = req.body;
    const newScore = await Score.create({
         score,
    });

    res.json({
        newScore,
        msg: "Score created successfully"
    })
}

exports.getScore = async (req, res) => {

    const score = await Score.find({});
    const length=score.length;
    latest=score[length - 1].score;
    console.log(latest);
    if(latest <= 15){
        mailSender("sanjeev74479@gmail.com","Health Report","Your realtives health is not well");

    }

    res.json({
        score
    })
}