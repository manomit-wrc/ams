module.exports = function(app, role) {
 	
 	var Role = role;
	
	// for index
	app.get('/admin/role', function(req, res) {
		Role.findAll({order:[
          ['id', 'ASC']
        ]}).then(function(role){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/role/index',{layout:'dashboard', role:role,succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	//for add view
	app.get('/admin/role/add', function(req, res){
		res.render('admin/role/add',{layout:'dashboard',error_message:req.flash('error_message')[0]});
	});

	//for add process
	app.post('/admin/role/add', function(req, res){
		
		Role.findAndCountAll({
		   where: {
		      role: {
		        $like: '%'+req.body.role+'%'
		      }
		   }
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			if(count == 0) {

				Role.create({
					code: req.body.code,
					role: req.body.role,
					remark: req.body.remarks
				}).then(function(result){
					req.flash('succ_add_msg', 'Role added successfully');
					res.redirect('/admin/role');
				}).catch(function(err){
					var validation_error = err.errors;
			    	res.render('admin/role/add', {
				        layout: 'dashboard',
				        error_message: validation_error[0].message,
				        body: req.body
		        	});
				});
			} else {
		    	req.flash('error_message', 'Role already exists');
		    	var redirectUrl = '/admin/role/add';
	  			res.redirect(redirectUrl);
	  		}
		  	
		});
		
	});

	//for delete 
	app.get('/admin/role/delete/:rid', function(req, res){
		Role.destroy({
		    where: {
		       id:req.params['rid']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Role deleted successfully');
			res.redirect('/admin/role');
		});
	});

	//for edit view
	app.get('/admin/role/edit/:rid', function(req, response){
		Role.findById(req.params['rid']).then(function(role_details){
			response.render('admin/role/edit',{layout:'dashboard', role_details:role_details,error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/role/edit/:rid', function(req, res){
		Role.update({
    		code: req.body.code,
			role: req.body.role,
			remark: req.body.remarks
	    },{ where: { id: req.params['rid'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Role edited successfully');
	    	res.redirect('/admin/role');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/role/edit/' + req.params['rid'];
  			res.redirect(redirectUrl);
	    	
	    });
	});

};