module.exports = function(router, passport){
	router.use(function(req, res, next){
		console.log('validando autenticacao');
		if(req.isAuthenticated()){
			console.log('autenticacdo');
			return next();
		} 
		console.log('NAO autenticacdo');
		res.redirect('/auth');
	});

	router.get('/profile', function(req, res){
		res.render("profile.ejs", {user: req.user});
	});

	router.get('/*', function(req, res){
		res.render("profile.ejs", {user: req.user});
	});	
}