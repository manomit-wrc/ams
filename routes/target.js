module.exports = function(app, models) {
	app.get('/admin/target', function(req, res){
			res.render('admin/target/index',{layout:'dashboard', master_contacts:'mastercontact'});
	});

	app.get('/admin/target/add', function(req, res){
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

			res.render('admin/target/add',{layout:'dashboard',succ_add_msg:req.flash('succ_add_msg')[0], countries:result[0], industry_types:result[1], designations:result[2], attorney:result[3], firm:result[4]});
			
		});
	});

	app.post('/admin/target/add', function(req, res){
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var company_name = req.body.company_name;
		if((first_name) && (last_name) && (company_name)){
			var type = 'I';
		} else if((company_name) && first_name == 'NULL'){
			var type = 'O';
		}

		models.mastercontact.create({
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
			status:1,
			record_type: 'T'
		}).then(function(target){
			req.flash('succ_add_msg', 'Target added successfully');
			res.redirect('/admin/target');
		}).catch(function(err){
			var validation_error = err.errors;
            res.render('admin/target/add', {
                layout: 'dashboard',
                error_message: validation_error[0].message,
                body: req.body
            });
		});

	});
};
