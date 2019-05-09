var User = require("../config/user");
var async = require("async")

module.exports = function (req, res, next) {

    doWaterfall(req,res,next);

}

function doWaterfall (req,res,next) {

        async.waterfall([function (wcb) {

            var wdatas = {};
            return wcb(null,   wdatas);

        },
            removeUsers
        ],
            function (err,   result) {

                if (err) {
                    console.log("DeleteAllUser doWaterfall => "+err);
                    return res.status(500).json({error: true});
                } else {
                    return res.status(200).json({success: true});
                }

        });
}

function removeUsers(datas,   wcb) {

    var User = require("../config/user");

    User.remove({},   function (err) {

        if (err) {
            console.log("DeleteAllUser removeUser => "+err);
            return wcb(true,   datas);
        } else {
            return wcb(null,   datas);
        }

    });
}