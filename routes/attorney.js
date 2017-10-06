module.exports = function(app, models) {

	var md5 = require('md5');

	var multer  = require('multer');
	var im = require('imagemagick');
	var fileExt = '';
	var fileName = '';
	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'public/profile/thumbs');
	  },
	  filename: function (req, file, cb) {
	    fileExt = file.mimetype.split('/')[1];
	    if (fileExt == 'jpeg'){ fileExt = 'jpg';}
	    fileName = req.user.id + '-' + Date.now() + '.' + fileExt;
	    cb(null, fileName);
	  }
	})

	var restrictImgType = function(req, file, cb) {

	    var allowedTypes = ['image/jpeg','image/gif','image/png'];
	      if (allowedTypes.indexOf(req.file.mimetype) !== -1){
	        // To accept the file pass `true`
	        cb(null, true);
	      } else {
	        // To reject this file pass `false`
	        cb(null, false);
	       //cb(new Error('File type not allowed'));// How to pass an error?
	      }
	};
	var upload = multer({ storage: storage, limits: {fileSize:3000000, fileFilter:restrictImgType} });

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
		console.log(req.user);
		// models dependancy
		models.admin.belongsTo(models.country, {foreignKey: 'country_id'});
		models.admin.belongsTo(models.state, {foreignKey: 'state_id'});
		models.admin.belongsTo(models.city, {foreignKey: 'city_id'});
		models.admin.belongsTo(models.zipCode, {foreignKey: 'zipcode'});
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
			models.state.findAll({
				where: {
    				country_id: '233'
  				}
			}),
			models.city.findAll({
				where: {
    				state_id: '1'
  				}
			}),
			models.zipCode.findAll({
				where: {
    				city_name: 'Acmar'
  				}
			}),
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			var section_result = result[1][0].section_id.split(',');
			var jurisdiction_result = result[1][0].jurisdiction_id.split(',');
			var practice_area_result = result[1][0].practice_area.split(',');

			res.render('admin/attorney/attorney-profile',{layout:'dashboard', user_details:result[0][0], attorney_details:result[1][0], countries:result[2], group:result[3], section_array:section_result.map(Number), section:result[4], designation:result[5], attorneytype:result[6], jobtype:result[7], jurisdiction:result[8], jurisdiction_array:jurisdiction_result.map(Number), practice_area_array:practice_area_result.map(Number), practice_area:result[9], industry_type:result[10], states:result[11], cities:result[12], zipcode:result[13]});
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
			phone_no: removePhoneMask(req.body.phone_no) ,
			country_id: req.body.attorney_country_id,
			state_id: req.body.attoney_state_id,
			city_id: req.body.attoney_city_id,
			zipcode: req.body.attorney_zip_code,
			fax: req.body.fax,
			mobile: removePhoneMask(req.body.mobile),
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


	//upload attorney profile picture

	app.post("/admin/attorney/update-profile-photo", upload.single('profile_photo'), function(req, res) {

		models.admin.update({
			avator: fileName
		}, {where: {id: req.user.id}}).then(function(result){
			models.attorney.update({
				status: 1
			}, {where: {user_id: req.user.id}}).then(function(values){
				res.send("success");
			});
		}).catch(function(err){
			res.send('fail');
		});
	});

	function removePhoneMask (phone_no){
		var phone_no = phone_no.replace("-","");
		phone_no = phone_no.replace(")","");
		phone_no = phone_no.replace("(","");
		phone_no = phone_no.replace(" ","");
		return phone_no;

	}

	app.get('/attorney/act-as-firm',function(req, res){
		models.attorney.findAll({
		   where: {
    			user_id: req.user.id
  			}
		}).then(function(attorney){
			models.firm.findAll({
			   	where: {
	    			id: attorney[0].firm_id
	  			}
			}).then(function(firm){
				//console.log(firm[0].user_id);
				req.user.id = firm[0].user_id;
				req.user.role_code = "FIRMADM";
				console.log(req.user);
				req.logIn(req.user, function(error) {
		            if (!error) {

		               res.render('admin/dashboard',{layout:'dashboard'});
		            }
        		});
			});
			
		});
	});
};
