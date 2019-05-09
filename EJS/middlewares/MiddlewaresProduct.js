


var compress                = require('compression');
var bodyParser              = require('body-parser');
var methodOverride          = require('method-override');
var domain                  = require('domain');
var logger                  = require('morgan');
var fs 						= require("fs");
var async 					= require("async");
var config             		= require("../config/config.js");


module.exports = function(app)
{


	app.use(function(req, res, next) {

		var requestDomain = domain.create();
		requestDomain.add(req);
		requestDomain.add(res);
		requestDomain.on('error', next);
		requestDomain.run(next);
	});

	app.use(compress());

	app.use(logger("combined",{}));

	app.use(bodyParser.json({limit:'3mb'}));
	app.use(bodyParser.urlencoded({limit: "3mb", extended: true, parameterLimit:50000}));
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(methodOverride());



	app.use(function(req, res, next) {

		var oneof = false;
		if(req.headers.origin)
		{
			res.header('Access-Control-Allow-Origin', req.headers.origin);
			res.header('Access-Control-Allow-Credentials', true);
			oneof = true;
		}
		if(req.headers['access-control-request-method'])
		{
			res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
			oneof = true;
		}
		if(req.headers['access-control-request-headers'])
		{
			res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
			oneof = true;
		}
		if(oneof)
		{
			res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
		}

		if('OPTIONS' == req.method)
		{
			return res.sendStatus(200);
		} else {
			return next();
		}
	});

	app.use(function(req, res, next){

		res.locals.animals = "cheval";
		return next();
	});

	

	return app;
	
};
