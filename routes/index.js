module.exports = function(app, passport) {

	// =====================================
	// Login PAGE (with login links) ========
	// =====================================
	app.get('/admin', function(req, res) {

		var msg = req.flash('loginMessage')[0];
		res.render('admin/login',{layout:'login',message: msg});
	});

	// process the login form
	app.post('/admin', passport.authenticate('local-login', {
            successRedirect : '/admin/dashboard', // redirect to the secure profile section
            failureRedirect : '/admin', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember_me) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/admin');
    });

};

// route middleware to make sure
