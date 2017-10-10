var firm_v;
module.exports = function(app, models) {

	app.get('/admin/activity', function(req, res) {
		models.activity.belongsTo(models.code,{foreignKey: 'activity_type_id'});
		models.activity.belongsTo(models.activitydetails,{foreignKey: 'activity_details_id'});
		models.activity.findAll({
			include: [{model: models.code},{model: models.activitydetails}]
		}).then(function(values){
			res.render('admin/activity/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result:values});
		})		
	});

	app.get('/admin/activity/add', function(req, res){
		
/*		models.activity.belongsTo(models.firm,{foreignKey: 'firm_id'});
		models.activity.belongsTo(models.admin,{foreignKey: 'attorney_id'});
		models.activity.belongsTo(models.activitygoal,{foreignKey: 'activity_goal'});
		models.activity.belongsTo(models.code,{foreignKey: 'activity_type'});
		models.activity.belongsTo(models.practicearea,{foreignKey: 'practice_area_type'});
		models.activity.belongsTo(models.activitydetails,{foreignKey: 'code'});
		models.activity.belongsTo(models.budgetdetails,{foreignKey: 'budget_code'});*/
		Promise.all([
			models.attorney.findAll({
				where: {
					 user_id: req.user.id,
				}
			}),
			models.admin.findAll({
			 	where: {
					 role_code: 'ATTR',
					 id:req.user.id
				},
				attributes: ['id', 'first_name', 'last_name']
		 	}),
			models.activitygoal.findAll({attributes: ['id', 'activity_goal']}),
		  	models.code.findAll(),
		  	models.practicearea.findAll(),
			models.activitydetails.findAll({attributes: ['id', 'code', 'short_description']}),
			models.budgetdetails.findAll({attributes: ['id', 'budget_code', 'short_description']}),
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			models.firm.findAll({
				where: {
				 	id: result[0][0].firm_id,
				}
			}).then(function(firm){
				firm_v = firm[0].dataValues;
				console.log(firm_v);
			});
			console.log(firm_v);
			res.render('admin/activity/add',{layout:'dashboard',firm_details:firm_v, attorney: result[1][0],activity_goal: result[2], code: result[3], practice_area: result[4], activity_details: result[5], budget_details: result[6] }); 
		});
							
	});

	app.post('/admin/activity/add', function(req, res){
		models.activity.create({
			firm_id: req.body.firm_id,
			attorney_id: req.user.id,
			activity_type_id: req.body.activity_type,
			activity_goal: req.body.activity_goal,
			practice_area_type: req.body.practice_area_type,
			potential_revenue: req.body.potential_revenue,
			remarks: req.body.remarks_notes,
			attorney_name: req.body.attorney_name,
			activity_name: req.body.activity_name,
			activity_reason: req.body.activity_reason,
			creation_date: req.body.creation_date,
			from_duration: req.body.from_date,
			to_duration: req.body.to_date,
			activity_details_id: req.body.act_details_status,
			budget_details_id: req.body.budget_details_status,
		}).then(function(activity){
			req.flash('succ_add_msg', 'Activity added successfully');
			res.redirect('/admin/activity');
		}).catch(function(err){
			var validation_error = err.errors;
            res.render('admin/activity/add', {
                layout: 'dashboard',
                error_message: validation_error[0].message,
                body: req.body
            });
		});

	});

	app.get('/admin/activity/delete/:id', function(req, res){
		models.activity.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Activity deleted successfully');
			res.redirect('/admin/activity');
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
