var mongoose=require("mongoose")
var crypto = require("crypto");
User=new mongoose.Schema({
    nom:   {type:String,default:" "},
    prenom:    {type:String,default: " "},
    sexe: {type:String,default: "Homme"},
    age:   {type:Number,default: 0},
    adresse: {type:String,default: " "},
    PK:{type:String,default:crypto.randomBytes(20).toString('hex')},
    SK:{type:String,default:crypto.randomBytes(20).toString('hex')}
});
User.index({name:1});
module.exports=mongoose.model('User',User);
