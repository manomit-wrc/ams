module.exports = function(app, models) {
	app.get('/admin/opportunity', function(req, res){
		
		models.opportunity.belongsTo(models.admin,{foreignKey: 'attorney_id'});
		models.opportunity.belongsTo(models.mastercontact,{foreignKey: 'referrel_id'});
		models.opportunity.findAll({
			include: [{model: models.mastercontact, required: true},{model: models.admin, required: true}]
		}).then(function(response){
			res.render('admin/opportunity/index',{layout:'dashboard', opportunity:response,succ_add_msg:req.flash('succ_add_msg')[0]});
			//console.log(response[0].mastercontact);
		});
	});

	app.get('/admin/opportunity/add', function(req, res){
		Promise.all([
			models.admin.findAll({
				where: {
					role_code: 'ATTR'
				},
				attributes: ['id', 'first_name','last_name']
			}),
			models.firm.findAll({
				where:{
					user_id: req.user.id,
				},
				attributes : ['id', 'name']
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
			models.mastercontact.findAll({
				where:{
					record_type: 'M'
				},
				attributes : ['id','first_name' ,'last_name']
			}),
			models.mastercontact.findAll({
				where:{
					record_type: 'R'
				},
				attributes : ['id','first_name' ,'last_name','company_name']
			}),
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			//console.log(result[1]);
			res.render('admin/opportunity/add',{layout:'dashboard', attorney:result[0], firm:result[1][0], targets:result[2], clients:result[3], master_contacts:result[4], referrels:result[5]});			
		});
	});

	app.post('/admin/opportunity/add', function(req, res){
		var referrel_type = req.body.ref;
		if(referrel_type == 'T') {
			var referrel_id = req.body.referred_by_target;
		} else if(referrel_type == 'C') {
			var referrel_id = req.body.referred_by_client;
		} else if(referrel_type == 'R') {
			var referrel_id = req.body.referred_by_referrel;
		} else {
			var referrel_id = req.body.referred_by_master_contact;
		}
		models.opportunity.create({
			user_id: req.user.id,
			firm_id: req.body.firm_id,
			attorney_id: req.body.attorney_id,
			referrel_type: req.body.ref,
			opportunity_name: req.body.opportunity_name,
			referrel_id: referrel_id,
			remarks: req.body.remarks_notes,
		}).then(function(result){
			req.flash('succ_add_msg', 'Opportunity added successfully');
			res.redirect('/admin/opportunity');
		});

	});

	app.get('/admin/opportunity/delete/:id', function(req, res){
		models.opportunity.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Opportunity deleted successfully');
			res.redirect('/admin/opportunity');
		});
	});

	app.get('/admin/opportunity/edit/:id', function(req, res){
		// models dependancy
		models.opportunity.belongsTo(models.admin,{foreignKey: 'attorney_id'});
		models.opportunity.belongsTo(models.mastercontact,{foreignKey: 'referrel_id'});
		//end
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
			models.mastercontact.findAll({
				where:{
					record_type: 'M'
				},
				attributes : ['id','first_name' ,'last_name']
			}),
			models.mastercontact.findAll({
				where:{
					record_type: 'R'
				},
				attributes : ['id','first_name' ,'last_name','company_name']
			}),
			models.opportunity.findAll({
				where:{
					id: req.params['id']
				}
			})
		]).then(function(response){
			var result = JSON.parse(JSON.stringify(response));
			//console.log(result[5]);
			res.render('admin/opportunity/edit',{layout:'dashboard', attorney:result[0], target:result[1], client:result[2], master_contact:result[3], referrel:result[4], opportunity:result[5][0]});
		});
	});

	app.post('/admin/opportunity/edit/:id', function(req, res){
		var referrel_type = req.body.ref;
		if(referrel_type == 'T') {
			var referrel_id = req.body.referred_by_target;
		} else if(referrel_type == 'C') {
			var referrel_id = req.body.referred_by_client;
		} else if(referrel_type == 'R') {
			var referrel_id = req.body.referred_by_referrel;
		} else {
			var referrel_id = req.body.referred_by_master_contact;
		}
		models.opportunity.update({
			attorney_id: req.body.attorney_id,
			referrel_type: req.body.ref,
			opportunity_name: req.body.opportunity_name,
			referrel_id: referrel_id,
			remarks: req.body.remarks_notes,
	    },{ where: { id: req.params['id'] }}).then(function(result){
	    	req.flash('succ_add_msg', 'Opportunity edited successfully');
	    	res.redirect('/admin/opportunity');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/opportunity/edit/' + req.params['id'];
  			res.redirect(redirectUrl);
	    	
	    });
	});
};
