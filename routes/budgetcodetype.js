module.exports = function(app, budgetcodetype) {

 	var budgetcodetype = budgetcodetype;

	// for index
	app.get('/admin/budgetcodetype', function(req, res) {
		budgetcodetype.findAll({where: {
      status:'1',
    },order:[
          ['id', 'ASC']
        ]}).then(function(budgetcodetype){
			//console.log(practiceArea[0].dataValues.id);
			res.render('admin/budgetcodetype/index',{layout:'dashboard', budgetcodetype:budgetcodetype,succ_add_msg:req.flash('succ_add_msg')[0]});
		});

	});

	//for add view
	app.get('/admin/budgetcodetype/add', function(req, res){
		res.render('admin/budgetcodetype/add',{layout:'dashboard',error_message:req.flash('error_message')[0]});
	});

	//for add process
	app.post('/admin/budgetcodetype/add', function(req, res){
		budgetcodetype.findAndCountAll({
		   where: {
		      	budget_code_type: {
		        $like: '%'+req.body.budget_code_type+'%'
		      }
		   }
		})
		.then(function(result) {
			// console.log(result.count);
			var count = result.count;
			if(count == 0) {

				budgetcodetype.create({
					code: req.body.code,
					budget_code_type:req.body.budget_code_type,
					remarks:req.body.remarks,
          status: 1
				}).then(function(result){

					req.flash('succ_add_msg', 'Budget Type added successfully');
					res.redirect('/admin/budgetcodetype');
				}).catch(function(err){
					var validation_error = err.errors;
			    	res.render('admin/budgetcodetype/add', {
				        layout: 'dashboard',
				        error_message: validation_error[0].message,
				        body: req.body
		        	});
				});
			} else {
		    	req.flash('error_message', 'Budget Type already exists');
		    	var redirectUrl = '/admin/budgetcodetype/add';
	  			res.redirect(redirectUrl);
	  		}

		});

	});

	//for delete
	app.get('/admin/budgetcodetype/delete/:id', function(req, res){
		budgetcodetype.destroy({
		    where: {
		       id:req.params['id']
		    }
		}).then(function(response){
			req.flash('succ_add_msg', 'Budget Code Type deleted successfully');
			res.redirect('/admin/budgetcodetype');
		});
	});

	//for edit view
	app.get('/admin/budgetcodetype/edit/:id', function(req, response){
		budgetcodetype.findById(req.params['id']).then(function(budgetcodetype){
			response.render('admin/budgetcodetype/edit',{layout:'dashboard', budgetcodetype:budgetcodetype, error_message:req.flash('error_message')[0]});
		});
	});

	//for edit process
	app.post('/admin/budgetcodetype/edit/:id', function(req, res){
		budgetcodetype.update({
    	code: req.body.code,
			budget_code_type: req.body.budget_code_type,
			remarks: req.body.remarks
    },{ where: { id: req.params['id'] } }).then(function(result){
	    	req.flash('succ_add_msg', 'Budget Code Type edited successfully');
	    	res.redirect('/admin/budgetcodetype');
	    }).catch(function(err){

	    	var validation_error = err.errors;
	    	req.flash('error_message', validation_error[0].message);
	    	var redirectUrl = '/admin/budgetcodetype/edit/' + req.params['group_id'];
  			res.redirect(redirectUrl);

	    });
	});

};
