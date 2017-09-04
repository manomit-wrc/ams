module.exports = function(app, models) {
	
	var md5 = require('md5');
	app.get('/admin/firm',function(req, res){
		models.admin.hasMany(models.firm,{foreignKey: 'user_id'});
		models.admin.belongsTo(models.country,{foreignKey: 'country_id'});
		models.admin.belongsTo(models.state,{foreignKey: 'state_id'});
		models.admin.belongsTo(models.city,{foreignKey: 'city_id'});
		models.admin.belongsTo(models.designation,{foreignKey: 'designation_id'});

		models.admin.findAll({
			where: {
		      role_code: 'FIRMADM'
		   },
      		include: [{model: models.firm},{model: models.country},{model: models.state},{model: models.city},{model:models.designation}]
		}
    	).then(function(firms){
      		//console.log(firms);
			res.render('admin/firm/index',{layout:'dashboard', firms:firms});
		});
	});

	app.get('/admin/firm/add', function(req, res){
		Promise.all([
		    models.designation.findAll({
		      attributes: ['id', 'code'],
		      where: { status: 1 }
		    }),
		    models.country.findAll(),
		    models.group.findAll(),
		    models.section.findAll({attributes: ['id', 'name']}),
		    models.practicearea.findAll({attributes: ['id', 'name']}),
		    models.codemaster.findAll({attributes: ['id', 'shortdescription'],where: {categoryid:7}})

		]).then(function(values) {
			
		    var result = JSON.parse(JSON.stringify(values));
		    //console.log(result);
		    res.render('admin/firm/add',{
		    	layout:'dashboard', 
		    	designation:result[0],
		    	country:result[1],
		    	group: result[2],
		    	section: result[3],
		    	practice_area: result[4],
		    	jurisdiction: result[5]
		    });
		});
	});

	app.post('/admin/firm/check-firm-email', function(req, res){
		models.admin.findAll({
		  where: {
		    email: req.body.email
		  },
		  raw: true,
		}).then(function(email){
			if(email.length > 0) {
				res.send(false);
			}
			else {
				res.send(true);
			}
		});
	});

	app.post('/admin/firm/add', function(req, res){
		models.admin.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: md5(req.body.password),
			role_code: 'FIRMADM',
			reg_type: 'I',
			phone_no: ''
		}).then(function(admin){
			models.firm.create({
				user_id: admin.id
			}).then(function(firm){
				res.redirect('/admin/firm');
				//res.send(true);
			}).catch(function(err){
				
			});
		});
	});


	app.get('/admin/firm/my-profile',function(req, res){
		Promise.all([
			models.country.findAll()
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			res.render('admin/firm/my-profile',{layout:'dashboard',countries: result[0]});
		});
    	
	});

	app.post("/admin/firm/get-state", function(req, res){
		models.state.findAll({
		  where: {
		    country_id: req.body.country_id
		  },
		  raw: true,
		}).then(function(states){
			res.send({states:states});
		});
	});

	app.post("/admin/firm/get-city", function(req, res){
		models.city.findAll({
		  where: {
		    state_id: req.body.state_id
		  },
		  raw: true,
		}).then(function(cities){
			res.send({cities:cities});
		});
	});

	app.post("/admin/firm/get-zipcode", function(req, res){
		models.zipCode.findAll({
		  where: {
		    city_name: req.body.city_name
		  },
		  raw: true,
		}).then(function(zipcodes){
			res.send({zipcodes:zipcodes});
		});
	});
};