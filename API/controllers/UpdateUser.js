var User = require("../config/user");
var async = require("async");

module.exports = function (req, res, next) {

        async.waterfall([

            function (wcb) {

                var wdatas = {model: {}, r: req.body};
                return wcb(null, wdatas);

            },

            findUser,
            updateUser

        ],
            function (err, resu) {

                if (err) {

                    return res.status(500).json({error: true});

                } else {

                    return res.status(200).json({success: true, object: resu.model});

                }

        });

    function findUser(wdatas, wcb) {

        User.findOne(wdatas.r['_id'], function (err, model) {

            if (err || !model) {
                //decide what to do
                return wcb(true, wdatas);

            } else {

                wdatas.model = model;
                return wcb(null, wdatas);

            }

        });

    }


    function updateUser(wdatas, wcb) {

        let tabK=Object.keys(wdatas.r);
        let doubled={};

        for(let i=0;i<tabK.length;i++){

            if(tabK[i]!="SK"&&tabK[i]!="PK"&&tabK[i]!="timestamp"&&tabK[i]!="hmac") {

                wdatas.model[tabK[i]] = wdatas.r[tabK[i]];

            }

        }
        wdatas.model.save(function (err, savedObject) {

            if (err | !savedObject) {

                //decide what to do
                return wcb(true, wdatas);

            } else {

                tabK=Object.keys(wdatas.model.toObject());
                for(let i=0;i<tabK.length;i++){

                    if(tabK[i]!="SK") {

                       doubled[tabK[i]] = wdatas.model[tabK[i]];

                    }

                }
                wdatas.model=doubled;
                return wcb(null, wdatas);
            }

        });

    }
}