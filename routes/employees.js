module.exports = function(app, models) {

	var md5 = require('md5');
	var session = require('express-session');
	var multer  = require('multer');
	var im = require('imagemagick');
	var fileExt = '';
	var fileName = '';
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './public/profile/emp_img');
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

	function removePhoneMask (phone_no){
		// the format :(777) 777-7222
		var phone_no = phone_no.replace("-","");
		phone_no = phone_no.replace(")","");
		phone_no = phone_no.replace("(","");
		phone_no = phone_no.replace(" ","");
		return phone_no;

	}

	app.get('/admin/employees', function(req, res){
		models.employee.belongsTo(models.firm,{foreignKey: 'firm_id'});
		models.employee.findAll({
			include: {model: models.firm}
		}).then(function(show){
			var result = JSON.parse(JSON.stringify(show));
			res.render('admin/employees/index', {layout: 'dashboard', empl: result})
		});
	});
	app.get('/admin/add-employees', function(req, res){
		models.admin.belongsTo(models.country,{foreignKey: 'country_id'});
		models.admin.belongsTo(models.state,{foreignKey: 'state_id'});
		models.admin.belongsTo(models.city,{foreignKey: 'city_id'});
		Promise.all([
			models.group.findAll(),
			models.designation.findAll(),
			models.firm.findAll(),
			models.jobtype.findAll(),
			models.country.findAll({
				order:[
				['code', 'DESC']
				]
			})
			]).then(function(values){
				res.render('admin/employees/add', {layout: 'dashboard', group: values[0], designation: values[1], firm: values[2], job_types: values[3],countries: values[4]})
			});
		});
	app.post('/admin/add-employees1', function(req, res){
		models.employee.findAndCountAll({
			where: {
				email: req.body.email
			}
		}).then(function(result){
			var count = result.count;
			if(count == 0)
			{
				models.employee.create({
					email: req.body.email,
					password: md5(req.body.password),
					group_id: req.body.group_id,
					designation_id: req.body.designation_id
				}).then(function(store){
					res.json({"a": 1});
				});
			}
			else {
				res.json({"error": 2});
			}
		});
	});
	app.post('/admin/add-employees2/:email', function(req, res){
		models.employee.update({
			firm_id: req.body.firm_id,
			emp_staff_id: req.body.emp_staff_id,
			emp_staff_code: req.body.emp_staff_code,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			gender: req.body.gender,
			education: req.body.education
		},{where: {email: req.params['email']}
	}).then(function(store){
		res.json({"a":1});
	});
});
	app.post('/admin/add-employees3/:email', function(req, res){
		models.employee.update({
			emp_staff_title: req.body.emp_staff_title,
			job_type_id: req.body.job_type,
			firm_join_date: req.body.firm_join_date,
			staff_experience: req.body.staff_exp,
			salary_cost: req.body.salary_cost,
			benefir_cost: req.body.benefit_cost,
			overhead_factor: req.body.overhead_factor
		},{where: {email: req.params['email']}
	}).then(function(store){
		res.json({"a":1});
	});
});
	app.post('/admin/add-employees4/:email',  upload.single('profile_photo'), function(req, res){
		models.employee.update({
			phone: removePhoneMask(req.body.phone_no),
			fax: removePhoneMask(req.body.fax),
			mobile: removePhoneMask(req.body.mobile),
			web_url: req.body.website_url,
			social_url: req.body.social_url,
			address_1: req.body.address_1,
			address_2: req.body.address_2,
			address_3: req.body.address_3,
			country_id: req.body.attorney_country_id,
			state_id: req.body.attoney_state_id,
			city_id: req.body.attoney_city_id,
			pincode: req.body.attorney_zip_code,
			image: fileName
		},{where: {email: req.params['email']}
	}).then(function(store){
		res.json({"a":1});
	});
});
	app.get('/admin/employee/edit/:id', function(req, res){
		models.employee.belongsTo(models.firm,{foreignKey: 'firm_id'});
		models.employee.belongsTo(models.group,{foreignKey: 'group_id'});
		models.employee.belongsTo(models.designation,{foreignKey: 'designation_id'});
		models.employee.belongsTo(models.jobtype,{foreignKey: 'job_type_id'});
		models.employee.belongsTo(models.country,{foreignKey: 'country_id'});
		models.employee.belongsTo(models.state,{foreignKey: 'state_id'});
		models.employee.belongsTo(models.city,{foreignKey: 'city_id'});

		Promise.all([
			models.firm.findAll({attributes: ['id', 'name']}),
			models.group.findAll(),
			models.designation.findAll(),
			models.jobtype.findAll(),
			models.country.findAll({
				order:[
				['code', 'DESC']
				]
			}),
			models.employee.findAll({
				where: {
					id: req.params['id']
				},
				include: [{model: models.firm},{model: models.group},{model: models.designation},{model: models.jobtype},{model: models.country},{model: models.state},{model: models.city}]
			})
			]).then(function(show){
				var result = JSON.parse(JSON.stringify(show));
				console.log(result[3]);
				res.render('admin/employees/edit', {layout: 'dashboard', firm: result[0], group: result[1], designation: result[2], jobtype: result[3], country: result[4], empl: result[5][0]});
			});
		});
	app.get('/admin/employee/delete/:id', function(req, res){
		models.employee.destroy({
			where: {id: req.params['id']}
		}).then(function(del){
			res.redirect('/admin/employees');
		});
	});
	app.post('/admin/edit-employees1/:id', function(req, res){
		models.employee.update({
			group_id: req.body.group_id,
			designation_id: req.body.designation_id
			},{where: {id: req.params['id']}
		}).then(function(store){
		res.json({"a":1});
		});
	});
};