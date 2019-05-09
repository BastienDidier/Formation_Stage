var request=require("request");
var async=require('async');
var User = require("../config/user");
module.exports = function (req, res, next) {

    let url = "/user/add";
    if (res.locals.error) {
        url += "?error=1";
        console.log("redirect to error");
        return res.redirect(url);

    } else {

        url += "?success=1";
        console.log("redirect to succes");

        async.waterfall([

            function (wcb) {

                var wdatas={req:req.body,res:res};
                return wcb(null,wdatas);

            },

            callAPI

        ],
            function(error,result){

                if(error){

                    let url = "/user/add?error=1";
                    return res.redirect(url);

                }else{

                    var m=new User(req.body);

                    m.save(function (err,savedObject) {

                        if(err){

                            let url = "/user/add?error=1";
                            return res.redirect(url);

                        }else{

                            return res.redirect(url);

                        }

                    })

                }

            });

    }

};

function callAPI(wdatas,wcb){

    let url = 'http://localhost:9014/user/add'

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