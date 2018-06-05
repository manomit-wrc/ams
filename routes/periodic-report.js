module.exports = function(app, models) {
	app.get('/admin/periodic-report', function(req, res) {
		models.code.findAll({
			where: {
				category_type: 'Budget Code Type'
			},
			attributes: ["code", "short_description"]
		}).then(function(values){
			res.render('admin/periodic-report/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result:values});	
		})
				
	});

	app.post('/admin/periodic-report/custom_date_submit', function(req, res) {
			var sum_hours = 0;
			var sum_cost = 0;

			var from_date = req.body.from_date;
			var to_date = req.body.to_date;

			var text = "Search By:"+from_date+" to "+to_date;
			
			var sql = "SELECT `activitybudgetdetails`.*, `activities`.`attorney_id`,`admins`.`first_name`, `admins`.`last_name`, SUM(`budget_code_hours`) as `hours`, SUM(`budget_code_cost`) as `cost` FROM `activitybudgetdetails` INNER JOIN `activities` ON `activitybudgetdetails`.`activity_id` = `activities`.`id` INNER JOIN `admins` ON `activities`.`attorney_id` = `admins`.`id` WHERE `activitybudgetdetails`.`createdAt`<='"+to_date+"' AND `activitybudgetdetails`.`createdAt`>='"+from_date+"' GROUP BY `activities`.`attorney_id`";

			models.sequelize.query(sql, { type:models.sequelize.QueryTypes.SELECT})
   			.then(function(values) {
   				for (var i = 0; i < Object.keys(values).length; i+=1) {
	   				sum_hours += parseInt(values[Object.keys(values)[i]].hours);
	   				sum_cost += parseInt(values[Object.keys(values)[i]].cost);
	   			}
	   			res.render('admin/budget-report-per-period/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values, sum_hours:sum_hours, sum_cost:sum_cost,text:text});
  			});
				
	});

	app.post('/admin/periodic-report/check_type', function(req, res) {
			var text = "Search By: budget heads";

			var sum_hours = 0;
			var sum_cost = 0;

			var type = req.body.budget_type;
			var quotedAndCommaSeparated = "'" + type.join("','") + "'";
			
			var sql = "SELECT `activitybudgetdetails`.*, `codes`.`code`, `codes`.`short_description`, SUM(`budget_code_hours`) as `hours`, SUM(`budget_code_cost`) as `cost` FROM `activitybudgetdetails` INNER JOIN `codes` ON `activitybudgetdetails`.`budget_code_type` = `codes`.`code` WHERE `codes`.`category_type` = 'Budget Code Type' AND `activitybudgetdetails`.`budget_code_type` IN ("+quotedAndCommaSeparated+") GROUP BY `activitybudgetdetails`.`budget_code_type`";
				//res.send(sql);
   				models.sequelize.query(sql, { type:models.sequelize.QueryTypes.SELECT})
   				.then(function(values){
   					for (var i = 0; i < Object.keys(values).length; i+=1) {
		   				sum_hours += parseInt(values[Object.keys(values)[i]].hours);
		   				sum_cost += parseInt(values[Object.keys(values)[i]].cost);
	   				}
	   				res.render('admin/periodic-report/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values, sum_hours:sum_hours, sum_cost:sum_cost,text:text});
   				});
	});
}