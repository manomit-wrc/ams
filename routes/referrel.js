module.exports = function(app, models) {
	app.get('/admin/referrel', function(req, res){
		models.mastercontact.findAll({
			where: {
				record_type: 'R'
			}
		}).then(function(referrel){
			console.log(referrel);
			models.mastercontact.find({
				attributes : ['first_name' ,'last_name'],
				where: {
					id: referrel.id
				}
			}).then(function(result){

				res.render('admin/referrel/index',{layout:'dashboard', referrel:referrel, result:result, succ_add_msg:req.flash('succ_add_msg')[0]});
			});
		});
	});

	/*app.get('/admin/referrel', function(req, res) {
		models.mastercontact.belongsTo(models.mastercontact, {foreignKey: 'referrel_id'});
		models.mastercontact.findAll({
			include: [{model: models.mastercontact}],
			where: {
				record_type: 'R'
			}
		}).then(function(referrel){
			console.log(referrel);
			res.render('admin/referrel/index',{layout:'dashboard', referrel:referrel, result:result, succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});*/

	app.get('/admin/referrel/add', function(req, res){
		Promise.all([
			models.admin.findAll({
				where: {
					role_code: 'ATTR'
				},
				attributes: ['id', 'first_name','last_name']
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
			}),
			models.firm.findAll({
				where:{
					user_id: req.user.id
				},
				attributes : ['id', 'name']
			})
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			res.render('admin/referrel/add',{layout:'dashboard', attorney:result[0], targets:result[1], clients:result[2], firm:result[3][0]});			
		});
	});

	app.post('/admin/referrel/add', function(req, res){

		var referrel_type = req.body.referrel_type;
		//console.log(req.body.attorney_id);
		models.mastercontact.create({
			firm_id: req.body.firm_id,
			attorney_id: req.body.attorney_id,
			referrel_id: req.body.referred_by_target ? req.body.referred_by_target: req.body.referred_by_client,
			first_name: req.body.referrel_first_name,
			last_name: req.body.referrel_last_name,
			company_name: req.body.organisation,
			type: req.body.referrel_type,
			email: req.body.referrel_email,
			phone: req.body.referrel_mobile,
			remarks_notes: req.body.remarks_notes,
			status:1,
			record_type: 'R'
		}).then(function(result){
			req.flash('succ_add_msg', 'Referrel added successfully');
			res.redirect('/admin/referrel');
		});

	});

	app.get('/admin/referrel/delete/:id', function(req, res){
		models.mastercontact.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Referrel deleted successfully');
			res.redirect('/admin/referrel');
		});
	});
};
