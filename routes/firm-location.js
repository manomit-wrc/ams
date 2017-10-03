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

	app.get('/admin/attorney-goal/delete/:id', function(req, res){
		models.attorneygoal.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Attorney goal deleted successfully');
			res.redirect('/admin/attorney-goal');
		});
	});

	app.get('/admin/attorney-goal/edit/:id', function(req, res){
		// models dependancy
		models.attorneygoal.belongsTo(models.admin, {foreignKey: 'attorney_id'});
		//end
		Promise.all([
			models.admin.findAll({
				where: {
					role_code: 'ATTR'
				},
				attributes: ['id', 'first_name','last_name']
			}),
			models.attorneygoal.findAll({
				where:{
					id: req.params['id']
				}
			})
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			res.render('admin/attorney-goal/edit',{layout:'dashboard', attorney:result[0], attorney_goal_details:result[1][0]});			
		});
	});

 	app.post('/admin/attorney-goal/edit/:id', function(req, res){
		models.attorneygoal.update({
			attorney_id: req.body.attorney_id,
			current_year: req.body.current_year,
			current_year_goal: req.body.current_year_goal,
			goal_percentage: req.body.goal_percentage,
			summary: req.body.summary,
			remarks: req.body.remarks_notes
	    },{ where: { id: req.params['id'] }}).then(function(result){
	    	req.flash('succ_add_msg', 'Attorney goal edited successfully');
	    	res.redirect('/admin/attorney-goal');
	    }).catch(function(err){	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/attorney-goal/edit/' + req.params['id'];
  			res.redirect(redirectUrl);	    	
	    });
	});

	// activity goal operations //
	app.get('/admin/attorney-goal/activity-goal', function(req, res) {
		models.activitygoal.belongsTo(models.admin,{foreignKey: 'attorney_seq_no'});
		models.activitygoal.findAll({
			include: [{model: models.admin, required: true}]
		}).then(function(result){
			//console.log(result);
			res.render('admin/attorney-goal/activity-goal/index',{layout:'dashboard', result:result, succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	app.get('/admin/attorney-goal/activity-goal/add', function(req, res){
		models.admin.findAll({
			where: {
				role_code: 'ATTR'
			},
			attributes: ['id', 'first_name','last_name']
		}).then(function(values){
			res.render('admin/attorney-goal/activity-goal/add',{layout:'dashboard', attorney:values});			
		});
	});

	app.post('/admin/attorney-goal/activity-goal/add', function(req, res){
		models.activitygoal.create({
			attorney_seq_no: req.body.attorney_id,
			firm_seq_no: req.body.firm_id,
			activity_goal: req.body.activity_goal,
			from_date: req.body.from_date,
			to_date: req.body.to_date,
			remarks: req.body.remarks_notes,
		}).then(function(result){
			req.flash('succ_add_msg', 'Activity goal added successfully');
			res.redirect('/admin/attorney-goal/activity-goal');
			
		});
	});
	// end //
};
