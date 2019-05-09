
function checkResult(res) {
    return checkNom(res.nom) && checkPrenom(res.prenom) && checkAge(res.age) && checkAdresse(res.adresse);
}

function checkNom(nom) {
    let ok = true;
    if (nom.length < 1) {
        ok = false;
    }
    if (nom.length > 50) {
        ok = false;
    }
    return ok;
}

function checkPrenom(prenom) {
    return checkNom(prenom);
}

function checkAge(age) {
    if (isNaN(age) || age < 0 || age > 120) {
        return false
    } else {
        return true;
    }
}

function checkAdresse(adresse) {
   let  ok = true;
    if (adresse.length < 1) {
        ok = false;
    }
    if (adresse.length > 500) {
        ok = false;
    }
    return ok;
}


module.exports = function (req, res, next) {
    console.log("passe ici");
        console.log(res.locals);
        console.log("verif champs ici");
        if (checkResult(req.body))
            return next();
        else {
            res.locals.error=1;
            console.log("verif serveur ne passe pas");
            return next();
        }
};