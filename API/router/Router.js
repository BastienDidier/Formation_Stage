module.exports = function (router) {


    /**
     * GET /user => récupère un user
     * GET /users => list user
     * POST /user/delete => suppression un user
     * POST /users/delete => suppression tout les users
     * POST /user/add => ajout un user
     * POST /user/update => mise à jour information tout sauf _id
     */

    router.post('/user/delete',require('../middlewares/CheckSecurityPost'), require('../controllers/DeleteUser'));

    router.post('/user/add', require('../controllers/AddUser'));

    router.post('/users/delete',require('../middlewares/CheckSecurityPost'),  require('../controllers/DeleteAllUsers'));

    router.post('/user/update',require('../middlewares/CheckSecurityPost'), require('../controllers/UpdateUser'));

    router.get('/users',require('../middlewares/CheckSecurityGet'),require('../controllers/GetTabUsers'));
    //done
    router.get('/user',require('../controllers/GetUser.js'));

    router.get("*", function (req, res, next) {
        console.log("ici");
        return res.status(500).json({error: true});
    });

    router.post("*", function (req, res, next) {

        return res.status(500).json({error: true});
    });

    return router;
};