module.exports = function(app, models) {

	app.get('/admin/activity/budget/:id', function(req, res) {
			var activity_id = req.params['id'];
			models.activitybudgetdetails.findAll().then(function(values){
				res.render('admin/activity/budget/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], details:values});	
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
				console.log(budget.length);
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
};
