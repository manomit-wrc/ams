module.exports = function(app, models) {
	app.get('/admin/client', function(req, res){
		res.render('admin/client/index',{layout:'dashboard'});
	});

	app.get('/admin/client/add', function(req, res){
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

			res.render('admin/client/add',
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
};