module.exports = function(app, models) {

	app.get('/admin/attorney/target', function(req, res){
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
					status:1,
					record_type: 'T',
					add_flag: 'ATTR'
				},
				order:[
					['id', 'ASC']
				],
				include:[{model: models.firm}, {model: models.attorney}, {model: models.country},{model: models.state},{model: models.city},{model:models.designation},{model:models.industrytype}]
			}),
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
			})
		]).then(function(mastercontact){
			var result = JSON.parse(JSON.stringify(mastercontact));
			res.render('admin/attorney/target/index',{layout:'dashboard', master_contacts:result[0], attornies:result[1], firm:result[2][0], succ_add_msg:req.flash('succ_add_msg')[0]});
		});
	});

	app.get('/admin/attorney/target/add', function(req, res){
		Promise.all([
			models.country.findAll(),
			models.industrytype.findAll({attributes: ['id', 'industry']}),
			models.designation.findAll({attributes: ['id', 'designation']}),
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
			})
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			//console.log(result[4][0]);
			res.render('admin/attorney/target/add',{layout:'dashboard', countries:result[0], industry_types:result[1], designations:result[2], attorney:result[3], firm:result[4][0]});			
		});
	});

	app.post('/admin/attorney/target/add', function(req, res){
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var company_name = req.body.company_name;
		if((first_name) && (last_name) && (company_name)){
			var type = 'I';
		} else if((company_name) && first_name == 'NULL'){
			var type = 'O';
		}

		models.mastercontact.create({
			add_flag: 'ATTR',
			firm_id: req.body.firm_id,
			attorney_id: req.body.attorney_id,
			code: req.body.code,
			designation_id: req.body.designation_id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			type: type,
			dob: req.body.dob,
			gender: req.body.gender,
			industry_type: req.body.industry_type,
			social_security_no: req.body.social_security_no,
			company_name: req.body.company_name,
			address_line_1: req.body.address_line_1,
			address_line_2: req.body.address_line_2,
			address_line_3: req.body.address_line_3,
			country_id: req.body.country_id,
			city_id: req.body.city_id,
			state_id: req.body.state_id,
			postal_code: req.body.zipcode,
			email: req.body.email,
			phone: req.body.phone,
			fax: req.body.fax,
			mobile_cell: req.body.mobile_cell,
			website_url: req.body.website_url,
			social_media_url: req.body.social_media_url,
			twitter: req.body.twitter,
			linkedin: req.body.linkedin,
			youtube: req.body.youtube,
			google: req.body.google,
			im: req.body.im,
			association_status: req.body.association_status,
			remarks_notes: req.body.remarks_notes,
			status:1,
			record_type: 'T'
		}).then(function(target){
			req.flash('succ_add_msg', 'Target added successfully');
			res.redirect('/admin/attorney/target');
		}).catch(function(err){
			var validation_error = err.errors;
            res.render('admin/attorney/target/add', {
                layout: 'dashboard',
                error_message: validation_error[0].message,
                body: req.body
            });
		});

	});

	app.get('/admin/attorney/target/delete/:id', function(req, res){
		models.mastercontact.destroy({
		    where: {
		       id:req.params['id'],
		       add_flag: 'ATTR'
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Target deleted successfully');
			res.redirect('/admin/attorney/target');
		});
	});

	app.get('/admin/attorney/target/edit/:id', function(req, res){
		Promise.all([
			models.country.findAll(),
			models.industrytype.findAll({attributes: ['id', 'industry']}),
			models.designation.findAll({attributes: ['id', 'designation']}),
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
				where:{
					id: req.params['id'],
					add_flag: 'ATTR'
				}
			})
		]).then(function(mastercontact){
			var result = JSON.parse(JSON.stringify(mastercontact));
			console.log(result[5][0]);
			res.render('admin/attorney/target/edit',
				{
					layout: 'dashboard',
					master_contacts: result[5][0],
					industry_types: result[1],
					country: result[0],
					designation: result[2],
					firm_id: result[4][0].firm_id,
					attorney : result[3]
				}
			);
		});
	});

	app.post('/admin/attorney/target/edit/:id', function(req, res){
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var company_name = req.body.company_name;
		if((first_name) && (last_name) && (company_name)){
			var type = 'I';
		} else if((company_name) && first_name == 'NULL'){
			var type = 'O';
		}

		models.mastercontact.update({
			attorney_id: req.body.attorney_id,
			code: req.body.code,
			designation_id: req.body.designation_id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			type: type,
			dob: req.body.dob,
			gender: req.body.gender,
			industry_type: req.body.industry_type,
			social_security_no: req.body.social_security_no,
			company_name: req.body.company_name,
			address_line_1: req.body.address_line_1,
			address_line_2: req.body.address_line_2,
			address_line_3: req.body.address_line_3,
			country_id: req.body.country_id,
			city_id: req.body.state_id,
			state_id: req.body.city_id,
			postal_code: req.body.zipcode,
			email: req.body.email,
			phone: req.body.phone,
			fax: req.body.fax,
			mobile_cell: req.body.mobile_cell,
			website_url: req.body.website_url,
			social_media_url: req.body.social_media_url,
			twitter: req.body.twitter,
			linkedin: req.body.linkedin,
			youtube: req.body.youtube,
			google: req.body.google,
			im: req.body.im,
			association_status: req.body.association_status,
			remarks_notes: req.body.remarks_notes,
		},{ 
			where: 
				{ 
					id: req.params['id'],
					add_flag: 'ATTR'
				} 
		}).then(function(result){
			req.flash('succ_add_msg', 'Target edited successfully');
			res.redirect('/admin/attorney/target');
		}).catch(function(err){

			var validation_error = err.errors;
			req.flash('error_message', validation_error[0].message);
			var redirectUrl = '/admin/attorney/target/edit/' + req.params['id'];
			res.redirect(redirectUrl);

		});
	});

	app.post('/admin/attorney/target/move_to_client', function(req, res){
		var checked_ids = req.body.checked_ids;
		for (var i = 0; i < checked_ids.length; i++) {
			models.mastercontact.update({
				record_type: 'C'
			},{ 
				where: { 
					id: checked_ids[i],
					add_flag: 'ATTR' 
				}
			}).then(function(result){
		    	res.send('success');
		    }).catch(function(err){
		    	res.send('fail');
		    	
		    });

		    models.targettoclient.create({
					mastercontact_id: checked_ids[i],
			}).then(function(result){
		    	res.send('insert_success');
		    });
		}
	});
};
