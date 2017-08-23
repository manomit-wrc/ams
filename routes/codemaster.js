module.exports = function(app, CodeMaster) {

 	var CodeMaster = CodeMaster;

	app.get('/admin/codecategory', function(req, res) {
		Codecategory.findAll().then(function(codecategory){
			res.render('admin/codecategory/index',{layout:'dashboard', codecategory:codecategory});
		});

	});

	app.get('/admin/codecategory/add', function(req, res){
		res.render('admin/codecategory/add',{layout:'dashboard'});
	});

	app.post('/admin/codecategory/add', function(req, res){
		Codecategory.create({
			categoryname: req.body.categoryname,
		}).then(function(result){
			res.redirect('/admin/codecategory');
		}).catch(function(err){
			var validation_error = err.errors;
	    	res.render('admin/codecategory/add', {
	        layout: 'dashboard',
	        error_message: validation_error[0].message,
	        body: req.body
	        });
		});
	});

	app.get('/admin/codecategory/edit/:id', function(req, res){
		Codecategory.findById(req.params['id']).then(function(codecategory){
			res.render('admin/codecategory/edit', {
	        layout: 'dashboard',
	        codecategory:codecategory
	        });
		});
	});

	app.post('/admin/codecategory/edit/:id', function(req, res){
		Codecategory.update({
    		categoryname: req.body.categoryname,
	    },{ where: { id: req.params['id'] } }).then(function(result){
	    	res.redirect('/admin/codecategory');
	    }).catch(function(err){

	    });
	});

	app.get('/admin/codecategory/delete/:id', function(req, res){
		Codecategory.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			res.redirect('/admin/codecategory');
		});
	});

};
