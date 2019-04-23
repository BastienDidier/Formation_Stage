var mongoose=require("mongoose")
mongoose.connect('mongodb://localhost:27017/tuto');
mongoose.connection.on('error',function(err){
    console.log("=> error");
    process.exit(0)
});
mongoose.connection.on('connected',function (){
    console.log("-> connected");
    main();
});
function main()
{
console.log("->main launched")
    var Modeltest=require("./modeletest.js");
// var m=new Modeltest({})
//     console.log("--> champs par defaut")
//     console.log(m.create_date);
// console.log("nom :")
//     console.log(m.name)
//     console.log("parent model")
//     console.log(m.parent_model);
// console.log(m.number);
//     console.log("--> mongo id")
//     console.log(m._id.toString());
//     var m1=new Modeltest({
//         create_date: (new Date()).toJSON(),name:"cheval"
//     });
//     m1.number=12
//     m["number"]=13
//     console.log("nom :")
//     console.log(m1.name)
//     console.log("parent model")
//     console.log(m1.parent_model);
//     console.log(m1.number);
//     console.log("--> mongo id")
//     console.log(m1._id.toString());
//     m1.save(function(err,savedObject){
//         if(err){
//             console.log(err);
//             process.exit(0)
//         }else{
//             console.log("objet sauver :");
//             console.log(savedObject);
//             m1=savedObject;
//         }
//     })
    var async=require("async")
    async.waterfall([

        function(wcb){
            var wdatas = {};
            return wcb(null, wdatas)
        },
        function(wdatas, wcb){

            Modeltest.remove({}, function(err){
                if(err)
                {
                    return wcb(err, wdatas);
                }
                else
                {
                    return wcb(null, wdatas);
                }
            });
        },
        function(wdatas, wcb){

            var m = new Modeltest({
                create_date: (new Date()).toJSON(),
                name: "cheval",
                number: 12
            });

            m.save(function(err, savedObject){
                if(err || !savedObject)
                {
                    return wcb(err || true, wdatas);
                }
                else
                {
                    wdatas.model1 = savedObject;
                    return wcb(null, wdatas);
                }
            })
        },

        function(wdatas, wcb){

            var m = new Modeltest({
                name: "vache",
                number: 1
            });

            m.save(function(err, savedObject){
                if(err || !savedObject)
                {
                    return wcb(err || true, wdatas);
                }
                else
                {
                    wdatas.model2 = savedObject;
                    return wcb(null, wdatas);
                }
            })
        },

        function(wdatas, wcb)
        {
            Modeltest.find({}, function(err, models){

                if(err || !models)
                {
                    return wcb(err || true, wdatas);
                }
                else
                {
                    console.log("=> Model list");
                    for(var i = 0; i < models.length; i++)
                    {
                        console.log(models[i]);
                    }
                    wdatas.list = models;
                    return wcb(null, wdatas);
                }
            })
        },

        function(wdatas, wcb)
        {
            Modeltest.findOne({name: "vache", number: 1}, function(err, model){

                if(err || !model)
                {
                    return wcb(err || true, wdatas);
                }
                else
                {
                    console.log("=> Model vache, 1");
                    console.log(model);
                    wdatas.model = model;
                    return wcb(null, wdatas);
                }
            });
        }


    ], function(err, result){

        if(err)
        {
            console.log("=> Error");
            console.log(err);
            process.exit(0);
        }
        else
        {
            console.log("=> End");
            process.exit(0)
        }
    });

}
