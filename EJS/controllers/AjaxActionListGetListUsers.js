var User = require("../config/user");
var async = require('async');
var request = require('request');
var crypto = require ('crypto');

module.exports = function (req, res, next) {

    let url = 'http://localhost:9014/users?timestamp=';
    url += new Date().getTime() + '&PK=';
    let verif='timestamp='+new Date().getTime() + '&PK=';

    async.waterfall([
            function (wcb) {
                var wdatas = {req: req.query, res: res, user: {}, url: url,verif:verif, tab: []}
                return wcb(null, wdatas);
            },
            getUser,
            constructUrl,
            callAPI
        ],
        function (error, result) {

            if (error) {
                return res.status(500).json({error: true});
            } else {
                return res.status(200).json({data: result.tab});
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

                let url = "/user/add?error=1";
                return wcb(true, wdatas);

            } else {

                wdatas.user = body.user;
                return wcb(null, wdatas);

            }

        });

}

function constructUrl(wdatas, wcb) {

    wdatas.url += wdatas.user['PK'];
    wdatas.verif+=wdatas.user['PK'];
    let hmac = crypto.createHmac('sha512', wdatas.user["SK"]).update(wdatas.verif).digest("hex");
    wdatas.url += "&hmac=" + hmac;
    return wcb(null, wdatas);

}

function callAPI(wdatas, wcb) {

    request.get({
            url: wdatas.url,
            json: true,
        },
        function (err, response, body) {

            if (err || !response || response.statusCode != 200) {

                let url = "/user/add?error=1";
                return wcb(true, wdatas);

            } else {

                wdatas.tab = body.user;
                return wcb(null, wdatas);

            }

        });

}