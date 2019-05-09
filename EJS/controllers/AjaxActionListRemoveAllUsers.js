var User = require("../config/user");
var request=require("request");
var async=require('async');
var crypto = require ('crypto');

module.exports = function (req, res, next) {

    console.log('inside AjaxActionsListRemoveAllUsers')

    async.waterfall([

            function (wcb) {

                var wdatas={tabParameterRequest:req.query};
                return wcb(null,wdatas);

            },

            getUser,
            callAPI

        ],
        function(error,result){

            if(error){

                let url = "/user/list?error=1";
                return res.redirect(url);

            }else{

                return res.redirect("/user/list?success=1");
            }
        });
}

function getUser(wdatas, wcb) {

    request.get({
            url: 'http://localhost:9014/user?nom=admin',
            json: true,
        },
        function (err, response, body) {
            if (err || !response || response.statusCode != 200) {
                console.log("AjaxActionListRemoveAllUsers getUser "+err);
                return wcb(true, wdatas);
            } else {
                wdatas.model = body.user;
                console.log("AjaxActionListRemoveAllUsers getUser success");
                return wcb(null, wdatas);
            }
        });
}

function callAPI(wdatas, wcb) {

    let url = 'http://localhost:9014/users/delete?timestamp=';
    url+=new Date().getTime()+"&PK=";
    url+=wdatas.model['PK'];
    let verif='timestamp='+new Date().getTime() + '&PK=';
    verif+=wdatas.model['PK'];
    let hmac=crypto.createHmac('sha512', wdatas.model["SK"]).update(verif).digest("hex");
    url+='&hmac='+hmac;

    request.post({

            url: url,
            json: true,
            form: wdatas.model

        },
        function (err, response, body) {

            if (err || !response || response.statusCode != 200) {
                console.log("AjaxActionListRemoveAllUsers callAPI "+err);
                return wcb(true, wdatas);

            } else {
                return wcb(null, wdatas);

            }
        });
}