module.exports = function(app, models) {
	app.get('/admin/attorney-budget-report', function(req, res) {

		models.admin.hasMany(models.firm,{foreignKey: 'user_id'});
		models.admin.hasMany(models.attorney,{foreignKey: 'user_id'});
		models.admin.findAll({
			where: {
				role_code: 'ATTR'
			},
			include: [{model: models.firm},{model: models.attorney}]
		}).then(function(values){
			res.render('admin/view-attorney-budget-report/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], attorney: values});

		});
				
	});

	app.get('/admin/attorney-budget-report/listing', function(req, res) {
		res.render('admin/view-attorney-budget-report/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0]});
	});


	app.post('/admin/attorney-budget-report/listing', function(req, res) {
		var sum_hours = 0;
		var sum_cost = 0;

		Promise.all([
			models.sequelize.query("SELECT codes.code, codes.short_description,SUM(activitybudgetdetails.budget_code_hours) as total_hours,SUM(activitybudgetdetails.budget_code_cost) as total_cost,activitybudgetdetails.budget_dtl_status,activitybudgetdetails.budget_code,activitybudgetdetails.createdAt,activities.attorney_id  FROM codes,activitybudgetdetails,activities WHERE activities.id=activitybudgetdetails.activity_id AND codes.code=activitybudgetdetails.budget_code AND activities.attorney_id='"+req.body.attorney_id+"' AND codes.category_type ='Budget Codes' GROUP BY activitybudgetdetails.budget_code", { type:models.sequelize.QueryTypes.SELECT}),

			models.admin.findAll({
				attributes: ["first_name", "last_name"],
				where: {
					id: req.body.attorney_id
				}
			})
		])
   		.then(function(values) {
   			var name = values[1][0].first_name+" "+values[1][0].last_name;
   			for (var i = 0; i < Object.keys(values[0]).length; i+=1) {
   				sum_hours += parseInt(values[0][Object.keys(values[0])[i]].total_hours);
   				sum_cost += parseInt(values[0][Object.keys(values[0])[i]].total_cost);
   			}
      		res.render('admin/view-attorney-budget-report/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values[0], sum_hours:sum_hours, sum_cost:sum_cost, name:name});
  		});
		
	});

	//  REPORT PER BUDGET TYPE  //
	app.get('/admin/attorney-budget-report/report-per-type/:budget_type', function(req, res) {
		var sum_hours = 0;
		var sum_cost = 0;
		/*models.activity.hasMany(models.activitybudgetdetails,{foreignKey: 'activity_id'});
		models.activity.belongsTo(models.activitygoal,{foreignKey: 'activity_goal'});
		models.activity.findAll({
			include: [{model: models.activitybudgetdetails}, {model: models.activitygoal}],
			attributes: ['attorney_id', 'activity_goal'],
		}).then(function(values){
			res.render('admin/view-attorney-budget-report/report-per-type',{layout:'dashboard', result:values});			
		});*/
		Promise.all([
			models.sequelize.query("SELECT `activitybudgetdetails`.*, `activities`.`attorney_id`, `activities`.`activity_goal`,`activitygoals`.`activity_goal` FROM `activitybudgetdetails` INNER JOIN `activities` ON `activitybudgetdetails`.`activity_id` = `activities`.`id` INNER JOIN `activitygoals` ON `activities`.`activity_goal` = `activitygoals`.`id` WHERE `activitybudgetdetails`.`budget_code`='"+req.params['budget_type']+"'", { type:models.sequelize.QueryTypes.SELECT}),


	   		models.sequelize.query("SELECT `activitybudgetdetails`.`budget_code`, `codes`.`code`, `codes`.`short_description` FROM `activitybudgetdetails` INNER JOIN `codes` ON `activitybudgetdetails`.`budget_code` = `codes`.`code` WHERE `activitybudgetdetails`.`budget_code` = '"+req.params['budget_type']+"'", { type:models.sequelize.QueryTypes.SELECT})
	   	]).then(function(all_values){
	   		for (var i = 0; i < Object.keys(all_values[0]).length; i+=1) {
	   				sum_hours += parseInt(all_values[0][Object.keys(all_values[0])[i]].budget_code_hours);
	   				sum_cost += parseInt(all_values[0][Object.keys(all_values[0])[i]].budget_code_cost);
	   			}
			res.render('admin/view-attorney-budget-report/report-per-type',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: all_values[0], sum_hours:sum_hours, sum_cost:sum_cost, des:all_values[1][0].short_description});
 
		});

	});
		
}