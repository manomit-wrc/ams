var refer;
var new_array = new Array();
module.exports = function(app, models) {

	app.get('/admin/attorney/referrel', function(req, res){
		models.mastercontact.findAll({
			where: {
				record_type: 'R',
				add_flag: 'ATTR'
			}
		}).then(function(referrel){
			//console.log(referrel);
			for (var i = 0; i < Object.keys(referrel).length; i++) {
				//console.log(referrel[Object.keys(referrel)[i]]['referrel_id']);
				models.mastercontact.findAll({
					where: {
						id: referrel[Object.keys(referrel)[i]]['referrel_id'],
					},
					attributes: ['first_name','last_name', 'record_type']
				}).then(function(result_value){
					referrel['abc'] = result_value[0].first_name;
					//console.log(referrel['abc']);
				});

			}
			new_array = referrel;
			//console.log(new_array);
			res.render('admin/attorney/referrel/index',{layout:'dashboard', new_array:new_array, succ_add_msg:req.flash('succ_add_msg')[0]});
		});
	});

	app.get('/admin/attorney/referrel/add', function(req, res){
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
			models.attorney.findAll({
				where:{
					user_id: req.user.id
				},
				attributes : ['id', 'firm_id']
			})
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			//console.log(result[3][0]);
			res.render('admin/attorney/referrel/add',{layout:'dashboard', attorney:result[0], targets:result[1], clients:result[2], firm:result[3][0]});			
		});
	});

	app.post('/admin/attorney/referrel/add', function(req, res){

		var referrel_type = req.body.referrel_type;
		//console.log(req.body.attorney_id);
		models.mastercontact.create({
			add_flag: 'ATTR',
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
			res.redirect('/admin/attorney/referrel');
		});

	});

	app.get('/admin/attorney/referrel/delete/:id', function(req, res){
		models.mastercontact.destroy({
		    where: {
		       id:req.params['id'],
		       add_flag: 'ATTR'
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Referrel deleted successfully');
			res.redirect('/admin/attorney/referrel');
		});
	});

	app.get('/admin/attorney/referrel/edit/:id', function(req, res){
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
			models.attorney.findAll({
				where:{
					user_id: req.user.id
				},
				attributes : ['id', 'firm_id']
			}),
			models.mastercontact.findAll({
				where: {
					record_type: 'R',
					id: req.params['id'],
					add_flag: 'ATTR'
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
			//console.log(result[2][0]);
			models.mastercontact.findAll({
				where: {
					record_type: 'R',
					id: req.params['id'],
					add_flag: 'ATTR'
				}
			}).then(function(master){
				models.mastercontact.findAll({
					where: {
						id: master[0]['referrel_id'],
					},
					attributes: ['first_name','last_name', 'record_type']
				}).then(function(result_value){
					refer = result_value[0];
					res.render('admin/attorney/referrel/edit',{layout:'dashboard', attorney:result[0], firm:result[1][0], master_contact_result:result[2][0], targets:result[3], clients:result[4], ref:refer});
				})
			});							
		});
	});

	app.post('/admin/attorney/referrel/edit/:id', function(req, res){
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
	    	req.flash('succ_add_msg', 'Referral edited successfully');
	    	res.redirect('/admin/attorney/referrel');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/attorney/referrel/edit/' + req.params['id'];
  			res.redirect(redirectUrl);
	    	
	    });
	});
};
