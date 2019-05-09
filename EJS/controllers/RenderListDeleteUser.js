var User = require("../config/user");
var async=require('async');
var request=require('request');
var crypto=require('crypto')

module.exports = function (req, res, next) {

    async.waterfall([

            function (wcb) {

                var wdatas={req:req.query};
                return wcb(null,wdatas);

            },

            getUser,
            callAPI

        ],
        function(error,result){

            if(error){

                console.log(error);
                console.log("[EJS][controllers][renderListDeleteUser]"+error)
                return res.status(500).json({error: true});

            }else{

                return res.status(200).json({success: true});

            }

        });

};


function getUser(wdatas, wcb) {

    request.get({

            url: 'http://localhost:9014/user?nom=admin',
            json: true,
        },
        function (err, response, body) {

            if (err || !response || response.statusCode != 200) {

                return wcb(true, wdatas);

            } else {

                wdatas.model = body.user;
                return wcb(null, wdatas);

            }

        });

}

function callAPI(wdatas, wcb) {

    let url = 'http://localhost:9014/user/delete?timestamp=';
    url+=new Date().getTime()+"&PK=";
    url+=wdatas.model['PK'];
    let verif='timestamp='+new Date().getTime() + '&PK=';
    verif+=wdatas.model['PK'];
    let hmac=crypto.createHmac('sha512', wdatas.model["SK"]).update(verif).digest("hex");
    url+='&hmac='+hmac;

    request.post({

            url: url,
            json: true,
            form: {

                _id: wdatas.req['_id']

            }

        },
        function (err, response, body) {


            if (err || !response || response.statusCode != 200) {

                console.log(err);
                return wcb("[callAPI]]"+err, wdatas);

            } else {

                wdatas.tab = body.tab;
                return wcb(null, wdatas);

            }

        });

}