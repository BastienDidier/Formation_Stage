var User = require("../config/user");
var async = require("async");


module.exports = function (req, res, next) {

    async.waterfall([
        function (wcb){

            var wdatas = {
                tabParam: req.body
            };

            return wcb(null, wdatas);

        },
        removeUser

    ], function (err, result) { // callback final

        if (err) {

            console.log(err);
            console.log("|API][controllers][DeleteUser]"+err);
            return res.status(500).json({error: true});

        } else {
            return res.status(200).json({success: true});
        }
    });
}
function removeUser(datas, wcb) {

    User.remove(datas.tabParam, function (err) {

        if (err) {

            console.log(err);
            return wcb("[removeUser]"+err, datas);

        } else {

            return wcb(null, datas);

        }
    });
}