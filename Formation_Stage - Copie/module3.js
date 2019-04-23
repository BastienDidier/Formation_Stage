var async=require("async");
var fs=require("fs")
var request = require("request");

function getForm1(pcb){
    request.post({

        url: "https://stage.optionizr.com/api/formpost1",
        headers: {
            "Content-Type": "application/x-form-www-urlencoded"
        },
        form: {
            monChamps1: 12,
            monChamps4: 3
        }

    }, function(err, response, body){

        if(err || !response || response.statusCode != 200)
        {
            console.log(err);
            console.log("Erreur");
        }
        else
        {
            console.log("Résultat :");
            var tab=body.split('span class="result">')
            result=tab[1]
            result=result.split("</span>");
            console.log(result[0])
            return pcb(null,result[0])
            // console.log(tab)

        }
    });
}
function getForm2(pcb){
    request.post({

        url: "https://stage.optionizr.com/api/formpost2",
        headers: {
            "Content-Type": "application/x-form-www-urlencoded"
        },
        form: {
            monChamps1: 7,
            monChamps4: 3
        }

    }, function(err, response, body){

        if(err || !response || response.statusCode != 200)
        {
            console.log(err);
            console.log("Erreur");
        }
        else
        {
            console.log("Résultat :");
            var tab=body.split('span class="result">')
            result=tab[1]
            result=result.split("</span>");
            console.log(result[0])
            return pcb(null,result[0])
        }
    });
}

async.parallel({prod1: getForm1, prod2: getForm2},function(err, result){ // callback final
    if(err)
    {
        console.log("erreur dans async parrallel");
    }
    else
    {
        tab="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
        tab=tab.split(" ")
        console.log(result)
        nb=parseInt(result.prod1)+parseInt(result.prod2)
        console.log(nb)
        text=""
        for(let i=0;i<nb;i++){
            if(i<tab.length){
                fs.writeFile(i+".txt",tab[i],"utf8",function (err) {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("ecrit")
                    }
                });
            }else{
                fs.writeFile(i+".txt",text,"utf8",function (err) {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("ecrit")
                    }
                });
            }

        }
        console.log(" c'est la fin");
    }
});