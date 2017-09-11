module.exports = function(app, models) {

	var md5 = require('md5');

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
		}).catch(function(err){
			var validation_error = err.errors;
	    	res.render('admin/attorney/add', {
		        layout: 'dashboard',
		        error_message: validation_error[0].message,
		        body: req.body
        	});
		});

	});


	//attorney profile view
	app.get('/admin/attorney/attorney-profile',function(req, res){
		Promise.all([
			models.country.findAll(),
			models.group.findAll({attributes: ['id', 'group']}),
			models.section.findAll({attributes: ['id', 'name']}),
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			//console.log(result[1]);
			res.render('admin/attorney/attorney-profile',{layout:'dashboard',countries:result[0], group:result[1], section:result[2]});
		});

	});

	//fetch all states respect to selected country
	app.post('/admin/attorney/fetch_state',function(req, res){
		models.state.findAll({
		   where: {
    			country_id: req.body.country_id
  			}
		}).then(function(states){
			res.send(states);
		});
			
	});

	//fetch all cities respect to selected state
	app.post('/admin/attorney/fetch_city',function(req, res){
		models.city.findAll({
		   where: {
    			state_id: req.body.state_id
  			}
		}).then(function(cities){
			res.send(cities);
		});
			
	});

	//fetch zipcode respect to selected city
	app.post('/admin/attorney/fetch_zipcode',function(req, res){
		models.zipCode.findAll({
		   where: {
    			city_name: req.body.city_name
  			}
		}).then(function(zip_code){
			res.send(zip_code);
		});
			
	});

	//update attorney address in first tab by ajax
	app.post('/admin/attorney/update_attorney_address',function(req, res){
		var user_id = req.user.id;
		models.admin.update({
    		address: req.body.address,
			address_2: req.body.address_2,
			address_3: req.body.address_3,
			phone_no: req.body.phone_no,
			country_id: req.body.attorney_country_id,
			state_id: req.body.attoney_state_id,
			city_id: req.body.attoney_city_id,
			zipcode: req.body.attorney_zip_code,
			fax: req.body.fax,
			mobile: req.body.mobile,
			website: req.body.website,
			social: req.body.social,
	    },{ where: { 
	    		id: user_id 
	    	} 
	    }).then(function(result){
	    	res.send('success');
	    }).catch(function(err){	    	
	    	res.send('fail');
	    	
	    });
	});
};
