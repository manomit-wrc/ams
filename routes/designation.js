module.exports = function(app, designation) {
 	
 	var Designation = designation;
	
	// for index
	app.get('/admin/designation', function(req, res) {
		Designation.findAll().then(function(designation){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/designation/index',{layout:'dashboard', designation:designation,succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	//for add view
	app.get('/admin/designation/add', function(req, res){
		res.render('admin/designation/add',{layout:'dashboard'});
	});

	//for add process
	app.post('/admin/designation/add', function(req, res){
		Designation.findAndCountAll({
		   where: {
		      designation: {
		        $like: '%'+req.body.designation+'%'
		      }
		   }
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			if(count == 0) {
				Designation.create({
					code: req.body.code,
					designation: req.body.designation,
					remarks: req.body.remarks
				}).then(function(result){
					req.flash('succ_add_msg', 'Designation added successfully');
					res.redirect('/admin/designation');
				}).catch(function(err){
					var validation_error = err.errors;
			    	res.render('admin/designation/add', {
			        layout: 'dashboard',
			        error_message: validation_error[0].message,
			        body: req.body
			        });
				});
			} else {
		    	req.flash('error_message', 'Designation already exists');
		    	var redirectUrl = '/admin/practice-area/add';
	  			res.redirect(redirectUrl);
	  		}
	  	});
	});

	//for delete 
	app.get('/admin/designation/delete/:did', function(req, res){
		Designation.destroy({
		    where: {
		       id:req.params['did']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Designation deleted successfully');
			res.redirect('/admin/designation');
		});
	});

	//for edit view
	app.get('/admin/designation/edit/:did', function(req, response){
		Designation.findById(req.params['did']).then(function(designation){
			response.render('admin/designation/edit',{layout:'dashboard', designation:designation,error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/designation/edit/:did', function(req, res){
		Designation.update({
    		code: req.body.code,
			designation: req.body.designation,
			remarks: req.body.remarks
	    },{ where: { id: req.params['did'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Designation edited successfully');
	    	res.redirect('/admin/designation');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/designation/edit/' + req.params['did'];
  			res.redirect(redirectUrl);
	    	
	    });
	});

};