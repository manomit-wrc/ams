module.exports = function(app, jurisdiction) {

 	var Jurisdiction = jurisdiction;

	// for index
	app.get('/admin/jurisdiction', function(req, res) {
		Jurisdiction.findAll().then(function(jurisdiction){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/jurisdiction/index',{layout:'dashboard', jurisdiction:jurisdiction,succ_add_msg:req.flash('succ_add_msg')[0]});
		});

	});

	//for add view
	app.get('/admin/jurisdiction/add', function(req, res){
		res.render('admin/jurisdiction/add',{layout:'dashboard',error_message:req.flash('error_message')[0]});
	});

	//for add process
	app.post('/admin/jurisdiction/add', function(req, res){

		Jurisdiction.findAndCountAll({
		   where: {
		      jurisdiction: {
		        $like: '%'+req.body.jurisdiction+'%'
		      }
		   }
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			if(count == 0) {

				Jurisdiction.create({
					jurisdiction_code: req.body.jurisdiction_code,
					jurisdiction:req.body.jurisdiction,
					remarks:req.body.remarks,
          status: 1
				}).then(function(result){
					req.flash('succ_add_msg', 'Jurisdiction added successfully');
					res.redirect('/admin/jurisdiction');
				}).catch(function(err){
					var validation_error = err.errors;
			    	res.render('admin/jurisdiction/add', {
				        layout: 'dashboard',
				        error_message: validation_error[0].message,
				        body: req.body
		        	});
				});
			} else {
		    	req.flash('error_message', 'Jurisdiction already exists');
		    	var redirectUrl = '/admin/jurisdiction/add';
	  			res.redirect(redirectUrl);
	  		}

		});

	});

	//for delete
	app.get('/admin/jurisdiction/delete/:id', function(req, res){
		Jurisdiction.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Group deleted successfully');
			res.redirect('/admin/jurisdiction');
		});
	});

	//for edit view
	app.get('/admin/jurisdiction/edit/:id', function(req, response){
		Jurisdiction.findById(req.params['id']).then(function(jurisdiction){
			response.render('admin/jurisdiction/edit',{layout:'dashboard', jurisdiction:jurisdiction,error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/jurisdiction/edit/:id', function(req, res){
		Jurisdiction.update({
    	jurisdiction_code: req.body.jurisdiction_code,
			jurisdiction: req.body.jurisdiction,
			remarks: req.body.remarks
    },{ where: { id: req.params['id'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Jurisdiction edited successfully');
	    	res.redirect('/admin/jurisdiction');
	    }).catch(function(err){

	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/jurisdiction/edit/' + req.params['group_id'];
  			res.redirect(redirectUrl);

	    });
	});

};
