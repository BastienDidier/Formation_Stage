module.exports = function (router) {

    router.post('/user/add/form', require('../middlewares/verifChamps.js'), require('../controllers/RenderFormAddUser'));

    router.post('/user/add/xhr', require('../middlewares/verifChamps.js'), require("../controllers/AjaxActionFormAddUser"));

    router.get('/user/delete', require('../controllers/RenderListDeleteUser'));



    router.get('/user/add', require('../controllers/RenderForm.js'));

    router.post('/user/list', require('../controllers/AjaxActionListRemoveAllUsers'));

    router.get("/user/list", require('../controllers/RenderList'));

    router.get('/users', require('../controllers/AjaxActionListGetListUsers'));


    router.get("*", function (req, res, next) {

        return res.status(500).json({error: true});
    });

    router.post("*", function (req, res, next) {

        return res.status(500).json({error: true});
    });

    return router;
};