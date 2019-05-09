var request = require("request");

function getUrl(wdatas,wcb) {

    var tab=[]
    request.get({

        url: "https://stage.optionizr.com/urls/json",


    }, function(err, response, body){

        if(err || !response || response.statusCode != 200)
        {
            console.log("Erreur");
            return wcb("[getURL]"+err,wdatas)
        }
        else{
            body=JSON.parse(body);
            for(url in body.urls){
                tab.push(body.urls[url])
            }
            wdatas.tab=tab;
            return wcb(null,wdatas);
        }
    });
}

function getRes(wdatas,wcb) {
    var request = require("request");
    var res={}
    var tab=wdatas.tab
    async.eachOfLimit(tab, 1, function(element, index, ecb){

        request.get({
            url:element
        },function (err,response,body) {
            if(err || !response || response.statusCode != 200)
            {
                console.log("Erreur");
                return ecb("[getres]"+err,wdatas)
            }
            else
            {
                body=JSON.parse(body)
                wdatas.res[element]=body.result;
                return ecb(null,wdatas)
            }
        })

    },function(err){

        if(err)
        {
            return wcb(true,wdatas);
        }
        else
        {
            return wcb(null,wdatas);
            // result[“https://www.google.fr”] contient la page html de google
            // result[“http://amazon.fr”] contient la page html de amazon, ...
        }
    });
}
function FinalRes(wdatas,wcb) {
    var request = require("request");
    request.post({
    url: "https://stage.optionizr.com/api/formjson",
    form:wdatas.res
},function (err,res,body) {

    if(err || !res || res.statusCode != 200)
    {
        console.log("Erreur");
        return wcb("[finalres]"+err,wdatas)
    }
    else
    {
        console.log(wdatas.res);
        body=JSON.parse(body)
        console.log("ici avant body");
        console.log(body)
        console.log("apres body")
    }
});
}
var async = require("async");
var tab=[]
async.waterfall([function(wcb){
   var wdatas={tab:[],res:{},somme:0}
   return wcb(null,wdatas);
},getUrl,getRes,FinalRes],function(err, result){ // callback final
    if(err)
    {
        console.log("erreur");
        console.log();
        exit(0);
    }
    else
    {
        console.log(" c'st la fin");
        exit(0);
    }
});
