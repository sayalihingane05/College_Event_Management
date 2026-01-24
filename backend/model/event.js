const mongoose=require("mongoose");

const eventSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
            type:String,
            required:true
    },
    location:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    }

},{timestamps:true})

const event=mongoose.model("Event",eventSchema);

module.exports=event;