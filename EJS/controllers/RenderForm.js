;
module.exports  =  function (req, res)
{

    if(req.query.error){

        return  res.render("FormAddUser.ejs",{error:true});

    }else{

        if(req.query.success){

            return res.render ("FormAddUser.ejs", {success:true});

        }else{

            return res.render ("FormAddUser.ejs", {});

        }

    }
};
