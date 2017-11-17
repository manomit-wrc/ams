module.exports = function(app, models) {
	app.get('/admin/budget-report-per-period', function(req, res) {
			res.render('admin/budget-report-per-period/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0]});				
	});

	app.get('/admin/attorney-budget-report/listing', function(req, res) {
		res.render('admin/view-attorney-budget-report/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0]});
	});


	app.post('/admin/budget-report-per-period/listing', function(req, res) {
		var sum_hours = 0;
		var sum_cost = 0;
		var array = new Array();
		var search_by = req.body.search_by;

		//  SEARCH BY FORT NIGHT //
		if(search_by == 'fortnight') {
			var todayDate = new Date();
			var text = "Search By: Fortnight";
			var previousDate = new Date(todayDate.getTime() - (24*60*60*1000*15));
			//console.log(previousDate);
			var sql = "SELECT `activitybudgetdetails`.*, `activities`.`attorney_id`,`admins`.`first_name`, `admins`.`last_name`, SUM(`budget_code_hours`) as `hours`, SUM(`budget_code_cost`) as `cost` FROM `activitybudgetdetails` INNER JOIN `activities` ON `activitybudgetdetails`.`activity_id` = `activities`.`id` INNER JOIN `admins` ON `activities`.`attorney_id` = `admins`.`id` WHERE `activitybudgetdetails`.`createdAt`<='"+todayDate+"' AND `activitybudgetdetails`.`createdAt`>='"+previousDate+"' GROUP BY `activities`.`attorney_id`";
			//console.log(sql);
			models.sequelize.query(sql, { type:models.sequelize.QueryTypes.SELECT})
   			.then(function(values) {
   				for (var i = 0; i < Object.keys(values).length; i+=1) {
	   				sum_hours += parseInt(values[Object.keys(values)[i]].total_hours);
	   				sum_cost += parseInt(values[Object.keys(values)[i]].total_cost);
	   			}
	   			res.render('admin/budget-report-per-period/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values, sum_hours:sum_hours, sum_cost:sum_cost, text:text});

  			});
		}

		//  SEARCH BY LAST MONTH //
		if(search_by == 'last_month') {
			var todayDate = new Date();
			var text = "Search By: Last Month";
			console.log(todayDate);
			var previousDate = new Date(todayDate.getTime() - (24*60*60*1000*30));
			//console.log(previousDate);
			var sql = "SELECT `activitybudgetdetails`.*, `activities`.`attorney_id`,`admins`.`first_name`, `admins`.`last_name`, SUM(`budget_code_hours`) as `hours`, SUM(`budget_code_cost`) as `cost` FROM `activitybudgetdetails` INNER JOIN `activities` ON `activitybudgetdetails`.`activity_id` = `activities`.`id` INNER JOIN `admins` ON `activities`.`attorney_id` = `admins`.`id` WHERE `activitybudgetdetails`.`createdAt`<='"+todayDate+"' AND `activitybudgetdetails`.`createdAt`>='"+previousDate+"' GROUP BY `activities`.`attorney_id`";
			//console.log(sql);
			models.sequelize.query(sql, { type:models.sequelize.QueryTypes.SELECT})
   			.then(function(values) {
   				for (var i = 0; i < Object.keys(values).length; i+=1) {
	   				sum_hours += parseInt(values[Object.keys(values)[i]].total_hours);
	   				sum_cost += parseInt(values[Object.keys(values)[i]].total_cost);
	   			}
	   			res.render('admin/budget-report-per-period/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values, sum_hours:sum_hours, sum_cost:sum_cost, text:text});

  			});
		}

		//  SEARCH BY LAST SIX MONTHS //
		if(search_by == 'last_six_month') {
			var todayDate = new Date();
			var text = "Search By: Last Six Month";
			console.log(todayDate);
			var previousDate = new Date(todayDate.getTime() - (24*60*60*1000*180));
			//console.log(previousDate);
			var sql = "SELECT `activitybudgetdetails`.*, `activities`.`attorney_id`,`admins`.`first_name`, `admins`.`last_name`, SUM(`budget_code_hours`) as `hours`, SUM(`budget_code_cost`) as `cost` FROM `activitybudgetdetails` INNER JOIN `activities` ON `activitybudgetdetails`.`activity_id` = `activities`.`id` INNER JOIN `admins` ON `activities`.`attorney_id` = `admins`.`id` WHERE `activitybudgetdetails`.`createdAt`<='"+todayDate+"' AND `activitybudgetdetails`.`createdAt`>='"+previousDate+"' GROUP BY `activities`.`attorney_id`";
			//console.log(sql);
			models.sequelize.query(sql, { type:models.sequelize.QueryTypes.SELECT})
   			.then(function(values) {
   				for (var i = 0; i < Object.keys(values).length; i+=1) {
	   				sum_hours += parseInt(values[Object.keys(values)[i]].total_hours);
	   				sum_cost += parseInt(values[Object.keys(values)[i]].total_cost);
	   			}
	   			res.render('admin/budget-report-per-period/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values, sum_hours:sum_hours, sum_cost:sum_cost, text:text});
  			});
		}

		//  SEARCH BY LAST YEAR //
		if(search_by == 'last_year') {
			var sum_hours = 0;
			var sum_cost = 0;
			var text = "Search By: Last Year";
			var todayDate = new Date();
			//console.log(todayDate);
			var previousDate = new Date(todayDate.getTime() - (24*60*60*1000*360));
			//console.log(previousDate);
			var sql = "SELECT `activitybudgetdetails`.*, `activities`.`attorney_id`,`admins`.`first_name`, `admins`.`last_name`, SUM(`budget_code_hours`) as `hours`, SUM(`budget_code_cost`) as `cost` FROM `activitybudgetdetails` INNER JOIN `activities` ON `activitybudgetdetails`.`activity_id` = `activities`.`id` INNER JOIN `admins` ON `activities`.`attorney_id` = `admins`.`id` WHERE `activitybudgetdetails`.`createdAt`<='"+todayDate+"' AND `activitybudgetdetails`.`createdAt`>='"+previousDate+"' GROUP BY `activities`.`attorney_id`";
			//console.log(sql);
			models.sequelize.query(sql, { type:models.sequelize.QueryTypes.SELECT})
   			.then(function(values) {
   				for (var i = 0; i < Object.keys(values).length; i+=1) {
	   				sum_hours += parseInt(values[Object.keys(values)[i]].hours);
	   				sum_cost += parseInt(values[Object.keys(values)[i]].cost);
	   			}
	   			res.render('admin/budget-report-per-period/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values, sum_hours:sum_hours, sum_cost:sum_cost, text:text});
  			});
		}

		//  SEARCH BY CUSTOM DATE //
		if(search_by == 'custom') {
			var sum_hours = 0;
			var sum_cost = 0;
			var from_date = req.body.from_date;
			var to_date = req.body.to_date;
			var text = "Search By:"+from_date+" to "+to_date;

			var sql = "SELECT `activitybudgetdetails`.*, `activities`.`attorney_id`,`admins`.`first_name`, `admins`.`last_name`, SUM(`budget_code_hours`) as `hours`, SUM(`budget_code_cost`) as `cost` FROM `activitybudgetdetails` INNER JOIN `activities` ON `activitybudgetdetails`.`activity_id` = `activities`.`id` INNER JOIN `admins` ON `activities`.`attorney_id` = `admins`.`id` WHERE `activitybudgetdetails`.`createdAt`<='"+to_date+"' AND `activitybudgetdetails`.`createdAt`>='"+from_date+"' GROUP BY `activities`.`attorney_id`";
			//console.log(sql);
			models.sequelize.query(sql, { type:models.sequelize.QueryTypes.SELECT})
   			.then(function(values) {
   				for (var i = 0; i < Object.keys(values).length; i+=1) {
	   				sum_hours += parseInt(values[Object.keys(values)[i]].hours);
	   				sum_cost += parseInt(values[Object.keys(values)[i]].cost);
	   			}
	   			res.render('admin/budget-report-per-period/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values, sum_hours:sum_hours, sum_cost:sum_cost,text:text});
  			});
		}
		
	});		

	app.get('/admin/budget-report-per-period/report-per-attorney/:attorney_id', function(req, res) {
		var sum_hours = 0;
		var sum_cost = 0;

		Promise.all([
			models.sequelize.query("SELECT codes.code, codes.short_description,SUM(activitybudgetdetails.budget_code_hours) as total_hours,SUM(activitybudgetdetails.budget_code_cost) as total_cost,activitybudgetdetails.budget_dtl_status,activitybudgetdetails.budget_code,activitybudgetdetails.createdAt,activities.attorney_id  FROM codes,activitybudgetdetails,activities WHERE activities.id=activitybudgetdetails.activity_id AND codes.code=activitybudgetdetails.budget_code AND activities.attorney_id='"+req.params['attorney_id']+"' AND codes.category_type ='Budget Codes' GROUP BY activitybudgetdetails.budget_code", { type:models.sequelize.QueryTypes.SELECT}),

			models.admin.findAll({
				attributes: ["first_name", "last_name"],
				where: {
					id: req.params['attorney_id']
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
}