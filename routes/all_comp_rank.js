module.exports = function(app, models) {
	app.get('/admin/all-competitor-rank', function(req, res){
		models.code.findAll({
			where: {category_type: "Competitor Rank"}
		}).then(function(show){
			res.render('admin/competitor/all_comp_rank', {layout: 'dashboard', result:show});
		});
	});
};