module.exports = function(app, models) {

	app.get('/admin/firm-activity', function(req, res) {
		models.activity.belongsTo(models.code,{foreignKey: 'activity_type_id'});
		models.activity.belongsTo(models.activitydetails,{foreignKey: 'activity_details_id'});
		models.firm.findAll({
			where: {
				user_id: req.user.id
			}
		}).then(function(values){
			models.activity.findAll({
				include: [{model: models.code},{model: models.activitydetails}],
				where: {
					firm_id: values[0].id
				}
			}).then(function(result){
				res.render('admin/firm-activity/index',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], details:result});
			})
		});		
	});

	app.get('/admin/firm-activity/view_budget_report/:activity_id', function(req, res) {
		Promise.all([
			models.firm.findAll({
				where: {
					user_id: req.user.id
				},
				attributes: ['id', 'user_id', 'name']
			}),
			models.activitybudgetdetails.findAll({
				where: {
					activity_id: req.params['activity_id'],
				}
			}),
			models.activity.findAll({
				where: {
					id: req.params['activity_id']
				},
				attributes: ['id', 'firm_id', 'attorney_id']
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
			res.render('admin/firm-activity/view_budget_report',{layout:'dashboard', succ_add_msg:req.flash('succ_add_msg')[0], firm:values[0][0], details:values[1], attorney:values[2][0], target:values[3], client:values[4], activity_id:req.params['activity_id']});
		});
	});

	app.post('/admin/firm-activity/add_client_or_target', function(req, res){
		models.attoneybudget.create({
			attorney_id: req.body.attorney_id,
			activity_id: req.body.activity_id,
			contact_id: req.body.contact_id,
			relation_type: req.body.relation_type,
			budget_cost: '0',
			potential_revenue: req.body.potential_rev,
			activity_details: req.body.activity_dtl_status,
			remarks: 'remarks',
		}).then(function(result){
			models.activity.update({
				potential_revenue: req.body.potential_rev
			}, {
				where: {
					id: req.body.activity_id
				}
			});
			res.send('success');
		}).catch(function(err){
			
		});

	});
};
