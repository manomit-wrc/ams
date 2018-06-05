var refer;
module.exports = function(app, models) {
	var abc = models.mastercontact;
	/*app.get('/admin/referrel', function(req, res){
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
	});*/

	app.get('/admin/referrel', function(req, res) {
		
		models.mastercontact.findAll({
			where: {
				record_type: 'R'
			}
		}).then(function(referrel){
			res.render('admin/referrel/index',{layout:'dashboard', referrel:referrel, succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

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

	app.get('/admin/referrel/edit/:id', function(req, res){
		// models dependancy
		models.mastercontact.belongsTo(models.firm, {foreignKey: 'firm_id'});
		models.mastercontact.belongsTo(models.attorney, {foreignKey: 'attorney_id'});
		//end
		Promise.all([
			models.admin.findAll({
				where: {
					role_code: 'ATTR'
				},
				attributes: ['id', 'first_name','last_name']
			}),
			models.firm.findAll({
				where:{
					user_id: req.user.id
				},
				attributes : ['id', 'name']
			}),
			models.mastercontact.findAll({
				where: {
					record_type: 'R',
					id: req.params['id']
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

			models.mastercontact.findAll({
				where: {
					record_type: 'R',
					id: req.params['id'],
				}
			}).then(function(master){
				models.mastercontact.findAll({
					where: {
						id: master[0]['referrel_id'],
					},
					attributes: ['first_name','last_name', 'record_type']
				}).then(function(result_value){
					refer = result_value[0];
					res.render('admin/referrel/edit',{layout:'dashboard', attorney:result[0], firm:result[1][0], master_contact_result:result[2][0], targets:result[3], clients:result[4], ref:refer});
				})
			});	
						
		});
	});

	app.post('/admin/referrel/edit/:id', function(req, res){
		models.mastercontact.update({
			attorney_id: req.body.attorney_id,
			first_name: req.body.referrel_first_name,
			last_name: req.body.referrel_last_name,
			type: req.body.referrel_type,
			company_name: req.body.organisation,
			email: req.body.referrel_email,
			phone: req.body.referrel_mobile,
			referrel_id: req.body.referred_by_target ? req.body.referred_by_target: req.body.referred_by_client,
			remarks_notes: req.body.remarks_notes,
	    },{ where: { id: req.params['id'] }}).then(function(result){
	    	req.flash('succ_add_msg', 'Referrel edited successfully');
	    	res.redirect('/admin/referrel');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/referrel/edit/' + req.params['id'];
  			res.redirect(redirectUrl);
	    	
	    });
	});

	/*================== miki 30-05-2018 ========================*/

	app.get('/admin/site/referral', function(req, res){
		models.mastercontact.belongsTo(models.firm,{foreignKey: 'firm_id'});
		models.mastercontact.belongsTo(models.attorney,{foreignKey: 'attorney_id'});
		models.mastercontact.belongsTo(models.country,{foreignKey: 'country_id'});
		models.mastercontact.belongsTo(models.state,{foreignKey: 'state_id'});
		models.mastercontact.belongsTo(models.city,{foreignKey: 'city_id'});
		models.mastercontact.belongsTo(models.designation,{foreignKey: 'designation_id'});
		models.mastercontact.belongsTo(models.industrytype,{foreignKey: 'industry_type'});

		Promise.all([
			models.mastercontact.findAll({order:[
					['id', 'DESC']
				],
				where:{
					status:1,
					record_type: 'R'
				},
				include:[{model: models.firm}, {model: models.attorney}, {model: models.country},{model: models.state},{model: models.city},{model:models.designation},{model:models.industrytype}]
			})
		]).then(function(mastercontact){
			var result = JSON.parse(JSON.stringify(mastercontact));
			res.render('admin/referrel/index_admin',{layout:'dashboard', master_contacts:result[0], succ_add_msg:req.flash('succ_add_msg')[0]});
		});
	});
	app.get('/admin/site/referral/view/:id', function(req, res){
		models.mastercontact.belongsTo(models.firm,{foreignKey: 'firm_id'});
		models.mastercontact.belongsTo(models.attorney,{foreignKey: 'attorney_id'});
		models.mastercontact.belongsTo(models.country,{foreignKey: 'country_id'});
		models.mastercontact.belongsTo(models.state,{foreignKey: 'state_id'});
		models.mastercontact.belongsTo(models.city,{foreignKey: 'city_id'});
		models.mastercontact.belongsTo(models.designation,{foreignKey: 'designation_id'});
		models.mastercontact.belongsTo(models.industrytype,{foreignKey: 'industry_type'});

		Promise.all([
			models.mastercontact.findAll({
				where:{
					id: req.params['id']
				},
				include:[{model: models.firm}, {model: models.attorney}, {model: models.country},{model: models.state},{model: models.city},{model:models.designation},{model:models.industrytype}]
			}),
			models.country.findAll(),
			models.industrytype.findAll({attributes: ['id', 'industry']}),
			models.designation.findAll({attributes: ['id', 'designation']}),
			models.admin.findAll({
				where: {
					role_code: 'ATTR'
				},
				attributes: ['id', 'first_name','last_name']
			}),
			models.state.findAll(),
			models.city.findAll()
		]).then(function(mastercontact){
			var result = JSON.parse(JSON.stringify(mastercontact));
			//res.send(result[4]);
			res.render('admin/referrel/view_admin',{layout:'dashboard', master_contacts:result[0][0], designation:result[3], industry_types:result[2], attorney:result[4], country:result[1], state: result[5], city:result[6]});
		});
	});
	/*================== miki 30-05-2018 ========================*/
};
