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

		models.sequelize.query("SELECT codes.code, codes.short_description,SUM(activitybudgetdetails.budget_code_hours) as total_hours,SUM(activitybudgetdetails.budget_code_cost) as total_cost,activitybudgetdetails.budget_dtl_status,activitybudgetdetails.createdAt,activities.attorney_id  FROM codes,activitybudgetdetails,activities WHERE activities.id=activitybudgetdetails.activity_id AND codes.code=activitybudgetdetails.budget_code AND activities.attorney_id='"+req.body.attorney_id+"' AND codes.category_type ='Budget Codes' GROUP BY activitybudgetdetails.budget_code", { type:models.sequelize.QueryTypes.SELECT})
   		.then(function(values) {
   			//console.log(values);
   			for (var i = 0; i < Object.keys(values).length; i+=1) {
   				//console.log(values[Object.keys(values)[i]].total_hours);
   				sum_hours += parseInt(values[Object.keys(values)[i]].total_hours);
   				sum_cost += parseInt(values[Object.keys(values)[i]].total_cost);
   			}
      		res.render('admin/view-attorney-budget-report/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values, sum_hours:sum_hours, sum_cost:sum_cost});
  		});
		
		/*models.activity.hasMany(models.activitybudgetdetails,{foreignKey: 'activity_id'});
		models.activity.findAll({
			include: [{model: models.activitybudgetdetails}],
			where: {
				attorney_id: req.body.attorney_id
			}
			
		}).then(function(values){
			//console.log(values[0].activitybudgetdetails[0].budget_code_type);
			res.render('admin/view-attorney-budget-report/listing',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], result: values[0].activitybudgetdetails});

		});*/
		
	});
}