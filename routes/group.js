module.exports = function(app, group) {
 	
 	var Group = group;
	
	// for index
	app.get('/admin/group', function(req, res) {
		Group.findAll({order:[
          ['id', 'ASC']
        ]}).then(function(group){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/group/index',{layout:'dashboard', group:group,succ_add_msg:req.flash('succ_add_msg')[0]});
		});
		
	});

	//for add view
	app.get('/admin/group/add', function(req, res){
		res.render('admin/group/add',{layout:'dashboard',error_message:req.flash('error_message')[0]});
	});

	//for add process
	app.post('/admin/group/add', function(req, res){
		
		Group.findAndCountAll({
		   where: {
		      group: {
		        $like: '%'+req.body.group_name+'%'
		      }
		   }
		})
		.then(function(result) {
			//console.log(result.count);
			var count = result.count;
			if(count == 0) {

				Group.create({
					code: req.body.code,
					group: req.body.group_name,
					remark: req.body.remarks
				}).then(function(result){
					req.flash('succ_add_msg', 'Group added successfully');
					res.redirect('/admin/group');
				}).catch(function(err){
					var validation_error = err.errors;
			    	res.render('admin/group/add', {
				        layout: 'dashboard',
				        error_message: validation_error[0].message,
				        body: req.body
		        	});
				});
			} else {
		    	req.flash('error_message', 'Group already exists');
		    	var redirectUrl = '/admin/group/add';
	  			res.redirect(redirectUrl);
	  		}
		  	
		});
		
	});

	//for delete 
	app.get('/admin/group/delete/:group_id', function(req, res){
		Group.destroy({
		    where: {
		       id:req.params['group_id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Group deleted successfully');
			res.redirect('/admin/group');
		});
	});

	//for edit view
	app.get('/admin/group/edit/:group_id', function(req, response){
		Group.findById(req.params['group_id']).then(function(group){
			response.render('admin/group/edit',{layout:'dashboard', group:group,error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/group/edit/:group_id', function(req, res){
		Group.update({
    		code: req.body.code,
			group: req.body.group_name,
			remark: req.body.remarks
	    },{ where: { id: req.params['group_id'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Group edited successfully');
	    	res.redirect('/admin/group');
	    }).catch(function(err){
	    	
	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/group/edit/' + req.params['group_id'];
  			res.redirect(redirectUrl);
	    	
	    });
	});

};