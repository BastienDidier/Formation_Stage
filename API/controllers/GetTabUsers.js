var User = require("../config/user");

module.exports = function (req, res, next) {
    var async = require("async");
    doWaterfall(req,res,next);
}

function getTab(wdatas, wcb) {



    User.find({}, function (err, models) {

        if (err || !models) {
            console.log(err);
            return wcb("[removeUser]"+err, wdatas);
        }
        else {
            wdatas.user=models;
            return wcb(null, wdatas);
        }

    });

}

function doWaterfall(req,res,next) {

        var async = require("async");

        async.waterfall([

            function (wcb) {

            var wdatas = {user: []}
            return wcb(null, wdatas);

        },

            getTab

        ],
            function (err, result) { // callback final

            if (err) {

                console.log(err);
                console.log("[GetuserUser][doWaterfall]"+err);
                return res.status(500).json({error: true});

            } else {

                return res.status(200).json({success: true, user: result.user});

            }

        });
}

