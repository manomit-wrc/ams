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
				res.render('admin/activity/add',{layout:'dashboard',firm_details:firm_v, attorney: result[1][0],activity_goal: result[2], code: result[3], practice_area: result[4], activity_details: result[5], budget_details: result[6] });
			});
 
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

	app.get('/admin/activity/edit/:id', function(req, res){
		// models dependancy
		models.activity.belongsTo(models.activitygoal,{foreignKey: 'activity_goal'});
		models.activity.belongsTo(models.code,{foreignKey: 'activity_type_id'});
		models.activity.belongsTo(models.practicearea,{foreignKey: 'practice_area_type'});
		models.activity.belongsTo(models.activitydetails,{foreignKey: 'activity_details_id'});
		models.activity.belongsTo(models.budgetdetails,{foreignKey: 'budget_details_id'});
		//end
		Promise.all([
			models.activitygoal.findAll({attributes: ['id', 'activity_goal']}),
		  	models.code.findAll(),
		  	models.practicearea.findAll(),
			models.activitydetails.findAll({attributes: ['id', 'code', 'short_description']}),
			models.budgetdetails.findAll({attributes: ['id', 'budget_code', 'short_description']}),
			models.activity.findAll({
				where: {
    				id: req.params['id']
  				},
  				include: [{model: models.activitygoal},{model: models.code},{model: models.practicearea},{model: models.activitydetails},{model: models.budgetdetails}]
			})
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			//console.log(result[5][0]);
			res.render('admin/activity/edit',{layout:'dashboard',activity_goal_array: result[0], code: result[1], practice_area: result[2], activity_details: result[3], budget_details: result[4], details: result[5][0] });			
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

	app.get('/admin/activity/budget', function(req, res) {
			res.render('admin/activity/budget/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0]});		
	});

	app.get('/admin/activity/budget/add', function(req, res) {
			res.render('admin/activity/budget/add',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0]});		
	});
};
