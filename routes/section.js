module.exports = function(app, section) {
 	
 	var Section = section;
	
	app.get('/admin/section', function(req, res) {
		Section.findAll().then(function(section){
			res.render('admin/section/index',{layout:'dashboard', section:section});
		});
		
	});

	app.get('/admin/section/add', function(req, res){
		res.render('admin/section/add',{layout:'dashboard'});
	});

	app.post('/admin/section/add', function(req, res){
		Section.create({
			name: req.body.name,
			description: req.body.description,
			remarks: req.body.remarks
		}).then(function(result){
			res.redirect('/admin/section');
		}).catch(function(err){
			var validation_error = err.errors;
	    	res.render('admin/section/add', {
	        layout: 'dashboard',
	        error_message: validation_error[0].message,
	        body: req.body
	        });
		});
	});

	app.get('/admin/section/edit/:id', function(req, res){
		Section.findById(req.params['id']).then(function(section){
			res.render('admin/section/edit', {
	        layout: 'dashboard',
	        section:section
	        });
		});
	});
	
	app.post('/admin/section/edit/:id', function(req, res){
		Section.update({
    		name: req.body.name,
    		description: req.body.description,
    		remarks: req.body.remarks
	    },{ where: { id: req.params['id'] } }).then(function(result){
	    	res.redirect('/admin/section');
	    }).catch(function(err){
	    	
	    });
	});

	app.get('/admin/section/delete/:id', function(req, res){
		Section.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			res.redirect('/admin/section');
		});
	});

};