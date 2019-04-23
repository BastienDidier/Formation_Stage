var mongoose=require("mongoose")
var Modeltest=require("./modeletest")
var async=require("async")
mongoose.connect('mongodb://localhost:27017/tuto');
mongoose.connection.on('error',function(err){
    console.log("=> error");
    process.exit(0)
});
mongoose.connection.on('connected',function (){
    console.log("-> connected");
    main();
});
function  main() {
    var obj = [
        {vache: 1},
        {vache: 3},
        {vache: 4},
        {cheval: 2},
        {cheval: 3}
    ];

    async.waterfall([
        function(wcb){
                var wdatas = {idfind:null,model:null};
                return wcb(null, wdatas)
            },
        function (wdatas,wcb){
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
                    async.eachOfLimit(obj, 1, function(element, index, ecb){
                        var ke=Object.keys(element)
                        var m = new Modeltest({
                            create_date: (new Date()).toJSON(),
                            name: ke[0],
                            number: element[ke[0]]
                        });
                        m.save(function(err, savedObject){
                            if(err || !savedObject)
                            {
                                return ecb(err || true, null);
                            }
                            else
                            {
                                if(wdatas.model!=null){
                                    wdatas.model+=m;
                                }else{
                                    wdatas.model=m;
                                }
                                return ecb(null, null);
                            }
                        })

                    },function(err){

                        if(err)
                        {
                            console.log("ici dans each of ")
                            return wcb(true,wdatas);
                        }
                        else
                        {
                            // console.log("display model")
                            // console.log(wdatas.model)
                            return wcb(null,wdatas);
                            // result[“https://www.google.fr”] contient la page html de google
                            // result[“http://amazon.fr”] contient la page html de amazon, ...
                        }
                    });
                },
        function (wdatas,wcb) {
            Modeltest.find({}, function(err, wdata){
                var models=wdata
                 // console.log(wdata)
                if(err || !models)
                {
                    console.log("passe ici la dans seek ")
                    return wcb(err || true, wdatas);
                }
                else
                {
                    console.log("=> Model list");
                    for(var i = 0; i < models.length; i++)
                    {
                        console.log(models[i]);
                    }
                    // wdatas.list = models;
                    return wcb(null, wdatas);
                }
            });

        //finc all
            
        },function (wdatas,wcb) {
            Modeltest.findOne({name: "cheval", number: 2}, function(err, model){

                if(err || !model)
                {
                    return wcb(err || true, wdatas);
                }
                else
                {
                    console.log("=> find cheval , 2");
                    // console.log(model);
                    console.log(model._id.toString())
                    wdatas.idfind = model._id.toString();
                    return wcb(null, wdatas);
                }
            });
            //find cheval 2
            //set id find in wdatas
        },function (wdatas,wcb) {
            Modeltest.findOne({_id:wdatas.idfind}, function(err, model){

                if(err || !model)
                {
                    console.log("ici dans find")
                    return wcb(err || true, wdatas);
                }
                else
                {
                    console.log("=> Model cheval  2");
                    console.log(model);
                    return wcb(null, wdatas);
                }
            });
            //find one with id find
        }
        ],function(err, result){

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