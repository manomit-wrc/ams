module.exports = function(app, models) {

	app.get('/admin/activity/budget/:id', function(req, res) {
			var activity_id = req.params['id'];
			var budget_count;
			Promise.all([
				models.activitybudgetdetails.findAndCountAll({
					where: {
						activity_id: activity_id,
					}
				}),
				models.activitybudgetdetails.findAll({
					where: {
						activity_id: activity_id,
					}
				}),
				models.mastercontact.findAll({
					where:{
						record_type: 'T'
					},
					attributes : ['id','first_name' ,'last_name']
				}),
				models.mastercontact.findAll({
					where:{
						record_type: 'C'
					},
					attributes : ['id','first_name' ,'last_name']
				})
			]).then(function(values){
				var result = JSON.parse(JSON.stringify(values));

				res.render('admin/activity/budget/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], details:result[1], activity_id:activity_id, budget_count:result[0].count, target:result[2], client:result[3]});	
			});
				
	});

	app.get('/admin/activity/budget/add/:activity_id', function(req, res) {
			res.render('admin/activity/budget/add',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], activity_id:req.params['activity_id']});		
	});

	app.post('/admin/activity/budget/add/:activity_id', function(req, res) {
		var budget = req.body;
		
		models.activity.findAll({
			where: {
					id: req.params['activity_id'],
			}
		}).then(function(values){
			//console.log(values[0].dataValues.budget_details_id);
			models.budgetdetails.findAll({
				where: {
					id: values[0].dataValues.budget_details_id,
				}
			}).then(function(result){
				var budget_details_code = result[0].budget_code;
				for (var i = 0; i < Object.keys(budget).length; i+=2) {
					var array = Object.keys(budget)[i].split("_");
					var budget_code_type = array[0].substr(0,2);
					//console.log(budget[Object.keys(budget)[i]]);

					var array_1 = Object.keys(budget)[i+1].split("_");
					//console.log(budget[Object.keys(budget)[i+1]]);

					models.activitybudgetdetails.create({
					        	activity_id: req.params['activity_id'],
								budget_code_type: budget_code_type,
								budget_code: array[0],
								budget_code_hours: budget[Object.keys(budget)[i]],
								budget_code_cost: budget[Object.keys(budget)[i+1]],
								original_budget_code_hours: budget[Object.keys(budget)[i]],
								original_budget_code_cost: budget[Object.keys(budget)[i+1]],
								budget_dtl_status: budget_details_code,
								remarks: 'remark',
			        });
	    		}
	    		req.flash('succ_add_msg', 'Activity budget added successfully');
				var redirectUrl = '/admin/activity/budget/' + req.params['activity_id'];
  				res.redirect(redirectUrl);
			});
		});
		
	});

	// EDIT BUDGTE REPORT OPERATION //

	app.get('/admin/activity/budget/edit/:activity_id', function(req, res) {
		var details = [];
		models.activitybudgetdetails.findAll({
			where: {
				activity_id: req.params['activity_id'],
			},
			attributes : ['activity_id', 'budget_code_hours', 'budget_code_cost']
		}).then(function(values){
			for (var i = 0; i < Object.keys(values).length; i+=1) {
				details.push(values[Object.keys(values)[i]].dataValues);				
			}
			res.render('admin/activity/budget/edit',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], details:details, activity_id:req.params['activity_id']});

		});	
	});

	app.post('/admin/activity/budget/edit/:activity_id', function(req, res) {

		models.activitybudgetdetails.destroy({
		    where: {
		       activity_id:req.params['activity_id']
		    }
		}).then(function(response){
			var budget = req.body;
		
			models.activity.findAll({
				where: {
						id: req.params['activity_id'],
				}
			}).then(function(values){
				//console.log(values[0].dataValues.budget_details_id);
				models.budgetdetails.findAll({
					where: {
						id: values[0].dataValues.budget_details_id,
					}
				}).then(function(result){
					var budget_details_code = result[0].budget_code;
					for (var i = 0; i < Object.keys(budget).length; i+=2) {
						var array = Object.keys(budget)[i].split("_");
						var budget_code_type = array[0].substr(0,2);
						//console.log(budget[Object.keys(budget)[i]]);

						var array_1 = Object.keys(budget)[i+1].split("_");
						//console.log(budget[Object.keys(budget)[i+1]]);

						models.activitybudgetdetails.create({
						        	activity_id: req.params['activity_id'],
									budget_code_type: budget_code_type,
									budget_code: array[0],
									budget_code_hours: budget[Object.keys(budget)[i]],
									budget_code_cost: budget[Object.keys(budget)[i+1]],
									original_budget_code_hours: budget[Object.keys(budget)[i]],
									original_budget_code_cost: budget[Object.keys(budget)[i+1]],
									budget_dtl_status: budget_details_code,
									remarks: 'remark',
				        });
		    		}
		    		req.flash('succ_add_msg', 'Activity budget edited successfully');
					var redirectUrl = '/admin/activity/budget/' + req.params['activity_id'];
	  				res.redirect(redirectUrl);
				});
			});
		});
	});

	// END //

	app.get('/admin/activity/budget/delete/:activity_id', function(req, res){
		models.activitybudgetdetails.destroy({
		    where: {
		       activity_id:req.params['activity_id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Budget report deleted successfully');
			var redirectUrl = '/admin/activity/budget/' + req.params['activity_id'];
	  		res.redirect(redirectUrl);
		});
	});
};
