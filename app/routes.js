var User = require('../models/user');

module.exports = function(app){
	app.get('/', function(req, res){
		res.render("index.ejs");
	});

	app.get('/singup', function(req, res){
		res.render("singup.ejs", {message: 'xalala'});
	});

	app.get('/:username/:password', function(req, res){
		console.log("gravando user");
		var user = new User();
		user.local.password = req.params.password
		user.local.username = req.params.username
		console.log("user: "+user);
		user.save(function(err){
			if(err){
				throw err;
			}
		})

		res.send('Usuario '+user.local.username+' salvo, modafoca!')
	});
}