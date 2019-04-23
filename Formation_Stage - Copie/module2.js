var async=require("async");
var fs=require("fs")

function getProd1(pcb){
    var request = require("request");
    var res={}
    var tab=[]
    request.get({

        url: "https://stage.optionizr.com/urls/products/1" ,


    }, function(err, response, body){

        if(err || !response || response.statusCode != 200)
        {
            console.log("Erreur prod 1");
        }
        else{
            body=JSON.parse(body);
            for(url in body.urls){
                tab.push(body.urls[url])
            }
            // console.log("tab 1"+tab);
            async.eachOfLimit(tab, 1, function(element, index, ecb){
                console.log(element)
                request.get({
                    url:element
                },function (err,response,body) {
                    if(err || !response || response.statusCode != 200)
                    {
                        console.log("Erreur prod 1 dans async each of");
                        return ecb("[getres]"+err)
                    }
                    else
                    {
                        body=JSON.parse(body)
                        var name=element.split("/");
                        name=name[name.length-1]
                        res[name]=body.number;
                        console.log(body.number);
                        console.log(res[name]+" "+name)
                        let text="";
                        for(let i=0;i<res[name];i++){
                            text+=name+"\n";
                        }
                        console.log(text)
                        fs.writeFile(name+".txt",text,"utf8",function (err) {
                            if(err){
                                console.log(err)
                            }else{
                                return ecb(null,null)
                            }
                        });

                    }
                })

            },function(err){

                if(err)
                {
                    return pcb(true,null);
                }
                else
                {
                    return pcb(null,null);
                    // result[“https://www.google.fr”] contient la page html de google
                    // result[“http://amazon.fr”] contient la page html de amazon, ...
                }
            });
        }
    });
}

function getProd2(pcb) {
    var request = require("request");
    var res = {}
    var tab = []
    request.get({

        url: "https://stage.optionizr.com/urls/products/2",


    }, function (err, response, body) {

        if (err || !response || response.statusCode != 200) {
            console.log("Erreur prod2");
        } else {
            body = JSON.parse(body);
            for (url in body.urls) {
                tab.push(body.urls[url])
            }
            // console.log("tab 2"+tab);
            async.eachOfLimit(tab, 1, function (element, index, ecb) {
                request.get({
                    url: element
                }, function (err, response, body) {
                    if (err || !response || response.statusCode != 200) {
                        console.log("Erreur prod 2 dans async each of");
                        return ecb("[getres]" + err, null)
                    } else {
                        body = JSON.parse(body)
                        var name = element.split("/");
                        name = name[name.length - 1]
                        res[name] += body.number;
                        let text = "";
                        for (let i = 0; i < res[name]; i++) {
                            text += name + "\n";
                        }
                        fs.writeFile(name + ".txt", text, "utf8", function (err) {
                            if (err) {
                                console.log(err)
                            } else {
                                return ecb(null, null)
                            }
                        });

                    }
                })

            }, function (err) {

                if (err) {
                    return pcb(true, null);
                } else {
                    return pcb(null, null);
                    // result[“https://www.google.fr”] contient la page html de google
                    // result[“http://amazon.fr”] contient la page html de amazon, ...
                }
            });
        }
    });
}
function getProd3(pcb) {
    var request = require("request");
    var res = {}
    var tab = []
    request.get({

        url: "https://stage.optionizr.com/urls/products/3",


    }, function (err, response, body) {

        if (err || !response || response.statusCode != 200) {
            console.log("Erreur prod3");
        } else {
            body = JSON.parse(body);
            for (url in body.urls) {
                tab.push(body.urls[url])
            }
            // console.log("tab 3"+tab);
            async.eachOfLimit(tab, 1, function (element, index, ecb) {

                request.get({
                    url: element
                }, function (err, response, body) {
                    if (err || !response || response.statusCode != 200) {
                        console.log("Erreur prod 3 dans async each of");
                        return ecb("[getres]" + err)
                    } else {
                        body = JSON.parse(body)
                        var name = element.split("/");
                        name = name[name.length - 1]
                        res[name] += body.number;
                        let text = "";
                        for (let i = 0; i < res[name]; i++) {
                            text += name + "\n";
                        }
                        fs.writeFile(name + ".txt", text, "utf8", function (err) {
                            if (err) {
                                console.log(err)
                            } else {return ecb(null, null)
                            }
                        });

                    }
                })

            }, function (err) {

                if (err) {
                    return pcb(true, null);
                } else {
                    return pcb(null, null);
                    // result[“https://www.google.fr”] contient la page html de google
                    // result[“http://amazon.fr”] contient la page html de amazon, ...
                }
            });
        }
    });
}
async.parallel({prod1: getProd1, prod2: getProd2,prod3: getProd3},function(err, result){ // callback final
    if(err)
    {
        console.log("erreur dans async parrallel");
    }
    else
    {
        console.log(" c'st la fin");
    }
});
