var User = require('../models/user');

module.exports = function(router, passport){
	router.get('/', function(req, res){
		res.render("index.ejs");
	});


	//LOCAL
	router.get('/login', function(req, res){
		res.render("login.ejs", {message: req.flash('loginMessage')});
	});

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/auth/login',
		failureFlash: true
	}));

	router.get('/signup', function(req, res){
		res.render("singup.ejs", {message: req.flash('signupMessage')});
	});

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/auth',
		failureRedirect: '/auth/signup',
		failureFlash: true
	}));

	router.get('/connect/local', function(req, res){
		res.render("connect-local.ejs", {message: req.flash('signupMessage')});
	});

	router.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/auth/connect/local',
		failureFlash: true
	}));

	router.get('/unlink/local', function(req, res){
		var user = req.user;
		user.local.username = null;
		user.local.password = null;
		user.save(function(err){ 
			if(err) {throw err};
			res.redirect('/profile');
		});
	});


	//FACEBOOK
	router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

	router.get('/connect/facebook', passport.authenticate('facebook', {scope: ['email']}));

	router.get('/facebook/callback',
	  passport.authenticate('facebook', { successRedirect: '/profile',
	                                      failureRedirect: '/auth' }));

	router.get('/unlink/facebook', function(req, res){
		var user = req.user;
		user.facebook.token = null;
		user.save(function(err){ 
			if(err) {throw err};
			res.redirect('/profile'); 
		});
	});

	//GOOGLE
	router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile','email']}));
	router.get('/connect/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile','email']}));

	router.get('/google/callback',
	  passport.authenticate('google', { successRedirect: '/profile',
	                                      failureRedirect: '/auth' }));

	router.get('/unlink/google', function(req, res){
		var user = req.user;
		user.google.token = null;
		user.save(function(err){ 
			if(err) {throw err};
			res.redirect('/profile');
		});
	});

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/auth'); 
	});
};