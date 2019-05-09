var User = require ("../config/user");
var async=require ('async');

module.exports = function  (req, res, next) {
    
    doWaterfall (req,res,next);
    
}

function doWaterfall (req,res,next)  {
    
        let t='_id='+req.query[""]
        var async = require  ("async");

        async.waterfall  ([
            function  (wcb) {
                var wdatas= {user: {}, parameters:req.body};
                return wcb  (null, wdatas);
         },
            addUser
        ],
            function  (err,  result) { // callback final
            if  (err)
             {
                 console.log("AddUser doWaterfall "+err);
                return res.status  (500).json  ( {error: true});

            }
            else
             {
                return res.status  (200).json  ( {success: true,  user: result.user});
            }
        });
    }

function addUser  (datas, sdf)  {

    var m = new User  (datas.parameters);

    m.save  (function  (err,  savedObject) {
        if  (err || !savedObject)
         {
             console.log("AddUser AddUser "+err);
            return sdf  (true, datas)
        }
        else
         {
            datas.user=savedObject;
            return sdf  (null, datas);
        }
    });
}