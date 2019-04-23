var request = require("request");
request.get({
    url: "https://stage.optionizr.com/session",
    followRedirect: false,
    followAllRedirect: false,
    headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64))"
    }
}, function(err, response, body){
    if(err || !response || response.statusCode != 302 || !response.headers["location"] || !response.headers["set-cookie"])
    {
        console.log(err);
        console.log("Erreurj");
    }
    else
    {
        var re 		= new RegExp("(stage-secure=.*?);", "gmi");
        var result 	= new RegExp("(stage-secure=.*?);", "gmi").exec(response.headers["set-cookie"].join(""));
        securecookie = (result && result.length >= 2) ? result[1] : "";

        request.get({
            url: response.headers["location"],
            json: true,
            headers: {
                "Cookie": 	securecookie,
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64)"
            }
        }, function(err, response, body){
            if(err || !response || response.statusCode != 200)
            {
                console.log(err);
                console.log("Erreur requête 2");
            }
            else
            {
                console.log("Résultat");
                console.log(body)
            }
        });
    }
});