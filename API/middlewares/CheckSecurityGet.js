var User = require("../config/user");
var async = require("async");
var crypto = require('crypto');
var User = require("../config/user");

module.exports = function (req, res, next) {

    async.waterfall([
        function (wcb) {
            var wdatas = {parameterRequest: req.query};
            return wcb(null, wdatas);
    },

        checkFields,
        checkSafe],

        function (err, result) {

            if (err) {

                return res.status(403).json({error: true});

            } else {

                return next();

            }
        });
}

// checkFields => ctrl : timestamp, PK, hmac

function checkFields(wdatas, wcb) {

    if (!wdatas.parameterRequest["timestamp"] || !wdatas.parameterRequest["PK"] || !wdatas.parameterRequest["hmac"]) {

        console.log("error missing arguments");
        return wcb(true, wdatas);

    }else{

        User.findOne({nom:'admin'}, function (err, models) {

            if (err || !models) {

                return wcb(true, wdatas);

            } else {

                wdatas.user = models;
                return wcb(null, wdatas);

            }
        });

    }
}

function checkSafe(wdatas, wcb) {

    // si query => reconstruire query string SANS hmac
    let verif='timestamp='+ wdatas.parameterRequest['timestamp']+'&PK=' + wdatas.parameterRequest['PK']
    let hmac = crypto.createHmac('sha512', wdatas.user["SK"]).update(verif).digest("hex");
    console.log(verif)

    if(hmac==wdatas.parameterRequest['hmac']){

        return wcb(null, wdatas);

    }else{

        console.log(hmac);
        return wcb(true, wdatas);

    }
}

