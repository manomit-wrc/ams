module.exports = function(app, models) {

	var md5 = require('md5');

	// get attorney index page (listing)
	app.get('/admin/attorney',function(req, res){
			res.render('admin/attorney/index',{layout:'dashboard'});
	});

	// add attorney by site admin view
	app.get('/admin/attorney/add', function(req, res){
		models.firm.findAll({
		   where: {
    			status: '1'
  			}
		}).then(function(firm){
			res.render('admin/attorney/add',{layout:'dashboard', firm:firm, succ_add_msg: req.flash('succ_add_msg')[0]});
		});
	});


	// add attorney by site admin process
	app.post('/admin/attorney/add', function(req, res){
		models.admin.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: md5(req.body.password),
			role_code: 'ATTR',
			reg_type: 'I',
			phone_no: '',
			is_attorney: '1'
		}).then(function(admin){
			models.attorney.create({
				firm_id: req.body.firm_id,
				user_id: admin.id
			}).then(function(firm){
				req.flash('succ_add_msg', 'Attorney added successfully');
				res.redirect('/admin/attorney/add');
				//res.send(true);
			}).catch(function(err){
				var validation_error = err.errors;
		    	res.render('admin/attorney/add', {
			        layout: 'dashboard',
			        error_message: validation_error[0].message,
			        body: req.body
	        	});
			});
		});
	});


	//attorney profile view
	app.get('/admin/attorney/attorney-profile',function(req, res){
		models.country.findAll().then(function(countries){
			res.render('admin/attorney/attorney-profile',{layout:'dashboard',countries:countries});
		});
			
	});
};
