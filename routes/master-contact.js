module.exports = function(app, models) {
	app.get('/admin/master-contact', function(req, res){
		res.render('admin/master_contact/index',{layout:'dashboard'});
	});

	app.get('/admin/master-contact/add', function(req, res){
		Promise.all([
			models.country.findAll(),
			models.industrytype.findAll({attributes: ['id', 'industry']}),
			models.admin.findAll({
				where: {
					role_code: 'ATTR'
				},
				attributes: ['id', 'first_name','last_name']
			})
		]).then(function(values){
			var result = JSON.parse(JSON.stringify(values));
			res.render('admin/master_contact/add',
				{
					layout: 'dashboard',
					countries: result[0],
					industry_types: result[1],
					attornies: result[2]
				}
			);
		});
		
	});
};