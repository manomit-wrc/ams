module.exports = function(app, models) {

	app.get('/admin/competitor', function(req, res) {
		models.competitor.findAll().then(function(values){
			//console.log(values);
			res.render('admin/competitor/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result:values});
		})		
	});

	app.get('/admin/competitor/add', function(req, res){
		
		Promise.all([
			models.country.findAll(),
			models.industrytype.findAll({attributes: ['id', 'industry']}),
			models.code.findAll({
				where: {
					category_type: 'Competitor Rank'
				},
				attributes: ['id', 'code', 'short_description']
			}),
			models.admin.findAll({
				where: {
					role_code: 'ATTR',
					id: req.user.id
				},
				attributes: ['id', 'first_name','last_name']
			})
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			res.render('admin/competitor/add',{layout:'dashboard', countries:result[0], industry_types:result[1], rank:result[2], attorney:result[3][0]});			
		});		
	});

	app.post('/admin/competitor/add', function(req, res){
		models.competitor.create({
			attorney_id: req.body.attorney_id,
			competitor_id: req.body.competitor_id,
			code: req.body.competitor_code,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			dob: req.body.dob,
			industry_type: req.body.industry_type,
			experience: req.body.experience,
			bar_date: req.body.bar_date,
			bar_belongs_to_state: req.body.belongs_to_state,
			independent: req.body.independent,
			chambers: req.body.chambers,
			best: req.body.best,
			martindale: req.body.martin,
			super_lawyers: req.body.super_lawyer,
			email: req.body.email,
			phone: req.body.phone,
			fax: req.body.fax,
			mobile: req.body.mobile_cell,
			address_line_1: req.body.address_line_1,
			address_line_2: req.body.address_line_2,
			address_line_3: req.body.address_line_3,
			country_id: req.body.country_id,
			state_id: req.body.state_id,
			city_id: req.body.city_id,
			postal_code: req.body.zipcode,
			remarks: req.body.remarks
		}).then(function(activity){
			req.flash('succ_add_msg', 'Competitor added successfully');
			res.redirect('/admin/competitor');
		}).catch(function(err){
			var validation_error = err.errors;
            res.render('admin/activity/add', {
                layout: 'dashboard',
                error_message: validation_error[0].message,
                body: req.body
            });
		});

	});

	app.get('/admin/competitor/delete/:id', function(req, res){
		models.competitor.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Competitor deleted successfully');
			res.redirect('/admin/competitor');
		});
	});

	app.get('/admin/competitor/edit/:id', function(req, res){
		// models dependancy
		models.competitor.belongsTo(models.industrytype,{foreignKey: 'industry_type'});
		models.competitor.belongsTo(models.country,{foreignKey: 'country_id'});
		models.code.hasMany(models.competitor,{foreignKey: 'independent'});
		//end
		Promise.all([
			models.country.findAll(),
			models.industrytype.findAll({attributes: ['id', 'industry']}),
			models.code.findAll({
				where: {
					category_type: 'Competitor Rank'
				},
				attributes: ['id', 'code', 'short_description']
			}),
			models.admin.findAll({
				where: {
					role_code: 'ATTR',
					id: req.user.id
				},
				attributes: ['id', 'first_name','last_name']
			}),
			models.competitor.findAll()
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			//console.log(result[5][0]);
			res.render('admin/competitor/edit',{layout:'dashboard',country: result[0], industrytype: result[1], code: result[2], competitor: result[3], competitor: result[4][0] });			
		});
	});

 	app.post('/admin/activity/edit/:id', function(req, res){
		models.activity.update({
			activity_type_id: req.body.activity_type,
			activity_goal: req.body.activity_goal,
			practice_area_type: req.body.practice_area_type,
			potential_revenue: req.body.potential_revenue,
			activity_name: req.body.activity_name,
			activity_reason: req.body.activity_reason,
			creation_date: req.body.creation_date,
			from_duration: req.body.from_date,
			to_duration: req.body.to_date,
			activity_details_id: req.body.act_details_status,
			budget_details_id: req.body.budget_details_status,
			remarks: req.body.remarks_notes
	    },{ where: { id: req.params['id'] }}).then(function(result){
	    	req.flash('succ_add_msg', 'Activity edited successfully');
	    	res.redirect('/admin/activity');
	    }).catch(function(err){	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/activity/edit/' + req.params['id'];
  			res.redirect(redirectUrl);	    	
	    });
	});

};
