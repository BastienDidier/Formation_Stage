var async=require('async');
var request=require('request');
var User = require("../config/user");

module.exports = function (req, res, next) {

    if (res.locals.error) {

        return res.status(500).json({error: true});

    } else {

        async.waterfall([

                function (wcb) {
                    var wdatas={req:req.body,res:res};
                    return wcb(null,wdatas);
                },
                callAPI
            ],
            function(error,result){

                if(error){

                    console.log(error);
                    return res.status(500).json({error: true});

                }else{

                    var m = new User(req.body);

                    m.save(function (err,savedObject) {

                        if(err){

                            let url = "/user/add?error=1";
                            return res.status(500).json({error: true});

                        }else{

                            return res.status(200).json({success: true});

                        }
                    })

                }

            });
    }
};


function callAPI(wdatas,wcb){

    let url='http://localhost:9014/user/add'

    request.post({

            url:url,
            json:true,
            form:wdatas.req

        },
        function(err,response,body){

            if(err||!response||response.statusCode!=200){

                let url = "/user/add?error=1";
                return wcb(true,wdatas);

            }
            else {

                return wcb(null,wdatas);

            }
        });
}