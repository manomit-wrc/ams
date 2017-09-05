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
      		// console.log(firms);
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
		    models.jurisdiction.findAll({attributes: ['id', 'jurisdiction']})

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
		var id = req.user.id;
		models.admin.hasMany(models.firm,{foreignKey: 'user_id'});
		models.admin.belongsTo(models.country,{foreignKey: 'country_id'});
		models.admin.belongsTo(models.state,{foreignKey: 'state_id'});
		models.admin.belongsTo(models.city,{foreignKey: 'city_id'});
		models.admin.belongsTo(models.designation,{foreignKey: 'designation_id'});
		Promise.all([
			models.country.findAll({
				order:[
					['code', 'DESC']
				]
			}),
			models.admin.findAll({
			 where: {
					 role_code: 'FIRMADM',
					 id:id
				},
					include: [{model: models.firm},{model: models.country},{model: models.state},{model: models.city},{model:models.designation}]
		 	}),
			models.section.findAll({attributes: ['id', 'name']}),
		  models.practicearea.findAll({attributes: ['id', 'name']}),
		  models.jurisdiction.findAll({attributes: ['id', 'jurisdiction']}),
			models.firm.findAll({
				where: {
					user_id:id
				}
			})

		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			console.log(result);
			var firm_table_array_details = result[1][0]['firms'];
			// for(var k in result[1][0]['firms']){
			// 	firm_table_array_details.push(k, result[1][0][k]);
			// }
			// console.log(firm_table_array_details);
			res.render('admin/firm/my-profile',{
				layout:'dashboard',
				countries: result[0],
				firm_details: result[1][0],
				firm_table_array_details: firm_table_array_details[0],
				section: result[2],
				practicearea: result[3],
				jurisdiction: result[4]
			});
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
	//@#@#@#@#@#@#@# first tab update in "my-profile" @#@#@#@#@#@#@#//


	app.post("/admin/firm/update-address", function(req, res){
		var id = req.user.id;
		models.admin.update({
			address: req.body.address,
			address_2: req.body.address_2,
			address_3: req.body.address_3,
			phone_no: req.body.phone_no,
			country_id: req.body.country_id,
			state_id: req.body.state_id,
			city_id: req.body.city_id,
			zipcode: req.body.zipcode,
			fax: req.body.fax,
			mobile: req.body.mobile,
			website: req.body.website,
			social: req.body.social
		}, {where: {id :id}}).then(function(result){
			res.send("1");
		}).catch(function(err){

		});
	});

app.post("/admin/firm/update-generalInfo", function(req, res){

var firm_id = req.body.firmId;
// console.log(req.body);
var section = req.body.sections.toString();
var practice_area = req.body.practice_area.toString();
var jurisdiction = req.body.firm_jurisdiction.toString();
// console.log(section);

models.firm.update({
	name: req.body.firmName,
	code: req.body.firm_code,
	registration_no: req.body.firmRegistration,
	section: section,
	practice_area: practice_area,
	jurisdiction: jurisdiction
}, {where: {id: firm_id}}).then(function(result){
	res.send("2");
}).catch(function(err){

});

});
};
