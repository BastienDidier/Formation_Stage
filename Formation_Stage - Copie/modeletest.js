var mongoose=require("mongoose")
Modeltest=new mongoose.Schema({
    name:   {type:String,default:" "},
    create_date:    {type:Date,default: Date.now},
    parent_model:   {type:String,default: ""},
    number: {type:Number,default:0}
});
Modeltest.index({name:1});
module.exports=mongoose.model('Modeltest',Modeltest);
