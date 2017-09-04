module.exports = function(app, models) {

	var md5 = require('md5');
	app.get('/admin/attorney',function(req, res){
			res.render('admin/attorney/index',{layout:'dashboard'});
	});

	app.get('/admin/attorney/add', function(req, res){
		models.firm.findAll().then(function(firm){
			res.render('admin/attorney/add',{layout:'dashboard', firm:firm});
		});
	});

	app.post('/admin/attorney/add', function(req, res){
		models.admin.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: md5(req.body.password),
			role_code: 'ATTR',
			reg_type: 'I',
			phone_no: ''
		}).then(function(admin){
			res.redirect('/admin/attorney');
		}).catch(function(err){
			var validation_error = err.errors;
	    	res.render('admin/attorney/add', {
		        layout: 'dashboard',
		        error_message: validation_error[0].message,
		        body: req.body
        	});
		});
	});
};
