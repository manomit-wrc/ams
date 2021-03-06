module.exports = function(app, models, fs) {
	var md5 = require('md5');

	var multer  = require('multer');
	var fileExt = '';
	var fileName = '';
	var xlsx = require('node-xlsx');
	var md5 = require('md5');
	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'public/import-contact-excel');
	  },
	  filename: function (req, file, cb) {
	    fileExt = 'xlsx';
	    fileName = req.user.id + '-' + Date.now() + '.' + fileExt;
	    cb(null, fileName);
	  }
	})

	var csv_storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'public/import-contact-csv');
	  },
	  filename: function (req, file, cb) {
	    fileExt = 'csv';
	    fileName = req.user.id + '-' + Date.now() + '.' + fileExt;
	    cb(null, fileName);
	  }
	})

	var restrictImgType = function(req, file, cb) {

	    var allowedTypes = ['application/vnd.ms-excel'];
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
    var upload_csv = multer({ storage: csv_storage, limits: {fileSize:3000000, fileFilter:restrictImgType} });

	app.get('/admin/master-contact', function(req, res){
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
					record_type: 'M'
				},
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
			res.render('admin/master-contact/index',{layout:'dashboard', master_contacts:result[0], attornies:result[1], firm:result[2][0], succ_add_msg:req.flash('succ_add_msg')[0]});
		});
	});

	app.get('/admin/master-contact/add', function(req, res){
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
			console.log(result[4]);
			res.render('admin/master-contact/add',
				{
					layout: 'dashboard',
					countries: result[0],
					industry_types: result[1],
					attornies: result[3],
					designation: result[2],
					firm_id: result[4][0].id
				}
			);
		});
	});

	app.post('/admin/master-contact/add', function(req, res){
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
				record_type: 'M'
		}).then(function(mastercontact){
			res.redirect('/admin/master-contact');
		}).catch(function(err){
			var validation_error = err.errors;
				res.render('admin/master-contact/add', {
						layout: 'dashboard',
						error_message: validation_error[0].message,
						body: req.body
				});
		});

	});
	app.get('/admin/master-contact/edit/:id', function(req, res){
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
			}),
			models.mastercontact.findAll({
				where:{
					id: req.params['id']
				}
			})
		]).then(function(mastercontact){
			var result = JSON.parse(JSON.stringify(mastercontact));
// console.log(result[3]);
			res.render('admin/master-contact/edit',
				{
					layout: 'dashboard',
					master_contacts: result[5][0],
					industry_types: result[1],
					country: result[0],
					designation: result[2],
					firm_id: result[4][0].id,
					attorney : result[3]
				}
			);
		});
	});

	app.post('/admin/master-contact/edit/:id', function(req, res){
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
		},{ where: { id: req.params['id'] } }).then(function(result){
				req.flash('succ_add_msg', 'master contact edited successfully');
				res.redirect('/admin/master-contact');
			}).catch(function(err){

				var validation_error = err.errors;
				req.flash('error_message', validation_error[0].message);
				var redirectUrl = '/admin/master-contact/edit/' + req.params['id'];
				res.redirect(redirectUrl);

			});
	});

	app.post('/admin/master-contact/move_to_target', function(req, res){
		var checked_ids = req.body.checked_ids;
		for (var i = 0; i < checked_ids.length; i++) {
			models.mastercontact.update({
				record_type: 'T'
			},{ where: { id: checked_ids[i] }}).then(function(result){
		    	res.send('success');
		    }).catch(function(err){
		    	res.send('fail');		    	
		    });
		}
	});

	// import master contact excel file //
	app.post('/admin/master-contact/upload_excel', upload.single('xls_file'),  function(req, res) {
	    var array = xlsx.parse(fs.readFileSync('public/import-contact-excel/'+fileName));
	    var importedData = JSON.stringify(convertToJSON(array[0].data));

	    var resultSet = JSON.parse(importedData);
	    for(var i=0;i<resultSet.length;i++) {
	    	models.mastercontact.create({
					firm_id: req.body.firm_id,
					attorney_id: req.body.attorney_id,
					first_name: resultSet[i].First_name,
					last_name: resultSet[i].Last_name,
					type: resultSet[i].Type,
					dob: resultSet[i].DOB,
					gender: resultSet[i].Gender,
					company_name: resultSet[i].Company_name,
					email: resultSet[i].Email,
					phone: resultSet[i].Phone,
					fax: resultSet[i].Fax,
					address_line_1: resultSet[i].Address,
					association_status: resultSet[i].Association_status,
					status: resultSet[i].Status,
					record_type: resultSet[i].record_Type
			}).then(function(result){
				req.flash('succ_add_msg', 'Master contact imported successfully');
				res.redirect('/admin/master-contact');
			}).catch(function(err){
				console.log(err);
			});
	    }
	    
  	});

	// import master contact csv file //
  	app.post('/admin/master-contact/upload_csv', upload_csv.single('csv_file'),  function(req, res) {
	    var array = xlsx.parse(fs.readFileSync('public/import-contact-csv/'+fileName));
	    var importedData = JSON.stringify(convertToJSON(array[0].data));

	    var resultSet = JSON.parse(importedData);
	    for(var i=0;i<resultSet.length;i++) {
	    	models.mastercontact.create({
					firm_id: req.body.firm_id,
					attorney_id: req.body.attorney_id,
					first_name: resultSet[i].First_name,
					last_name: resultSet[i].Last_name,
					type: resultSet[i].Type,
					dob: resultSet[i].DOB,
					gender: resultSet[i].Gender,
					company_name: resultSet[i].Company_name,
					email: resultSet[i].Email,
					phone: resultSet[i].Phone,
					fax: resultSet[i].Fax,
					address_line_1: resultSet[i].Address,
					association_status: resultSet[i].Association_status,
					status: resultSet[i].Status,
					record_type: resultSet[i].record_Type
			}).then(function(result){
				req.flash('succ_add_msg', 'Master contact imported successfully');
				res.redirect('/admin/master-contact');
			}).catch(function(err){
				console.log(err);
			});
	    }
	    
  	});

  	//end //
  	function convertToJSON(array) {
	  var first = array[0].join()
	  var headers = first.split(',');
	  
	  var jsonData = [];
	  for ( var i = 1, length = array.length; i < length; i++ )
	  {
	    var myRow = array[i].join();
	    var row = myRow.split(',');
	    
	    var data = {};
	    for ( var x = 0; x < row.length; x++ )
	    {
	      data[headers[x]] = row[x];
	    }
	    jsonData.push(data);
	 
	  }
	  return jsonData;
	}

	// master contact add from attorney //

	app.get('/admin/attorney/master-contact', function(req, res){
		models.mastercontact.belongsTo(models.firm,{foreignKey: 'firm_id'});
		models.mastercontact.belongsTo(models.attorney,{foreignKey: 'attorney_id'});
		models.mastercontact.belongsTo(models.country,{foreignKey: 'country_id'});
		models.mastercontact.belongsTo(models.state,{foreignKey: 'state_id'});
		models.mastercontact.belongsTo(models.city,{foreignKey: 'city_id'});
		models.mastercontact.belongsTo(models.designation,{foreignKey: 'designation_id'});
		models.mastercontact.belongsTo(models.industrytype,{foreignKey: 'industry_type'});

		Promise.all([
			models.mastercontact.findAll({order:[
					['id', 'ASC']
				],
				where:{
					status:1,
					add_flag:'ATTR',
					record_type: 'M'
				},
				include:[{model: models.firm}, {model: models.attorney}, {model: models.country},{model: models.state},{model: models.city},{model:models.designation},{model:models.industrytype}]
			}),
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
			})
		]).then(function(mastercontact){
			var result = JSON.parse(JSON.stringify(mastercontact));
			res.render('admin/attorney/master-contact/index',{layout:'dashboard', master_contacts:result[0], attornies:result[1], firm:result[2][0], succ_add_msg:req.flash('succ_add_msg')[0]});
		});
	});

	app.get('/admin/attorney/master-contact/add', function(req, res){
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
			})
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			res.render('admin/attorney/master-contact/add',
				{
					layout: 'dashboard', countries: result[0],
					industry_types: result[1],
					attornies: result[3],
					designation: result[2],
					firm_id: result[4][0].firm_id
				}
			);
		});
	});

	app.post('/admin/attorney/master-contact/add', function(req, res){
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
					record_type: 'M'
			}).then(function(mastercontact){
				req.flash('succ_add_msg', 'Master contact added successfully');
				res.redirect('/admin/attorney/master-contact');
			}).catch(function(err){
				var validation_error = err.errors;
					res.render('admin/attorney/master-contact/add', {
							layout: 'dashboard',
							error_message: validation_error[0].message,
							body: req.body
					});
			});

	});

	app.get('/admin/attorney/master-contact/delete/:id', function(req, res){
		models.mastercontact.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Master contact deleted successfully');
			res.redirect('/admin/attorney/master-contact');
		});
	});

	app.get('/admin/attorney/master-contact/edit/:id', function(req, res){
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
			//console.log(result[5][0]);
			res.render('admin/attorney/master-contact/edit',
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

	app.post('/admin/attorney/master-contact/edit/:id', function(req, res){
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
		},{ 
			where: {
			 id: req.params['id'],
			 add_flag: 'ATTR'
			} 
		}).then(function(result){
				req.flash('succ_add_msg', 'master contact edited successfully');
				res.redirect('/admin/attorney/master-contact');
		}).catch(function(err){

			var validation_error = err.errors;
			req.flash('error_message', validation_error[0].message);
			var redirectUrl = '/admin/attorney/master-contact/edit/' + req.params['id'];
			res.redirect(redirectUrl);

		});
	});

	app.post('/admin/attorney/master-contact/upload_excel', upload.single('xls_file'),  function(req, res) {
	    var array = xlsx.parse(fs.readFileSync('public/import-contact-excel/'+fileName));
	    var importedData = JSON.stringify(convertToJSON(array[0].data));

	    var resultSet = JSON.parse(importedData);
	    for(var i=0;i<resultSet.length;i++) {
	    	models.mastercontact.create({
	    			add_flag: 'ATTR',
					firm_id: req.body.firm_id,
					attorney_id: req.body.attorney_id,
					first_name: resultSet[i].First_name,
					last_name: resultSet[i].Last_name,
					type: resultSet[i].Type,
					dob: resultSet[i].DOB,
					gender: resultSet[i].Gender,
					company_name: resultSet[i].Company_name,
					email: resultSet[i].Email,
					phone: resultSet[i].Phone,
					fax: resultSet[i].Fax,
					address_line_1: resultSet[i].Address,
					association_status: resultSet[i].Association_status,
					status: resultSet[i].Status,
					record_type: resultSet[i].record_Type
			}).then(function(result){
				req.flash('succ_add_msg', 'Master contact imported successfully');
				res.redirect('/admin/attorney/master-contact');
			}).catch(function(err){
				console.log(err);
			});
	    }
	    
  	});

  	app.post('/admin/attorney/master-contact/upload_csv', upload_csv.single('csv_file'),  function(req, res) {
	    var array = xlsx.parse(fs.readFileSync('public/import-contact-csv/'+fileName));
	    var importedData = JSON.stringify(convertToJSON(array[0].data));

	    var resultSet = JSON.parse(importedData);
	    for(var i=0;i<resultSet.length;i++) {
	    	models.mastercontact.create({
	    			add_flag: 'ATTR',
					firm_id: req.body.firm_id,
					attorney_id: req.body.attorney_id,
					first_name: resultSet[i].First_name,
					last_name: resultSet[i].Last_name,
					type: resultSet[i].Type,
					dob: resultSet[i].DOB,
					gender: resultSet[i].Gender,
					company_name: resultSet[i].Company_name,
					email: resultSet[i].Email,
					phone: resultSet[i].Phone,
					fax: resultSet[i].Fax,
					address_line_1: resultSet[i].Address,
					association_status: resultSet[i].Association_status,
					status: resultSet[i].Status,
					record_type: resultSet[i].record_Type
			}).then(function(result){
				req.flash('succ_add_msg', 'Master contact imported successfully');
				res.redirect('/admin/attorney/master-contact');
			}).catch(function(err){
				console.log(err);
			});
	    }
	    
  	});

  	app.post('/admin/attorney/master-contact/move_to_target', function(req, res){
		var checked_ids = req.body.checked_ids;
		for (var i = 0; i < checked_ids.length; i++) {
			models.mastercontact.update({
				record_type: 'T'
			},{ where: { id: checked_ids[i] }}).then(function(result){
		    	res.send('success');
		    }).catch(function(err){
		    	res.send('fail');		    	
		    });
		}
	});

	/*================== miki 30-05-2018 ========================*/

	app.get('/admin/site/master-contect', function(req, res){
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
					record_type: 'M'
				},
				include:[{model: models.firm}, {model: models.attorney}, {model: models.country},{model: models.state},{model: models.city},{model:models.designation},{model:models.industrytype}]
			})
		]).then(function(mastercontact){
			var result = JSON.parse(JSON.stringify(mastercontact));
			res.render('admin/master-contact/index_admin',{layout:'dashboard', master_contacts:result[0], succ_add_msg:req.flash('succ_add_msg')[0]});
		});
	});
	app.get('/admin/site/master-contact/view/:id', function(req, res){
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
			res.render('admin/master-contact/view_admin',{layout:'dashboard', master_contacts:result[0][0], designation:result[3], industry_types:result[2], attorney:result[4], country:result[1], state: result[5], city:result[6]});
		});
	});
	/*================== miki 30-05-2018 ========================*/
};
