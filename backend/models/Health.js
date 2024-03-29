const mongoose=require("mongoose");


const healthSchema=new mongoose.Schema({

    BP:String,
    spO2:String,
    heartrate:String,
    stepcount:String,
    sleep:String,
    ref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Health=mongoose.model('Health',healthSchema);


module.exports=Health;  