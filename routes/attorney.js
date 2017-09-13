module.exports = function(app, models) {

	var md5 = require('md5');

	app.get('/admin/attorney',function(req, res){
			res.render('admin/attorney/index',{layout:'dashboard'});
	});

	// add attorney by site admin view
	app.get('/admin/attorney/add', function(req, res){
		models.firm.findAll({
		   where: {
    			status: '1'
  			}
		}).then(function(firm){
			res.render('admin/attorney/add',{layout:'dashboard', firm:firm, succ_add_msg: req.flash('succ_add_msg')[0]});
		});
	});

	// add attorney by site admin process
	app.post('/admin/attorney/add', function(req, res){
		models.admin.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: md5(req.body.password),
			role_code: 'ATTR',
			reg_type: 'I',
			phone_no: '',
			is_attorney: '1'
		}).then(function(admin){
			models.attorney.create({
				firm_id: req.body.firm_id,
				user_id: admin.id
			}).then(function(firm){
				req.flash('succ_add_msg', 'Attorney added successfully');
				res.redirect('/admin/attorney/add');
				//res.send(true);
			}).catch(function(err){
				var validation_error = err.errors;
		    	res.render('admin/attorney/add', {
			        layout: 'dashboard',
			        error_message: validation_error[0].message,
			        body: req.body
	        	});
			});
		}).catch(function(err){
			var validation_error = err.errors;
	    	res.render('admin/attorney/add', {
		        layout: 'dashboard',
		        error_message: validation_error[0].message,
		        body: req.body
        	});
		});

	});


	//attorney profile view  *****we use Promise.all when more than one model query are executed*******
	app.get('/admin/attorney/attorney-profile',function(req, res){
		var user_id = req.user.id;
		// models dependancy
		models.admin.belongsTo(models.country, {foreignKey: 'country_id'});
		models.admin.belongsTo(models.state, {foreignKey: 'state_id'});
		models.admin.belongsTo(models.city, {foreignKey: 'city_id'});
		models.admin.belongsTo(models.group, {foreignKey: 'group_id'});
		models.admin.belongsTo(models.designation, {foreignKey: 'designation_id'});
		models.attorney.belongsTo(models.section, {foreignKey: 'section_id'});
		models.attorney.belongsTo(models.attorneytype, {foreignKey: 'attorney_type_id'});
		models.attorney.belongsTo(models.jobtype, {foreignKey: 'job_type_id'});
		models.attorney.belongsTo(models.jurisdiction, {foreignKey: 'jurisdiction_id'});
		models.attorney.belongsTo(models.industrytype, {foreignKey: 'industry_type_id'});
		models.attorney.belongsTo(models.practicearea, {foreignKey: 'practice_area'});
		//end
		Promise.all([
			models.admin.findAll({
				where: {
    				id: user_id,
    				role_code: 'ATTR'
  				},
  				include: [{model: models.country},{model: models.state},{model: models.city},{model: models.group},{model: models.designation}]
			}),
			models.attorney.findAll({
				where: {
    				user_id: user_id
  				},
  				include: [{model: models.section},{model: models.attorneytype},{model: models.jobtype},{model: models.jurisdiction},{model: models.industrytype},{model: models.practicearea}]
			}),
			models.country.findAll(),
			models.group.findAll({attributes: ['id', 'group']}),
			models.section.findAll({attributes: ['id', 'name']}),
			models.designation.findAll({attributes: ['id', 'designation']}),
			models.attorneytype.findAll({attributes: ['id', 'attorney']}),
			models.jobtype.findAll({attributes: ['id', 'job']}),
			models.jurisdiction.findAll({attributes: ['id', 'jurisdiction']}),
			models.practicearea.findAll({attributes: ['id', 'name']}),
			models.industrytype.findAll({attributes: ['id', 'industry']}),
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			//console.log(result[1][0].section_id);
			var section_result = result[1][0].section_id.split(',');
			res.render('admin/attorney/attorney-profile',{layout:'dashboard', user_details:result[0][0], attorney_details:result[1][0], countries:result[2], group:result[3], section:section_result, designation:result[5], attorneytype:result[6], jobtype:result[7], jurisdiction:result[8], practice_area:result[9], industry_type:result[10]});
		});

	});

	//fetch all states respect to selected country
	app.post('/admin/attorney/fetch_state',function(req, res){
		models.state.findAll({
		   where: {
    			country_id: req.body.country_id
  			}
		}).then(function(states){
			res.send(states);
		});
			
	});

	//fetch all cities respect to selected state
	app.post('/admin/attorney/fetch_city',function(req, res){
		models.city.findAll({
		   where: {
    			state_id: req.body.state_id
  			}
		}).then(function(cities){
			res.send(cities);
		});
			
	});

	//fetch zipcode respect to selected city
	app.post('/admin/attorney/fetch_zipcode',function(req, res){
		models.zipCode.findAll({
		   where: {
    			city_name: req.body.city_name
  			}
		}).then(function(zip_code){
			res.send(zip_code);
		});
			
	});

	//update attorney address in first tab by ajax
	app.post('/admin/attorney/update_attorney_address',function(req, res){
		var user_id = req.user.id;
		models.admin.update({
    		address: req.body.address,
			address_2: req.body.address_2,
			address_3: req.body.address_3,
			phone_no: req.body.phone_no,
			country_id: req.body.attorney_country_id,
			state_id: req.body.attoney_state_id,
			city_id: req.body.attoney_city_id,
			zipcode: req.body.attorney_zip_code,
			fax: req.body.fax,
			mobile: req.body.mobile,
			website: req.body.website,
			social: req.body.social,
	    },{ where: { 
	    		id: user_id 
	    	} 
	    }).then(function(result){
	    	res.send('success');
	    }).catch(function(err){	    	
	    	res.send('fail');
	    	
	    });
	});

	//update attorney general details in second tab by ajax
	app.post('/admin/attorney/update_attorney_details',function(req, res){
		var user_id = req.user.id;
		var sections_array = req.body.sections;
		var sections = sections_array.toString();
		var jurisdictions = req.body.jurisdictions.toString();
		var practice_area = req.body.practice_area.toString();
		models.attorney.update({   		
			section_id: sections,			
			attorneyID: req.body.attorney_id,
			code: req.body.attorney_code,
			attorney_type_id: req.body.attorney_type,
			education: req.body.education,
			bar_reg: req.body.bar_reg,
			job_type_id: req.body.job_type,
			practice_date: req.body.practice_date,
			firm_join_date: req.body.firm_join_date,
			jurisdiction_id: jurisdictions,
			practice_area: practice_area,
			industry_type_id: req.body.industry_type,			
	    },{ where: {
	    		user_id: user_id 
	    	} 
	    }).then(function(result){
	    	models.admin.update({
	    		group_id: req.body.group,
	    		designation_id: req.body.designation,
	    		remarks: req.body.remarks
	    	},{
	    		where: {
	    			id: user_id 
	    		}
	    	}).then(function(result){
	    			res.send('success');
	    	});
	    }).catch(function(err){	    	
	    	res.send('fail');
	    	
	    });
	});
};
