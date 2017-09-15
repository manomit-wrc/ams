module.exports = function(app, models) {
	app.get('/admin/target', function(req, res){
			res.render('admin/target/index',{layout:'dashboard', master_contacts:'mastercontact'});
	});

	app.get('/admin/target/add', function(req, res){
			res.render('admin/target/add',{layout:'dashboard'});
	});
};
