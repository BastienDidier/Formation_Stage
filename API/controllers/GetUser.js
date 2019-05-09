var User = require("../config/user");
var async=require("async");


module.exports = function (req, res, next) {

    doWaterfall(req,res,next);;

}

function doWaterfall(req,res,next) {

        async.waterfall([

            function (wcb) {

            var wdatas = {user: {}, id: req.query}
            return wcb(null, wdatas);

        },

            findUser

        ],
            function (err, result) {

                if (err) {
                    return res.status(500).json({error: true});

                } else {
                    return res.status(200).json({success: true, user: result.user});
                }

        });

}
function findUser(datas,wcb) {

    User.findOne(datas.id, function (err, model) {

        if (err || !model) {

            return wcb(true,datas);

        } else {

            datas.user=model;
            return wcb(null,datas);

        }

    });
}