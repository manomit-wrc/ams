module.exports = function(app, models) {

	app.get('/admin/firm-location', function(req, res) {
		models.firmlocation.findAll().then(function(result){
			//console.log(result);
			res.render('admin/firm-location/index',{layout:'dashboard', result:result, succ_add_msg:req.flash('succ_add_msg')[0]});
		});		
	});

	app.get('/admin/firm-location/add', function(req, res){
		models.country.findAll().then(function(values){
			res.render('admin/firm-location/add',{layout:'dashboard',countries:values});			
		});
	});

	app.post('/admin/firm-location/add', function(req, res){
		models.firmlocation.create({
			firm_id: req.body.firm_id,
			firm_address_type: req.body.address_type,
			address_line1: req.body.address_line_1,
			address_line2: req.body.address_line_2,
			address_line3: req.body.address_line_3,
			country_id: req.body.country_id,
			city_id: req.body.city_id,
			state_id: req.body.state_id,
			postal_code: req.body.zipcode,
			email: req.body.email,
			phone: req.body.phone,
			fax: req.body.fax,
			mobile: req.body.mobile_cell,
			website_url: req.body.website_url,
			social_url: req.body.social_media_url
		}).then(function(result){
			req.flash('succ_add_msg', 'Location added successfully');
			res.redirect('/admin/firm-location');
		}).catch(function(err){
			var validation_error = err.errors;
            res.render('admin/firm-location/add', {
                layout: 'dashboard',
                error_message: validation_error[0].message,
                body: req.body
            });
		});
	});

	app.get('/admin/firm-location/delete/:id', function(req, res){
		models.firmlocation.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Firm Location deleted successfully');
			res.redirect('/admin/firm-location');
		});
	});

	app.get('/admin/firm-location/edit/:id', function(req, res){
		// models dependancy
		models.firmlocation.belongsTo(models.country, {foreignKey: 'country_id'});
		models.firmlocation.belongsTo(models.city, {foreignKey: 'city_id'});
		models.firmlocation.belongsTo(models.state, {foreignKey: 'state_id'});
		models.firmlocation.belongsTo(models.zipcode, {foreignKey: 'postal_code'});
		//end
		Promise.all([
			models.country.findAll(),
			models.firmlocation.findAll({
				where: {
					id: req.params['id']
				}
			}),
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			res.render('admin/firm-location/edit',{layout:'dashboard', countries:result[0], firm_location_details:result[1][0]});		
		});
	});

 	app.post('/admin/firm-location/edit/:id', function(req, res){
		models.firmlocation.update({
			firm_address_type: req.body.address_type,
			address_line1: req.body.address_line_1,
			address_line2: req.body.address_line_2,
			address_line3: req.body.address_line_3,
			country_id: req.body.country_id,
			city_id: req.body.city_id,
			state_id: req.body.state_id,
			postal_code: req.body.zipcode,
			email: req.body.email,
			phone: req.body.phone,
			fax: req.body.fax,
			mobile: req.body.mobile_cell,
			website_url: req.body.website_url,
			social_url: req.body.social_media_url,
	    },{ where: { id: req.params['id'] }}).then(function(result){
	    	req.flash('succ_add_msg', 'Firm location edited successfully');
	    	res.redirect('/admin/firm-location');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/firm-location/edit/' + req.params['id'];
  			res.redirect(redirectUrl);
	    	
	    });
	});
};
