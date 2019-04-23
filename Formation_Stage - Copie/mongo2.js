var async=require("async")
var request=require("request")
var mongoose=require("mongoose")
var Modeltest=require("./modeletest")
mongoose.connect('mongodb://localhost:27017/tuto');
mongoose.connection.on('error',function(err){
    console.log("=> error");
    process.exit(0)
});
mongoose.connection.on('connected',function (){
    console.log("-> connected");
    main();
});
function getProd1(pcb){
    request.get({
        url:"https://stage.optionizr.com/urls/products/1",
        json:true
    },function (err,response,body) {
        if(err || !response || response.statusCode != 200)
        {
            console.log("Erreur");
        }
        else
        {

            return pcb(null,body.urls)
        }
    })


}
function getProd2(pcb){
    request.get({
        url:"https://stage.optionizr.com/urls/products/2",
        json:true
    },function (err,response,body) {
        if(err || !response || response.statusCode != 200)
        {
            console.log("Erreur");
        }
        else
        {
            return pcb(null,body.urls)
        }
    })
}
function getNumber(wdatas,wcb){
    async.eachOfLimit(wdatas.tab,1,function(element, index, ecb){
        request.get({
            url:element,
            json:true
        },function (err,response,body){
            wdatas.obj[element]=body.number
            return ecb(null, null);
        })
    },function(err){
        if(err)
        {
            console.log("ici dans each of ")
            return wcb(true,wdatas);
        }
        else
        {
            return wcb(null,wdatas);
        }
    });
}
function getNewObj(wdatas,wcb){
   // console.log(wdatas.obj);
    var objKe=Object.keys(wdatas.obj);
    for(url in wdatas.tab){
        var urlReverse=wdatas.tab[url].split("/").reverse()
        wdatas.objNom[urlReverse[0]]=wdatas.obj[wdatas.tab[url]]
    }
    return wcb(null,wdatas);
}

function removeD(){
    Modeltest.remove({}, function(err){
        if(err)
        {
            console.log("pb")
            return ;
        }
        else
        {
            console.log("ok")
            return ;
        }
    });
}
function addD(vdatas,acb){
    var m = new Modeltest({
        name: vdatas.ele["name"],
        number: vdatas.ele["number"]
    });
    var m1= new Modeltest({
        name: vdatas.ele["name"],
        number: vdatas.ele["number"]
    });
    m.save(function(err, savedObject){
        if(err || !savedObject)
        {
            return acb(err || true, null);
        }
        else
        {
            m1.save(function(err, savedObject){
                if(err || !savedObject)
                {
                    return acb(err || true, null);
                }
                else
                {
                    return acb(null, null);
                }
            });
        }
    });
}
function transToTab(wdatas,wcb){
    var objKe=Object.keys(wdatas.objNom);
    for(let i=0;i<objKe.length;i++){
        var ob = {}
        ob["name"] = objKe[i]
        ob["number"] = wdatas.objNom[objKe[i]]
        wdatas.objToTab.push(ob);
    }
    removeD();
    async.eachOfLimit(wdatas.objToTab,1,function(element, index, ecb){

        async.waterfall([function(acb){
            var vdatas = {ele:element};
            return acb(null, vdatas);
        },addD],function(err, result){
            if(err)
            {
                console.log("=> Error");
                return ecb(err,null)
            }
            else
            {
                console.log("=> End transto Tab");
                return ecb(null,null)
            }
        });
    },function(err){
        if(err)
        {
            console.log("ici dans each of ")
            return wcb(true,wdatas);
        }
        else
        {
            console.log("pb ic i ?")
            return wcb(null,wdatas);
        }
    });
}
function findObj(wdatas,wcb){
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
}
function findOn(wdatas,wcb){
    Modeltest.findOne({name:"vache",number:12}, function(err, model){

        if(err || !model)
        {
            console.log("ici dans find")
            return wcb(err || true, wdatas);
        }
        else
        {
           // console.log("=> Model cheval  2");
            //console.log(model);
            Modeltest.update(model,{number:5},{multi:false,upsert:false},function(err,raw){
                if(err||!raw){
                    return wcb(err||true,wdatas);
                }else{
                    return wcb(null, wdatas);
                }
            })

        }
    });
}
function majAllCow(wdatas,wcb){
    console.log("maj allCow")
    Modeltest.update({name:"vache"},{number:12},{multi:true,upsert:false},function(err,raw){
        if(err||!raw){
            return wcb(err||true,wdatas);
        }else{
            return wcb(null, wdatas);
        }
    })
}
function removeAllCow(wdatas,wcb){

    console.log("sup allCow")
    Modeltest.remove({$or:[{name:"chevre"},{name:"vache",number:12}]}, function(err){
        if(err)
        {
            return wcb(err, wdatas);
        }
        else
        {
            return wcb(null, wdatas);
        }
    });
}
function findOneCow(wdatas,wcb){

    console.log("find allCow")
    Modeltest.find({name:"vache"}, function(err, wdata){
        var models=wdata
        // console.log(wdata)
        if(err || !models)
        {
            console.log("passe ici la dans seek ")
            return wcb(err || true, wdatas);
        }
        else
        {
            console.log(models.length);
            // wdatas.list = models;
            return wcb(null, wdatas);
        }
    });
}
function somme(wdatas,wcb){
    Modeltest.find({$or:[{name:"vache"},{name:"cheval"},{name:"avion"}],$and:[{number:{$gte:10}},{number:{$ne:12}},{number:{$lte:50}}]}, function(err, wdata){
        var models=wdata
        // console.log(wdata)
        if(err || !models)
        {
            console.log("passe ici la dans seek ")
            return wcb(err || true, wdatas);
        }
        else
        {
            var so=0;
            for(var i = 0; i < models.length; i++)
            {
                so+=parseInt(models[i].number)
            }
            console.log("somme finale")

            console.log(so);
            // wdatas.list = models;
            return wcb(null, wdatas);
        }
    });
}

function main(){
    async.parallel({prod1: getProd1, prod2: getProd2},function(err, result){ // callback final
        if(err)
        {
            console.log("erreur dans async parrallel");
        }
        else
        {
            tab=result.prod1.concat(result.prod2);
            async.waterfall([ function(wcb){
                var wdatas = {tab:tab,obj:{},objNom:{},objToTab:[]};
                return wcb(null, wdatas)
            }, getNumber,getNewObj,transToTab,findObj,findOn,removeAllCow,majAllCow,findOneCow,somme],function(err, result){
                if(err)
                {
                    console.log("=> Error");
                    process.exit(0);
                }
                else
                {
                    console.log("=> End");
                    process.exit(0)
                }
            });
            console.log(" c'est la fin");
        }
    });
}
