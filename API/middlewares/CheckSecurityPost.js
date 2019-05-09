var User = require("../config/user");
var async = require("async");
var crypto = require('crypto');
var User = require("../config/user");

module.exports = function (req, res, next){

    async.waterfall([
        function (wcb) {
            var wdatas = {tabParameterRequest: req.query, user: {}};
            return wcb(null, wdatas);
    },
        checkFields,
        checkSafe
        ],
        function (err, result) {

        if (err) {

            console.log('[CheckSecurityPost] '+err);
            return res.status(403).json({error: true});

        } else {

            return next ();

        }

    });

}


function checkFields(wdatas, wcb) {

    if (!wdatas.tabParameterRequest["timestamp"] || !wdatas.tabParameterRequest["PK"] || !wdatas.tabParameterRequest["hmac"]) {

        console.log("error missing arguments");
        return wcb(true, wdatas);

    }else{

        User.findOne({nom:'admin'}, function (err, models) {

            if (err || !models) {

                console.log("error search in database");
                return wcb("[checkFields][user]", wdatas);

            } else {

                wdatas.user = models;
                return wcb(null, wdatas)
                    ;
            }

        });

    }
}


function checkSafe(wdatas, wcb) {

    // si query => reconstruire query string SANS hmac
    let verif='timestamp='+wdatas.tabParameterRequest['timestamp']+'&PK='+wdatas.tabParameterRequest['PK']
    let hmac = crypto.createHmac('sha512', wdatas.user["SK"]).update(verif).digest("hex");
    console.log(verif);

    if(hmac == wdatas.tabParameterRequest['hmac']) {

        return wcb (null, wdatas);

    } else {

        console.log("[checkFields][checkSafe]");
        console.log(hmac+"  \n"+wdatas.tabParameterRequest['hmac'])
        return wcb(true, wdatas);

    }
}

