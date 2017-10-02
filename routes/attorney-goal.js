module.exports = function(app, models) {

	app.get('/admin/attorney-goal', function(req, res) {
		models.attorneygoal.belongsTo(models.admin,{foreignKey: 'attorney_id'});
		models.attorneygoal.findAll({
			include: [{model: models.admin, required: true}]
		}).then(function(result){
			//console.log(result);
			res.render('admin/attorney-goal/index',{layout:'dashboard', result:result, succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	app.get('/admin/attorney-goal/add', function(req, res){
			models.admin.findAll({
				where: {
					role_code: 'ATTR'
				},
				attributes: ['id', 'first_name','last_name']
			}).then(function(values){
				res.render('admin/attorney-goal/add',{layout:'dashboard', attorney:values});			
			});
	});

	app.post('/admin/attorney-goal/add', function(req, res){

		models.attorneygoal.create({
			firm_id: req.body.firm_id,
			attorney_id: req.body.attorney_id,
			current_year: req.body.current_year,
			current_year_goal: req.body.current_year_goal,
			goal_percentage: req.body.goal_percentage,
			summary: req.body.summary,
			remarks: req.body.remarks_notes,
		}).then(function(result){
			req.flash('succ_add_msg', 'Attorney goal added successfully');
			res.redirect('/admin/attorney-goal');
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
			res.render('admin/referrel/edit',{layout:'dashboard', attorney:result[0], firm:result[1][0], master_contact_result:result[2][0], targets:result[3], clients:result[4]});			
		});
	});

	app.post('/admin/referrel/edit/:id', function(req, res){
		models.mastercontact.update({
			attorney_id: req.body.attorney_id,
			first_name: req.body.referrel_first_name,
			last_name: req.body.referrel_last_name,
			type: req.body.referrel_type,
			company_name: req.body.organisation,
			email: req.body.referrel_email,
			phone: req.body.referrel_mobile,
			referrel_id: req.body.referred_by_target ? req.body.referred_by_target: req.body.referred_by_client,
			remarks_notes: req.body.remarks_notes,
	    },{ where: { id: req.params['id'] }}).then(function(result){
	    	req.flash('succ_add_msg', 'Referrel edited successfully');
	    	res.redirect('/admin/referrel');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/referrel/edit/' + req.params['id'];
  			res.redirect(redirectUrl);
	    	
	    });
	});
};
